import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Globe, ArrowRight, AlertCircle } from 'lucide-react';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { FloatingLoginButton } from '../../components/ui/FloatingLoginButton';
import { CodeBlock } from '../../components/ui/CodeBlock';

export const VsRecaptchaPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-black relative font-sans overflow-x-hidden">
      <ParticlesBackground />
      <FloatingLoginButton />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest"
          >
            <AlertCircle size={12} />
            reCAPTCHA Free Tier Reduced by 99% in 2025
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none"
          >
            The Ultimate <span className="text-primary">reCAPTCHA</span><br />
            Alternative.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Google just reduced the reCAPTCHA free tier from 1,000,000 to 10,000 monthly verifications. 
            Stop paying for user tracking. Switch to <span className="text-white font-bold">GUAW</span>—the zero-knowledge verifier that values physics over profiling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <Link to="/console/register" className="px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-primary transition-all">
                Start Free Migration
            </Link>
            <a href="#comparison" className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-3">
                See Comparison <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section id="comparison" className="py-32 px-4 relative z-10 bg-black/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto space-y-20">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
                    <Zap className="text-primary" size={32} />
                    <h3 className="text-2xl font-bold italic uppercase tracking-tighter">Sub-11ms Latency</h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                        While reCAPTCHA requires server-side rounds that can take up to 2 seconds, GUAW verifies physical invariants on the client-side in less than 11ms.
                    </p>
                </div>
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
                    <Shield className="text-emerald-400" size={32} />
                    <h3 className="text-2xl font-bold italic uppercase tracking-tighter">Zero-Knowledge</h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                        reCAPTCHA harvests mouse movements, cookies, and browsing history. GUAW uses ZK-SNARKs to prove physical laws without seeing any user data.
                    </p>
                </div>
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
                    <Globe className="text-blue-400" size={32} />
                    <h3 className="text-2xl font-bold italic uppercase tracking-tighter">Post-GDPR Ready</h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                        Eliminate the need for CAPTCHA-related privacy consent banners. Our verification is mathematically private and jurisdiction-agnostic.
                    </p>
                </div>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-[3rem] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/[0.02]">
                            <th className="py-8 px-10 text-[10px] uppercase tracking-widest text-gray-500 font-black italic">Dimension</th>
                            <th className="py-8 px-10 text-[10px] uppercase tracking-widest text-primary font-black italic">GUAW</th>
                            <th className="py-8 px-10 text-[10px] uppercase tracking-widest text-gray-500 font-black italic">reCAPTCHA v3</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light">
                        <tr className="border-b border-white/5">
                            <td className="py-8 px-10 text-gray-400 font-mono text-xs uppercase">Verification Source</td>
                            <td className="py-8 px-10 text-white font-bold italic">Hardware Physical Invariants</td>
                            <td className="py-8 px-10 text-gray-500">Browser Behavior & Cookies</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="py-8 px-10 text-gray-400 font-mono text-xs uppercase">Avg. Latency</td>
                            <td className="py-8 px-10 text-emerald-400 font-bold">11ms (p50)</td>
                            <td className="py-8 px-10 text-red-500/70">200ms - 2,500ms</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="py-8 px-10 text-gray-400 font-mono text-xs uppercase">Data Storage</td>
                            <td className="py-8 px-10 text-white font-bold italic text-emerald-500">None (Zero Bytes)</td>
                            <td className="py-8 px-10 text-gray-500">Full PII Profile stored by Google</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="py-8 px-10 text-gray-400 font-mono text-xs uppercase">Free Tier (2025)</td>
                            <td className="py-8 px-10 text-white font-bold italic">15,000/mo included (Trial)</td>
                            <td className="py-8 px-10 text-red-500 font-black uppercase">10,000/mo (Max)</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="py-8 px-10 text-gray-400 font-mono text-xs uppercase">100,000 Requests</td>
                            <td className="py-8 px-10 text-emerald-400 font-black text-xl italic">$39 / month (Lite)</td>
                            <td className="py-8 px-10 text-red-500 font-black">$90 / month (Enterprise)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </section>

      {/* Migration Section */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">Migration in 3 Steps</h2>
                <p className="text-gray-500 font-light">Switch your entire infra in under 10 minutes.</p>
            </div>

            <div className="space-y-12">
                <div className="flex gap-8 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black italic group-hover:scale-110 transition-transform">1</div>
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold uppercase tracking-tighter">Install the Kernel</h4>
                        <CodeBlock language="bash" code="npm install @guaw/kernel" filename="Terminal" />
                    </div>
                </div>
                <div className="flex gap-8 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black italic group-hover:scale-110 transition-transform">2</div>
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold uppercase tracking-tighter">Initialize Client</h4>
                        <CodeBlock language="typescript" code={`import { Kernel } from '@guaw/kernel';\n\nKernel.init({ apiKey: "GUAW_PUBLIC_KEY" });`} filename="index.ts" />
                    </div>
                </div>
                <div className="flex gap-8 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black italic group-hover:scale-110 transition-transform">3</div>
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold uppercase tracking-tighter">Verify on Server</h4>
                        <p className="text-gray-500 text-sm italic">Replace your reCAPTCHA siteverify endpoint call with our secure attestation verifyer.</p>
                        <CodeBlock language="typescript" code={`const result = await guaw.verifyAttestation(token);\nif (result.is_human) {\n  // Success\n}`} filename="api/auth.ts" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-4 relative z-10 overflow-hidden text-center bg-primary/5">
        <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">Stop tracking.<br />Start verifying.</h2>
            <p className="text-gray-400 text-xl font-light">Join the 100+ projects that have already migrated to GUAW.</p>
            <div className="flex justify-center gap-6">
                 <Link to="/console/register" className="px-12 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]">
                    Create Free Account
                </Link>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-white/5 relative z-10 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 opacity-50">
             <div className="flex items-center gap-4">
                <img src="/guaw-cerberus-s.png" alt="GUAW" className="w-8 h-8 grayscale" />
                <span className="font-black italic text-xs uppercase tracking-[0.2em]">GUAW GUARDIANS</span>
             </div>
             <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <Link to="/docs" className="hover:text-primary transition-colors">Docs</Link>
                <Link to="/legal" className="hover:text-primary transition-colors">Privacy</Link>
             </div>
             <div className="text-[10px] font-mono uppercase tracking-[0.2em]">© 2026 Sovereign Physics</div>
        </div>
      </footer>
    </div>
  );
};
