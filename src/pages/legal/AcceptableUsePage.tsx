import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Cpu, Share2, Ban, Gavel, FileText } from 'lucide-react';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';

export const AcceptableUsePage = () => {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <ParticlesBackground />
            
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link to="/legal" className="flex items-center gap-2 group">
                        <ArrowLeft size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                        <span className="font-mono text-sm uppercase tracking-tighter text-gray-400 group-hover:text-white transition-colors">Return to Legal</span>
                    </Link>
                    <div className="flex items-center gap-3">
                         <ShieldAlert className="text-red-500" size={24} />
                         <span className="font-bold tracking-widest uppercase text-sm">GUAW™ Acceptable Use Policy</span>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24 px-4 max-w-4xl mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-16"
                >
                    {/* Intro */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-2">
                             <span className="text-[10px] font-black font-mono text-red-500 uppercase tracking-widest">AUP - VERSION 1.0</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-2">Acceptable Use <br/><span className="text-gray-600 italic">Policy (AUP)</span></h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-4xl font-light italic">
                            To maintain the integrity of the sovereign verification stack, all users must adhere to these prohibitive standards.
                        </p>
                    </div>

                    <div className="grid gap-8">
                        {/* 1. Identity Integrity */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-red-500">
                                <Ban size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">1. Identity Manipulation</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                You are strictly prohibited from using GUAW to:
                                <ul className="mt-4 space-y-3">
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> Certify non-human entities (AI agents, bots, automated scripts) as physically human.</li>
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> Bypass regional restrictions through spoofing or proxying sovereign signals.</li>
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> Impersonate third parties by hijacking their cryptographic bio-resonance signals.</li>
                                </ul>
                            </div>
                        </section>

                        {/* 2. Technical Warfare */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-primary">
                                <Cpu size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">2. Technical Sabotage</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                The following technical activities will trigger an immediate permanent ban:
                                <ul className="mt-4 space-y-3">
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Any attempt to reverse-engineer, decompile, or disassemble the ACMC native kernel.</li>
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Stress-testing or probing GUAW infrastructure without prior written authorization.</li>
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Developing "Proof of Concept" bypasses or sharing exploit methodologies.</li>
                                </ul>
                            </div>
                        </section>

                        {/* 3. Distribution & Licensing */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-amber-500">
                                <Share2 size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">3. Credential Abuse</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                Your API credentials are sovereign and non-transferable.
                                <ul className="mt-4 space-y-3">
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> No resale of GUAW services or "Verification as a Service" (VaaS) sub-licensing.</li>
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> Public disclosure of API keys, private endpoints, or internal protocol documentation.</li>
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> Domain-mismatching (using one license for unauthorized domains).</li>
                                </ul>
                            </div>
                        </section>

                        {/* 4. Content Authenticity */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-emerald-500">
                                <FileText size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">4. Fraudulent Integrity</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                GUAW is designed for protection, not deception.
                                <ul className="mt-4 space-y-3">
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Do not use the Forensic SDK to certify AI-generated content (Deepfakes) as "Authentic" for fraud.</li>
                                    <li className="flex items-start gap-3 italic"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Do not tamper with the Forensics metadata to hide the origin of synthetic signals.</li>
                                </ul>
                            </div>
                        </section>

                        {/* 5. Enforcement */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-white">
                                <Gavel size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">5. The Sovereign Veto</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] text-gray-400 text-sm leading-relaxed font-light">
                                Violating any provision of this AUP constitutes a material breach of Service Terms. GUAW reserves the absolute <strong>Sovereign Veto</strong>: the right to suspend or terminate any account immediately, without warning and without refund, if malicious activity is detected by our integrity automated monitors.
                            </div>
                        </section>
                    </div>

                    {/* Footer Legal */}
                    <div className="pt-16 border-t border-white/5 text-center space-y-4">
                        <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase italic leading-loose">
                            PHYSICS IS THE FINAL FIREWALL.
                            <br/>
                             <span className="text-gray-400">GUAW™ SOVEREIGN SYSTEMS · ACCEPTABLE USE POLICY</span>
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
