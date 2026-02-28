import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { SovereignGlyph, type SovereignGlyphType } from '../../components/ui/SovereignGlyph';

export const KYCVerificationPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />
      </div>
      
      {/* Navigation */}
      <nav className="p-6 border-b border-white/5 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-emerald-400 transition-colors uppercase tracking-widest">
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 transition-colors">
               <ArrowLeft size={16} />
            </div>
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 opacity-50">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-mono text-emerald-500 uppercase">Enterprise Solution</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-10 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <SovereignGlyph type="argus" size={32} color="#10b981" />
            <span className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] italic">Argus Protocol v1.0</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter">
            Video <span className="text-emerald-400">Verification</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Verify video selfies and documents without storing biometric data. 
            <strong className="text-white"> Zero-Knowledge proofs</strong> ensure privacy while maintaining compliance.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=KYC Enterprise Inquiry'}
              className="px-8 py-4 rounded-xl bg-emerald-500 text-black font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
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

        {/* Problem Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-20 p-10 rounded-3xl bg-red-500/5 border border-red-500/10"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">The Problem</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-400">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Traditional KYC is Broken</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Deepfakes bypass video verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Biometric data stored = privacy risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Manual review = slow & expensive</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Regulatory Pressure</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>GDPR requires data minimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>CCPA mandates user consent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>AML/KYC compliance is mandatory</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Solution Section */}
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
                glyph: "argus",
                title: "Physical Liveness",
                description: "Analyzes thermal noise and spectral sensor density to detect synthetic execution. Assert presence, not data."
              },
              {
                glyph: "cerberus",
                title: "Zero-Knowledge Proofs",
                description: "Generates deterministic integrity certificates without exposing biometric data. GDPR Sovereign compliant."
              },
              {
                glyph: "vanguard",
                title: "Edge Verification",
                description: "Processes signal entropy locally on the hardware layer. Only metrics are transmitted to the anchor."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all group overflow-hidden relative">
                <div className="absolute -top-4 -right-4 opacity-5">
                   <SovereignGlyph type={item.glyph as SovereignGlyphType} size={120} color="#10b981" />
                </div>
                <div className="mb-6 group-hover:scale-110 transition-transform relative z-10">
                   <SovereignGlyph type={item.glyph as SovereignGlyphType} size={48} color="#10b981" />
                </div>
                <h3 className="text-white font-black text-xs uppercase tracking-widest italic mb-4">{item.title}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed italic">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { glyph: "sun", title: "Video Liveness Audit", desc: "Detects temporal synthetic drifts in real-time capture" },
              { glyph: "ledger", title: "Axiomatic Documentation", desc: "Verifies digital paper-trails and institutional records" },
              { glyph: "cerberus", title: "ZK-Proof Integrity", desc: "Deterministic signatures without raw biometric storage" },
              { glyph: "world", title: "GDPR Sovereign Compliance", desc: "Technically enforced data minimization protocol" },
              { glyph: "vanguard", title: "Sovereign SDK", desc: "Institutional nodes for React, iOS, and Android systems" },
              { glyph: "intersection", title: "Sub-100ms Interrogation", desc: "Instant verification through physical noise analysis" }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
                   <SovereignGlyph type={feature.glyph as SovereignGlyphType} size={28} color="#10b981" />
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
              { title: "Institutional Banking", desc: "Onboard accounts with Zero-Biometric KYC.", glyph: "ledger" },
              { title: "Sovereign Fintech", desc: "Verify sub-ms transactions with presence logic.", glyph: "vanguard" },
              { title: "Governance Platforms", desc: "Comply with AML audits via ZK-Proof anchors.", glyph: "world" }
            ].map((useCase, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/5 to-transparent border border-white/5 text-center group hover:border-emerald-500/30 transition-all">
                <div className="flex justify-center mb-8 group-hover:scale-110 transition-transform">
                   <SovereignGlyph type={useCase.glyph as SovereignGlyphType} size={64} color="#10b981" />
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
          className="mb-20 p-12 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Enterprise Pricing</h2>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl font-mono font-black text-white">$5,000</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-emerald-400 font-mono text-sm mt-2">+ $0.10 per verification</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              "SDK (Web + Mobile)",
              "API access",
              "99.9% SLA",
              "Dedicated support",
              "ZK-Proof certificates",
              "GDPR compliance tools"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="text-emerald-400" size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=KYC Enterprise Inquiry'}
              className="px-12 py-4 rounded-xl bg-emerald-500 text-black font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              Contact Sales
            </button>
          </div>
        </motion.div>

        {/* Integration Example */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Integration Example</h2>
          <div className="p-8 rounded-2xl bg-black/50 border border-white/10 font-mono text-sm">
            <pre className="text-gray-300 overflow-x-auto">
{`// Client-side (React)
import { GUAW } from '@guaw/web-sdk';

GUAW.init({ apiKey: 'pk_live_...' });

async function verifyKYC(videoFile) {
  const result = await GUAW.verify(videoFile, {
    type: 'kyc-video',
    onProgress: (p) => console.log(\`\${p}%\`)
  });
  
  if (result.verdict === 'VERIFIED_ORGANIC') {
    // Approve KYC
    await approveUser(result.certificateId);
  }
}`}
            </pre>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center p-12 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 border border-emerald-500/20"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join leading banks and fintechs using GUAW for secure, privacy-first KYC verification.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=KYC Enterprise Inquiry'}
              className="px-8 py-4 rounded-xl bg-emerald-500 text-black font-black hover:scale-[1.02] transition-all"
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
