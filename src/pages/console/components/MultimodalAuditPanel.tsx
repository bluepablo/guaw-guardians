
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Volume2, Video, Activity, Fingerprint, Lock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { consoleService, API_BASE } from '../../../services/consoleService';

interface AuditLayer {
    beta?: number;
    sigma?: number;
    kurtosis?: number;
    pass: boolean;
}

interface AuditResult {
    verdict: 'PHYSICALLY_CONSISTENT' | 'PHYSICALLY_INCONSISTENT';
    origin?: string;
    zk_wrapped?: boolean;
    audit: {
        layers: Record<string, AuditLayer>;
        temporalAnomalies?: Array<{
            type: string;
            drift: number;
            frameIndex: number;
        }>;
        latencyMs: string;
    };
}

const StreamWidget = ({ token }: { token: string | null }) => {
    const [active, setActive] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [metrics, setMetrics] = useState({ beta: '0.00', sigma: '0.00', frames: 0, fps: 0, cost: 0, load: '1.0x' });
    const [log, setLog] = useState<string[]>([]);

    const startStream = async () => {
        try {
            const res = await fetch(`${API_BASE}/integrity/stream/start`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ zkInterval: 30 })
            });
            const data = await res.json();
            setSessionId(data.sessionId);
            setActive(true);
            
            // Simulate stream push
            const interval = setInterval(async () => {
                if (!active) { clearInterval(interval); return; }
                
                // Mock Frame Buffer (White Noise)
                const frame = new Blob([new Uint8Array(1024 * 10).map(() => Math.random() * 255)]);
                const formData = new FormData();
                formData.append('frame', frame);

                try {
                    const fRes = await fetch(`${API_BASE}/integrity/stream/${data.sessionId}/frame`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` },
                        body: formData
                    });
                    const fData = await fRes.json();
                    
                    setMetrics({
                        beta: fData.telemetry?.beta || '0.00',
                        sigma: fData.telemetry?.sigma || '0.00',
                        frames: fData.frameIndex,
                        fps: 30, // Simulated
                        cost: fData.telemetry?.economics?.cost || 0,
                        load: fData.telemetry?.economics?.loadFactor || '1.00'
                    });

                    if (fData.verdict !== 'CONSISTENT' || fData.isCheckpoint) {
                        setLog(prev => [`[${fData.frameIndex}] ${fData.verdict} ${fData.isCheckpoint ? '(ZK)' : ''} $${fData.telemetry?.economics?.cost}`, ...prev].slice(0, 5));
                    }
                } catch {
                     clearInterval(interval);
                }
            }, 1000 / 30); // 30 FPS

            // Cleanup function for unmount
            return () => clearInterval(interval);

        } catch {
            alert('Stream Init Failed');
        }
    };

    const stopStream = async () => {
        if (sessionId) {
            await fetch(`${API_BASE}/integrity/stream/${sessionId}/stop`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        }
        setActive(false);
        setSessionId(null);
    };

    return (
        <div className="p-6 bg-black/40 rounded-2xl border border-white/10 flex flex-col gap-4">
             <div className="flex justify-between items-center">
                 <h4 className="font-bold flex items-center gap-2">
                     <Activity size={16} className={active ? "text-emerald-400 animate-pulse" : "text-gray-500"} />
                     Real-Time Economic Tribunal
                 </h4>
                 <button 
                    onClick={active ? stopStream : startStream}
                    className={`px-4 py-1 rounded text-xs font-bold uppercase ${active ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-primary/20 text-primary border border-primary/50'}`}
                 >
                    {active ? 'Stop Stream' : 'Start Simulation'}
                 </button>
             </div>

             {active && (
                 <div className="grid grid-cols-4 gap-2 text-center">
                     <div className="p-2 bg-white/5 rounded">
                         <p className="text-[10px] text-gray-500">BETA (1/f)</p>
                         <p className="text-sm font-mono text-primary">{metrics.beta}</p>
                     </div>
                     <div className="p-2 bg-white/5 rounded">
                         <p className="text-[10px] text-gray-500">ENTROPY</p>
                         <p className="text-sm font-mono text-secondary">{metrics.sigma}</p>
                     </div>
                     <div className="p-2 bg-white/5 rounded">
                         <p className="text-[10px] text-gray-500">FRAMES</p>
                         <p className="text-sm font-mono text-white">{metrics.frames}</p>
                     </div>
                     <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded">
                         <p className="text-[10px] text-emerald-400">COST/FRAME</p>
                         <p className="text-sm font-mono text-emerald-300">{metrics.cost}μc</p>
                         <p className="text-[8px] text-gray-500">LOAD: {metrics.load}x</p>
                     </div>
                 </div>
             )}

             <div className="h-24 bg-black/50 rounded p-2 overflow-hidden font-mono text-[10px] text-gray-400">
                 {log.map((l, i) => <div key={i}>{l}</div>)}
                 {!active && log.length === 0 && <span className="opacity-50">Stream idle...</span>}
             </div>
        </div>
    );
};

export const MultimodalAuditPanel = ({ token }: { token: string | null }) => {
    const [mode, setMode] = useState<'AUDIO' | 'VIDEO' | 'BIO' | 'STREAM'>('AUDIO');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const runAudit = async () => {
        setLoading(true);
        setResult(null);
        try {
            let res;
            if (mode === 'AUDIO') {
                res = await consoleService.verifyMultimodalAudio(token, files[0]);
            } else if (mode === 'VIDEO') {
                res = await consoleService.verifyMultimodalVideo(token, files);
            } else {
                // Simulation for Bio Telemetry
                res = await consoleService.verifyMultimodalTelemetry(token, { heartRate: 72, oxygen: 98 });
            }
            setResult(res);
        } catch (e) {
            console.error(e);
            alert("Sovereign connection failed. Target might be offline.");
        }
        setLoading(false);
    };

    return (
        <div className="space-y-8 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                       <Shield className="text-primary" size={32} />
                       Multimodal Physical Tribunal
                   </h1>
                   <p className="text-gray-500">Cross-domain verification of digital and biological artifacts.</p>
                </div>
                
                <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl">
                    {(['AUDIO', 'VIDEO', 'BIO', 'STREAM'] as const).map((m) => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); setResult(null); setFiles([]); }}
                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${mode === m ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </header>

            {mode === 'STREAM' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <StreamWidget token={token} />
                    <div className="p-8 rounded-3xl glass-dark border border-white/5 flex items-center justify-center text-center">
                        <div>
                             <h3 className="text-xl font-bold mb-2">Live Stream Processing</h3>
                             <p className="text-gray-400 text-sm max-w-sm">
                                 The Stream Guardian continuously samples frames for 1/f noise consistency and entropy drift. 
                                 Crypto-Checkpoints (ZK) are inserted every 30 frames.
                             </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload & Controls */}
                <div className="p-8 rounded-3xl glass-dark border border-white/5 bg-gradient-to-br from-white/5 to-transparent flex flex-col items-center justify-center min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={mode}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                {mode === 'AUDIO' && <Volume2 size={40} />}
                                {mode === 'VIDEO' && <Video size={40} />}
                                {mode === 'BIO' && <Activity size={40} />}
                            </div>
                            
                            <h3 className="text-xl font-bold mb-2">
                                {mode === 'AUDIO' && 'Acoustic Residual Audit'}
                                {mode === 'VIDEO' && 'Temporal Continuity Audit'}
                                {mode === 'BIO' && 'Biological Drift Audit'}
                            </h3>
                            <p className="text-gray-400 text-sm max-w-xs mb-8">
                                {mode === 'AUDIO' && 'Detect algorithmic noise signatures in audio streams.'}
                                {mode === 'VIDEO' && 'Validate 1/f spectral stability across frame sequences.'}
                                {mode === 'BIO' && 'Cross-reference biological telemetry with physical sensors.'}
                            </p>

                            {mode !== 'BIO' && (
                                <div className="relative group cursor-pointer mb-6">
                                    <input 
                                        type="file" 
                                        multiple={mode === 'VIDEO'}
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="px-10 py-4 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl group-hover:border-primary/50 transition-all">
                                        <span className="text-gray-500 text-sm font-medium">
                                            {files.length > 0 ? `${files.length} file(s) selected` : 'Drop files or Click to Upload'}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={runAudit}
                                disabled={loading || (mode !== 'BIO' && files.length === 0)}
                                className="w-full max-w-xs py-4 bg-primary text-black font-black rounded-xl uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(59,130,246,0.3)]"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Fingerprint size={20} />}
                                {loading ? 'Auditing Physics...' : 'Execute Audit'}
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Results View */}
                <div className="p-8 rounded-3xl glass-dark border border-white/5 relative overflow-hidden flex flex-col">
                    <AnimatePresence>
                        {result ? (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="h-full flex flex-col"
                            >
                                <div className={`flex items-center gap-4 p-6 rounded-2xl mb-8 ${result.verdict === 'PHYSICALLY_CONSISTENT' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                                    {result.verdict === 'PHYSICALLY_CONSISTENT' ? <CheckCircle2 className="text-emerald-400" size={32} /> : <XCircle className="text-red-400" size={32} />}
                                    <div>
                                        <h4 className={`text-lg font-bold ${result.verdict === 'PHYSICALLY_CONSISTENT' ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {result.verdict === 'PHYSICALLY_CONSISTENT' ? 'Physical Integrity Verified' : 'Inconsistency Detected'}
                                        </h4>
                                        <p className="text-gray-400 text-xs uppercase tracking-widest font-mono">{result.origin || 'SYNTHETIC_MANIPULATED'}</p>
                                    </div>
                                    {result.zk_wrapped && (
                                        <div className="ml-auto flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-primary/20">
                                            <Lock size={10} />
                                            ZK-Wrapped
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Telemetry Layers</h5>
                                    
                                    {result.audit?.layers && Object.entries(result.audit.layers).map(([key, layer]: [string, AuditLayer]) => (
                                        <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-300 capitalize">{key.replace('_', ' ')}</span>
                                                <span className="font-mono text-[10px] text-gray-500">Invariant Analysis</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-mono text-xs text-primary">{layer.beta || layer.sigma || layer.kurtosis || 'PASS'}</span>
                                                <div className={`w-2 h-2 rounded-full ${layer.pass ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]'}`} />
                                            </div>
                                        </div>
                                    ))}

                                    {mode === 'VIDEO' && result.audit?.temporalAnomalies && (
                                        <>
                                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mt-8">Temporal Anomalies</h5>
                                            {result.audit.temporalAnomalies.length === 0 ? (
                                                <p className="text-xs text-emerald-400 italic">No temporal jumps detected. Motion is consistent with physical laws.</p>
                                            ) : (
                                                result.audit.temporalAnomalies.map((anomaly, idx: number) => (
                                                    <div key={idx} className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-red-400">
                                                        <p className="text-xs font-bold uppercase mb-1">{anomaly.type}</p>
                                                        <p className="text-[10px] font-mono">Drift: {anomaly.drift.toFixed(4)} | Frame: {anomaly.frameIndex}</p>
                                                    </div>
                                                ))
                                            )}
                                        </>
                                    )}
                                    
                                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
                                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-600">
                                            <span>AUDIT LATENCY</span>
                                            <span className="text-gray-400">{result.audit?.latencyMs || '0.000'}ms</span>
                                        </div>
                                         <div className="flex justify-between items-center text-[10px] font-mono text-gray-600">
                                            <span>PROTOCOL VERSION</span>
                                            <span className="text-gray-400">GUAW SOVEREIGN V2.5</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                <Fingerprint size={60} className="mb-6 text-gray-600" />
                                <h4 className="text-lg font-bold mb-2">Awaiting Evidence</h4>
                                <p className="text-sm max-w-xs">Audit results will appear here after the physical tribunal execution.</p>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Background decoration */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
                </div>
                </div>
            )}
        </div>
    );
};
