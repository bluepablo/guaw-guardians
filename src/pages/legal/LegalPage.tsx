import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, Info, Landmark, Shield, AlertTriangle, Scale } from 'lucide-react';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';

export const LegalPage = () => {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <ParticlesBackground />
            
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <ArrowLeft size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                        <span className="font-mono text-sm uppercase tracking-tighter text-gray-400 group-hover:text-white transition-colors">Return to Surface</span>
                    </Link>
                    <div className="flex items-center gap-3">
                         <ShieldCheck className="text-primary" size={24} />
                         <span className="font-bold tracking-widest uppercase text-sm">GUAW™ Beta Infrastructure Terms</span>
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
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-2">GUAW™ Beta Service Terms <br/><span className="text-gray-600 italic">Effective 2026</span></h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-4xl font-light italic">
                            These terms govern the use of GUAW's sovereign verification infrastructure during its operational Beta phase. 
                            Confirm your adherence to our <Link to="/acceptable-use" className="text-primary hover:underline underline-offset-4">Acceptable Use Policy (AUP)</Link> to avoid service termination.
                        </p>
                    </div>

                    <div className="grid gap-12">
                        {/* 1. Service & License */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-primary">
                                <Shield size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">1. Service & License</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                GUAW grants a non-exclusive, non-transferable license to access the verification API during the active subscription period. No intellectual property rights are transferred. All patents and technology remain exclusively owned by Pablo Martín Dorado (INPI Exp. 20260100161 and related filings).
                            </div>
                        </section>

                        {/* 2. Beta Status */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-amber-500">
                                <Info size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">2. Beta Status</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                The service is provided in Beta. Features, pricing, and availability may change with 30 days written notice via email.
                            </div>
                        </section>

                        {/* 3. Data & Privacy */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-emerald-500">
                                <Lock size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">3. Data & Privacy</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                GUAW processes only cryptographic signals. No biometric data, no PII, and no behavioral profiles are stored. Raw sensor data never leaves the client device.
                            </div>
                        </section>

                        {/* 4. Billing */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-white">
                                <span className="text-xl">💳</span>
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">4. Billing</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light space-y-4">
                                <p>Monthly fees are charged in advance and are non-refundable, except where required by applicable law.</p>
                                <div className="grid md:grid-cols-2 gap-4 text-[11px] font-mono tracking-tighter">
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <span className="text-gray-500 block mb-1">ARGENTINA</span>
                                        Users retain rights under Ley 24.240.
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <span className="text-gray-500 block mb-1">EU</span>
                                        14-day withdrawal right on first purchase.
                                    </div>
                                </div>
                                <p>Trial period is <strong>7 days</strong> with no automatic charge on expiry.</p>
                            </div>
                        </section>

                        {/* 5. API Usage */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-primary">
                                <ShieldCheck size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">5. API Usage</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> <strong>Lite:</strong> 100,000 req/month, 2 domains.</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> <strong>Starter:</strong> 50,000 req/month, 3 domains.</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> Exceeding quota suspends API access until the next billing cycle.</li>
                                </ul>
                            </div>
                        </section>

                        {/* 6. Termination */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-red-500">
                                <AlertTriangle size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">6. Termination</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                GUAW may terminate service immediately for: reverse-engineering attempts, credential sharing, or using the platform to certify synthetic content as authentic. No refund in these cases.
                            </div>
                        </section>

                        {/* 7. Liability Cap */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-red-500">
                                <Scale size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">7. Liability Cap</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                GUAW's total liability shall not exceed fees paid in the 3 months preceding any claim. No liability for indirect or consequential damages.
                            </div>
                        </section>

                        {/* 8. Governing Law */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-white">
                                <Landmark size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest italic">8. Governing Law</h2>
                            </div>
                            <div className="glass-dark p-8 rounded-2xl border border-white/5 text-gray-400 text-sm leading-relaxed font-light">
                                These Terms are governed by Argentine law. Disputes shall be submitted to the courts of San Miguel de Tucumán, Argentina.
                            </div>
                        </section>
                    </div>

                    {/* Footer Legal */}
                    <div className="pt-16 border-t border-white/5 text-center space-y-4">
                        <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase italic leading-loose">
                            PHYSICS IS THE FINAL FIREWALL.
                            <br/>
                             <span className="text-gray-400">GUAW™ SOVEREIGN SYSTEMS. ALL RIGHTS RESERVED. 2026.BETA.V1.2</span>
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
