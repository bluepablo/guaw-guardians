import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignGlyph } from '../ui/SovereignGlyph';
import { SovereignSDK } from '../../services/SovereignSDK';

interface Point {
  x: number;
  y: number;
  t: number;
}

interface JerkCostCanvasProps {
  onVerificationChange?: (isHuman: boolean) => void;
}

export const JerkCostCanvas = ({ onVerificationChange }: JerkCostCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [motorResonance, setMotorResonance] = useState<number>(0);
  const [isHuman, setIsHuman] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const hasReportedAnomalyRef = useRef<boolean>(false);
  
  const pointsRef = useRef<Point[]>([]);
  const lastFrameRef = useRef<number>(0);
  const resonanceHistoryRef = useRef<number[]>([]);
  const scanLinePos = useRef(0);

  // Soft Emerald Theme Configuration
  const THEME_COLOR = '16, 185, 129'; // Emerald 500 (RGB)

  // Notify parent of verification state changes
  useEffect(() => {
    onVerificationChange?.(isHuman);
  }, [isHuman, onVerificationChange]);

  // Sovereign Reporting: Seal anomalies in Lazarus Ledger
  useEffect(() => {
    if (!isHuman && !hasReportedAnomalyRef.current && motorResonance > 5000) {
      hasReportedAnomalyRef.current = true;
      SovereignSDK.getInstance().reportAnomaly({
        type: 'PHYSICAL_JERK_ANOMALY',
        resonance: motorResonance,
        coordinates: mousePos
      }, {
        source: 'JerkCostCanvas_Edge',
        tier: '50_KINETIC'
      }).then(success => {
        if (success) console.log("🦅 [SovereignEdge] Anomaly sealed in state ledger.");
      });
    }
  }, [isHuman, motorResonance, mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });
      pointsRef.current.push({ x, y, t: now });

      if (pointsRef.current.length > 60) {
        pointsRef.current.shift();
      }
    };

    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => setIsInside(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const loop = (timestamp: number) => {
      lastFrameRef.current = timestamp;

      // Scanning line movement
      scanLinePos.current = (scanLinePos.current + 1.2) % canvas.width;

      // Clear with deep transparency for trail effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle technical grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      for(let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for(let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const points = pointsRef.current;
      
      // Draw Scanning Line
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${THEME_COLOR}, 0.04)`;
      ctx.moveTo(scanLinePos.current, 0);
      ctx.lineTo(scanLinePos.current, canvas.height);
      ctx.stroke();

      if (points.length >= 4) {
        const p1 = points[points.length - 1];
        const p2 = points[points.length - 2];
        const p3 = points[points.length - 3];
        const p4 = points[points.length - 4];

        const dt1 = (p1.t - p2.t) / 1000;
        const dt2 = (p2.t - p3.t) / 1000;
        const dt3 = (p3.t - p4.t) / 1000;

        if (dt1 > 0 && dt2 > 0 && dt3 > 0) {
          const vx1 = (p1.x - p2.x) / dt1;
          const vy1 = (p1.y - p2.y) / dt1;
          const vx2 = (p2.x - p3.x) / dt2;
          const vy2 = (p2.y - p3.y) / dt2;
          const vx3 = (p3.x - p4.x) / dt3;
          const vy3 = (p3.y - p4.y) / dt3;

          const ax1 = (vx1 - vx2) / dt1;
          const ay1 = (vy1 - vy2) / dt1;
          const ax2 = (vx2 - vx3) / dt2;
          const ay2 = (vy2 - vy3) / dt2;

          const jx = (ax1 - ax2) / dt1;
          const jy = (ay1 - ay2) / dt1;

          const resonanceMag = Math.sqrt(jx*jx + jy*jy);
          resonanceHistoryRef.current.push(resonanceMag);
          if(resonanceHistoryRef.current.length > 15) resonanceHistoryRef.current.shift();
          
          const avgResonance = resonanceHistoryRef.current.reduce((a, b) => a + b, 0) / resonanceHistoryRef.current.length;
          const displayCost = Math.min(Math.floor(avgResonance / 800), 9999); 
          
          if (timestamp % 8 < 1.5) {
              setMotorResonance(displayCost);
              setIsHuman(displayCost > 5 && displayCost < 8000);
          }
        }

        // Exquisite Trail Drawing
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // 1. Soft Glow layer
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${THEME_COLOR}, 0.3)`;
        ctx.strokeStyle = `rgba(${THEME_COLOR}, 0.12)`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let i = 0; i < points.length - 1; i++) {
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[i+1].x, points[i+1].y);
        }
        ctx.stroke();

        // 2. Core Layer
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1.6;
        for (let i = 0; i < points.length - 1; i++) {
          const pt = points[i];
          const next = points[i+1];
          const age = points.length - i;
          const opacity = Math.max(0, 1 - (age / points.length));
          
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `rgba(${THEME_COLOR}, ${opacity * 0.8})`;
          ctx.stroke();
        }
      }

      requestAnimationFrame(loop);
    };

    const animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[450px] rounded-[2.5rem] overflow-hidden bg-[#050505] border border-white/10 group cursor-none">
      
      {/* Exquisite HUD Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(16,185,129,0.04),transparent_45%)]" 
              style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties} />
      </div>
      
      <canvas ref={canvasRef} className="absolute inset-0 z-10 block" />

      {/* Crosshair Cursor */}
      <AnimatePresence>
        {isInside && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-30 pointer-events-none"
            style={{ left: mousePos.x, top: mousePos.y }}
          >
            <div className="relative -left-1/2 -top-1/2">
                <div className="w-10 h-10 border border-emerald-500/20 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-emerald-500/60 rounded-full" />
                </div>
                <div className="absolute top-full left-full ml-4 mt-4 font-mono text-[8px] text-emerald-500/40 whitespace-nowrap bg-black/60 px-2 py-1.5 rounded-lg border border-white/5 backdrop-blur-md">
                    DATA_STREAM_X: {Math.floor(mousePos.x)}px<br/>
                    DATA_STREAM_Y: {Math.floor(mousePos.y)}px
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD Overlay - Top Left */}
      <div className="absolute top-8 left-10 z-20 font-mono pointer-events-none">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-emerald-500/60">Bio-Resonance Active</span>
          </div>
          <div className="flex items-baseline space-x-3">
             <motion.span 
               key={motorResonance}
               initial={{ opacity: 0.5, y: -5 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-6xl font-black text-white italic tracking-tighter"
               style={{ textShadow: `0 0 30px rgba(${THEME_COLOR}, 0.15)` }}
             >
                {motorResonance.toLocaleString('en-US', { minimumIntegerDigits: 4, useGrouping: false })}
             </motion.span>
             <span className="text-xs font-black text-emerald-500/60 italic tracking-widest">µ-FLUX</span>
          </div>
        </div>
      </div>

      {/* HUD Overlay - Bottom Right */}
      <div className="absolute bottom-10 right-10 z-20 flex flex-col items-end space-y-3 pointer-events-none">
          <div className="flex items-center gap-5">
              <div className="flex flex-col items-end">
                  <div className="text-[8px] text-gray-600 font-bold uppercase tracking-widest italic leading-none mb-1.5">Integrity Analysis</div>
                  <div className={`text-xs font-black uppercase tracking-[0.1em] italic transition-colors duration-500 ${isHuman ? 'text-emerald-500/70' : 'text-red-500/70'}`}>
                    {isHuman ? 'Valid_Human_Trajectory' : 'Sovereign_Anomaly_Detected'}
                  </div>
              </div>
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-700 ${isHuman ? 'border-emerald-500/15 bg-emerald-500/5' : 'border-red-500/15 bg-red-500/5'}`}>
                  <SovereignGlyph type={isHuman ? 'vanguard' : 'aegis'} size={28} color={isHuman ? `rgba(${THEME_COLOR}, 0.6)` : '#ef4444'} />
              </div>
          </div>
          <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl backdrop-blur-md">
             <p className="text-[8px] text-gray-500 font-mono uppercase tracking-[0.15em]">
                VERDICT_LT: <span className="text-white/80">~11ms (p50)</span> <span className="mx-2 opacity-20">|</span> ENTROPY: <span className="text-emerald-500/60">DET_MAX</span>
             </p>
          </div>
      </div>
      
      {/* Decorative Technical Borders */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
      <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
      <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />

    </div>
  );
};
