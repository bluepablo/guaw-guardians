import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { consoleService } from '../../services/consoleService';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { SovereignGlyph } from '../../components/ui/SovereignGlyph';

export const ConsoleLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await consoleService.login(email, password);
      localStorage.setItem('guaw_token', data.token);
      localStorage.setItem('guaw_user', JSON.stringify(data.account));
      navigate('/console');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please attempt re-authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center p-4 relative overflow-hidden">
      <ParticlesBackground />
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20">
        <ArrowLeft size={20} />
        <span className="font-mono text-sm">Back to Home</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-dark p-8 rounded-3xl relative z-10 border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-8 relative">
           {/* ALCHEMICAL HALO EFFECT (Exactly as Landing Page) */}
           <div className="relative inline-block group mb-6">
                <motion.div
                    className="absolute -inset-8 bg-primary/20 blur-[60px] rounded-full z-0 group-hover:bg-primary/30 transition-all duration-700"
                    animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Rotating Glyphs */}
                <motion.div 
                    className="absolute -inset-16 z-0 pointer-events-none opacity-30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    <SovereignGlyph type="sun" size={30} className="absolute top-0 left-1/2 -translate-x-1/2 text-primary" />
                    <SovereignGlyph type="earth" size={30} className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-180 text-secondary" />
                    <SovereignGlyph type="stone" size={30} className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-white" />
                    <SovereignGlyph type="intersection" size={30} className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 text-amber-400" />
                </motion.div>

                  <motion.img 
                    src="/guardian.png" 
                    alt="GUAW Guardian" 
                    className="relative z-10 w-32 h-32 mx-auto object-contain drop-shadow-[0_0_30px_rgba(58,134,255,0.4)]"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            {/* END HALO EFFECT */}
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GUAW Console</h1>
            <p className="text-gray-400 mt-2">Guardians Access // Developer Core</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Corporate Identity (Email)</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all font-mono"
              placeholder="dev@guaw.app"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Security Key (Password)</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all font-mono pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-alert text-sm font-mono">{error}</p>}

          <button 
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading ? 'Validating...' : 'Initialize Session'}
          </button>

          <div className="text-center pt-4">
              <Link to="/console/register" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Don't have a developer ID? <span className="text-primary font-bold">Sign Up</span>
              </Link>
          </div>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500 font-mono">
           Sovereign Infrastructure Protocol
        </div>
      </motion.div>
    </div>
  );
};
