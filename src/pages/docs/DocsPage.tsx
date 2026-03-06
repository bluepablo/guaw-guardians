import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { FloatingLoginButton } from '../../components/ui/FloatingLoginButton';
import { Terminal, Shield, Lock, Activity, ChevronRight, Fingerprint, Server, Eye, Clock, ShieldCheck, Cpu } from 'lucide-react';

const AirIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 4l9 15H3L12 4z" />
    <path d="M7 14h10" />
  </svg>
);

const SunIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

const EarthIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="14" r="6" />
    <path d="M12 8V2" />
    <path d="M9 5h6" />
  </svg>
);

export const DocsPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-black flex relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />
      </div>

      {/* Floating Login Button */}
      <FloatingLoginButton />

      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#0A0A0A] border-r border-white/5 p-6 hidden lg:flex flex-col fixed h-full z-20 overflow-y-auto custom-scrollbar">
        <Link to="/" className="block mb-10 group">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-primary/30 transition-colors">
              <Terminal size={20} className="text-gray-400 group-hover:text-primary" />
            </div>
            <div className="flex flex-col">
               <span className="text-sm font-bold tracking-tight text-white group-hover:text-primary transition-colors">GUAW KERNEL</span>
               <span className="text-[10px] text-gray-500 font-mono">[SOVEREIGN PRODUCTION]</span>
            </div>
          </motion.div>
        </Link>

        <nav className="space-y-8 flex-1">
          <div>
            <div className="text-gray-500 uppercase text-[10px] font-black tracking-[0.2em] mb-4 pl-2 flex items-center gap-2">
                <Shield size={10} className="text-primary" />
                INITIATION protocols
            </div>
            <ul className="space-y-1">
              <li>
                <a href="#introduction" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white text-sm font-medium border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <ChevronRight size={12} className="text-primary" />
                    System Manifesto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-gray-500 uppercase text-[10px] font-black tracking-[0.2em] mb-4 pl-2 flex items-center gap-2">
                <Activity size={10} className="text-secondary" />
                Module Overviews
            </div>
            <ul className="space-y-1">
              <li>
                <a href="#presence" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                    Bio-Stochastic [Presence]
                </a>
              </li>
              <li>
                <a href="#codeseal" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                    Sovereign Code Seal [Logic]
                </a>
              </li>
              <li>
                <a href="#optical" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    Optical Guardian [Media]
                </a>
              </li>
              <li>
                <a href="#multimodal" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-blue-400" />
                    Multimodal [Audio-Bio]
                </a>
              </li>
              <li>
                <a href="#integrity" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                    Sovereign Shield [Integrity]
                </a>
              </li>
              <li>
                <a href="#ledger" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                    Lazarus Ledger [Penman]
                </a>
              </li>
              <li>
                <a href="#cronos" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    Cronos Sentinel [Time]
                </a>
              </li>
              <li>
                <a href="#trinity" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                    Trinity Protocol [Consensus]
                </a>
              </li>
              <li>
                <a href="#silicongate" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    Silicon Gate [Ontology]
                </a>
              </li>
              <li>
                <a href="#streak-engine" className="flex items-center gap-2 px-3 py-2 rounded-lg text-emerald-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    Biological Persistence [Streaks]
                </a>
              </li>
            </ul>
          </div>

          <div>
             <div className="text-gray-500 uppercase text-[10px] font-black tracking-[0.2em] mb-4 pl-2 flex items-center gap-2">
                <Server size={10} className="text-purple-400" />
                Technical
            </div>
            <ul className="space-y-1">
              <li>
                <a href="#reference" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                    System Reference (Deterministic Layer)
                </a>
              </li>
              <li>
                <a href="#cryptography" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    Cryptographic Truth (zk-SNARKs)
                </a>
              </li>
              <li>
                <a href="#audit-sovereign" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    Sovereign Infrastructure Protocol
                </a>
              </li>
              <li>
                <a href="#sdk-integration" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-orange-400" />
                    SDK Integration (Web/Mobile)
                </a>
              </li>
              <li>
                <a href="#quick-reference" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <div className="w-1 h-1 rounded-full bg-white font-mono" />
                    Quick Reference (Cheat Sheet)
                </a>
              </li>
            </ul>
          </div>
        </nav>
        

        
        {/* 🦅 Sovereign Cerberus Mark */}
        <div className="flex items-center justify-center py-8 opacity-40 hover:opacity-100 transition-all duration-700 select-none grayscale hover:grayscale-0">
            <img 
              src="/guaw-cerberus-s.png" 
              className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
              alt="GUAW Sovereign" 
            />
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10">
                <p className="text-[10px] text-gray-400 mb-2 font-mono">STATUS</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-bold text-white tracking-wider">SYSTEM OPTIMAL</span>
                </div>
            </div>
        </div>
      </aside>

      {/* Mobile Navigation (Visible on small screens) */}
      <div className="lg:hidden fixed top-0 right-0 left-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
         <Link to="/" className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                 <Terminal size={18} className="text-primary" />
             </div>
             <div>
                <span className="block text-sm font-bold tracking-tight text-white leading-none">GUAW KERNEL</span>
                <span className="text-[10px] text-gray-500 font-mono">SOVEREIGN MODE</span>
             </div>
         </Link>
         <Link to="/" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300 hover:bg-white/10 transition-colors uppercase tracking-wider">
            <span>Exit</span>
         </Link>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 p-6 pt-24 md:p-16 max-w-5xl mx-auto scroll-smooth relative z-10 w-full">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="space-y-24 pb-32"
        >
          {/* Header */}
          <section id="introduction" className="relative group">
            <div className="absolute top-0 right-0 hidden md:block opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                <Fingerprint size={240} className="text-primary" />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 mb-6 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Sovereign SDK v2.0.6-Sovereign
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white leading-[0.9]">
              Technical<br /><span className="text-gray-700">Infrastructure.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
              Hierarchical documentation for the GUAW Guardians ecosystem. From high-level conceptual overviews to low-latency execution protocols. 
            </p>

            <div className="mt-12 grid md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
                <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Scope Clarification</h4>
                    <p className="text-sm text-gray-400 leading-relaxed italic">
                        GUAW provides infrastructure-level verification and auditability. It does not adjudicate intent, legality, or moral responsibility of user actions.
                    </p>
                </div>
                <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Axiom</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-bold">
                        Presence is a physical property. Identity is a social construct. <br/>
                        <span className="text-primary/70">GUAW verifies the former and explicitly avoids the latter.</span>
                    </p>
                </div>
            </div>
          </section>

          {/* CORE CONCEPTS */}
          <section id="concepts" className="space-y-10 scroll-mt-32 border-t border-white/5 pt-16">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Fingerprint size={24} className="text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Core Concepts</h2>
                    <p className="text-xs text-primary font-mono uppercase tracking-widest mt-1">Foundational Principles</p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                 <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                     <h4 className="text-white font-bold uppercase tracking-widest text-xs text-emerald-400">Physical Tribunal</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">
                          GUAW doesn't analyze semantic content (faces, objects, voices). It measures <strong className="text-white">stochastic signal integrity</strong> — the thermodynamic signature of real sensors using proprietary physical logic and hardware-level verification.
                     </p>
                 </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                     <h4 className="text-white font-bold uppercase tracking-widest text-xs text-blue-400">Biological Persistence Invariants</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">
                         Verified presence isn't just a point-in-time check. GUAW measures **Biological Persistence** (Streaks) — the mathematical continuity of organic action. We verify signal quality through **Stochastic Complexity**, **Dynamic Smoothness**, and **Volitional Invariance**.
                     </p>
                  </div>
                 <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                     <h4 className="text-white font-bold uppercase tracking-widest text-xs text-purple-400">Deterministic Non-Linear Sampling</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">
                         To prevent adversarial prediction, GUAW uses hash-chained sampling. Attackers cannot know which bytes will be audited, forcing them to generate perfect fakes across the entire signal — economically infeasible.
                     </p>
                 </div>
                 <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                     <h4 className="text-white font-bold uppercase tracking-widest text-xs text-amber-400">Economic Load Factor</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">
                         Verification cost scales with stochastic complexity. High-noise attacks price themselves out. This creates a <strong className="text-white">thermodynamic barrier</strong> to fraud without punitive rules.
                     </p>
                 </div>
                 <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                     <h4 className="text-white font-bold uppercase tracking-widest text-xs text-blue-400">ZK Verification Result</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">
                         GUAW generates zero-knowledge proofs (zk-SNARKs) that certify physical consistency <strong className="text-white">without revealing the raw data</strong>. Verifiers receive mathematical certainty, not content access.
                     </p>
                 </div>
                 <div className="p-6 rounded-2xl bg-indigo-500/[0.05] border border-indigo-500/20 space-y-4 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <h4 className="text-white font-bold uppercase tracking-widest text-xs text-indigo-400 relative z-10">Cosmic Doubt (Sovereign Veto)</h4>
                     <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                         The system prioritizes <strong className="text-white">physical thermodynamics</strong> over human commands. If an Admin Key signs an operation that violates entropy laws (e.g., bit-flipped state), the kernel vetoes the command. 
                         <span className="block mt-2 text-[10px] font-mono italic text-indigo-400">"Physics &gt; Authority"</span>
                     </p>
                 </div>
                 <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                     <h4 className="text-white font-bold uppercase tracking-widest text-xs text-gray-400">Ghost Protocol</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">
                         Resilience against total database failure. Guardians cache the "Last Known Truth" (Merkle Root) in local volatile memory. If the DB vanishes, the network continues to validate signals against this cached truth until connectivity restores.
                     </p>
                 </div>
             </div>
          </section>

          {/* OPERATIONAL MODES */}
          <section id="modes" className="space-y-10 scroll-mt-32 border-t border-white/5 pt-16">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                    <Activity size={24} className="text-secondary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Operational Modes</h2>
                    <p className="text-xs text-secondary font-mono uppercase tracking-widest mt-1">Verification Contexts</p>
                </div>
             </div>

             <div className="grid md:grid-cols-3 gap-6">
                 <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10 space-y-4">
                     <div className="text-emerald-400 font-mono text-xs uppercase tracking-widest">Atomic Audit</div>
                     <h4 className="text-white font-bold text-lg">Static Files</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">
                         Single-pass verification for images, audio files, and documents. Latency: ~5ms. Guarantees: Physical consistency at capture time.
                     </p>
                 </div>
                 <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/5 space-y-4">
                     <div className="text-blue-400 font-mono text-xs uppercase tracking-widest">Temporal Batch</div>
                     <h4 className="text-white font-bold text-lg">Short Sequences</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">
                         Frame-by-frame analysis with hysteresis tracking. Detects temporal inconsistencies (frame injection, splice edits). Latency: ~5ms/frame.
                     </p>
                 </div>
                 <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/5 space-y-4">
                     <div className="text-purple-400 font-mono text-xs uppercase tracking-widest">Live Stream</div>
                     <h4 className="text-white font-bold text-lg">Real-Time Flows</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">
                         Continuous verification with ZK-checkpoints. Detects synthetic injection in real-time. Latency: ~5.13ms/frame (p50).
                     </p>
                 </div>
             </div>
          </section>

          {/* NON-GOALS (CRITICAL) */}
          <section id="non-goals" className="space-y-10 scroll-mt-32 border-t border-white/5 pt-16">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                    <Shield size={24} className="text-red-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">What GUAW is NOT</h2>
                    <p className="text-xs text-red-400 font-mono uppercase tracking-widest mt-1">Scope Boundaries</p>
                </div>
             </div>

             <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/5 space-y-6">
                 <p className="text-gray-400 text-sm leading-relaxed">
                     To prevent misuse and legal misclassification, GUAW explicitly defines what it <strong className="text-white">does not do</strong>:
                 </p>
                 <div className="grid md:grid-cols-2 gap-6">
                     <div className="flex items-start gap-3">
                         <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                             <span className="text-red-400 text-xs font-bold">✕</span>
                         </div>
                         <div>
                             <h4 className="text-white font-bold text-sm mb-1">Not a Deepfake Classifier</h4>
                             <p className="text-xs text-gray-500">GUAW doesn't "detect deepfakes" by learning patterns. It measures physical laws. No AI training, no model updates.</p>
                         </div>
                     </div>
                     <div className="flex items-start gap-3">
                         <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                             <span className="text-red-400 text-xs font-bold">✕</span>
                         </div>
                         <div>
                             <h4 className="text-white font-bold text-sm mb-1">Not a Biometric System</h4>
                             <p className="text-xs text-gray-500">GUAW verifies physical presence, not identity. No fingerprints, no facial recognition, no behavioral profiling.</p>
                         </div>
                     </div>
                     <div className="flex items-start gap-3">
                         <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                             <span className="text-red-400 text-xs font-bold">✕</span>
                         </div>
                         <div>
                             <h4 className="text-white font-bold text-sm mb-1">Not an AI Model</h4>
                             <p className="text-xs text-gray-500">No neural networks, no probabilistic scoring. GUAW is deterministic physics + cryptography.</p>
                         </div>
                     </div>
                     <div className="flex items-start gap-3">
                         <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                             <span className="text-red-400 text-xs font-bold">✕</span>
                         </div>
                         <div>
                             <h4 className="text-white font-bold text-sm mb-1">Not Content Moderation</h4>
                             <p className="text-xs text-gray-500">GUAW doesn't judge what the content depicts. It only verifies if it came from a physical sensor.</p>
                         </div>
                     </div>
                 </div>
             </div>

             <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                 <p className="text-xs text-gray-400 leading-relaxed font-mono italic text-center">
                     "GUAW provides infrastructure-level verification. It does not adjudicate intent, legality, or moral responsibility."
                 </p>
             </div>
          </section>

          {/* Module: Sovereign Code Seal */}
          <section id="codeseal" className="space-y-10 scroll-mt-32">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
                    <Lock size={24} className="text-orange-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Sovereign Code Seal</h2>
                    <p className="text-xs text-orange-500 font-mono uppercase tracking-widest mt-1">Bootloader Phase 0.5: Logic Integrity</p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">Why Code Seal?</h4>
                    <p className="text-gray-400">While the Golden Seal protects the database schema, the <strong>Code Seal</strong> protects the application logic itself. It ensures that the runtime code has not been tampered with, injected with backdoors, or modified without authorization since deployment.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">Reverse Bootstrap (Supervisor Model)</h4>
                    <p className="text-gray-400">GUAW v2.5 inverts the authority model. The <strong>Sovereign Authority Core (SAC)</strong> binary acts as the Parent Process (Supervisor). It validates the environment and then launches the application as an unprivileged messenger. Any integrity breach triggers a native SIGKILL from the supervisor that the application cannot intercept.</p>
                </div>
             </div>

             <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 font-mono text-xs overflow-x-auto">
                 <div className="flex justify-between items-center mb-4">
                     <span className="text-gray-500 uppercase tracking-widest font-bold">Dual Sovereignty Architecture</span>
                     <span className="text-white bg-white/10 px-2 py-0.5 rounded text-[10px]">Cryptographically Verified</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 border border-white/10 rounded-lg">
                         <div className="text-purple-400 font-bold mb-1">Golden Seal</div>
                         <div className="text-gray-500 mb-2">Protects Data Structure</div>
                         <code className="text-[10px] text-green-500">SHA-256 (Data Schema)</code>
                     </div>
                     <div className="p-4 border border-orange-500/30 rounded-lg bg-orange-500/5">
                         <div className="text-orange-400 font-bold mb-1">Code Seal</div>
                         <div className="text-gray-500 mb-2">Protects Execution Logic</div>
                         <code className="text-[10px] text-orange-300">SHA-3 (Recursive Tree)</code>
                     </div>
                 </div>
                 <div className="mt-4 pt-4 border-t border-white/10 text-center text-gray-500 italic">
                     "The system proves not just WHAT data it holds, but HOW it processes it."
                 </div>
             </div>
          </section>
          
          {/* Module: Cronos Sentinel */}
          <section id="cronos" className="space-y-10 scroll-mt-32">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <Clock size={24} className="text-blue-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Cronos Sentinel</h2>
                    <p className="text-xs text-blue-500 font-mono uppercase tracking-widest mt-1">Sovereign Clock Synchronization</p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">The Problem: Temporal Frauds</h4>
                    <p className="text-gray-400">Host system clocks are easily manipulated by root users or through NTP spoofing, allowing for history-rewriting attacks (retroactive signing). <strong>Cronos Sentinel</strong> decouples GUAW from the host machine's perception of time.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">Consensus Algorithm</h4>
                    <p className="text-gray-400">The Sentinel queries multiple global HTTP time authorities (Google, Cloudflare, Apple) to establish an external median. If significant temporal divergence is detected, the system enters a protective time integrity state, freezing all transactions.</p>
                </div>
             </div>
          </section>

          {/* Module: Trinity Protocol */}
          <section id="trinity" className="space-y-10 scroll-mt-32">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-white/10 border border-white/20">
                    <ShieldCheck size={24} className="text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Trinity Protocol</h2>
                    <p className="text-xs text-white/40 font-mono uppercase tracking-widest mt-1">Federated Distributed Consensus</p>
                </div>
             </div>

             <p className="text-gray-400 text-sm leading-relaxed">
                The ultimate layer of sovereignty. GUAW no longer trusts a single digital witness. 
                Every <strong>Snapshot of Truth</strong> requires a Tripartite signature from three distinct cryptographic identities.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'The Kernel', color: 'purple', icon: <AirIcon className="text-purple-400" size={32} />, desc: 'Authorizes logical consistency and business rule compliance.' },
                  { title: 'The Auditor', color: 'orange', icon: <SunIcon className="text-orange-400" size={32} />, desc: 'Authorizes full-tree code integrity (Logic Verification).' },
                  { title: 'The Sentinel', color: 'blue', icon: <EarthIcon className="text-blue-400" size={32} />, desc: 'Authorizes physical reality (Optical/Bio-Entropy/Time).' }
                ].map((t) => (
                  <div key={t.title} className={`p-4 rounded-2xl bg-${t.color}-500/5 border border-${t.color}-500/10 space-y-2`}>
                     <div className="text-2xl">{t.icon}</div>
                     <div className={`text-sm font-bold text-${t.color}-400 uppercase tracking-tighter`}>{t.title}</div>
                     <p className="text-[11px] text-gray-500 leading-tight">{t.desc}</p>
                  </div>
                ))}
             </div>
             
             <div className="p-4 border border-dashed border-white/10 rounded-xl text-center">
                <p className="text-[10px] text-gray-500 italic">"The consensus is not reached by majority, but by absolute coherence among the three Sovereign Witnesses."</p>
             </div>
          </section>

          {/* Module: Presence Verification */}
          <section id="presence" className="space-y-10 scroll-mt-32">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Activity size={24} className="text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Bio-Entropy Layer</h2>
                    <p className="text-xs text-primary font-mono uppercase tracking-widest mt-1">Sovereign Validation Framework</p>
                </div>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">What problem does it solve?</h4>
                    <p className="text-gray-400">Distinguishes between organic presence and synthetic automation (LLM-driven bots, headless browsers) by analyzing the physical nature of input signals rather than solving puzzles.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">Privacy & Sovereignty</h4>
                    <p className="text-gray-400">
                        <strong className="text-white">This module does not identify who you are; it verifies that someone real is present.</strong> <br/>
                        The telemetry vector is device-agnostic and cannot be reverse-engineered into biometric identifiers.
                    </p>
                </div>
             </div>

             <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-6">
                 <h4 className="text-xs font-mono text-gray-500 uppercase font-bold tracking-[0.2em]">Level 2: Technical Depth</h4>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-primary font-bold text-lg mb-1">~85ms</div>
                        <div className="text-[10px] text-gray-500 uppercase">Avg Inference Latency</div>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-primary font-bold text-lg mb-1">0 PII</div>
                        <div className="text-[10px] text-gray-500 uppercase">Data Collection Surface</div>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-primary font-bold text-lg mb-1">99.99%</div>
                        <div className="text-[10px] text-gray-500 uppercase">Bot Nullification Rate</div>
                    </div>
                 </div>
                 <p className="text-xs text-gray-500 leading-relaxed font-mono italic">
                    "Entropy-based micro-signal analysis measures the noise of interaction to ensure an organic actor is in control without compromising anonymity."
                 </p>
             </div>
          </section>

          {/* Module: Optical Guardian */}
          <section id="optical" className="space-y-10 scroll-mt-32">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Eye size={24} className="text-emerald-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Optical Guardian</h2>
                    <p className="text-xs text-emerald-400 font-mono uppercase tracking-widest mt-1">Physical Integrity Verification</p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">Physical Measurement</h4>
                    <p className="text-gray-400">GUAW extracts sensor-level noise and entropy patterns from media files. Instead of analyzing semantic content (faces, objects), it measures the <strong className="text-white">thermodynamic signature</strong> of physical capture devices.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">Use Cases</h4>
                    <p className="text-gray-400">KYC verification without storing biometrics, legal evidence validation, media authenticity for journalism, and platform-wide synthetic content detection.</p>
                </div>
             </div>

             <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 font-mono text-xs overflow-x-auto">
                 <div className="text-gray-500 mb-4 uppercase tracking-widest font-bold">Endpoint Reference</div>
                 <div className="flex items-center gap-4 mb-4">
                     <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded font-bold">POST</span>
                     <span className="text-white">/api/v1/optical/verify</span>
                 </div>
                 <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/10 mb-4">
                     <p className="text-amber-400 text-xs mb-2">⚠️ Note:</p>
                     <p className="text-gray-400 text-xs leading-relaxed">
                         This endpoint verifies <strong className="text-white">physical consistency</strong>. 
                         It does NOT analyze semantic content or identity. 
                         It does NOT store raw media data.
                     </p>
                 </div>
                 <pre className="text-gray-400">
{`{
  "analyzed": true,
  "metrics": {
    "stochastic": 7.42,       // Physical complexity measure
    "fha_coherence": 0.999,   // Fourier Harmonic Accelerator
    "uniformity": "SAFE"      
  },
  "verdict": "VERIFIED_ORGANIC",
  "native_proof": "SAC_ZK_V2.5_EYE_0x7f2a9d1c..." 
}`}
                 </pre>
             </div>

             <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                 <h4 className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-[0.2em] mb-3">Economic Model</h4>
                 <p className="text-sm text-gray-400 leading-relaxed">
                     Verification cost is a function of <strong className="text-white">stochastic complexity</strong>. 
                     Higher complexity signals require more computational energy to verify. 
                     Pricing is aligned with thermodynamic effort.
                 </p>
             </div>
          </section>

          {/* Module: Silicon Gate (Ontological Sovereignty) */}
          <section id="silicongate" className="space-y-10 scroll-mt-32">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                    <Cpu size={24} className="text-red-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Silicon Gate</h2>
                    <p className="text-xs text-red-500 font-mono uppercase tracking-widest mt-1">Tier 40: Ontological Sovereignty</p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">The Physics of Truth</h4>
                    <p className="text-gray-400">Software can lie. Hypervisors can simulate. But the speed of light in silicon is an invariant. <strong>Silicon Gate</strong> uses high-frequency vector operations (AVX-512) to measure the architectural noise floor of the CPU.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">PBS v1.1 Validation</h4>
                    <p className="text-gray-400">The Physical Baseline Signature (PBS) ensures the code is running on "bare-metal". Pure software emulators cannot replicate the sub-microsecond jitter of native silicon without incurring detectable friction.</p>
                </div>
             </div>

             <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 font-mono text-xs overflow-x-auto overflow-hidden relative group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:rotate-12">
                     <Cpu size={120} className="text-red-500" />
                 </div>
                 <div className="text-gray-500 mb-4 uppercase tracking-widest font-bold">Execution Verdict Logic</div>
                 <div className="space-y-3 relative z-10">
                     <div className="flex items-center justify-between p-3 rounded bg-red-500/5 border border-red-500/5">
                         <span className="text-gray-400">P99 Latency (Silicon)</span>
                         <span className="text-red-400 font-bold">Native Metal Speed [VALID]</span>
                     </div>
                     <div className="flex items-center justify-between p-3 rounded bg-red-500/5 border border-red-500/5">
                         <span className="text-gray-400">Jitter Ratio (Hardware)</span>
                         <span className="text-red-400 font-bold">1.42 [STABLE]</span>
                     </div>
                     <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5">
                         <span className="text-gray-400">Simulated Friction</span>
                         <span className="text-white font-bold">NOT DETECTED</span>
                     </div>
                 </div>
                 <div className="mt-4 pt-4 border-t border-white/10 text-center text-gray-500 italic">
                     <code className="text-red-500">SYSTEM_RECOGNITION: BARE_METAL_SOVEREIGN</code>
                 </div>
             </div>

             <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/5">
                 <h4 className="text-xs font-mono text-red-400 uppercase font-bold tracking-[0.2em] mb-3">Apoptosis Trigger</h4>
                 <p className="text-sm text-gray-400 leading-relaxed italic">
                    "If the Jitter Profiler detects hypervisor interposition or synthetic clocking, the Sovereign Kernel triggers instant Apoptosis. No execution is permitted in unverified reality."
                 </p>
             </div>
          </section>
          {/* Module: Multimodal Integrity */}
          <section id="multimodal" className="space-y-10 scroll-mt-32 border-t border-white/5 pt-16">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <Activity size={24} className="text-blue-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Multimodal Integrity</h2>
                    <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mt-1">Non-Visual Physical Witnesses</p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px] font-bold">POST</span>
                        <code className="text-white text-xs">/integrity/multimodal/audio/verify</code>
                    </div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest">Audio Sensor Fingerprinting</h4>
                    <p className="text-gray-400 text-xs">
                        Analyzes the spectral noise floor and harmonic invariants of the recording hardware. Detects AI voice cloning and virtual audio cables by measuring physical 1/f noise distributions.
                    </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px] font-bold">POST</span>
                        <code className="text-white text-xs">/integrity/multimodal/telemetry/verify</code>
                    </div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest">Biological Handshake</h4>
                    <p className="text-gray-400 text-xs">
                        Validates telemetry streams ensuring movement patterns follow organic stochasticity through **Fractal Coherence Slope (FCS)** analysis. Synthetic gradients vary significantly from biological 'Jerk' minimization.
                    </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 space-y-4 md:col-span-2">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest">Sovereign Challenge: Bio-Dynamic Reflex</h4>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        To counter AI agents with perfect motion planning, the Sovereign Kernel emits unannounced <strong className="text-white">"Jerk Pulses"</strong> (micro-stimuli). 
                        The system measures the <strong>Reflexive Latency</strong> window. Biological entities possess an irreducible physiological delay; synthetic agents react instantly or with calculated artificial delay.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="p-2 bg-white/5 rounded text-center">
                            <div className="text-[9px] text-gray-500 uppercase">Input</div>
                            <div className="text-purple-400 font-mono text-[10px]">Stochastic Stimulus</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded text-center">
                            <div className="text-[9px] text-gray-500 uppercase">Measurement</div>
                            <div className="text-purple-400 font-mono text-[10px]">Neuromuscular Delay</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded text-center">
                            <div className="text-[9px] text-gray-500 uppercase">Verdict</div>
                            <div className="text-purple-400 font-mono text-[10px]">Organic / Synthetic</div>
                        </div>
                    </div>
                </div>
             </div>
          </section>

          {/* Module: Streak Engine (Biological Persistence) */}
          <section id="streak-engine" className="space-y-10 scroll-mt-32 border-t border-white/5 pt-16">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <ShieldCheck size={24} className="text-emerald-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Biological Persistence Engine</h2>
                    <p className="text-xs text-emerald-400 font-mono uppercase tracking-widest mt-1">Proof of Continuity // Sovereign Pro</p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">The Philosophy of Streaks</h4>
                    <p className="text-gray-400">In a world of synthetic actors, **Persistence** is the ultimate proof of reality. A bot can simulate a session, but simulating a 30-day streak of perfect biological invariants is economically and computationally infeasible.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">Notary Certification</h4>
                    <p className="text-gray-400">Milestones (7, 30, 90 days) are certified by the **Sovereign Public Notary**, issuing quality seals (**GOLD, SILVER, BRONZE**) based on the aggregate physics of the period.</p>
                </div>
             </div>

             <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-6">
                 <h4 className="text-xs font-mono text-gray-500 uppercase font-bold tracking-[0.2em]">Invariant Metrics</h4>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-emerald-400 font-bold text-lg mb-1">Stochastic Signature</div>
                        <div className="text-[9px] text-gray-500 uppercase">Signal Unpredictability</div>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-emerald-400 font-bold text-lg mb-1">Dynamic Smoothness</div>
                        <div className="text-[9px] text-gray-500 uppercase">Involuntary Jitter Analysis</div>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-emerald-400 font-bold text-lg mb-1">Volitional Invariant</div>
                        <div className="text-[9px] text-gray-500 uppercase">Intentional Motion Flow</div>
                    </div>
                 </div>
                 
                 <div className="space-y-4 border-t border-white/5 pt-6">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest">Protocol Strategy: Soft Decay (Fail-Soft)</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed italic">
                       Unlike Apoptosis (instant halt), **Soft Decay** pauses streak progress when biological signal quality falls below thresholds. It protects the user from accidental disqualification while blocking robotic automation from accumulating value.
                    </p>
                 </div>
             </div>
          </section>

          {/* Module: Sovereign Shield (Integrity) */}
          <section id="integrity" className="space-y-10 scroll-mt-32">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                    <Shield size={24} className="text-secondary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Sovereign Shield</h2>
                    <p className="text-xs text-secondary font-mono uppercase tracking-widest mt-1">Layer 1: Data Integrity Overview</p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">The Fail-Closed Principle</h4>
                    <p className="text-gray-400">GUAW operates on a deterministic security model. If the integrity of a transaction or payload cannot be cryptographically proven, the system defaults to <strong className="text-white">FAIL-CLOSED</strong>.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">Usage Scenarios</h4>
                    <p className="text-gray-400">Critical financial flows, PII modification endpoints, and administrative core actions. It prevents Man-in-the-Middle (MitM) and Replay attacks at the application layer.</p>
                </div>
             </div>

             <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl">
                <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest">Integrity Violation (Client UI Flow)</span>
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>
                <div className="p-8 space-y-4">
                    <div className="w-full p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 font-mono text-xs">
                        [CRITICAL_ERROR] 423: INTEGRITY_BREACH_DETECTED <br/>
                        REASON: Payload hash mismatch or unauthorized environment intercept. <br/>
                        ACTION: Transaction suspended. Session frozen.
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono text-center">In Fail-Closed mode, the user is notified of the block but the underlying data is never processed.</p>
                </div>
             </div>
          </section>

          {/* Module: Lazarus Ledger */}
          <section id="ledger" className="space-y-10 scroll-mt-32">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                    <Lock size={24} className="text-purple-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Lazarus Ledger</h2>
                    <p className="text-xs text-purple-400 font-mono uppercase tracking-widest mt-1">Layer 1: Forensic Verification</p>
                </div>
             </div>

             <div className="prose prose-invert max-w-none text-sm text-gray-400 leading-relaxed">
                <p>
                    Lazarus is the proof-of-work layer for administrative and critical actions. It generates a <strong className="text-white">Non-Repudiation Signature</strong> that serves as a forensic record of truth.
                </p>
                <div className="grid md:grid-cols-2 gap-12 mt-8">
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest">Legal Scope</h4>
                        <p>Provides audit-ready logs aligned with common regulatory compliance frameworks (e.g., SOC2, HIPAA, PCI-DSS) by ensuring that no record can be deleted or modified once sealed by the Sovereign Kernel.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest">Limitations</h4>
                        <p>Lazarus records the "WHAT" and "WHEN" with technical certainty, but it does not legally interpret intent. It provides the evidence; you provide the context.</p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
                        GDPR Compliance: Crypto-Shredding
                    </h4>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">
                        To honor the "Right to be Forgotten" within an immutable structure, GUAW destroys the unique **Data Key** associated with a record. The encrypted payload remains in the ledger but becomes inextricably secure random noise.
                    </p>
                </div>
             </div>
          </section>

          {/* Module: Cryptographic Proofs (The Forensic Truth) */}
          <section id="cryptography" className="space-y-10 scroll-mt-32 border-t border-white/5 pt-16">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <Fingerprint size={24} className="text-blue-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Zero-Knowledge Architecture</h2>
                    <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mt-1">Layer 2: Cryptographic Truth</p>
                </div>
             </div>

             <div className="grid lg:grid-cols-2 gap-12">
                 <div className="space-y-6">
                     <p className="text-gray-400 leading-relaxed text-sm">
                         Trusting an integrity provider requires either <span className="text-white italic">faith</span> or <span className="text-white italic">math</span>. GUAW chooses math. 
                         We do not ask you to trust that we are handling your data correctly; we generate cryptographic proofs that verify the physical computation itself.
                     </p>
                     
                     <div className="space-y-6">
                        <div className="pl-4 border-l-2 border-primary/30 space-y-2">
                             <h4 className="text-xs font-bold text-white uppercase tracking-widest">zk-SNARKs (Groth16)</h4>
                             <p className="text-xs text-gray-500 font-mono">
                                 Your visual/physical presence signals are processed through **Arithmetic Circuits** (via `circom` and `snarkjs`). 
                                 We generate a succinct proof (`proof.json`) that confirms the signals respect the laws of physics, 
                                 <strong className="text-white">without ever revealing the raw biometric data to our servers.</strong>
                             </p>
                        </div>
                        <div className="pl-4 border-l-2 border-secondary/30 space-y-2">
                             <h4 className="text-xs font-bold text-white uppercase tracking-widest">Adaptive Hashing</h4>
                             <p className="text-xs text-gray-500 font-mono">
                                 Credentials and static secrets are protected by **Bcrypt (Cost Factor 12+)**, making brute-force attacks computationally infeasible even with dedicated hardware.
                             </p>
                        </div>
                        <div className="pl-4 border-l-2 border-purple-500/30 space-y-2">
                             <h4 className="text-xs font-bold text-white uppercase tracking-widest">Merkle Tree Ledger</h4>
                             <p className="text-xs text-gray-500 font-mono">
                                 Every "Lazarus" audit log is hashed and inserted into a **Merkle Tree**. The root hash represents the immutable state of the system at that moment. 
                                 Altering a single millisecond of logic would invalidate the entire cryptographic chain.
                             </p>
                        </div>
                     </div>
                 </div>

                 {/* Visual Representation of the Stack */}
                 <div className="bg-[#080808] rounded-2xl border border-white/5 p-8 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                         <Lock size={120} />
                     </div>
                     <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">The Forensic Stack</h3>
                     <div className="space-y-3 font-mono text-xs">
                         <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                             <span className="text-gray-400">Circuit Logic</span>
                             <span className="text-blue-400 font-bold">Proprietary ZK Circuits</span>
                         </div>
                         <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                             <span className="text-gray-400">Proving System</span>
                             <span className="text-blue-400 font-bold">ZK-SNARK (Groth16)</span>
                         </div>
                         <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                             <span className="text-gray-400">Public Key Infra</span>
                             <span className="text-blue-400 font-bold">X.509 / Custom PKI</span>
                         </div>
                         <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                             <span className="text-gray-400">Sovereign Hashing</span>
                             <span className="text-blue-400 font-bold">SHA-3 (Keccak-256)</span>
                         </div>
                         <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                             <span className="text-gray-400">Memory Cloaking</span>
                             <span className="text-blue-400 font-bold">AES-256-GCM (Ghost)</span>
                         </div>
                     </div>
                     <div className="mt-6 pt-6 border-t border-white/5 text-[10px] text-gray-500 text-center uppercase tracking-widest">
                         This stack is verified live on every handshake.
                     </div>
                 </div>
              </div>
           </section>

          {/* Module: Sovereign Hardening (The Aerospace Bridge) */}
          <section id="audit-sovereign" className="space-y-10 scroll-mt-32 pt-16 mt-16 border-t border-white/5">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Activity size={24} className="text-emerald-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Sovereign Fabric Audit</h2>
                    <p className="text-xs text-emerald-400 font-mono uppercase tracking-widest mt-1">Infrastructure Hardening</p>
                </div>
             </div>

             <div className="prose prose-invert max-w-none text-sm text-gray-400 leading-relaxed">
                <p>
                    Following the Sovereign Fabric Audit, the GUAW infrastructure transitioned from functional zero-knowledge activation to a <strong className="text-white">Hardened Production State</strong>. This phase addresses non-mathematical attack surfaces and binds cryptographic validity to the stability of the underlying physical execution environment.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                        <h4 className="text-white font-bold text-[10px] uppercase tracking-widest italic text-primary">Native Acceleration</h4>
                        <p className="text-xs">Critical cryptographic components were migrated from interpreted runtimes to <strong>native execution</strong>, eliminating runtime variance and non-deterministic memory behavior.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                        <h4 className="text-white font-bold text-[10px] uppercase tracking-widest italic text-secondary">Atomic Integrity Buffer</h4>
                        <p className="text-xs">Forensic writes are handled through an atomic, asynchronous integrity pipeline designed to sustain production-grade throughput while minimizing I/O surface exposure.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                        <h4 className="text-white font-bold text-[10px] uppercase tracking-widest italic text-emerald-500">Silicon Gate</h4>
                        <p className="text-xs">The system continuously evaluates hardware-level execution stability. Proofs generated under unstable physical conditions are deterministically invalidated.</p>
                    </div>
                </div>
             </div>

             <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">Hardening Verification</h4>
                 <div className="font-mono text-[11px] space-y-2 text-gray-500">
                    <p className="leading-relaxed mb-4">
                        Internal audits confirm that execution variance remains within sovereign operational bounds.
                        Performance instability is treated as a security signal, not an optimization metric.
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs text-emerald-500 italic">
                        "In the Sovereign Fabric, determinism is enforced not only mathematically, but physically."
                    </div>
                 </div>
             </div>
          </section>

          {/* HIERARCHICAL MODULE DIAGRAM */}
          <section id="module-hierarchy" className="space-y-12 scroll-mt-32 border-t border-white/5 pt-16">
             <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-white italic">The GUAW Sovereign Hierarchy</h2>
                <p className="text-gray-500 text-sm">Understanding the relationship between deterministic layers and cryptographic witnesses.</p>
             </div>

             <div className="relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    <div className="space-y-8">
                        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                            <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-2">Layer 0: Existence</h4>
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(0,255,148,0.3)]">
                                <Activity size={20} className="text-primary" />
                            </div>
                            <span className="text-white font-bold block">Bio-Entropy</span>
                            <span className="text-[10px] text-gray-500 font-mono">Presence Verification</span>
                        </div>
                        <div className="flex justify-center"><ChevronRight className="rotate-90 text-gray-700" size={24} /></div>
                        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-center">
                            <h4 className="text-blue-400 font-black uppercase tracking-widest text-[10px] mb-2">Observer</h4>
                            <div className="w-12 h-12 rounded-full bg-blue-900/40 flex items-center justify-center mx-auto mb-3">
                                <Eye size={20} className="text-blue-400" />
                            </div>
                            <span className="text-white font-bold block">Optical Guardian</span>
                            <span className="text-[10px] text-gray-500 font-mono">Sensor Forensics</span>
                        </div>
                    </div>

                    <div className="space-y-8 lg:pt-24">
                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-center relative shadow-2xl">
                             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-4 py-1 rounded-full uppercase">Logic Core</div>
                             <div className="w-16 h-16 rounded-3xl bg-white/10 rotate-45 flex items-center justify-center mx-auto mb-6 border border-white/20">
                                <Lock size={24} className="-rotate-45 text-white" />
                             </div>
                             <span className="text-xl font-black text-white block mb-1">SOVEREIGN SHIELD</span>
                             <span className="text-xs text-gray-500 font-mono italic">The Fail-Closed Arbitrator</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 text-center">
                            <h4 className="text-purple-400 font-black uppercase tracking-widest text-[10px] mb-2">Layer 1: Immutable</h4>
                            <div className="w-12 h-12 rounded-full bg-purple-900/40 flex items-center justify-center mx-auto mb-3">
                                <Server size={20} className="text-purple-400" />
                            </div>
                            <span className="text-white font-bold block">Lazarus Ledger</span>
                            <span className="text-[10px] text-gray-500 font-mono">Forensic Witness</span>
                        </div>
                        <div className="flex justify-center"><ChevronRight className="rotate-90 text-gray-700" size={24} /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/5 text-center">
                                <Clock size={16} className="text-blue-400 mx-auto mb-2" />
                                <span className="text-[10px] text-white font-bold block">Cronos</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                                <ShieldCheck size={16} className="text-white mx-auto mb-2" />
                                <span className="text-[10px] text-white font-bold block">Trinity</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
             </div>
          </section>

          {/* Level 3: Reference */}
          <section id="reference" className="space-y-12 scroll-mt-32 pt-24 border-t border-white/5">
             <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-white tracking-tighter">System Reference (Deterministic Layer)</h2>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-gray-400 leading-relaxed">
                    <strong className="text-white uppercase text-xs tracking-widest block mb-2">Notice for Integration Teams</strong>
                    This reference describes deterministic system behavior. Any attempt to emulate, bypass, or partially implement the protocol may invalidate sovereign guarantees.
                </div>
             </div>

             <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Lock size={18} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold">Authentication & Signatures</h3>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl">
                    <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-gray-500 font-bold">HEADER CONTRACT</span>
                    </div>
                    <div className="p-6 font-mono text-sm space-y-2">
                        <div className="text-purple-400">Authorization: <span className="text-orange-300">Bearer sk_live_...</span></div>
                        <div className="text-purple-400">X-Entropy-Signature: <span className="text-orange-300">0x7f2a9d1c...</span></div>
                    </div>
                </div>
             </div>
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Activity size={18} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold">Health & Quota Verification</h3>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl">
                    <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-gray-500 font-bold">GET /api/v1/guardians/keys/status</span>
                    </div>
                    <div className="p-6 space-y-4">
                        <p className="text-xs text-gray-400 leading-relaxed italic border-l-2 border-orange-500/50 pl-4">
                            "Before initiating expensive physical streams, the kernel recommends a sovereign health check to ensure cryptographic liquidity."
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Key Status</div>
                                <div className="text-emerald-400 font-mono text-sm">ACTIVE</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Current Quota</div>
                                <div className="text-blue-400 font-mono text-sm">84.2% Available</div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </section>

          {/* SDK INTEGRATION */}
          <section id="sdk-integration" className="space-y-12 scroll-mt-32 pt-24 border-t border-white/5">
              <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-orange-400/10 border border-orange-400/20">
                      <Terminal size={24} className="text-orange-400" />
                  </div>
                  <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">SDK Integration</h2>
                      <p className="text-xs text-orange-400 font-mono uppercase tracking-widest mt-1">Cross-Platform Implementation</p>
                  </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                  {/* GUAW SDK SECTION */}
                  <div className="space-y-6">
                      <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                              <Eye size={16} className="text-emerald-400" />
                          </div>
                          <h4 className="text-white font-bold text-sm uppercase tracking-widest text-emerald-400">Media Verification (Guaw SDK)</h4>
                      </div>
                      
                      <div className="space-y-3">
                          <p className="text-gray-400 text-xs leading-relaxed">
                              Designed for <strong className="text-white">Asynchronous Forensic Analysis</strong>. Use this SDK when you need to validate that a specific media asset (Image, Video, Audio) was captured by a physical sensor and not synthesized by an AI model.
                          </p>
                          <ul className="space-y-2">
                              <li className="flex items-start gap-2 text-[11px] text-gray-500">
                                  <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500" />
                                  <span>Analyzes thermodynamic noise, MOS spectral density, and sensor quantization.</span>
                              </li>
                              <li className="flex items-start gap-2 text-[11px] text-gray-500">
                                  <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500" />
                                  <span>Requires <code className="text-emerald-300">sk_live</code> (Secret Key) for server-side or high-privilege validation.</span>
                              </li>
                          </ul>
                      </div>

                      <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-4 font-mono text-xs">
                          <div className="text-gray-500 mb-2">// npm install @guaw/web-sdk</div>
                          <div className="text-emerald-400">import <span className="text-white">{`{ GuawGuardian }`}</span> from <span className="text-orange-300">'@guaw/web-sdk'</span>;</div>
                          <div className="text-white mt-4 font-bold">const <span className="text-blue-400 font-normal">guardian</span> = new GuawGuardian({`{`}</div>
                          <div className="pl-4 text-gray-400">apiKey: <span className="text-orange-300">'sk_live_...'</span></div>
                          <div className="text-white text-[12px]">{`}`});</div>
                          
                          <div className="text-gray-500 mt-6 mb-2">// Validate Media Integrity</div>
                          <div className="text-white">const <span className="text-emerald-400 font-normal">verdict</span> = await guardian.verify(file);</div>
                          <div className="text-white">if (<span className="text-blue-300">verdict.status</span> === <span className="text-orange-300">'VERIFIED'</span>) {`{`}</div>
                          <div className="pl-4 text-gray-500">// Physically Coherent: Sensor-verified</div>
                          <div className="text-white text-[12px]">{`}`}</div>
                      </div>
                  </div>
                  
                  {/* GUAW KERNEL SECTION */}
                  {/* GUAW KERNEL SECTION */}
                  <div className="space-y-6">
                      <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-center">
                              <Activity size={16} className="text-blue-400" />
                          </div>
                          <h4 className="text-white font-bold text-sm uppercase tracking-widest text-blue-400">Presence Verification (GUAW Kernel)</h4>
                      </div>

                      <div className="space-y-3">
                          <p className="text-gray-400 text-xs leading-relaxed">
                              Designed for <strong className="text-white">Synchronous Liveness Detection</strong>. Use this SDK to prove that a real human is interacting with your application in real-time, preventing bot automation and relay attacks.
                          </p>
                          <ul className="space-y-2">
                              <li className="flex items-start gap-2 text-[11px] text-gray-500">
                                  <div className="mt-1.5 w-1 h-1 rounded-full bg-blue-500" />
                                  <span>Measures micro-interaction entropy and hardware-level oscillation.</span>
                              </li>
                              <li className="flex items-start gap-2 text-[11px] text-gray-500">
                                  <div className="mt-1.5 w-1 h-1 rounded-full bg-blue-500" />
                                  <span>Uses <code className="text-blue-300">pk_live</code> (Public Key) for safe, direct client-side initialization.</span>
                              </li>
                          </ul>
                      </div>

                      <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-4 font-mono text-xs">
                          <div className="text-gray-500 mb-2">// npm install @guaw/kernel</div>
                          <div className="text-emerald-400">import <span className="text-white">{`{ Kernel }`}</span> from <span className="text-orange-300">'@guaw/kernel'</span>;</div>
                          <div className="text-white mt-4 font-bold">Kernel.init({`{`} apiKey: <span className="text-orange-300">'pk_live_...'</span> {`}`});</div>
                          
                          <div className="text-gray-500 mt-6 mb-2">// Validate Human Presence</div>
                          <div className="text-white">const <span className="text-emerald-400 font-normal">res</span> = await Kernel.verify(trace, <span className="text-orange-300">"auth"</span>);</div>
                          <div className="text-white">if (<span className="text-blue-300">res.verified</span>) {`{`}</div>
                          <div className="pl-4 text-gray-500">// Organic Actor: Real person detected</div>
                          <div className="text-white text-[12px]">{`}`}</div>
                      </div>
                  </div>
              </div>

              <div className="mt-8">
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Mobile SDK (Swift/Kotlin)</h4>
                  <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 font-mono text-xs max-w-2xl">
                      <div className="text-gray-500 mb-2">// Capture & Shield (Swift Example)</div>
                      <div className="text-emerald-400">let <span className="text-white font-normal">guardian</span> = GuawMobileSDK(key: <span className="text-orange-300">"sk_live_..."</span>)</div>
                      <div className="text-white mt-4 font-bold">guardian.captureAndVerify {`{ result in`}</div>
                      <div className="pl-4 text-white">switch result {`{`}</div>
                      <div className="pl-4 text-white">case .success(let proof):</div>
                      <div className="pl-8 text-gray-500">uploadToSovereign(proof)</div>
                      <div className="pl-4 text-white">case .failure(let error):</div>
                      <div className="pl-8 text-red-400">handleIntegrityBreach(error)</div>
                      <div className="pl-4 text-white text-[12px]">{`}`}</div>
                      <div className="text-white text-[12px]">{`}`}</div>
                  </div>
              </div>
          </section>

          {/* QUICK REFERENCE CHEAT SHEET */}
          <section id="quick-reference" className="space-y-12 scroll-mt-32 pt-24 border-t border-white/5">
              <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/20">
                      <Activity size={24} className="text-white" />
                  </div>
                  <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">Cheat Sheet</h2>
                      <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mt-1">Operational Benchmarks</p>
                  </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01]">
                  <table className="w-full text-left text-sm">
                      <thead>
                          <tr className="bg-white/5 border-b border-white/5 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                              <th className="px-6 py-4 font-black">Metric / Parameter</th>
                              <th className="px-6 py-4 font-black">Value</th>
                              <th className="px-6 py-4 font-black">Constraint / Note</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs">
                           <tr className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-4 font-bold text-gray-300 uppercase tracking-tighter">Avg Latency (Atomic)</td>
                              <td className="px-6 py-4 text-emerald-400 font-mono">Sub-10ms</td>
                              <td className="px-6 py-4 text-gray-500">Single-pass static verification.</td>
                           </tr>
                           <tr className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-4 font-bold text-gray-300 uppercase tracking-tighter">Avg Latency (LiveStream)</td>
                              <td className="px-6 py-4 text-emerald-400 font-mono">Deterministic</td>
                              <td className="px-6 py-4 text-gray-500">Under sovereign network conditions.</td>
                           </tr>
                          <tr className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-4 font-bold text-gray-300 uppercase tracking-tighter">Cipher Standard</td>
                              <td className="px-6 py-4 text-blue-400 font-mono">AES-256-GCM</td>
                              <td className="px-6 py-4 text-gray-500">Ghost RAM memory cloaking active.</td>
                          </tr>
                          <tr className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-4 font-bold text-gray-300 uppercase tracking-tighter">Hashing Algorithm</td>
                              <td className="px-6 py-4 text-orange-400 font-mono">SHA-3 (Keccak)</td>
                              <td className="px-6 py-4 text-gray-500">Used for Code Seal & Logic Witnesses.</td>
                          </tr>
                          <tr className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-4 font-bold text-gray-300 uppercase tracking-tighter">Fail-Closed Mode</td>
                              <td className="px-6 py-4 text-red-400 font-bold uppercase">Strict</td>
                              <td className="px-6 py-4 text-gray-500">Zero tolerance for integrity variance.</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {[
                    { code: 400, label: "Invalid Payload", action: "Check telemetry stream integrity." },
                    { code: 401, label: "Key Rejected", action: "Verify sk_live token registry." },
                    { code: 423, label: "Integrity Locked", action: "Fail-Closed: Manual review required." },
                    { code: 429, label: "Quota Exceeded", action: "Upgrade sovereign tier in console." }
                ].map((err, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1">
                        <div className="text-xl font-black text-white font-mono mb-1">{err.code}</div>
                        <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">{err.label}</div>
                        <p className="text-[11px] text-gray-400 italic font-medium">Action: {err.action}</p>
                    </div>
                ))}
              </div>
              
              <div className="flex gap-4 p-8 rounded-2xl bg-orange-500/5 border border-orange-500/5">
                <div className="text-orange-500 font-black text-xs uppercase tracking-widest pt-1">Important Verdicts</div>
                <div className="space-y-4">
                    <p className="text-sm text-gray-400 leading-relaxed">
                       Decisions made by the Bio-Entropy Layer (e.g., Block 423) are <strong className="text-white">deterministic and non-reversible by manual intervention</strong>. They align with the sovereign fail-closed protocol.
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">Sovereign Kernel Reference v2.0.6 // GUAW Guardians Environment</p>
                </div>
              </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

