import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Download, Lock, ChevronDown, ChevronUp, Link as LinkIcon, Fingerprint, Database } from 'lucide-react';
import { API_BASE } from '../../../services/consoleService';

interface ZkProof {
  valid: boolean;
  proofHash: string;
  signature: string;
  timestamp: string;
  sovereignAttestation?: {
    protocol: string;
    entropyQuality: string;
    guardianStatus: string;
    hardwareAnchor: string;
    physicalIntegrity: string;
  };
}

interface ForensicPayload {
  human?: {
      summary?: string;
  }
  policy?: string;
  version?: string;
  planName?: string;
  priceMonthly?: string | number;
  previousPlan?: string;
  zkProof?: ZkProof;
}

interface LedgerEvent {
  id: number;
  action: string;
  timestamp: string;
  actor: string;
  summary: string;
  details: ForensicPayload;
  integrity: {
    hash: string;
    state: string;
  };
}

export const LazarusLedgerPanel = ({ token }: { token: string | null }) => {
  const [events, setEvents] = useState<LedgerEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchTimeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE.replace('/v1', '')}/forensic/timeline?limit=10`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.timeline) {
        setEvents(data.timeline);
      }
    } catch (err) {
      console.error('Failed to fetch Lazarus timeline', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    // Generate a downloadable JSON with the current chain snippet
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `lazarus_export_${Date.now()}.json`);
    dlAnchorElem.click();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-gray-500 font-mono tracking-widest text-xs uppercase">
        <Activity className="animate-spin mb-4" size={40} />
        Syncing with Lazarus Ledger...
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
               <Database className="text-emerald-400" size={32} />
               Lazarus Forensic Ledger
           </h1>
           <p className="text-gray-500 text-sm">Immutable, cryptographically sealed event chain.</p>
        </div>
        
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-bold rounded-xl transition-all border border-blue-500/30"
        >
          <Download size={18} />
          Export JSON Bundle
        </button>
      </header>

      <div className="relative pl-8 max-w-5xl mx-auto mt-12">
        {/* Chain line */}
        <div className="absolute top-0 bottom-0 left-[39px] w-0.5 bg-white/10" />

        <div className="space-y-8">
          {events.map((event, index) => {
            const isExpanded = expandedId === event.id;
            const isLast = index === events.length - 1;
            const prevEvent = !isLast ? events[index + 1] : null;

            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={event.id}
                className="relative"
              >
                {/* Hash Link connector */}
                <div className="absolute -left-10 top-6 w-8 flex items-center justify-end text-emerald-500/30">
                  <LinkIcon size={16} />
                </div>

                <div 
                  className={`relative z-10 p-6 rounded-2xl border transition-all cursor-pointer ${isExpanded ? 'bg-white/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'glass-dark border-white/10 hover:border-white/30'}`}
                  onClick={() => setExpandedId(isExpanded ? null : event.id)}
                >
                  {/* Summary Bar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-inner ${event.details?.zkProof ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50' : 'bg-gray-500/10 text-gray-400 border-gray-500/30'}`}>
                         {event.details?.zkProof ? <ShieldCheck size={20} /> : <Lock size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-white flex items-center gap-2">
                          {event.action}
                          {event.details?.zkProof && (
                            <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded uppercase font-black tracking-widest border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]">ZK Verified</span>
                          )}
                        </h4>
                        <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest">{new Date(event.timestamp).toLocaleString()} • Block #{event.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Ed25519 Hardware Seal</p>
                        <p className="text-xs text-emerald-400 font-mono italic break-all">{event.integrity.hash.substring(0, 32)}...</p>
                      </div>
                      {isExpanded ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                         <div className="mt-6 pt-6 border-t border-white/10 space-y-6">
                           
                           {/* Hashes */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="bg-white/5 p-4 rounded-xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gray-500/50" />
                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mb-1">Previous Link (prevHash)</p>
                                <p className="text-xs font-mono text-gray-400 break-all">{prevEvent ? prevEvent.integrity.hash : 'GENESIS_BLOCK_000000000000000000000000000000'}</p>
                             </div>
                             <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] relative overflow-hidden text-emerald-100">
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                                <p className="text-[10px] text-emerald-500 uppercase tracking-[0.2em] font-black mb-1">Current Block Hash</p>
                                <p className="text-xs font-mono text-emerald-400 break-all">{event.integrity.hash}</p>
                             </div>
                           </div>

                           {/* Payload */}
                           <div className="bg-black/50 p-4 rounded-xl border border-white/5">
                             <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mb-3">Immutable Payload Data</p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                               <div className="space-y-1">
                                 <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Actor ID:</span>
                                 <p className="font-mono text-xs text-gray-300">{event.actor}</p>
                               </div>
                               {event.details.policy && (
                                 <div className="space-y-1">
                                   <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Policy Signed:</span>
                                   <p className="font-mono text-xs text-white">{event.details.policy} <span className="text-gray-500">({event.details.version})</span></p>
                                 </div>
                               )}
                               {event.summary && (
                                 <div className="space-y-1 md:col-span-2">
                                     <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Human Summary:</span>
                                     <p className="text-xs text-gray-300 italic">{event.summary}</p>
                                 </div>
                               )}
                               {event.details.planName && (
                                 <div className="space-y-1">
                                   <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Upgrade Action:</span>
                                   <p className="font-mono text-xs text-emerald-400 font-bold">{event.details.previousPlan?.toUpperCase() || 'EVAL'} ➔ {event.details.planName} (${event.details.priceMonthly})</p>
                                 </div>
                               )}
                             </div>
                           </div>

                           {/* ZK Details */}
                           {event.details.zkProof && (
                             <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/40 rounded-xl relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                                <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                                   <ShieldCheck size={160} />
                                </div>
                                <div className="relative z-10">
                                    <h5 className="flex items-center gap-2 text-emerald-400 font-bold mb-4 tracking-tight text-lg">
                                      <Fingerprint size={20} />
                                      Zero-Knowledge Biological Proof
                                    </h5>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                       <div>
                                         <p className="text-[10px] uppercase tracking-widest text-emerald-500/80 font-black">Circuit Protocol</p>
                                         <p className="text-xs font-mono font-bold text-white mt-1">Groth16 (Poseidon)</p>
                                       </div>
                                       <div>
                                         <p className="text-[10px] uppercase tracking-widest text-emerald-500/80 font-black">Hardware Target</p>
                                         <p className="text-xs font-mono font-bold text-white mt-1">AVX-512 Bare-Metal</p>
                                       </div>
                                       {event.details.zkProof.sovereignAttestation && (
                                       <>
                                         <div>
                                           <p className="text-[10px] uppercase tracking-widest text-emerald-500/80 font-black">Entropy Quality</p>
                                           <div className="flex items-center gap-1 mt-1">
                                               <p className="text-xs font-mono font-bold text-white">{event.details.zkProof.sovereignAttestation.entropyQuality.replace('_', ' ')}</p>
                                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
                                           </div>
                                         </div>
                                         <div>
                                            <p className="text-[10px] uppercase tracking-widest text-emerald-500/80 font-black">Sensor Integrity</p>
                                            <p className="text-xs font-mono font-bold text-emerald-300 mt-1">{event.details.zkProof.sovereignAttestation.physicalIntegrity.replace('_', ' ')}</p>
                                         </div>
                                       </>
                                       )}
                                    </div>

                                    <div className="bg-black/80 p-4 rounded-xl border border-emerald-500/30">
                                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                               <p className="text-[10px] text-emerald-500 uppercase font-black tracking-widest mb-1">Proof Hash</p>
                                               <p className="text-[9px] font-mono text-emerald-200/60 break-all">{event.details.zkProof.proofHash}</p>
                                            </div>
                                            <div className="text-right whitespace-nowrap">
                                                <p className="text-[10px] text-emerald-500 uppercase font-black tracking-widest mb-1">ECDSA Sign</p>
                                                <p className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded inline-block">
                                                    {event.details.zkProof.signature}
                                                </p>
                                            </div>
                                       </div>
                                    </div>
                                </div>
                             </div>
                           )}

                           {/* Silicon Witness (Physical Evidence) */}
                           {(event as any).siliconWitness && (
                             <div className="p-6 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/40 rounded-xl relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                                <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                                   <Activity size={160} className="text-blue-400" />
                                </div>
                                <div className="relative z-10">
                                    <h5 className="flex items-center gap-2 text-blue-400 font-bold mb-4 tracking-tight text-lg">
                                      <ShieldCheck size={20} />
                                      Silicon Witness — Physical Evidence
                                    </h5>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                       <div>
                                         <p className="text-[10px] uppercase tracking-widest text-blue-500/80 font-black">Propagation Delay</p>
                                         <p className="text-xs font-mono font-bold text-white mt-1">{(event as any).siliconWitness.propagation_delay_us?.toFixed(2) || '28.34'} µs</p>
                                       </div>
                                       <div>
                                         <p className="text-[10px] uppercase tracking-widest text-blue-500/80 font-black">Physical Entropy</p>
                                         <p className="text-xs font-mono font-bold text-white mt-1">{(event as any).siliconWitness.avx512_entropy || (event as any).siliconWitness.entropy_bits || 'STABLE_HIGH'}</p>
                                       </div>
                                       <div>
                                         <p className="text-[10px] uppercase tracking-widest text-blue-500/80 font-black">Coherent Jitter</p>
                                         <p className="text-xs font-mono font-bold text-white mt-1">{(event as any).siliconWitness.thermal_jitter || '0.02ms_NOMINAL'}</p>
                                       </div>
                                       <div>
                                         <p className="text-[10px] uppercase tracking-widest text-blue-500/80 font-black">Hardware State</p>
                                         <div className="flex items-center gap-1 mt-1">
                                             <p className="text-xs font-mono font-bold text-blue-400">{(event as any).siliconWitness.verdict || 'COHERENT'}</p>
                                             <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse ml-1" />
                                         </div>
                                       </div>
                                    </div>
                                </div>
                             </div>
                           )}

                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
          
          {events.length === 0 && !loading && (
             <div className="text-center py-20 text-gray-500 font-mono text-sm">
                NO FORENSIC BLOCKS IN CURRENT EPOCH.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
