import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, ChevronDown, Cpu, Globe, Fingerprint, ChevronRight, FileCheck, ShieldCheck, Activity, Lock, Eye, Clock, Shield } from 'lucide-react';
import { JerkCostCanvas } from '../../components/landing/JerkCostCanvas';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { SovereignGlyph } from '../../components/ui/SovereignGlyph';
import { FloatingLoginButton } from '../../components/ui/FloatingLoginButton';

const FAQItem = ({ question, answer, isOpen, toggle }: { question: string, answer: React.ReactNode, isOpen: boolean, toggle: () => void }) => {
  return (
    <div className={`group rounded-[2rem] border transition-all duration-700 overflow-hidden relative ${isOpen ? 'bg-white/[0.03] border-white/20 shadow-[0_0_40px_-20px_rgba(255,255,255,0.1)]' : 'bg-black/40 border-white/5 hover:border-white/10'}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] pointer-events-none" />
      <button 
        onClick={toggle}
        className="w-full px-10 py-8 flex items-center justify-between gap-6 text-left relative z-10"
      >
        <span className={`font-black text-xs uppercase tracking-[0.15em] transition-colors duration-500 ${isOpen ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-emerald-500/20 border-emerald-500/40 rotate-180' : 'bg-white/5 border-white/10 group-hover:border-white/20'}`}>
            <ChevronDown size={14} className={isOpen ? 'text-emerald-500' : 'text-gray-600'} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-10 pb-8 text-[11px] text-gray-400 leading-relaxed border-t border-white/5 pt-8 font-light italic">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSdk, setActiveSdk] = useState<'presence' | 'media'>('presence');
  const [isVerifiedHuman, setIsVerifiedHuman] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-black relative font-sans overflow-x-hidden">
      {/* Global Particles Layer - Visible Throughout Entire Page */}
      <ParticlesBackground />
      
      {/* Floating Login Button */}
      <FloatingLoginButton />
      
      {/* Hardened Grid Overlay - Hero Section Only - Reactive to Verification State */}
      <div className="absolute top-0 left-0 right-0 h-screen z-0 pointer-events-none">
        <div 
          className={`absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 transition-colors duration-700`}
          style={{ 
            color: isVerifiedHuman ? 'rgba(16, 185, 129, 0.07)' : 'rgba(239, 68, 68, 0.12)' 
          }}
        />
      </div>
      
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-20">
        
        {/* Scanning Line Effect */}
        <motion.div 
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-0 opacity-20"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        <div className="z-10 text-center max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                Mission Kernel V2.5.2 Active
              </span>
            </div>

            <div className="relative group">
              <motion.div
                className="absolute -inset-8 bg-primary/20 blur-[80px] rounded-full z-0 group-hover:bg-primary/30 transition-all duration-700"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Cryptographic Attestation Halo */}
              <motion.div 
                className="absolute -inset-16 z-0 pointer-events-none opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                 <SovereignGlyph type="sun" size={40} className="absolute top-0 left-1/2 -translate-x-1/2" />
                 <SovereignGlyph type="earth" size={40} className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-180" />
                 <SovereignGlyph type="stone" size={40} className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90" />
                 <SovereignGlyph type="intersection" size={40} className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90" />
              </motion.div>


              <motion.img 
                src="/guaw-cerberus-s.png" 
                alt="GUAW Guardian Core" 
                className="relative z-10 w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-[0_0_30px_rgba(58,134,255,0.2)] group-hover:drop-shadow-[0_0_50px_rgba(251,191,36,0.3)] transition-all duration-700"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <div className="space-y-6">

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white relative group"
              >
                <span className="relative z-10">PHYSICAL TRUTH.</span><br />
                <span className="text-gray-700 relative z-10">ZERO DATA STORED.</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] pointer-events-none" />
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mt-8"
              >
                <span className="text-white font-medium block mb-4 text-2xl">The first verifier that proves physical humanity without storing a single bit of user data.</span>
                Current systems analyze content and behavior. GUAW verifies <strong className="text-white">physical possibility</strong>. <br className="hidden md:block" />
                <span className="text-emerald-400 font-bold">Trusted Execution Integrity.</span> Node.js acts as an unprivileged messenger for a hardened Rust parent process.
                <br />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/70 mt-8 block">
                    Zero-Knowledge (Groth16) · Secure Enclaves · WORM Storage · Epoch System
                </span>
              </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-12 w-full max-w-3xl mx-auto p-4 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-sm relative"
          >
             {/* Canvas Deco */}
            <JerkCostCanvas onVerificationChange={setIsVerifiedHuman} />
            <div className="mt-4 flex justify-between px-6 text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                <span>Signal Resonance: 99.1%</span>
                <span>ZK-Proof Latency: ~11ms (p50)</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-16"
          >
            <Link to="/dashboard" className="relative group px-12 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs overflow-hidden transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Access Dashboard</span>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="absolute -inset-1 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link to="/docs" className="group px-10 py-5 rounded-2xl bg-white/[0.03] border border-white/10 font-bold text-xs uppercase tracking-widest hover:border-white/20 transition-all flex items-center gap-3 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">System Reference</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform relative z-10" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Forensic Cryptography Section (The New Truth) */}
      <section className="py-32 px-4 relative bg-[#050505] border-t border-white/5 overflow-hidden">
        {/* Background circuit lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
             <div className="space-y-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                     ZK-SNARK Production Active · Tier 100
                 </div>
                 <h2 className="text-5xl font-bold tracking-tighter text-white leading-tight relative group">
                     Physics is the final<br/>
                     <span className="text-gray-600 group-hover:text-blue-400 transition-colors duration-700">firewall.</span>
                     <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500/0 via-blue-500/40 to-blue-500/0" />
                 </h2>
                 <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl relative">
                     <span className="absolute -left-8 top-2 text-blue-500/20 font-mono text-xs">01</span>
                     Conventional security relies on hidden secrets. GUAW relies on <strong className="text-white">zk-SNARKs</strong>, <strong className="text-white">SHA-3 Sovereign Hashing</strong>, and <strong className="text-white">AES-256 Memory Cloaking</strong>. 
                     We prove that physical laws were satisfied without ever revealing the raw signal data.
                 </p>
                 
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300 group">
                          <div className="text-blue-400 font-mono text-[10px] font-bold uppercase tracking-widest group-hover:text-blue-300 transition-colors truncate">Authority Matrix</div>
                          <div className="text-xl font-bold text-white tracking-tight">Computation <span className="text-[10px] text-blue-500/50">SEALED</span></div>
                          <p className="text-[10px] text-gray-400 font-mono leading-relaxed">Hardened Protocol-driven Verification</p>
                      </div>
                       <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-300 group">
                          <div className="text-purple-400 font-mono text-[10px] font-bold uppercase tracking-widest group-hover:text-purple-300 transition-colors truncate">Isolated TEE</div>
                          <div className="text-xl font-bold text-white tracking-tight">Privilege Separation</div>
                          <p className="text-[10px] text-gray-400 font-mono leading-relaxed">Reverse-Bootstrap architecture for supply chain security</p>
                      </div>
                       <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:bg-white/[0.05] hover:border-amber-500/30 transition-all duration-300 group">
                           <div className="text-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest group-hover:text-amber-300 transition-colors truncate">Attestation Proof</div>
                           <div className="text-xl font-bold text-white tracking-tight">Code Integrity</div>
                           <p className="text-[10px] text-gray-400 font-mono leading-relaxed">Cryptographic Hardware-Rooted Trust</p>
                       </div>
                       <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:bg-white/[0.05] hover:border-green-500/30 transition-all duration-300 group">
                           <div className="text-green-400 font-mono text-[10px] font-bold uppercase tracking-widest group-hover:text-green-300 transition-colors truncate">WORM Storage</div>
                           <div className="text-xl font-bold text-white tracking-tight">Forensic Integrity</div>
                           <p className="text-[10px] text-gray-400 font-mono leading-relaxed">Write-Once-Read-Many Evidence</p>
                       </div>
                  </div>
             </div>

             {/* Code/Terminal Visual - The Cipher */}
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
             >
                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                 <div className="relative rounded-[2.5rem] bg-[#0A0A0A]/90 border border-white/10 p-12 shadow-2xl backdrop-blur-3xl overflow-hidden">
                     <div className="absolute top-0 right-0 p-10 opacity-5">
                         <SovereignGlyph type="ledger" size={200} />
                     </div>
                     <div className="space-y-6 relative z-10">
                         <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest italic mb-2">Technical Reference</div>
                         <h3 className="text-3xl font-black text-white tracking-tighter uppercase mb-4">Axiomatic Chain of Custody</h3>
                         <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 italic">
                            Every verification is sealed with a unique physical invariant hash. For deep technical architecture and circuit specifications, visit our institutional reference.
                         </p>
                         <Link to="/docs" className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                              Explore Engineering Specs →
                         </Link>
                     </div>
                 </div>
             </motion.div>
        </div>
      </section>
      {/* PHYSICAL INTEGRITY VERIFICATION SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-32 px-4 relative bg-[#050505] border-t border-white/5 overflow-hidden"
      >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.03),transparent_50%)] pointer-events-none" />
         
         <div className="max-w-6xl mx-auto space-y-20 relative z-10">
              
              {/* Header */}
              <div className="text-center space-y-6 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400/90 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Physical Integrity Verification
                  </div>
                   <h2 className="text-5xl font-bold tracking-tighter text-white leading-tight relative group">
                      Verify audio, video and streams<br/>
                      <span className="text-gray-600 group-hover:text-emerald-400 transition-colors duration-700">using physical laws — not AI guesses.</span>
                      <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-emerald-500/0 via-emerald-500/40 to-emerald-500/0" />
                  </h2>
                  <p className="text-gray-400 text-xl font-light leading-relaxed relative">
                      <span className="absolute -left-8 top-2 text-emerald-500/20 font-mono text-xs">02</span>
                      Current systems analyze content. GUAW verifies <strong className="text-white underline decoration-emerald-500/30 underline-offset-8">physical possibility</strong>.
                  </p>
              </div>

              {/* The Problem */}
              <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white">The Reality Crisis</h3>
                      <div className="space-y-4">
                          {[
                              "Deepfakes indistinguishable by software",
                              "Streams falsified in real-time",
                              "Audits that expose sensitive data",
                              "Fraud costs growing faster than verification"
                          ].map((item, i) => (
                              <div key={i} className="flex items-start gap-3 text-gray-400">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                  <span>{item}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                      <h3 className="text-2xl font-bold text-white mb-6">How GUAW Works</h3>
                      <div className="space-y-6">
                          <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">1</div>
                                  <h4 className="text-white font-bold">Physical Measurement</h4>
                              </div>
                              <p className="text-sm text-gray-400 pl-11">Extract sensor-level noise and entropy patterns — content is never analyzed.</p>
                          </div>
                          <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">2</div>
                                  <h4 className="text-white font-bold">Deterministic Verification</h4>
                              </div>
                              <p className="text-sm text-gray-400 pl-11">Test signals against physical laws that synthetic content cannot replicate.</p>
                          </div>
                          <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">3</div>
                                  <h4 className="text-white font-bold">Cryptographic Proof</h4>
                              </div>
                              <p className="text-sm text-gray-400 pl-11">Seal results with Zero-Knowledge proofs — no data exposure, ever.</p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Cosmic Doubt / Sovereign Veto (Tier 100) */}
              <div className="p-16 rounded-[4rem] bg-indigo-500/[0.02] border border-indigo-500/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at:50%_50%,rgba(99,102,241,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent group-hover:animate-[shimmer_4s_infinite]" />
                  
                  <div className="max-w-3xl mx-auto space-y-8 text-center relative z-10">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                          The Unicorn Philosophy
                      </div>
                      <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-tight">
                          We have the courage to <br/>
                          <span className="text-gray-600 group-hover:text-indigo-400/80 transition-colors duration-700">doubt the human.</span>
                      </h3>
                      <p className="text-lg text-gray-400 font-light leading-relaxed italic max-w-2xl mx-auto">
                          "Cosmic Doubt." If a command contradicts the physical entropy of the universe (e.g., bit-flips from radiation or AI injection), the system <strong className="text-white">VETOS</strong> the administrator.
                      </p>
                      <div className="pt-6">
                            <div className="inline-block p-4 rounded-2xl bg-black/40 border border-white/5">
                                <code className="text-xs text-indigo-400 font-mono">PHYSICS &gt; AUTHORITY</code>
                            </div>
                      </div>
                  </div>
              </div>

               {/* BIOLOGICAL PERSISTENCE (STREAKS) */}
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                   <div className="space-y-8">
                       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                           <ShieldCheck size={12} /> Biological Persistence Engine
                       </div>
                       <h3 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                           The Math of <br/>
                           <span className="text-gray-700">Persistence.</span>
                       </h3>
                       <p className="text-gray-400 text-lg font-light leading-relaxed">
                           A synthetic actor can simulate a moment. They cannot simulate a **30-day streak of perfect biological invariants**. GUAW leverages temporal continuity as the ultimate arbiter of truth.
                       </p>
                       <div className="grid grid-cols-2 gap-4">
                           <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                               <div className="text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-widest">Fail-Soft Logic</div>
                               <div className="text-xl font-bold text-white tracking-tight">Soft Decay</div>
                               <p className="text-[10px] text-gray-500 leading-relaxed font-mono italic">Pauses progress instead of banning on signal variance.</p>
                           </div>
                           <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                               <div className="text-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest">Quality Witness</div>
                               <div className="text-xl font-bold text-white tracking-tight">Notary Seals</div>
                               <p className="text-[10px] text-gray-500 leading-relaxed font-mono italic">GOLD/SILVER/BRONZE certificates of human continuity.</p>
                           </div>
                       </div>
                   </div>
                   <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl opacity-50" />
                        <div className="relative p-1 bg-white/5 rounded-3xl overflow-hidden border border-white/10">
                            <div className="bg-[#0A0A0A] rounded-[1.4rem] p-10 space-y-8">
                                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-gray-500 font-mono uppercase font-bold tracking-widest leading-none">Streak Proof (Sovereign)</div>
                                        <div className="text-2xl font-black text-white italic">777_STREAK_ACTIVE</div>
                                    </div>
                                    <div className="px-3 py-1 rounded bg-amber-500/10 text-amber-500 text-[10px] font-black border border-amber-500/20 uppercase tracking-widest">GOLD SEAL</div>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="space-y-1 border-r border-white/5">
                                        <div className="text-[10px] text-gray-600 font-mono uppercase">Complexity</div>
                                        <div className="text-lg font-bold text-white">1.42</div>
                                    </div>
                                    <div className="space-y-1 border-r border-white/5">
                                        <div className="text-[10px] text-gray-600 font-mono uppercase">Smoothness</div>
                                        <div className="text-lg font-bold text-white">0.12</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-gray-600 font-mono uppercase">Volition</div>
                                        <div className="text-lg font-bold text-white">HI_RES</div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                                    <p className="text-[10px] text-emerald-500 font-mono font-bold uppercase tracking-widest italic animate-pulse">Persistent Biological Baseline Confirmed</p>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>

               {/* Core Framework: The Three Pillars */}
              <div className="space-y-16">
                  <div className="text-center space-y-4">
                      <div className="flex justify-center mb-4">
                          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                      </div>
                      <h3 className="text-4xl font-black tracking-tighter uppercase relative inline-block group">
                          The Sovereign Framework
                          <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-700" />
                      </h3>
                      <p className="text-gray-500 text-lg font-light">Three deep layers of technical integrity.</p>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                      {/* GUAW Kernel */}
                      <div className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden backdrop-blur-3xl">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
                          
                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110">
                              <SovereignGlyph type="argus" size={120} />
                          </div>
                          <div className="relative z-10 space-y-6">
                              <div className="flex items-center gap-4">
                                  <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                                      <SovereignGlyph type="argus" size={40} color="#3a86ff" />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-bold text-sm uppercase tracking-widest text-blue-400">Presence Verification (GUAW Kernel)</h4>
                                      <p className="text-primary text-[10px] font-mono font-bold uppercase tracking-tighter">Presence Verification</p>
                                  </div>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed italic pr-4">
                                 The infrastructure layer for deterministic liveness. Verifies real organic action using physical entropy patterns.
                              </p>

                              <ul className="space-y-3 text-[10px] text-gray-400">
                                  <li className="flex items-center gap-2"><span className="text-primary opacity-50">/</span> Zero-Knowledge Biometric Auditing</li>
                                  <li className="flex items-center gap-2"><span className="text-primary opacity-50">/</span> Physical Signal Resonance</li>
                                  <li className="flex items-center gap-2"><span className="text-primary opacity-50">/</span> Ephemeral Integrity Proofs</li>
                              </ul>
                              <Link to="/product/presence" className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest hover:text-white transition-all pt-4 group/link">
                                  Core Pipeline <ChevronRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                          </div>
                      </div>

                      {/* GUAW Web SDK */}
                      <div className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 hover:border-sky-400/30 transition-all group relative overflow-hidden backdrop-blur-3xl">
                          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent group-hover:animate-[shimmer_2.5s_infinite]" />

                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110">
                              <SovereignGlyph type="vanguard" size={120} />
                          </div>
                          <div className="relative z-10 space-y-6">
                              <div className="flex items-center gap-4">
                                  <div className="p-3 bg-sky-400/10 rounded-2xl border border-sky-400/20 group-hover:scale-110 transition-transform duration-500">
                                      <SovereignGlyph type="vanguard" size={40} color="#38bdf8" />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-black text-sm uppercase tracking-widest italic">GUAW Web SDK</h4>
                                      <p className="text-sky-400 text-[10px] font-mono font-bold uppercase tracking-tighter">Media Verification</p>
                                  </div>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed italic pr-4">
                                 Real-time verification of audio, video, and streams at the sensor level to nullify synthetic injection.
                              </p>
                              <ul className="space-y-3 text-[10px] text-gray-400">
                                  <li className="flex items-center gap-2"><span className="text-sky-400 opacity-50">/</span> Sensor-Level Noise Auditing</li>
                                  <li className="flex items-center gap-2"><span className="text-sky-400 opacity-50">/</span> Deepfake Vector Exclusion</li>
                                  <li className="flex items-center gap-2"><span className="text-sky-400 opacity-50">/</span> Sub-500ms Verdict Logic</li>
                              </ul>
                              <Link to="/products/stream-guardian" className="inline-flex items-center gap-2 text-sky-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all pt-4 group/link">
                                  SDK Documentation <ChevronRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                          </div>
                      </div>

                      {/* Forensic Layer */}
                      <div className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 hover:border-secondary/30 transition-all group relative overflow-hidden backdrop-blur-3xl">
                          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent group-hover:animate-[shimmer_3s_infinite]" />

                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110">
                              <SovereignGlyph type="ledger" size={120} />
                          </div>
                          <div className="relative z-10 space-y-6">
                              <div className="flex items-center gap-4">
                                  <div className="p-3 bg-secondary/10 rounded-2xl border border-secondary/20 group-hover:scale-110 transition-transform duration-500">
                                      <SovereignGlyph type="ledger" size={40} color="#fbbf24" />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-black text-sm uppercase tracking-widest italic">Forensic Layer</h4>
                                      <p className="text-secondary text-[10px] font-mono font-bold uppercase tracking-tighter">Legal Chain / Audit</p>
                                  </div>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed italic pr-4">
                                 The archival layer for legal admissibility. Generates cryptographically sealed evidence chains for litigation.
                              </p>
                              <ul className="space-y-3 text-[10px] text-gray-400">
                                  <li className="flex items-center gap-2"><span className="text-secondary opacity-50">/</span> Atomic Forensic Sealing</li>
                                  <li className="flex items-center gap-2"><span className="text-secondary opacity-50">/</span> Expert Witness Integration</li>
                                  <li className="flex items-center gap-2"><span className="text-secondary opacity-50">/</span> Court-Admissible Records</li>
                              </ul>
                              <Link to="/products/forensic-suite" className="inline-flex items-center gap-2 text-secondary text-[10px] font-black uppercase tracking-widest hover:text-white transition-all pt-4 group/link">
                                  Forensic protocol <ChevronRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                          </div>
                      </div>
                  </div>
              </div>

               {/* 🛡️ NEW: SOVEREIGN ARCHITECTURE [TIER 10] */}
               <div className="space-y-16 pt-32">
                  <div className="text-center space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 mb-2 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          Layer 3: Sovereign Hardening
                      </div>
                      <h3 className="text-5xl font-black tracking-tighter uppercase italic text-white">
                         Modular <span className="text-gray-700">Fortress.</span>
                      </h3>
                      <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">Ten deterministic pillars working in parallel to enforce physical and logical reality.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {[
                        { title: "Bio-Stochastic", desc: "Motor Entropy & FFT Analysis", icon: <Activity size={20} />, color: "text-blue-500" },
                        { title: "Code Seal", desc: "SHA-3 Logic Integrity", icon: <Lock size={20} />, color: "text-orange-500" },
                        { title: "Optical Guardian", desc: "CMOS Sensor Forensics", icon: <Eye size={20} />, color: "text-emerald-400" },
                        { title: "Multimodal", desc: "Bio-Dynamic Reflex Challenge", icon: <Activity size={20} />, color: "text-blue-400" },
                        { title: "Sovereign Shield", desc: "Fail-Closed Data Integrity", icon: <Shield size={20} />, color: "text-blue-600" },
                        { title: "Lazarus Ledger", desc: "Forensic Audit & Shredding", icon: <Lock size={20} />, color: "text-purple-500" },
                        { title: "Cronos Sentinel", desc: "External Time Consensus", icon: <Clock size={20} />, color: "text-blue-500" },
                        { title: "Trinity Protocol", desc: "Tripartite Signature Graph", icon: <ShieldCheck size={20} />, color: "text-white" },
                        { title: "Silicon Gate", desc: "AVX-512 Bare-Metal Check", icon: <Cpu size={20} />, color: "text-red-500" },
                        { title: "Persistence", desc: "Streak Continuity Engine", icon: <ShieldCheck size={20} />, color: "text-emerald-500" }
                      ].map((mod, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          viewport={{ once: true }}
                          className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 group relative overflow-hidden"
                        >
                           <div className={`text-gray-500 mb-4 group-hover:${mod.color} transition-colors`}>{mod.icon}</div>
                           <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">{mod.title}</h4>
                           <p className="text-[10px] text-gray-500 leading-tight">{mod.desc}</p>
                        </motion.div>
                      ))}
                  </div>
              </div>

               {/* Legal & Trust */}
              <div className="p-10 rounded-3xl bg-white/[0.01] border border-white/5 text-center space-y-10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.05),transparent_60%)]" />
                  <div className="absolute -inset-x-full bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent group-hover:animate-[shimmer_3s_infinite]" />
                  
                  <div className="space-y-2 relative z-10">
                      <h3 className="text-2xl font-bold text-white tracking-tight uppercase">Legal & Trust Architecture</h3>
                      <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Protocol-Level Guarantees</p>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6 relative z-10">
                      {[
                          "Patent Filed (INPI 20260100161)",
                          "Zero-Knowledge by design",
                          "No biometric storage",
                          "No model training"
                      ].map((item, i) => (
                          <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-emerald-500/20 transition-all duration-500 group/item">
                              <p className="text-[11px] text-gray-400 font-mono group-hover/item:text-emerald-400 transition-colors uppercase tracking-tight">{item}</p>
                          </div>
                      ))}
                  </div>
              </div>

               {/* Reality Tiers: The Economic Shift */}
               <div className="py-24 border-y border-white/5 relative group">
                   <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/[0.02] to-red-500/0" />
                   <div className="max-w-4xl mx-auto space-y-12 text-center relative z-10">
                       <h3 className="text-4xl font-black text-white tracking-widest uppercase">The Reality Tiers</h3>
                       <p className="text-gray-500 text-lg font-light leading-relaxed italic">
                           Hardware integrity is no longer a checkbox. It's the unit of value. 
                           GUAW licenses <strong className="text-white italic">Ontological Capacity</strong> — the right to execute in verified reality.
                       </p>
                       
                       <div className="grid md:grid-cols-2 gap-8 pt-8">
                           {/* Tier S */}
                           <div className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 hover:border-blue-500/30 transition-all group/tier">
                               <div className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Tier S: Standard Reality</div>
                               <div className="text-4xl font-black text-white mb-6">PBS v1.1 <span className="text-xs text-gray-500 font-normal tracking-normal uppercase">Authorized</span></div>
                               <ul className="text-[11px] text-gray-400 space-y-3 text-left mb-8">
                                   <li className="flex items-center gap-3"><span className="w-1 h-1 bg-blue-500 rounded-full"/> Latency P99 ≤ 10µs</li>
                                   <li className="flex items-center gap-3"><span className="w-1 h-1 bg-blue-500 rounded-full"/> Anti-Simulation Verification</li>
                                   <li className="flex items-center gap-3"><span className="w-1 h-1 bg-blue-500 rounded-full"/> Fail-Closed Error Shielding</li>
                               </ul>
                               <div className="text-[9px] text-blue-500/50 uppercase font-mono italic">FOR: SAAS · GAMING · MEDIA</div>
                           </div>

                           {/* Tier P */}
                           <div className="p-10 rounded-[3rem] bg-red-500/[0.02] border border-red-500/20 hover:border-red-500/50 transition-all group/tier relative overflow-hidden">
                               <div className="absolute top-0 right-0 p-6 opacity-10">
                                   <Cpu size={80} className="text-red-500" />
                               </div>
                               <div className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Tier P: Sovereign Reality</div>
                                <div className="text-4xl font-black text-white mb-6">Native <span className="text-xs text-gray-500 font-normal tracking-normal uppercase">Bare-Metal</span></div>
                                <ul className="text-[11px] text-gray-400 space-y-3 text-left mb-8">
                                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"/> Latency P99 (Sub-micro)</li>
                                   <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"/> Mandatory Apoptosis Policy</li>
                                   <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"/> Physical Reality Certification</li>
                               </ul>
                               <div className="text-[9px] text-red-500/50 uppercase font-mono italic">FOR: FINANCE · DEFENSE · CRITICAL AI</div>
                           </div>
                       </div>
                   </div>
               </div>

               {/* Transition Signal */}
               <div className="flex justify-center py-10">
                   <div className="h-12 w-px bg-gradient-to-b from-white/10 to-transparent" />
               </div>

         </div>
      </motion.section>

      {/* Fail-Closed Philosophy */}
      <section className="py-32 px-4 relative bg-[#050505] border-t border-white/5 overflow-hidden">
        {/* Localized Grid Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest border border-red-500/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Sovereign Principle
            </div>
            <h2 className="text-5xl font-bold tracking-tighter text-white leading-tight">
              If we can't prove it,<br/>
              <span className="text-gray-600">we don't run it.</span>
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto mt-6">
              GUAW operates in <strong className="text-white">FAIL-CLOSED</strong> mode. 
              If cryptographic artifacts or hardware stability are invalid, the system halts. 
              No degraded modes. Fail-Closed Silicon Gate.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-6 pt-8"
          >
            <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 space-y-3 hover:border-red-500/30 transition-all duration-700 group">
              <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform duration-500">0</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black italic">Simulation Modes</div>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 space-y-3 hover:border-emerald-500/30 transition-all duration-700 group">
              <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform duration-500">100%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black italic">Cryptographic Proofs</div>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 space-y-3 hover:border-primary/30 transition-all duration-700 group">
              <div className="text-4xl font-black text-primary group-hover:scale-110 transition-transform duration-500">∞</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black italic">Legal Defensibility</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is GUAW & Differentials */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-40 px-4 relative overflow-hidden bg-[#050505] border-t border-white/5"
      >
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-emerald-500/5 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto space-y-32 relative z-10">
            {/* What is GUAW */}
            <div className="text-center space-y-8 max-w-4xl mx-auto relative group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(58,134,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 shadow-[0_0_20px_rgba(58,134,255,0.1)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Platform Core
                    </div>
                    <h2 className="text-5xl font-bold tracking-tighter uppercase relative">
                        What is <span className="text-primary italic">GUAW?</span>
                        <div className="absolute -left-12 top-0 text-[10px] font-mono text-primary/20 vertical-text hidden lg:block">COORDINATE 03</div>
                    </h2>
                    <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
                        GUAW is a cryptographic verification kernel that proves physical human presence using <strong className="text-white">deterministic entropy</strong> and <strong className="text-white">zero-knowledge proofs</strong>.
                    </p>
                    <div className="p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 relative overflow-hidden backdrop-blur-3xl inline-block mt-8 group/box">
                        <div className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover/box:animate-[shimmer_2s_infinite]" />
                        <p className="text-sm font-mono text-primary uppercase tracking-[0.2em] relative z-10 leading-relaxed italic">
                            It does not identify who you are. <br/>
                            <span className="text-white/40">It verifies that a real, physical action occurred.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* NEW: THE REPLACEMENT SECTION (COMPARISON TABLE) */}
            <section className="py-20 relative overflow-hidden">
                <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
                    <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
                    The <span className="text-primary">reCAPTCHA</span> Alternative<br/>
                    <span className="text-gray-600">for the Privacy Era.</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed">
                    Google reduced the reCAPTCHA free tier from 1,000,000 to 10,000 monthly verifications. <br/>
                    It's time to switch to a system that respects your latency and your users' privacy.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                        <th className="py-8 px-6 text-[10px] uppercase tracking-widest text-gray-500 font-black">Dimension</th>
                        <th className="py-8 px-6 text-[10px] uppercase tracking-widest text-primary font-black bg-primary/5 border-x border-primary/10">GUAW (ZK-Physics)</th>
                        <th className="py-8 px-6 text-[10px] uppercase tracking-widest text-gray-400 font-black">reCAPTCHA v3</th>
                        <th className="py-8 px-6 text-[10px] uppercase tracking-widest text-gray-400 font-black">Cloudflare Turnstile</th>
                        <th className="py-8 px-6 text-[10px] uppercase tracking-widest text-gray-400 font-black">hCaptcha</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light">
                        <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 px-6 text-gray-400 font-mono text-[11px]">Verification Logic</td>
                        <td className="py-6 px-6 text-white font-bold bg-primary/5 border-x border-primary/10 italic">ZK Physical Invariants</td>
                        <td className="py-6 px-6 text-gray-500">Behavioral / Cookies</td>
                        <td className="py-6 px-6 text-gray-500">Browser Signals</td>
                        <td className="py-6 px-6 text-gray-500">Visual Puzzles (ML)</td>
                        </tr>
                        <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 px-6 text-gray-400 font-mono text-[11px]">Latency (p50)</td>
                        <td className="py-6 px-6 text-emerald-400 font-bold bg-primary/5 border-x border-primary/10">~11ms (Client-side)</td>
                        <td className="py-6 px-6 text-gray-500">200ms - 2s (Server)</td>
                        <td className="py-6 px-6 text-gray-500">~200ms (Server)</td>
                        <td className="py-6 px-6 text-gray-500">~300ms+ (Interaction)</td>
                        </tr>
                        <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 px-6 text-gray-400 font-mono text-[11px]">User Privacy</td>
                        <td className="py-6 px-6 text-white font-bold bg-primary/5 border-x border-primary/10 italic">Zero-Storage / ZK</td>
                        <td className="py-6 px-6 text-gray-500 text-xs">PII Tracking / Ads</td>
                        <td className="py-6 px-6 text-gray-500 text-xs">Data limited but Server-side</td>
                        <td className="py-6 px-6 text-gray-500 text-xs">Data harvested for ML</td>
                        </tr>
                        <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 px-6 text-gray-400 font-mono text-[11px]">Detection Rate</td>
                        <td className="py-6 px-6 text-white font-bold bg-primary/5 border-x border-primary/10">{`>99.9%`} (Hardware Law)</td>
                        <td className="py-6 px-6 text-gray-500 italic">{`< 45% (AI-Simulatable)`}</td>
                        <td className="py-6 px-6 text-gray-500 italic">~33%</td>
                        <td className="py-6 px-6 text-gray-500 italic">~60%</td>
                        </tr>
                        <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 px-6 text-gray-400 font-mono text-[11px]">2025 Pricing</td>
                        <td className="py-6 px-6 text-primary font-black bg-primary/5 border-x border-primary/10">Transparent Usage</td>
                        <td className="py-6 px-6 text-red-400/80">$1/1k (Reduced Tier)</td>
                        <td className="py-6 px-6 text-gray-500">Freemium/Enterprise</td>
                        <td className="py-6 px-6 text-gray-500">Freemium/Enterprise</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                
                <div className="flex justify-center mt-12 mb-24">
                    <Link to="/vs-recaptcha" className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest text-white">
                        View detailed reCAPTCHA migration guide <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* THE DEEPFAKE PREVENTION SECTION (WEB SDK) */}
            <section className="py-20 relative overflow-hidden border-t border-white/5">
                <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-black uppercase tracking-widest border border-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.15)] mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                        @guaw/web-sdk
                    </div>
                    <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
                    The <span className="text-sky-400">Deepfake</span> Prevention<br/>
                    <span className="text-gray-600">for Real-Time Media.</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed">
                    Standard KYC processes are failing against AI-generated streams and injected media. <br/>
                    Our Web SDK verifies physical integrity at the sensor-level directly in the browser.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                    <div className="p-8 rounded-3xl bg-black/40 border border-white/5 space-y-4">
                        <h3 className="text-sky-400 font-bold uppercase tracking-widest text-xs">Sensor-level Noise</h3>
                        <p className="text-gray-400 text-[13px] leading-relaxed">Verifies structural entropy of capturing devices (CMOS/Microphone), impossible to perfectly synthesize by AI models.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-black/40 border border-white/5 space-y-4">
                        <h3 className="text-sky-400 font-bold uppercase tracking-widest text-xs">Zero Data Upload</h3>
                        <p className="text-gray-400 text-[13px] leading-relaxed">Runs completely client-side. The media never touches our servers. We only receive cryptographic proofs.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-black/40 border border-white/5 space-y-4">
                        <h3 className="text-sky-400 font-bold uppercase tracking-widest text-xs">11ms Verification</h3>
                        <p className="text-gray-400 text-[13px] leading-relaxed">Real-time validation for video KYC, streams, and voice data without blocking or delaying the user experience.</p>
                    </div>
                </div>

                <div className="flex justify-center mt-12 mb-24">
                    <button onClick={() => {
                        window.scrollTo({ top: document.getElementById('integration')?.offsetTop || 0, behavior: 'smooth' });
                        setActiveSdk('media');
                    }} className="group flex items-center gap-4 bg-sky-500/10 border border-sky-500/20 px-8 py-4 rounded-2xl hover:bg-sky-500/20 transition-all font-black text-[10px] uppercase tracking-widest text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                        Explore Media Verification Integration <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* The Differential Battle */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center bg-white/[0.01] border border-white/5 rounded-[4rem] p-16 relative overflow-hidden group">
                 <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
                 
                 <div className="space-y-8 relative z-10">
                     <div className="text-[10px] font-mono text-emerald-500/40 uppercase tracking-widest italic mb-4">SYSTEM COMPARISON // 04</div>
                     <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Why GUAW is <span className="text-emerald-500/80 italic">Different</span></h3>
                     <p className="text-gray-500 text-lg font-light leading-relaxed italic">Most solutions rely on invading privacy to establish trust. We rebuilt the model to verify physics instead of biography.</p>
                     
                     <div className="space-y-4">
                         {[
                             "No biometrics stored",
                             "No behavioral profiling",
                             "No probabilistic scoring",
                             "No CAPTCHA logic"
                         ].map((item, i) => (
                             <div key={i} className="flex items-center gap-4 text-red-400/60 font-mono text-xs tracking-tight group/item">
                                 <span className="text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">✕</span> {item}
                             </div>
                         ))}
                     </div>
                 </div>

                 <div className="space-y-4 pt-12 md:pt-0 relative z-10">
                     {[
                         "Deterministic cryptographic proofs",
                         "Zero-Knowledge verification",
                         "Memory Cloaking (AES-256 RAM)",
                         "Deterministic Hashing (SHA-3)",
                         "Offline-validatable entropy",
                         "Audit-ready by design"
                     ].map((item, i) => (
                         <div key={i} className="flex items-center gap-4 text-emerald-500/80 font-mono text-xs font-black bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-500 group/sig">
                             <span className="text-lg group-hover/sig:scale-125 transition-transform duration-300">✓</span> {item}
                         </div>
                     ))}
                 </div>
            </div>
        </div>
      </motion.section>

      {/* Integration Code Section */}
      <motion.section 
        id="integration"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-40 px-4 relative overflow-hidden bg-black border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-8">
                <h2 className="text-5xl font-bold tracking-tighter">Integration in <span className="text-primary italic">seconds.</span></h2>
                <p className="text-gray-500 text-xl font-light">Built for high-security environments where verification must be instant, silent, and undeniable.</p>
                
                <div className="flex gap-4 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
                    <button 
                        onClick={() => setActiveSdk('presence')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSdk === 'presence' ? 'bg-primary text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                    >
                        Presence (Kernel)
                    </button>
                    <button 
                        onClick={() => setActiveSdk('media')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSdk === 'media' ? 'bg-sky-400 text-black shadow-[0_0_20px_rgba(56,189,248,0.3)]' : 'text-gray-500 hover:text-white'}`}
                    >
                        Media (Guaw)
                    </button>
                </div>

                <div className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className={`transition-all duration-500 w-1.5 h-1.5 rounded-full ${activeSdk === 'presence' ? 'bg-primary' : 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]'}`} /> Zero Personal Data Collection
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className={`transition-all duration-500 w-1.5 h-1.5 rounded-full ${activeSdk === 'presence' ? 'bg-primary' : 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]'}`} /> Native Web & Mobile SDKs
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className={`transition-all duration-500 w-1.5 h-1.5 rounded-full ${activeSdk === 'presence' ? 'bg-primary' : 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]'}`} /> Verifiable Fraud Proofs
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 w-full space-y-4">
                <AnimatePresence mode="wait">
                    {activeSdk === 'presence' ? (
                        <motion.div 
                            key="presence"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <CodeBlock 
                                language="bash"
                                code="npm install @guaw/kernel@^0.2.0"
                                filename="Terminal"
                                className="border-primary/20 shadow-[0_0_40px_-20px_rgba(58,134,255,0.2)]"
                            />
                            <CodeBlock 
                                language="typescript"
                                code={`import { Kernel } from '@guaw/kernel';\n\n// 1. Initialize (Client-Side)\nconst kernel = Kernel.init("pk_live_...");\n\n// 2. Verify Presence\nconst physics = await kernel.collect();\nconst result = await kernel.verify(physics, "nonce");\n\nif (result.verified) {\n  // Proceed: Physically Coherent\n}`}
                                filename="app.ts"
                                className="border-primary/10 shadow-[0_0_30px_-15px_rgba(58,134,255,0.1)]"
                            />
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="media"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <CodeBlock 
                                language="bash"
                                code="npm install @guaw/web-sdk@^1.5.0"
                                filename="Terminal"
                                className="border-sky-500/20 shadow-[0_0_40px_-20px_rgba(56,189,248,0.2)]"
                            />
                            <CodeBlock 
                                language="typescript"
                                code={`import { GuawClient } from '@guaw/web-sdk';\n\nconst guardian = new GuawClient({ apiKey: 'pk_live_...' });\n\n// Validate Media Integrity\nconst verdict = await guardian.verify(file, {\n  onProgress: (p) => console.log(\`\${p}%\`)\n});\n\nif (verdict.verdict === 'PHYSICALLY_COHERENT') {\n  // Pass: Not an AI generation\n}`}
                                filename="media.ts"
                                className="border-sky-500/10 shadow-[0_0_30px_-15px_rgba(56,189,248,0.1)]"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </motion.section>

      {/* Universal Integrity Domains */}
      <motion.section 
        id="use-cases"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-40 px-4 relative overflow-hidden bg-[#050505]"
      >
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-emerald-500/5 pointer-events-none" />
          
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(58,134,255,0.05),transparent_50%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-24 relative z-10">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                    Sovereign Application Protocol
                </div>
                <h2 className="text-5xl font-bold tracking-tighter uppercase">Universal <span className="text-gray-500">Integrity.</span></h2>
                <p className="text-gray-400 text-xl font-light max-w-3xl mx-auto leading-relaxed">
                    GUAW Guardians architecture verifies <strong className="text-white">physical behavior</strong> and <strong className="text-white">data integrity</strong> — not content or identity. This Makes it naturally scalable across any industry without compromising sovereignty.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { 
                        title: "Banking & Finance", 
                        icon: <SovereignGlyph type="argus" size={32} color="#10b981" />,
                        desc: "Digital onboarding without biometric storage. Forensic auditing of critical transactions with full traceability and remote KYC protection.",
                        color: "emerald"
                    },
                    { 
                        title: "Crypto & Web3", 
                        icon: <SovereignGlyph type="vanguard" size={32} color="#3a86ff" />,
                        desc: "Organic interaction confirmation for wallets. Protection of airdrops and staking from bots. Integrity verification in NFT minting.",
                        color: "primary"
                    },
                    { 
                        title: "Streaming & Live Commerce", 
                        icon: <SovereignGlyph type="lazarus" size={32} color="#fbbf24" />,
                        desc: "Real-time deepfake and bot detection with sub-ms latency. Verifiable analytics for marketplaces and technical content moderation.",
                        color: "secondary"
                    },
                    { 
                        title: "Digital Law & Forensics", 
                        icon: <SovereignGlyph type="ledger" size={32} color="#a855f7" />,
                        desc: "Generation of court-admissible evidence. Digital file chain of custody with cryptographic auditing and authenticity validation.",
                        color: "purple"
                    },
                    { 
                        title: "Gaming & Sony Ecosystem", 
                        icon: <SovereignGlyph type="cerberus" size={32} color="#9ca3af" />,
                        desc: "Fair matchmaking: verifies each player is human. Bot prevention in in-game economies and verification of original streaming clips.",
                        color: "gray"
                    },
                    { 
                        title: "IoT & Edge Devices", 
                        icon: <SovereignGlyph type="transmutator" size={32} color="#ef4444" />,
                        desc: "Certification of sensory data generated in industrial hardware. Protection against automated attacks in distributed networks.",
                        color: "red"
                    }
                ].map((item, i) => (
                    <div key={i} className="p-10 rounded-[2.5rem] bg-black/40 border border-white/5 hover:border-white/20 transition-all duration-700 group relative overflow-hidden backdrop-blur-3xl">
                        <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-${item.color}-500/5 transition-all duration-1000`} />
                        <div className="relative z-10">
                            <div className="mb-8 group-hover:scale-110 transition-transform duration-700 group-hover:rotate-6">{item.icon}</div>
                            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4 italic">{item.title}</h4>
                            <p className="text-gray-500 text-[11px] font-light leading-relaxed italic pr-4">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Strategic Summary Group */}
            <div className="p-12 rounded-[3.5rem] bg-gradient-to-br from-[#080808] to-black border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                    <SovereignGlyph type="cerberus" size={240} />
                </div>
                <div className="grid md:grid-cols-3 gap-12 relative z-10">
                    <div className="space-y-4">
                        <h5 className="text-primary font-black text-[10px] uppercase tracking-widest">GUAW Kernel</h5>
                        <p className="text-white font-bold text-lg leading-tight italic">Human presence and deterministic telemetry.</p>
                        <p className="text-gray-500 text-[10px] leading-relaxed">Ensures real organic interaction without behavioral profiling.</p>
                    </div>
                    <div className="space-y-4 border-l border-white/5 pl-12">
                        <h5 className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">GUAW Web SDK</h5>
                        <p className="text-white font-bold text-lg leading-tight italic">Physical media integrity verification.</p>
                        <p className="text-gray-500 text-[10px] leading-relaxed">AI manipulation and deepfake detection at the sensor level.</p>
                    </div>
                    <div className="space-y-4 border-l border-white/5 pl-12">
                        <h5 className="text-secondary font-black text-[10px] uppercase tracking-widest">Forensic Layer</h5>
                        <p className="text-white font-bold text-lg leading-tight italic">Forensic auditing and quality control.</p>
                        <p className="text-gray-500 text-[10px] leading-relaxed">Cryptographic chain of custody admissible in legal courts.</p>
                    </div>
                </div>
            </div>
        </div>
      </motion.section>

       {/* Trust & Transparency FAQ */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-40 px-4 relative z-10 border-t border-white/5 bg-[#050505] overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
        <div className="max-w-6xl mx-auto space-y-24">
           <div className="grid lg:grid-cols-2 gap-20 items-start">
                <div className="space-y-10 lg:sticky lg:top-40">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 text-emerald-500/70 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
                        Sovereign Proof
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-5xl font-black tracking-tighter uppercase relative">
                            Trust is <br/>
                            <span className="text-gray-700 italic">Deterministic.</span>
                            <div className="absolute -left-12 top-0 text-[10px] font-mono text-emerald-500/20 vertical-text hidden lg:block uppercase tracking-widest">COORDINATE 06</div>
                        </h2>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-lg italic">
                            GUAW is not built on policy promises, but on <strong className="text-white">technical architecture</strong> that prioritizes partner sovereignty and data minimization.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                        <div className="space-y-3">
                            <h4 className="text-white font-black text-[9px] uppercase tracking-[0.2em] italic">Minimalism</h4>
                            <p className="text-[10px] text-gray-500 font-light leading-relaxed">Device-agnostic signals only. No PII storage by default.</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-white font-black text-[9px] uppercase tracking-[0.2em] italic">Compliance</h4>
                            <p className="text-[10px] text-gray-500 font-light leading-relaxed">Audit-ready forensic trails compatible with global regulatory standards.</p>
                        </div>
                    </div>

                    <div className="flex gap-4 opacity-20 hover:opacity-100 transition-opacity duration-700">
                        <SovereignGlyph type="vanguard" size={24} />
                        <SovereignGlyph type="argus" size={24} />
                        <SovereignGlyph type="ledger" size={24} />
                    </div>
                </div>

                <div className="space-y-4">
                    <FAQItem 
              question="What exactly is the SAREI Kernel?"
              answer="It's a low-latency infrastructure layer that provides physics-based verification and auditability. It does not identify who you are; it verifies that someone real is present."
                        isOpen={openFaq === 0}
                        toggle={() => setOpenFaq(openFaq === 0 ? null : 0)}
                    />
                    
                    <FAQItem 
                        question="Data Sovereignty: Who owns the record?" 
                        answer={<span>The partner owns their operational data. SAREI acts solely as a <strong className="text-white">technical steward</strong>, preserving integrity and auditability without asserting ownership.</span>}
                        isOpen={openFaq === 1}
                        toggle={() => setOpenFaq(openFaq === 1 ? null : 1)}
                    />

                    <FAQItem 
                        question="Why prioritize Fail-Closed logic?" 
                        answer="Because integrity precedes availability. When verification confidence degrades, the system blocks by design to prevent record corruption."
                        isOpen={openFaq === 2}
                        toggle={() => setOpenFaq(openFaq === 2 ? null : 2)}
                    />

                    <FAQItem 
                        question="Is there an exit strategy?" 
                        answer="Yes. Service termination is supported at any time. Operational access is revoked and data handling follows the defined sovereign retention protocol."
                        isOpen={openFaq === 3}
                        toggle={() => setOpenFaq(openFaq === 3 ? null : 3)}
                    />

                    <FAQItem 
              question="Can SAREI be used outside traditional web applications?"
        answer="Yes. SAREI is not web-specific. It is a low-latency verification layer designed for any interactive system where distinguishing organic presence from synthetic execution is critical. Integration models vary depending on the environment."
                        isOpen={openFaq === 4}
                        toggle={() => setOpenFaq(openFaq === 4 ? null : 4)}
                    />

                    <FAQItem 
                        question="SAREI Kernel vs. Optical Guardian: What's the difference?"
                        answer={<span>The <strong className="text-white">SAREI Kernel</strong> verifies Human Presence (liveness and micro-interaction) to prevent bots. The <strong className="text-white">Optical Guardian</strong> verifies Media Integrity (detecting AI/deepfakes) by analyzing sensor-level physics. They work together for a complete integrity stack.</span>}
                        isOpen={openFaq === 5}
                        toggle={() => setOpenFaq(openFaq === 5 ? null : 5)}
                    />

                    <FAQItem 
                        question="Does Guaw Guardian store my media files?" 
                        answer="No. By default, the Optical Guardian performs sensor-noise analysis locally or via transient streams. We only store the ZK-Integrity Hash (the 'Forensic Evidence') to prove the media was real at the moment of capture, without maintaining the original content."
                        isOpen={openFaq === 6}
                        toggle={() => setOpenFaq(openFaq === 6 ? null : 6)}
                    />

                    <FAQItem 
                        question="Infrastructure vs. Enterprise: Which do I need?" 
                        answer="Infrastructure Tiers are for self-service developers who need API access. Enterprise Solutions are for high-responsibility environments that require dedicated hardware, custom ZK-Proof workflows, and Forensic Support SLAs for legal admissibility."
                        isOpen={openFaq === 7}
                        toggle={() => setOpenFaq(openFaq === 7 ? null : 7)}
                    />
                </div>
           </div>
        </div>
      </motion.section>

      {/* Infrastructure Tiers (for Developers/Startups) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-40 px-4 relative z-10 border-t border-white/5 bg-[#050505]"
      >
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto space-y-20">
            <div className="text-center space-y-6 max-w-3xl mx-auto relative group">
                <div className="absolute -left-12 top-0 text-[10px] font-mono text-white/5 vertical-text hidden lg:block">COORDINATE 05</div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <span className="text-[9px] font-black font-mono text-gray-400 uppercase tracking-widest">Pricing Architecture</span>
                </div>
                <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">Infrastructure <span className="text-gray-700 italic">Tiers</span></h2>
                <p className="text-gray-500 text-xl font-light leading-relaxed italic">
                    Access the sovereign platform with <strong className="text-white">metrical scalability</strong>.
                </p>
            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 7-Day Free Trial */}
                <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6 group hover:border-white/20 transition-all duration-700 flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="space-y-3 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-gray-500 text-[8px] font-black uppercase tracking-widest border border-white/10">
                            Evaluation Unit
                        </div>
                        <h3 className="text-2xl font-black text-white italic">7-Day Trial</h3>
                        <p className="text-gray-600 text-[10px] leading-relaxed italic uppercase tracking-tighter">Evaluation of presence & media logic.</p>
                    </div>
                    <div className="flex items-baseline gap-1 relative z-10">
                        <span className="text-4xl font-black text-white tracking-tighter">$0</span>
                    </div>
                    <ul className="space-y-4 text-[10px] text-gray-500 border-t border-white/5 pt-8 flex-1 relative z-10">
                        <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> Full Kernel Access</li>
                        <li className="flex items-center gap-3 line-through opacity-30 italic"><FileCheck size={14} /> Base Chain</li>
                        <li className="flex items-center gap-3 line-through opacity-30 italic"><FileCheck size={14} /> Forensic Chain</li>
                    </ul>
                    <Link to="/dashboard" className="block w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-center text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all relative z-10">
                        Initialize
                    </Link>
                </div>

                {/* Developer Core */}
                <div className="p-8 rounded-[3rem] bg-black/40 border border-primary/30 shadow-[0_0_100px_-50px_rgba(58,134,255,0.3)] space-y-6 group relative overflow-hidden flex flex-col scale-[1.05] z-10 backdrop-blur-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 transition-opacity duration-1000" />
                    <div className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
                    
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                         <SovereignGlyph type="vanguard" size={80} color="#3a86ff" />
                    </div>
                    <div className="space-y-3 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/30">
                            Protocol Standard
                        </div>
                        <h3 className="text-2xl font-black text-white italic">Developer Core</h3>
                        <p className="text-primary/70 text-[10px] leading-relaxed italic uppercase tracking-tighter">Production integrity for scalable apps.</p>
                    </div>
                    <div className="flex items-baseline gap-1 relative z-10">
                        <span className="text-4xl font-black text-white tracking-tighter">$39</span>
                        <span className="text-gray-600 font-black text-[10px] italic">/MO</span>
                    </div>
                    <ul className="space-y-4 text-[10px] text-gray-300 border-t border-white/10 pt-8 relative z-10 flex-1">
                        <li className="flex items-center gap-3 italic"><FileCheck size={16} className="text-primary" /> <span className="font-black uppercase">Base Chain Active</span></li>
                        <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(58,134,255,0.8)]" /> PQ-Ready Signing</li>
                        <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(58,134,255,0.8)]" /> Full SDK Access</li>
                    </ul>
                    <Link to="/dashboard" className="block w-full py-5 rounded-2xl bg-primary text-black font-black text-center text-[10px] uppercase tracking-widest hover:scale-[1.05] transition-all relative z-10 shadow-[0_10px_40px_-10px_rgba(58,134,255,0.5)]">
                        Deploy Core
                    </Link>
                </div>

                {/* Infra Business */}
                <div className="p-8 rounded-[3rem] bg-black/40 border border-secondary/20 space-y-6 group hover:border-secondary/50 transition-all duration-700 flex flex-col relative overflow-hidden backdrop-blur-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="space-y-3 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[8px] font-black uppercase tracking-widest border border-secondary/20">
                            Maximum Auditability
                        </div>
                        <h3 className="text-2xl font-black text-white italic">Infra Business</h3>
                        <p className="text-secondary/70 text-[10px] leading-relaxed italic uppercase tracking-tighter">Forensic grade auditing & legal trace.</p>
                    </div>
                    <div className="flex items-baseline gap-1 relative z-10">
                        <span className="text-4xl font-black text-white tracking-tighter">$149</span>
                        <span className="text-gray-600 font-black text-[10px] italic">/MO</span>
                    </div>
                    <ul className="space-y-4 text-[10px] text-gray-400 border-t border-secondary/10 pt-8 flex-1 relative z-10">
                        <li className="flex items-center gap-3 italic"><FileCheck size={16} className="text-secondary" /> <span className="font-black uppercase">Base Chain Active</span></li>
                        <li className="flex items-center gap-3 italic"><SovereignGlyph type="ledger" size={20} color="#fbbf24" /> <span className="text-secondary font-black uppercase">Forensic Chain Active</span></li>
                        <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-secondary shadow-[0_0_8px_rgba(251,191,36,0.5)]" /> Forensic Export</li>
                    </ul>
                    <Link to="/dashboard" className="block w-full py-5 rounded-2xl bg-secondary text-black font-black text-center text-[10px] uppercase tracking-widest hover:scale-[1.05] transition-all relative z-10 shadow-[0_10px_40px_-10px_rgba(251,191,36,0.3)]">
                        Go Business
                    </Link>
                </div>

                {/* Enterprise */}
                <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6 group hover:border-white/20 transition-all duration-700 flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-5 transition-opacity">
                        <SovereignGlyph type="cerberus" size={120} color="#9ca3af" />
                    </div>
                    <div className="space-y-3 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-gray-400 text-[8px] font-black uppercase tracking-widest border border-white/10">
                            Custom Solution
                        </div>
                        <h3 className="text-2xl font-black text-white italic">Enterprise</h3>
                        <p className="text-gray-600 text-[10px] leading-relaxed italic uppercase tracking-tighter">Sovereign infrastructure for institutions.</p>
                    </div>
                    <div className="flex items-baseline gap-1 relative z-10">
                        <span className="text-3xl font-black text-white tracking-tighter">Custom</span>
                    </div>
                    <ul className="space-y-4 text-[10px] text-gray-500 border-t border-white/5 pt-8 flex-1 relative z-10">
                        <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> Legal Witness SLA</li>
                        <li className="flex items-center gap-3 italic"><span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" /> <span className="text-red-500 font-black uppercase">Tier P: Sovereign Reality</span></li>
                    </ul>
                    <Link to="/contact" className="block w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-center text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all relative z-10">
                        Consultation
                    </Link>
                </div>
            </div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-48 px-4 relative flex flex-col items-center justify-center border-t border-white/5 overflow-hidden bg-black"
      >
          {/* Technical Background Atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute -inset-x-full bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent animate-[shimmer_4s_infinite]" />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center space-y-12"
          >
              <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 text-emerald-500/70 text-[10px] font-black uppercase tracking-[0.3em] border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                      Final Initialization
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase max-w-5xl leading-[0.9]">
                    Deploy the<br/>
                    <span className="text-emerald-500/90 italic drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">Sovereign Standard.</span>
                  </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/dashboard" className="relative group px-12 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs overflow-hidden transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]">
                   <span className="relative z-10 group-hover:text-white transition-colors duration-500">Access Dashboard</span>
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                   <div className="absolute -inset-1 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <button 
                    onClick={() => window.location.href='mailto:enterprise@guaw.app'} 
                    className="px-12 py-6 rounded-2xl bg-black/40 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 hover:border-white/30 transition-all backdrop-blur-3xl relative group overflow-hidden"
                >
                   <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                   Enterprise SLA
                </button>
              </div>

              <div className="pt-24 flex flex-wrap justify-center items-center gap-16 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                  <div className="flex items-center gap-4 group/logo">
                    <img src="/mercadopago-logo.png" alt="MP Approved" className="h-4 group-hover/logo:scale-110 transition-transform" />
                    <span className="text-[9px] font-mono tracking-[0.2em] text-gray-500 uppercase italic">MP Gateway SEAL</span>
                  </div>
                  <div className="flex items-center gap-4 group/logo">
                    <img src="/usdt-logo.png" alt="USDT Stable" className="h-6 group-hover/logo:scale-110 transition-transform" />
                    <span className="text-[9px] font-mono tracking-[0.2em] text-gray-500 uppercase italic">ATOMIC USDT PROOF</span>
                  </div>
                  <div className="flex items-center gap-4 group/logo">
                      <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/logo:border-emerald-500/50 transition-colors">
                        <CreditCard size={14} className="group-hover/logo:text-emerald-500" />
                      </div>
                      <span className="text-[9px] font-mono tracking-[0.2em] text-gray-500 uppercase italic">PCI-DSS STEWARD</span>
                  </div>
              </div>
          </motion.div>
      </motion.section>

      {/* Sovereign Footer */}
      <footer className="py-20 px-4 border-t border-white/5 bg-black text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">
                <Link to="/legal" className="hover:text-primary transition-colors">Liability Protocol & SLA</Link>
                <Link to="/legal" className="hover:text-primary transition-colors">Sovereign Privacy Standard</Link>
                <span className="h-1 w-1 rounded-full bg-gray-600 hidden md:block"></span>
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#3a86ff]" />
                    K_STATUS: OPTIMAL
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    CORE: SEALED
                </span>
            </div>
            
            <div className="space-y-6">
                <p className="text-[9px] text-gray-600 leading-relaxed font-mono max-w-lg mx-auto">
                    GUAW SAS™ SOVEREIGN PROTOCOL. ARCHIVED RECORD: 2026.01.PFC. <br/>
                    ALL SYSTEM ACTIONS ARE LOGGED IN THE IMMUTABLE TECHNICAL LEDGER.
                    <br/>
                    <span className="text-gray-500 italic block mt-2">
                        Forensic sealing and axiomatic governance are activated only after Genesis initialization.
                    </span>
                    <br/>
                    <span className="opacity-70">GUAW is a deterministic integrity infrastructure. It does not provide identity, analytics, profiling, or behavioral scoring.</span>
                    <br/>
                    <br/>
                    Guaw® & Patent Filed INPI Exp. 20260100161.
                    <br/>
                    Copyright © 2026. All Rights Reserved.
                    <br/>
                    <br/>
                    <br/>
                    <span className="text-[9px] text-gray-500 opacity-70 hover:opacity-100 transition-opacity cursor-help" title="Access via Institutional Pipeline">
                        ENGINEERING REFERENCE MATERIAL: Conceptual analyses and validation indices available under institutional access.
                    </span>
                    <br/>
                    <motion.span 
                        animate={{ 
                            color: ['#1f2937', '#3a86ff', '#1f2937'],
                            textShadow: [
                                '0 0 0px rgba(58,134,255,0)', 
                                '0 0 8px rgba(58,134,255,0.4)', 
                                '0 0 0px rgba(58,134,255,0)'
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="italic mt-4 block font-medium"
                    >
                        Physics is the final firewall.
                    </motion.span>
                </p>
                <div className="flex justify-center gap-8 opacity-10">
                    <Cpu size={12} />
                    <Globe size={12} />
                    <Fingerprint size={12} />
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};
