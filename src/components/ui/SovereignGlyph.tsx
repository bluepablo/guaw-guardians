import React from 'react';

export type SovereignGlyphType = 'lazarus' | 'aegis' | 'cerberus' | 'ledger' | 'argus' | 'vanguard' | 'transmutator' | 'sun' | 'earth' | 'stone' | 'intersection' | 'world';

export interface SovereignGlyphProps {
  type: SovereignGlyphType;
  className?: string;
  size?: number | string;
  color?: string;
  glow?: boolean;
}

export const SovereignGlyph: React.FC<SovereignGlyphProps> = ({ 
  type, 
  className = "", 
  size = 24, 
  color = "#fbbf24", // Gold/Amber
  glow = true 
}) => {
  const glyphs = {
    lazarus: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
        <circle cx="50" cy="50" r="35" opacity="0.2" />
        <path d="M50 15 A35 35 0 1 1 49.9 15" strokeDasharray="180 40" />
        <path d="M45 15 L55 15 L50 22 Z" fill={color} stroke="none" />
      </svg>
    ),
    aegis: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="3">
        <circle cx="40" cy="50" r="25" />
        <circle cx="60" cy="50" r="25" />
      </svg>
    ),
    cerberus: (
      <svg viewBox="0 0 120 100" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        {/* CENTER WOLF HEAD - Dominant */}
        {/* Head outline */}
        <path d="M60 15 L58 20 L56 25 L55 32 L55 40 L56 46 L58 50 L60 52 L62 50 L64 46 L65 40 L65 32 L64 25 L62 20 Z" fill={color} fillOpacity="0.05" />
        
        {/* Center ears - pointed */}
        <path d="M56 18 L54 10 L56 15" strokeWidth="2.5" />
        <path d="M64 18 L66 10 L64 15" strokeWidth="2.5" />
        
        {/* Center eyes - fierce */}
        <path d="M57 32 L59 34 L57 36" strokeWidth="2" />
        <path d="M63 32 L61 34 L63 36" strokeWidth="2" />
        <circle cx="58" cy="34" r="1.5" fill={color} />
        <circle cx="62" cy="34" r="1.5" fill={color} />
        
        {/* Center snout/muzzle */}
        <path d="M58 42 L60 45 L62 42" strokeWidth="2" />
        <path d="M60 45 L60 48" strokeWidth="1.5" />
        
        {/* LEFT WOLF HEAD */}
        {/* Head outline */}
        <path d="M30 25 L28 30 L26 35 L26 42 L28 47 L32 50 L35 48 L36 42 L36 35 L34 30 Z" fill={color} fillOpacity="0.05" />
        
        {/* Left ears */}
        <path d="M28 28 L25 22 L27 26" strokeWidth="2" />
        <path d="M32 28 L34 22 L32 26" strokeWidth="2" />
        
        {/* Left eyes */}
        <circle cx="29" cy="37" r="1.2" fill={color} />
        <circle cx="33" cy="37" r="1.2" fill={color} />
        
        {/* Left snout */}
        <path d="M29 43 L31 45 L33 43" strokeWidth="1.5" />
        
        {/* RIGHT WOLF HEAD */}
        {/* Head outline */}
        <path d="M90 25 L92 30 L94 35 L94 42 L92 47 L88 50 L85 48 L84 42 L84 35 L86 30 Z" fill={color} fillOpacity="0.05" />
        
        {/* Right ears */}
        <path d="M92 28 L95 22 L93 26" strokeWidth="2" />
        <path d="M88 28 L86 22 L88 26" strokeWidth="2" />
        
        {/* Right eyes */}
        <circle cx="87" cy="37" r="1.2" fill={color} />
        <circle cx="91" cy="37" r="1.2" fill={color} />
        
        {/* Right snout */}
        <path d="M87 43 L89 45 L91 43" strokeWidth="1.5" />
        
        {/* NECKS & BODY CONNECTION */}
        {/* Left neck flowing to body */}
        <path d="M32 50 Q40 58 48 65" strokeWidth="2.5" />
        <path d="M35 52 Q42 60 50 67" strokeWidth="1.5" opacity="0.6" />
        
        {/* Center neck */}
        <path d="M58 52 L58 65" strokeWidth="3" />
        <path d="M62 52 L62 65" strokeWidth="3" />
        
        {/* Right neck flowing to body */}
        <path d="M88 50 Q80 58 72 65" strokeWidth="2.5" />
        <path d="M85 52 Q78 60 70 67" strokeWidth="1.5" opacity="0.6" />
        
        {/* CHEST/BODY */}
        <path d="M48 65 L60 72 L72 65 L70 78 L60 85 L50 78 Z" fill={color} fillOpacity="0.08" strokeWidth="2.5" />
        
        {/* Body detail lines */}
        <path d="M52 70 L60 75 L68 70" strokeWidth="1" opacity="0.5" />
        <path d="M54 75 L60 78 L66 75" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    ledger: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="3">
        <rect x="20" y="20" width="60" height="60" />
        <circle cx="50" cy="50" r="30" />
      </svg>
    ),
    argus: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="3">
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="28" strokeDasharray="2 10" opacity="0.5" />
        <circle cx="50" cy="50" r="6" fill={color} stroke="none" />
        <circle cx="50" cy="15" r="3" fill={color} stroke="none" />
        <circle cx="50" cy="85" r="3" fill={color} stroke="none" />
        <circle cx="15" cy="50" r="3" fill={color} stroke="none" />
        <circle cx="85" cy="50" r="3" fill={color} stroke="none" />
      </svg>
    ),
    vanguard: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="3">
        <path d="M15 25 L85 25 L50 85 Z" />
        <line x1="10" y1="55" x2="90" y2="55" />
      </svg>
    ),
    transmutator: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="3">
        <circle cx="50" cy="45" r="20" />
        <path d="M35 25 Q50 40 65 25" />
        <line x1="50" y1="65" x2="50" y2="90" />
        <line x1="35" y1="80" x2="65" y2="80" />
      </svg>
    ),
    sun: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2">
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="4" fill={color} />
      </svg>
    ),
    earth: (
        <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.5">
          <path d="M15 25 L85 25 L50 85 Z" />
          <line x1="10" y1="55" x2="90" y2="55" />
        </svg>
    ),
    stone: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2">
        <circle cx="50" cy="50" r="45" />
        <rect x="18" y="18" width="64" height="64" />
        <path d="M50 18 L82 82 L18 82 Z" />
      </svg>
    ),
    intersection: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2">
        <circle cx="35" cy="50" r="30" />
        <circle cx="65" cy="50" r="30" />
      </svg>
    ),
    world: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2">
        <circle cx="50" cy="60" r="30" />
        <line x1="50" y1="10" x2="50" y2="30" />
        <line x1="35" y1="20" x2="65" y2="20" />
      </svg>
    )
  };

  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        filter: glow ? `drop-shadow(0 0 12px ${color}66)` : 'none' 
      }} 
      className={`inline-block transition-all duration-700 ${className}`}
    >
      {glyphs[type] || glyphs.sun}
    </div>
  );
};
