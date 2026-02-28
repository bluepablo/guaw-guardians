import React from 'react';

export const ParticlesBackground: React.FC = () => {
  const [particles, setParticles] = React.useState<{left: string, top: string, dim: number, duration: number, delay: number, opacity: number, color: string, type: 'float' | 'pulse' | 'glitch'}[]>([]);

  React.useEffect(() => {
    const p = Array.from({ length: 200 }).map(() => {
      const typeRand = Math.random();
      const type = typeRand > 0.85 ? 'glitch' : typeRand > 0.7 ? 'pulse' : 'float';
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        dim: type === 'glitch' ? 1 : Math.random() * 3 + 1,
        duration: Math.random() * 20 + 20, 
        delay: Math.random() * -40,
        opacity: Math.random() * 0.25 + 0.05,
        color: Math.random() > 0.7 ? 'bg-primary' : Math.random() > 0.4 ? 'bg-secondary' : 'bg-emerald-500',
        type: type as 'float' | 'pulse' | 'glitch'
      };
    });
    setParticles(p);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${p.color} ${
                p.type === 'pulse' ? 'animate-pulse' : 
                p.type === 'glitch' ? 'animate-[pulse_0.2s_infinite]' : 
                'animate-float-up'
            } shadow-[0_0_10px_rgba(255,255,255,0.03)]`}
            style={{
              left: p.left,
              top: p.type !== 'float' ? p.top : undefined,
              bottom: p.type === 'float' ? '-10px' : undefined,
              width: `${p.dim}px`,
              height: `${p.dim}px`,
              '--particle-opacity': p.opacity,
              '--duration': `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              filter: `blur(${p.dim > 2 ? '1px' : '0.4px'})`,
              opacity: p.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>
      {/* 🌟 Atmospheric Depth Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(58,134,255,0.015),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.01),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(251,191,36,0.01),transparent_50%)]" />
    </div>
  );
};
