
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Activity, CreditCard, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { consoleService } from '../../../services/consoleService';

// Define explicit types for the data structure
interface LazarusLog {
    id: number;
    type: string;
    timestamp: string;
    actorId: string;
    payload?: { reason?: string };
}

interface CryptoSignal {
    id: string;
    amount: string;
    network: string;
    status: string;
    createdAt: string;
}

interface UsageRecord {
    id: number;
    date: string;
    requestCount: number;
}

interface AccountDetails {
    account: {
        id: string;
        email: string;
        companyName?: string;
        planId: string;
        createdAt: string;
        trialExpiresAt?: string;
    };
    activity: LazarusLog[];
    financials: {
        crypto: CryptoSignal[];
    };
    usage: UsageRecord[];
}

interface AccountDetailPanelProps {
  accountId: string | null;
  token: string | null;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onExtendTrial: (account: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onForceDowngrade: (account: any) => void;
}

export const AccountDetailPanel: React.FC<AccountDetailPanelProps> = ({ 
  accountId, 
  token, 
  onClose,
  onExtendTrial,
  onForceDowngrade
}) => {
  const [details, setDetails] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDetails = async () => {
        setLoading(true);
        setError('');
        try {
          if (accountId) {
              const data = await consoleService.getAccountDetails(token, accountId);
              setDetails(data as unknown as AccountDetails);
          }
        } catch (err) {
          console.error(err); // Log the error to use the variable
          setError('Failed to load forensic details.');
        } finally {
          setLoading(false);
        }
      };

    if (accountId && token) {
      loadDetails();
    } else {
        setDetails(null);
    }
  }, [accountId, token]);

  if (!accountId) return null;

  return (
    <AnimatePresence>
      {accountId && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#0a0a0a] border-l border-white/10 z-50 shadow-2xl overflow-y-auto"
          >
            {/* Loading State */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            )}

            {/* Content */}
            {details && details.account ? (
                <div className="p-8 space-y-8">
                    {/* 1. Header & Identity */}
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-white">{details.account.email}</h2>
                                {details.account.planId === 'business' && <Shield className="text-purple-400" size={20} />}
                            </div>
                            <p className="text-gray-400 font-mono text-sm">{details.account.companyName || 'No Company Name'}</p>
                            <div className="flex gap-2 mt-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-widest ${
                                    details.account.planId === 'free' ? 'bg-gray-800 text-gray-400' : 
                                    details.account.planId === 'business' ? 'bg-purple-500/20 text-purple-400' : 'bg-primary/20 text-primary'
                                }`}>
                                    {details.account.planId} PLAN
                                </span>
                                <span className="px-2 py-1 rounded text-xs font-bold uppercase tracking-widest bg-white/5 text-gray-300 border border-white/10">
                                    {details.account.id.split('-')[0]}...
                                </span>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X className="text-gray-400" />
                        </button>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* 2. Operational Snapshot */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Activity size={16} /> Operational Snapshot
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-500 mb-1">Trial Expiration</p>
                                <p className="font-mono text-sm">
                                    {details.account.trialExpiresAt 
                                        ? new Date(details.account.trialExpiresAt).toLocaleDateString() 
                                        : 'N/A'}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-500 mb-1">Created At</p>
                                <p className="font-mono text-sm">
                                    {new Date(details.account.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-500 mb-1">API Keys Active</p>
                                <p className="font-mono text-sm">
                                    {/* We don't fetch keys count yet, maybe mock or omit */}
                                    --
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-500 mb-1">Last Activity</p>
                                <p className="font-mono text-sm text-yellow-500">
                                    {details.usage && details.usage.length > 0 
                                        ? new Date(details.usage[0].date).toLocaleDateString() 
                                        : 'No activity'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 3. Lazarus Timeline */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                             Lazarus Forensic Ledger
                        </h3>
                        <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                            {details.activity && details.activity.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {details.activity.map((log) => (
                                        <div key={log.id} className="p-3 text-sm flex gap-3 hover:bg-white/5 transition-colors">
                                            <div className="mt-1">
                                                {log.type.includes('DOWNGRADE') ? <AlertTriangle size={14} className="text-red-500" /> :
                                                 log.type.includes('EXTEND') ? <Clock size={14} className="text-blue-500" /> :
                                                 <CheckCircle size={14} className="text-green-500" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <span className="font-mono text-white/90">{log.type}</span>
                                                    <span className="text-gray-600 text-xs">{new Date(log.timestamp).toLocaleString()}</span>
                                                </div>
                                                <p className="text-gray-400 text-xs mt-1 font-mono">
                                                    Actor: {log.actorId === details.account.id ? 'SELF' : 'ADMIN/SYSTEM'}
                                                </p>
                                                <div className="text-gray-500 text-[10px] mt-1 break-all">
                                                    {log.payload?.reason && `Reason: ${log.payload.reason}`}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="p-4 text-center text-gray-600 text-sm">No forensic records found.</p>
                            )}
                        </div>
                    </section>
                    
                    {/* 4. Financials (Crypto) */}
                     <section>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                             <CreditCard size={16} /> Payment Signals
                        </h3>
                         <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                            {details.financials?.crypto && details.financials.crypto.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {details.financials.crypto.map((intent) => (
                                        <div key={intent.id} className="p-3 text-sm flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-white">{parseFloat(intent.amount)} <span className="text-xs text-gray-500">USDT</span></p>
                                                <p className="text-xs text-gray-500">{intent.network}</p>
                                            </div>
                                            <div className="text-right">
                                                 <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                                                    intent.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                                 }`}>
                                                     {intent.status}
                                                 </span>
                                                 <p className="text-[10px] text-gray-600 mt-1 font-mono">{new Date(intent.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="p-4 text-center text-gray-600 text-sm">No crypto signals detected.</p>
                            )}
                         </div>
                     </section>

                    {/* 5. Actions */}
                    <section className="pt-4 border-t border-white/10">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                            Administrative Intervention
                        </h3>
                        <div className="flex gap-4">
                            {details.account.planId === 'trial' && (
                                <button 
                                    onClick={() => onExtendTrial(details.account)}
                                    className="flex-1 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2"
                                >
                                    <Clock size={16} /> Extend Trial
                                </button>
                            )}
                            {details.account.planId !== 'free' && (
                                <button 
                                    onClick={() => onForceDowngrade(details.account)}
                                    className="flex-1 py-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-xl text-sm font-bold text-red-400 transition-all flex justify-center items-center gap-2"
                                >
                                    <AlertTriangle size={16} /> Force Downgrade
                                </button>
                            )}
                            {details.account.planId === 'free' && (
                                <p className="text-gray-500 text-sm italic w-full text-center">No actions available for Free Tier.</p>
                            )}
                        </div>
                    </section>
                </div>
            ) : (
                <div className="p-8 text-center">
                    {error ? <p className="text-red-500">{error}</p> : <p className="text-gray-500">Loading identity...</p>}
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
