import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { SovereignGlyph, type SovereignGlyphType } from '../../components/ui/SovereignGlyph';

export const ForensicSuitePage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500 selection:text-black relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />
      </div>
      
      {/* Navigation */}
      <nav className="p-6 border-b border-white/5 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest">
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/20 transition-colors">
               <ArrowLeft size={16} />
            </div>
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 opacity-50">
             <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
             <span className="text-[10px] font-mono text-purple-500 uppercase">Enterprise Solution</span>
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
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-10 shadow-[0_0_30px_rgba(251,191,36,0.1)]">
            <SovereignGlyph type="ledger" size={32} color="#fbbf24" />
            <span className="text-xs font-black text-secondary uppercase tracking-[0.3em] italic">Forensic Suite v1.0</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter">
            Digital <span className="text-purple-400">Forensics</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Court-admissible evidence validation with <strong className="text-white">chain of custody</strong> and expert witness reports.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=Forensic Suite Inquiry'}
              className="px-8 py-4 rounded-xl bg-purple-500 text-black font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            >
              Contact Sales
            </button>
            <Link 
              to="/console/login"
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
            >
              Request Analysis
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
              <h3 className="text-lg font-bold text-white mb-2">Digital Evidence is Fragile</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Deepfakes can fabricate evidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Metadata is easily manipulated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Chain of custody is hard to prove</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Legal Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Courts require expert testimony</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Evidence must be tamper-proof</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Analysis must be reproducible</span>
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
                glyph: "ledger",
                title: "Axiomatic Evidence",
                description: "Deterministic forensic reports powered by physical signal invariants and legal terminology."
              },
              {
                glyph: "argus",
                title: "Immutable Chain",
                description: "Atomic cryptographic trail documenting every Genesis event from capture to court."
              },
              {
                glyph: "aegis",
                title: "Legal Admissibility",
                description: "Expert witness support and metadata sealing formatted for institutional litigation."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-secondary/30 transition-all group overflow-hidden relative">
                <div className="absolute -top-4 -right-4 opacity-5">
                   <SovereignGlyph type={item.glyph as SovereignGlyphType} size={120} color="#fbbf24" />
                </div>
                <div className="mb-6 group-hover:scale-110 transition-transform relative z-10">
                   <SovereignGlyph type={item.glyph as SovereignGlyphType} size={48} color="#fbbf24" />
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
              { glyph: "transmutator", title: "Expert Signal Extraction", desc: "Detailed forensic entropy logs by certified analysts" },
              { glyph: "ledger", title: "Court-Sealed Reports", desc: "Axiomatic documentation for legal proceedings" },
              { glyph: "cerberus", title: "Atomic Chain of Custody", desc: "Immutable ZK-Integrity Hash sequence" },
              { glyph: "argus", title: "Certified Testimony", desc: "Expert witness support for presence validation" },
              { glyph: "world", title: "Institutional Compliance", desc: "SOC 2 Type II Sovereign Auditing standards" },
              { glyph: "aegis", title: "Post-Processing Audit", desc: "Detects any synthetic interference in the pipeline" }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                <div className="p-3 rounded-xl bg-secondary/5 border border-secondary/10 group-hover:border-secondary/30 transition-all">
                   <SovereignGlyph type={feature.glyph as SovereignGlyphType} size={28} color="#fbbf24" />
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
              { title: "Law Firms", desc: "Axiomatic evidence for deepfake litigation.", glyph: "ledger" },
              { title: "Intelligence", desc: "Investigation of synthetic presence fraud.", glyph: "argus" },
              { title: "Government", desc: "State-level integrity validation audits.", glyph: "cerberus" }
            ].map((useCase, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-gradient-to-br from-secondary/5 to-transparent border border-white/5 text-center group hover:border-secondary/30 transition-all">
                <div className="flex justify-center mb-8 group-hover:scale-110 transition-transform">
                   <SovereignGlyph type={useCase.glyph as SovereignGlyphType} size={64} color="#fbbf24" />
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
          className="mb-20 p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Pricing</h2>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl font-mono font-black">$500 - $5K</span>
            </div>
            <p className="text-purple-400 font-mono text-sm mt-2">per case (based on complexity)</p>
            <p className="text-gray-500 text-xs mt-4">Subscription: $10,000/mo for unlimited cases</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              "Expert analysis",
              "Court reports (PDF + JSON)",
              "Chain of custody",
              "Witness testimony",
              "Legal certifications",
              "24-72h turnaround"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="text-purple-400" size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=Forensic Suite Inquiry'}
              className="px-12 py-4 rounded-xl bg-purple-500 text-black font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]"
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
{`// Submit evidence for forensic analysis
const analysis = await GUAW.forensic.analyze({
  evidenceFile: video,
  caseId: 'CASE-2026-001',
  requestedBy: 'Detective Smith',
  urgency: 'high'
});

// Download court report
const report = await GUAW.forensic.downloadReport(analysis.id, {
  format: 'legal-pdf',
  includeChainOfCustody: true,
  includeExpertSignature: true
});

// Verify chain of custody
const custody = await GUAW.forensic.verifyChainOfCustody(analysis.id);
console.log(custody.isValid); // true`}
            </pre>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center p-12 rounded-3xl bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10 border border-purple-500/20"
        >
          <h2 className="text-4xl font-bold mb-4">Need Expert Analysis?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join law firms and investigators using GUAW for court-admissible digital forensics.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=Forensic Suite Inquiry'}
              className="px-8 py-4 rounded-xl bg-purple-500 text-black font-black hover:scale-[1.02] transition-all"
            >
              Submit Evidence
            </button>
            <Link 
              to="/console/login"
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
            >
              Request Quote
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
