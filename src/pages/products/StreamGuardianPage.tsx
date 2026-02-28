import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { SovereignGlyph, type SovereignGlyphType } from '../../components/ui/SovereignGlyph';

export const StreamGuardianPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-black relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(58,134,255,0.05),transparent_70%)]" />
      </div>
      
      {/* Navigation */}
      <nav className="p-6 border-b border-white/5 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-blue-400 transition-colors uppercase tracking-widest">
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-blue-500/20 transition-colors">
               <ArrowLeft size={16} />
            </div>
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 opacity-50">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
             <span className="text-[10px] font-mono text-blue-500 uppercase">Enterprise Solution</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-10 shadow-[0_0_30px_rgba(59,134,255,0.1)]">
            <SovereignGlyph type="vanguard" size={32} color="#3a86ff" />
            <span className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] italic">Vanguard Protocol v1.0</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter">
            Live Stream <span className="text-blue-400">Verification</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Real-time deepfake detection for streaming platforms. 
            <strong className="text-white"> Frame-by-frame analysis</strong> with sub-second latency.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=Stream Guardian Inquiry'}
              className="px-8 py-4 rounded-xl bg-blue-500 text-black font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(58,134,255,0.3)]"
            >
              Contact Sales
            </button>
            <Link 
              to="/console/login"
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
            >
              Start Free Trial
            </Link>
          </div>
        </motion.div>

        {/* Problem */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-20 p-10 rounded-3xl bg-red-500/5 border border-red-500/10"
        >
          <h2 className="text-3xl font-bold mb-6">The Problem</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-400">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Deepfakes in Live Streams</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Real-time face swapping technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Voice cloning in live commerce</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Synthetic influencers deceiving audiences</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Platform Liability</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Platforms liable for fraudulent content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Manual moderation is too slow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>AI detection models become obsolete</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">How GUAW Solves This</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                glyph: "vanguard",
                title: "Sub-ms Interrogation",
                description: "Processes live frames at the ingestion layer. Zero buffering, deterministic physical verification."
              },
              {
                glyph: "transmutator",
                title: "Stochastic Auditing",
                description: "Analyzes high-resolution noise patterns and sensorial dynamics that synthetic layers cannot replicate in live feeds."
              },
              {
                glyph: "aegis",
                title: "Sovereign Shield",
                description: "Automatically flags or terminates synthetic streams via institutional-grade moderation logic."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group overflow-hidden relative">
                <div className="absolute -top-4 -right-4 opacity-5">
                   <SovereignGlyph type={item.glyph as SovereignGlyphType} size={120} color="#3a86ff" />
                </div>
                <div className="mb-6 group-hover:scale-110 transition-transform relative z-10">
                   <SovereignGlyph type={item.glyph as SovereignGlyphType} size={48} color="#3a86ff" />
                </div>
                <h3 className="text-white font-black text-xs uppercase tracking-widest italic mb-4">{item.title}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed italic">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { glyph: "vanguard", title: "Frame-Level Interrogation", desc: "Analyzes every frame in real-time execution" },
              { glyph: "sun", title: "Sub-500ms Verdicts", desc: "Institutional-speed detection for live commerce" },
              { glyph: "aegis", title: "Automated Enforcement", desc: "Hardened termination of synthetic feeds" },
              { glyph: "world", title: "Massive Scale Auditing", desc: "Handles millions of concurrent Genesis events" },
              { glyph: "ledger", title: "Axiomatic Metrics", desc: "Real-time integrity logs and verification scores" },
              { glyph: "cerberus", title: "Triple-Sealed Proofs", desc: "Cryptographically immutable stream certificates" }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 group-hover:border-blue-500/30 transition-all">
                   <SovereignGlyph type={feature.glyph as SovereignGlyphType} size={28} color="#3a86ff" />
                </div>
                <div>
                  <h3 className="text-white font-black text-xs uppercase tracking-widest italic mb-2">{feature.title}</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Streaming Ecosystems", desc: "Protect viewers from synthetic presence fraud.", glyph: "vanguard" },
              { title: "Live Commerce", desc: "Verifying organic presence for sub-ms sales.", glyph: "transmutator" },
              { title: "Institutional VC", desc: "Securing board-level communications from deepfakes.", glyph: "aegis" }
            ].map((useCase, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-500/5 to-transparent border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                <div className="flex justify-center mb-8 group-hover:scale-110 transition-transform">
                   <SovereignGlyph type={useCase.glyph as SovereignGlyphType} size={64} color="#3a86ff" />
                </div>
                <h3 className="text-white font-black text-xs uppercase tracking-widest italic mb-4">{useCase.title}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed italic">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mb-20 p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Enterprise Pricing</h2>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl font-mono font-black">$20,000</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-blue-400 font-mono text-sm mt-2">+ $0.05 per stream hour</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              "Real-time API",
              "Analytics dashboard",
              "Volume discounts",
              "White-label option",
              "24/7 monitoring",
              "99.95% SLA"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="text-blue-400" size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=Stream Guardian Inquiry'}
              className="px-12 py-4 rounded-xl bg-blue-500 text-black font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(58,134,255,0.3)]"
            >
              Contact Sales
            </button>
          </div>
        </motion.div>

        {/* Integration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Integration Example</h2>
          <div className="p-8 rounded-2xl bg-black/50 border border-white/10 font-mono text-sm">
            <pre className="text-gray-300 overflow-x-auto">
{`// Start stream verification
const stream = await GUAW.stream.start({
  streamId: 'live-123',
  platform: 'youtube'
});

// Analyze frames in real-time
stream.on('frame', async (frame) => {
  const result = await GUAW.stream.analyzeFrame(frame);
  
  if (result.verdict === 'SYNTHETIC_DETECTED') {
    // Terminate stream automatically
    await stream.terminate();
    await notifyModerators(result);
  }
});`}
            </pre>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center p-12 rounded-3xl bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 border border-blue-500/20"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Protect Your Platform?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join leading streaming platforms using GUAW for real-time deepfake detection.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=Stream Guardian Inquiry'}
              className="px-8 py-4 rounded-xl bg-blue-500 text-black font-black hover:scale-[1.02] transition-all"
            >
              Schedule Demo
            </button>
            <Link 
              to="/console/login"
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
            >
              Start Free Trial
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
