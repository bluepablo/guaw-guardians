import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SovereignGlyph } from './SovereignGlyph';

export const FloatingLoginButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
      className="fixed bottom-8 right-8 z-50 group"
    >
      <Link
        to="/console/login"
        className="flex items-center gap-4 pl-4 pr-6 py-4 rounded-[20px] bg-white/10 backdrop-blur-2xl text-white font-bold uppercase tracking-widest text-xs shadow-[0_8px_32px_0_rgba(59,130,246,0.37)] hover:shadow-[0_8px_40px_0_rgba(59,130,246,0.5)] transition-all duration-500 hover:scale-105 active:scale-95 border border-white/20 hover:border-white/30 relative overflow-hidden"
        style={{
          boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
        
        {/* Animated Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Vanguard Glyph */}
        <div className="relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">
          <SovereignGlyph type="vanguard" size={24} glow={true} color="#60a5fa" />
        </div>
        
        {/* Text with subtle glow */}
        <span className="relative z-10 hidden sm:inline font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          Console Access
        </span>
        
        {/* Arrow */}
        <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
      </Link>
      
      {/* Outer Glow Effect */}
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
      
      {/* Subtle Pulse Animation */}
      <div className="absolute inset-0 rounded-[20px] bg-blue-400/10 animate-ping opacity-20 pointer-events-none" style={{ animationDuration: '3s' }} />
    </motion.div>
  );
};
