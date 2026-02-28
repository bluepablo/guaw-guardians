
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { consoleService } from '../../services/consoleService';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { TermsModal } from '../../components/modals/TermsModal';
import { SovereignGlyph } from '../../components/ui/SovereignGlyph';

export const ConsoleRegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await consoleService.register({ email, password, companyName });
            setSuccess(true);
            setTimeout(() => {
                navigate('/console/login');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Error registering account');
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

                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Join GUAW</h1>
                    <p className="text-gray-400 mt-2">Create your Guardian identity</p>
                </div>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                            <Check size={32} />
                        </div>
                        <h2 className="text-xl font-bold">Account Created!</h2>
                        <p className="text-gray-400 text-sm">Redirecting you to login...</p>
                    </div>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all font-mono"
                                placeholder="dev@company.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Company / Project Name</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all font-mono"
                                placeholder="Acme Corp (Optional)"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Password</label>
                            <input
                                type="password"
                                required
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all font-mono"
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-alert text-sm">
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="flex items-start gap-3 pt-2">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="peer h-4 w-4 appearance-none rounded border border-white/20 bg-white/5 checked:border-primary checked:bg-primary transition-all cursor-pointer"
                                />
                                <Check
                                    size={12}
                                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 transition-opacity"
                                />
                            </div>
                            <label htmlFor="terms" className="text-[10px] text-gray-500 uppercase tracking-widest font-mono cursor-pointer select-none leading-relaxed">
                                I confirm I have read and agree to the <button type="button" onClick={() => setIsTermsOpen(true)} className="text-primary hover:underline font-bold">Sovereign Governance</button> and Fail-Secure Funding policy.
                            </label>
                        </div>

                        <button
                            disabled={loading || !agreedToTerms}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                        >
                            {loading ? 'Creating Identity...' : 'Register'}
                        </button>

                        <div className="text-center">
                            <Link to="/console/login" className="text-sm text-gray-500 hover:text-white transition-colors">
                                Already have an account? <span className="text-primary">Login</span>
                            </Link>
                        </div>
                    </form>
                )}
            </motion.div>

            <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
        </div>
    );
};
