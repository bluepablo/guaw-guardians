import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Activity, Fingerprint, Lock } from 'lucide-react';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { SovereignGlyph } from '../../components/ui/SovereignGlyph';

// Product Data Configuration
const products = {
  presence: {
    title: "BIO-STOCHASTIC LAYER",
    subtitle: "Presence Verification",
    description: "Analyzes stochastic micro-signals to distinguish organic execution from synthetic automation. No puzzles, no friction.",
    glyph: "argus",
    features: [
      "Zero Friction Bio-Analysis",
      "No PII Collection / Privacy-First",
      "Bio-Stochastic Resonance",
      "Credential Stuffing Defense"
    ],
    technical: "Ex-Ante Proof [Complexity Audit]",
    color: "primary",
    hex: "#00FF94"
  },
  integrity: {
    title: "SOVEREIGN SHIELD",
    subtitle: "Data Assurance",
    description: "Guarantees execution integrity in critical systems. Protects payload against tampering during transit with cryptographic sealing.",
    glyph: "aegis",
    features: [
      "Man-in-the-Middle Immunization",
      "Replay Attack Vector Nullification",
      "Execution Environment Validation",
      "Hardened Coherence Checks"
    ],
    technical: "In-Flight Proof [Runtime Integrity]",
    color: "secondary",
    hex: "#06B6D4"
  },
  ledger: {
    title: "LAZARUS LEDGER",
    subtitle: "Forensic Proof",
    description: "Immutable cryptographic signatures for legal audit trails and compliance. Every validation is a verifiable block.",
    glyph: "ledger",
    features: [
      "Immutable Audit Trail",
      "Non-Repudiation Signatures",
      "Verifiable Credentials (VC)",
      "Post-Incident Forensic Data"
    ],
    technical: "Ex-Post Proof [Legal Validity]",
    color: "purple",
    hex: "#a855f7"
  }
};

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products[productId as keyof typeof products];

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-mono">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-2 border-red-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
            <Lock className="text-red-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">MODULE NOT FOUND</h1>
          <Link to="/" className="text-gray-500 hover:text-white transition-colors underline underline-offset-4">Return to Command Center</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-black relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none" />
      </div>
      
      {/* Navigation */}
      <nav className="p-6 border-b border-white/5 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-widest">
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
               <ArrowLeft size={16} />
            </div>
            <span>System Grid</span>
          </Link>
          <motion.div 
            className="flex items-center gap-2 opacity-50"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-mono text-emerald-500 uppercase">System Online</span>
          </motion.div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
        
          {/* Visual Column (Holographic Card) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
             {/* Background Glow */}
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent blur-3xl -z-10" style={{ 
                background: `radial-gradient(circle at 50% 50%, ${product.hex}20, transparent 70%)` 
             }} />

             <div className="relative p-10 rounded-[2rem] bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
                
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Fingerprint size={150} />
                </div>

                <div className="relative z-10 flex flex-col h-full min-h-[400px]">
                       <SovereignGlyph type={product.glyph as 'argus' | 'aegis' | 'ledger'} size={80} color={product.hex} />
                   
                   <div className="mt-12">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.hex }} />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">System Module</span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white leading-[0.9]">
                        {product.title.split(' ')[0]}<br />
                        <span style={{ color: product.hex }} className="opacity-90">{product.title.split(' ')[1]}</span>
                      </h1>
                      <div className="h-1 w-20 rounded-full mb-6" style={{ backgroundColor: product.hex }} />
                      
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-md">
                         <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Technical Classification</div>
                         <div className="font-mono text-sm text-gray-300 flex items-center gap-2">
                            <span className="text-primary">❯</span> {product.technical}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-12 pt-8"
          >
            <div>
               <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                 <Activity className="w-6 h-6 text-gray-500" />
                 Operational Overview
               </h2>
               <p className="text-xl text-gray-400 leading-relaxed font-light">
                 {product.description}
               </p>
            </div>

            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-4">
                  <span>Core Capabilities</span>
                  <div className="h-px flex-1 bg-white/10" />
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {product.features.map((feature, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/50 border border-white/10 group-hover:border-primary/50 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: product.hex }} />
                    </div>
                    <span className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex gap-4">
              <Link 
                to="/console/register"
                className="px-8 py-4 rounded-xl text-black font-black hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2"
                style={{ background: `linear-gradient(135deg, ${product.hex}, white)` }}
              >
                DEPLOY MODULE
              </Link>
              <Link 
                to="/docs"
                className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center justify-center"
              >
                Read Documentation
              </Link>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
};

