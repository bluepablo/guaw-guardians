import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { SovereignGlyph } from '../../components/ui/SovereignGlyph';

export const ContentModerationPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.05),transparent_70%)]" />
      </div>
      
      {/* Navigation */}
      <nav className="p-6 border-b border-white/5 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-amber-400 transition-colors uppercase tracking-widest">
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-amber-500/20 transition-colors">
               <ArrowLeft size={16} />
            </div>
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 opacity-50">
             <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
             <span className="text-[10px] font-mono text-amber-500 uppercase">Enterprise Solution</span>
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
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-10 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <SovereignGlyph type="aegis" size={32} color="#a855f7" />
            <span className="text-xs font-black text-purple-400 uppercase tracking-[0.3em] italic">Aegis Protocol v1.0</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter">
            Platform-Wide <span className="text-amber-400">Detection</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Automated synthetic content detection for social platforms. 
            <strong className="text-white"> Batch processing</strong> with custom rulesets.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=Content Moderation Inquiry'}
              className="px-8 py-4 rounded-xl bg-amber-500 text-black font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)]"
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
              <h3 className="text-lg font-bold text-white mb-2">Synthetic Content Flood</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>AI-generated spam and misinformation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Deepfake profile pictures and videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Automated bot accounts</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Manual Moderation Fails</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Too slow for real-time platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Expensive at scale (millions of posts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Inconsistent human judgment</span>
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
                glyph: "aegis",
                title: "Organic Verification",
                description: "Automatically cross-references physical noise signatures against organic signal baselines in real-time."
              },
              {
                glyph: "ledger",
                title: "Mass Scale Auditing",
                description: "Process millions of Genesis events per day with parallel ZK-Interrogation layers and batch sealing."
              },
              {
                glyph: "cerberus",
                title: "Deterministic Flags",
                description: "Hardened moderation policies enforced by physical invariants, eliminating human bias and AI hallucinations."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all group overflow-hidden relative">
                <div className="absolute -top-4 -right-4 opacity-5">
                   <SovereignGlyph type={item.glyph as any} size={120} color="#a855f7" />
                </div>
                <div className="mb-6 group-hover:scale-110 transition-transform relative z-10">
                   <SovereignGlyph type={item.glyph as any} size={48} color="#a855f7" />
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
              { glyph: "aegis", title: "Automated Organic Auditing", desc: "Auto-flag synthetic presence profiles for institutional review" },
              { glyph: "ledger", title: "Genesis Event Verification", desc: "Process millions of signal anchors per diurnal cycle" },
              { glyph: "sun", title: "Axiomatic API Access", desc: "Institutional nodes for seamless platform integration" },
              { glyph: "vanguard", title: "Sovereign Rule-Injection", desc: "Define custom moderation policies at the hardware layer" },
              { glyph: "argus", title: "Temporal Drift Alerts", desc: "Instant notifications for high-risk synthetic anomalies" },
              { glyph: "world", title: "Scale-Invariant Oversight", desc: "Review flagged existence events with atomic technical context" }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 group-hover:border-purple-500/30 transition-all">
                   <SovereignGlyph type={feature.glyph as any} size={28} color="#a855f7" />
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
              { title: "Social Platforms", desc: "Detect synthetic profiles and deepfake misinformation.", glyph: "aegis" },
              { title: "Global Marketplaces", desc: "Axiomatic verification of product signal integrity.", glyph: "ledger" },
              { title: "Institutional Forums", desc: "Combat synthetic existence and bot-driven anomalies.", glyph: "cerberus" }
            ].map((useCase, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-gradient-to-br from-purple-500/5 to-transparent border border-white/5 text-center group hover:border-purple-500/30 transition-all">
                <div className="flex justify-center mb-8 group-hover:scale-110 transition-transform">
                   <SovereignGlyph type={useCase.glyph as any} size={64} color="#a855f7" />
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
          className="mb-20 p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Enterprise Pricing</h2>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl font-mono font-black">$3,000</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-amber-400 font-mono text-sm mt-2">+ $0.02 per file processed</p>
            <p className="text-gray-500 text-xs mt-4">Batch discounts available for &gt;1M files/month</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              "Automated flagging",
              "Batch processing API",
              "Custom rulesets",
              "Moderation dashboard",
              "Real-time alerts",
              "99.9% SLA"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="text-amber-400" size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=Content Moderation Inquiry'}
              className="px-12 py-4 rounded-xl bg-amber-500 text-black font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)]"
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
{`// Process batch of uploaded files
const batch = await GUAW.moderation.processBatch({
  files: uploadedFiles,
  rules: {
    autoFlag: true,
    threshold: 0.9,
    notifyModerators: true
  }
});

// Handle results
batch.results.forEach(result => {
  if (result.verdict === 'SYNTHETIC_DETECTED') {
    // Add to moderation queue
    moderationQueue.add({
      fileId: result.fileId,
      confidence: result.confidence,
      reason: result.reason
    });
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
          className="text-center p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 border border-amber-500/20"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Automate Moderation?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join leading platforms using GUAW for automated content moderation at scale.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=Content Moderation Inquiry'}
              className="px-8 py-4 rounded-xl bg-amber-500 text-black font-black hover:scale-[1.02] transition-all"
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
