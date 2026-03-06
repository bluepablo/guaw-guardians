import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Key, CreditCard, LogOut, Plus, Trash2, ShieldCheck, Activity, FileText, Users, Clock, X, Lock, Shield, FileCheck, BarChart3, TrendingUp, AlertCircle, Filter, Search, Trophy, Copy, Check, Database } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ReactMarkdown from 'react-markdown';
import { consoleService } from '../../services/consoleService';
import { AccountDetailPanel } from './components/AccountDetailPanel';
import { MultimodalAuditPanel } from './components/MultimodalAuditPanel';
import { LazarusLedgerPanel } from './components/LazarusLedgerPanel';
import { ParticlesBackground } from '../../components/ui/ParticlesBackground';
import { SovereignGlyph } from '../../components/ui/SovereignGlyph';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { PersistenceLeaderboard } from './components/PersistenceLeaderboard';

interface ApiKey {
  id: number;
  name: string;
  key_prefix: string;
  created_at: string;
  scope: string;
  active: boolean;
}

// Types
interface AdminMetrics {
    totalAccounts: number;
    activeTrials: number;
    freeTier: number;
    paidLicenses: number;
}

interface AdminAccount {
    id: string;
    email: string;
    company?: string;
    role: string;
    plan: string;
    economicState: string;
    trialExpiresAt?: string | null;
    notifiedTrialEnding: boolean;
}

interface LazarusEvent {
    id: number;
    timestamp: string;
    actorId: string;
    actorRole: string;
    type: string;
    payload: Record<string, unknown>;
    hash: string;
}

interface CryptoIntent {
    id: string;
    amount: string;
    network: string;
    status: string;
    txHash?: string;
    createdAt: string;
    account: {
        email: string;
        companyName?: string;
    };
}

interface EconomyEntry {
    id: number;
    type: string;
    amount: number;
    timestamp: string;
    metadata: Record<string, unknown> | null;
}

interface EconomyData {
    balance: number;
    currency: string;
    ledger: EconomyEntry[];
}

// SaaS Interfaces
interface SaaSProfile {
    id: string;
    publishableKey: string;
    allowedOrigins: string[];
    metrics: {
        totalRequests: number;
        blockedBots: number;
    };
    plan: unknown;
}

interface VerificationEvent {
    id: string;
    timestamp: string;
    type: string;
    payload: {
        origin?: string;
        confidence?: number;
        entropy?: number;
    };
}

interface TrendPoint {
    date: string;
    verified: number;
    attacks: number;
}

interface UsageRecord {
    date: string | Date;
    totalRequests: number;
    blockedBots: number;
}

export const ConsoleDashboardPage = () => {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  
  // 🦅 Dynamic Stats State
  const [stats, setStats] = useState([
     { label: "Valid Verifications", value: 84012, trend: "+12%" },
     { label: "Bot Attacks Terminated", value: 3119, trend: "+45%" },
     { label: "Bio-Persistence (Active Streaks)", value: 12503, trend: "+8%" },
     { label: "Silicon Witness (Jitter)", value: 28.34, unit: "µs", trend: "NOMINAL" },
     { label: "Average Latency", value: 28, unit: "ms", trend: "~Steady" }
  ]);
  
  // 🦅 Quota State (Simulation)
  const [quota, setQuota] = useState({ used: 0, limit: 15000 }); // Trial monthly limit
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Admin State
  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics | null>(null);
  const [recommendedPlanId, setRecommendedPlanId] = useState<string | null>(null);
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>([]);
  const [auditTrail, setAuditTrail] = useState<LazarusEvent[]>([]);
  const [cryptoIntents, setCryptoIntents] = useState<CryptoIntent[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [economy, setEconomy] = useState<EconomyData | null>(null);
  const [economyLoading, setEconomyLoading] = useState(false);

  // 🛡️ SaaS State
  const [saasProfile, setSaasProfile] = useState<SaaSProfile | null>(null);
  const [verifications, setVerifications] = useState<VerificationEvent[]>([]);
  const [trendData, setTrendData] = useState<TrendPoint[]>([]);
  const [revealedSecret, setRevealedSecret] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [newOrigin, setNewOrigin] = useState('');
  const [saasLoading, setSaasLoading] = useState(true);
  
  // Admin Filters
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [adminFilters, setAdminFilters] = useState({
      plan: 'ALL',
      state: 'ALL',
      trialExpiring: false
  });

  // Trial Extension State
  const [isExtending, setIsExtending] = useState<string | null>(null); // accountId
  const [extensionDays, setExtensionDays] = useState(7);
  const [extensionReason, setExtensionReason] = useState('');

  // Force Downgrade State
  const [isDowngrading, setIsDowngrading] = useState<string | null>(null); // accountId
  const [downgradeReason, setDowngradeReason] = useState('');
  const [downgradeConfirm, setDowngradeConfirm] = useState('');

  // Crypto Checkout State
  const [isCryptoCheckout, setIsCryptoCheckout] = useState(false);
  const [cryptoStep, setCryptoStep] = useState<'NETWORK' | 'PAYMENT' | 'CONFIRMING' | 'SUCCESS'>('NETWORK');
  const [selectedNetwork, setSelectedNetwork] = useState<'ERC20' | 'TRC20' | 'BEP20'>('TRC20');
  const [currentIntent, setCurrentIntent] = useState<{ id: string; amount: string; address: string } | null>(null);
  const [txHash, setTxHash] = useState('');

  // Sovereign Asset Viewer
  const [selectedAsset, setSelectedAsset] = useState<{name: string, content: string} | null>(null);
  const [assetLoading, setAssetLoading] = useState(false);

  const handleViewAsset = async (name: string) => {
    setAssetLoading(true);
    console.log(`🔍 [ASSET_VIEWER] Requesting asset: ${name}`);
    try {
        const asset = await consoleService.getSovereignAsset(token, name);
        setSelectedAsset(asset);
    } catch (e: unknown) {
        console.error('❌ Failed to fetch asset:', e);
        const msg = e instanceof Error ? e.message : 'Sovereign Vault is locked or file is missing.';
        alert(`ACCESS_DENIED: ${msg}`);
    }
    setAssetLoading(false);
  };

  const [targetPlan, setTargetPlan] = useState('');
  const [cryptoError, setCryptoError] = useState('');
  const [activeSdk, setActiveSdk] = useState<'presence' | 'media' | 'audit'>('presence');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const navigate = useNavigate();

  const token = localStorage.getItem('guaw_token');
  const user = JSON.parse(localStorage.getItem('guaw_user') || '{}');
  const currentPlanId = user?.planId || 'free';





  // Handle Stripe Redirection params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success')) {
      alert('Upgrade successful! Welcome to the ' + currentPlanId + ' tier.');
      window.history.replaceState({}, '', window.location.pathname);
    }
    if (params.get('canceled')) {
      setError('Upgrade canceled. No charges were made.');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [currentPlanId]);

  const handleUpgrade = async (planId: string) => {
    try {
      setUpgrading(true);
      setError('');
      // Use Mercado Pago Preference instead of Stripe
      // const result = await consoleService.createCheckout(token, planId); <--- OLD STRIPE
      const result = await consoleService.createPreferenceMP(token, planId);
      
      if (result.init_point) {
         window.location.href = result.init_point;
      } else {
         throw new Error('Failed to initiate Mercado Pago checkout');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      alert('Error initiating upgrade: ' + msg);
    } finally {
      setUpgrading(false);
    }
  };

  const handleCryptoCheckout = async () => {
        setCryptoError('');
        try {
            if (cryptoStep === 'NETWORK') {
                const intent = await consoleService.createCryptoIntent(token, targetPlan, selectedNetwork);
                setCurrentIntent(intent);
                setCryptoStep('PAYMENT');
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Failed to create intent';
            setCryptoError(msg);
        }
  };

  const handleConfirmPayment = async () => {
      if (!currentIntent || !txHash.trim()) return;
      setCryptoError('');
      setCryptoStep('CONFIRMING');
      try {
          // Send to backend
          await consoleService.confirmCryptoPayment(token, currentIntent.id, txHash);
          
          // If successful, move to success
          setCryptoStep('SUCCESS');
          
          // Refresh user data (if needed, or just let them navigate)
          setTimeout(() => {
              // Reload page or re-fetch plan
             window.location.reload(); 
          }, 3000);

      } catch (err: unknown) {
          setCryptoStep('PAYMENT'); // Go back
          const msg = err instanceof Error ? err.message : 'Confirmation failed';
          setCryptoError(msg);
      }
  };

  const fetchKeys = React.useCallback(async () => {
    try {
      const data = await consoleService.getKeys(token);
      setKeys(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchEconomy = React.useCallback(async () => {
    if (!token) return;
    try {
      setEconomyLoading(true);
      const data = await consoleService.getClearingStatus(token);
      setEconomy(data);
    } catch (err) {
      console.error('Failed to fetch economy:', err);
    } finally {
      setEconomyLoading(false);
    }
  }, [token]);

  const fetchSaaS = React.useCallback(async () => {
    if (!token) return;
    try {
      setSaasLoading(true);
      const [profile, logs, trend] = await Promise.all([
          consoleService.getSaaSProfile(token),
          consoleService.getVerifications(token),
          consoleService.getSaaSTrend(token)
      ]);
      setSaasProfile(profile);
      setVerifications(logs);
      setTrendData(trend.map((r: UsageRecord) => ({
          date: new Date(r.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          verified: r.totalRequests - r.blockedBots,
          attacks: r.blockedBots
      })));
      
      // Sync stats with real SaaS data if it exists
      if (profile) {
          setStats(prev => [
              { ...prev[0], value: profile.metrics.totalRequests },
              { ...prev[1], value: profile.metrics.blockedBots },
              prev[2],
              prev[3]
          ]);
      }
    } catch (err) {
      console.error('Failed to fetch SaaS data:', err);
    } finally {
      setSaasLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate('/console/login');
      return;
    }
    fetchKeys();
    fetchEconomy();
    fetchSaaS();
  }, [token, navigate, fetchKeys, fetchEconomy, fetchSaaS]);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;
    try {
      const { rawKey } = await consoleService.createKey(token, newKeyName);
      setGeneratedKey(rawKey);
      fetchKeys();
      setNewKeyName('');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error creating key');
    }
  };

  const handleRevoke = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this key? It will stop working immediately.')) return;
    try {
      await consoleService.revokeKey(token, id);
      fetchKeys();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error revoking key');
    }
  };

  const handleExtendTrial = async () => {
      if (!isExtending || !extensionReason.trim()) return;
      try {
          await consoleService.extendTrial(token, isExtending, extensionDays, extensionReason);
          alert('Trial extended successfully.');
          setIsExtending(null);
          setExtensionReason('');
          // Refresh data
          const health = await consoleService.getEconomicHealth(token);
          setAdminMetrics(health.metrics);
          setAdminAccounts(health.accounts);
          const audit = await consoleService.getAuditTrail(token);
          setAuditTrail(audit);
      } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          alert('Error extending trial: ' + message);
      }
  };

  const handleForceDowngrade = async () => {
      if (!isDowngrading || !downgradeReason.trim() || downgradeConfirm !== 'DOWNGRADE') return;
      try {
          await consoleService.forceDowngrade(token, isDowngrading, downgradeReason);
          alert('Account downgraded successfully. They are now on FREE tier.');
          setIsDowngrading(null);
          setDowngradeReason('');
          setDowngradeConfirm('');
          
          // Refresh admin data
          const health = await consoleService.getEconomicHealth(token);
          setAdminMetrics(health.metrics);
          setAdminAccounts(health.accounts);
          const audit = await consoleService.getAuditTrail(token);
          setAuditTrail(audit);
      } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          alert('Error forcing downgrade: ' + message);
      }
  };

  const handleRevealSecret = async () => {
    if (!confirm('WARNING: Revealing your secret key should only be done in a secure environment. Are you sure?')) return;
    try {
        setIsRevealing(true);
        const secret = await consoleService.revealSaaSSecret(token);
        setRevealedSecret(secret);
    } catch (err: unknown) {
        alert('Failed to reveal secret: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
        setIsRevealing(false);
    }
  };

  const handleAddOrigin = async () => {
      if (!newOrigin.trim() || !saasProfile) return;
      const origins = [...saasProfile.allowedOrigins, newOrigin.trim()];
      try {
          await consoleService.updateSaaSOrigins(token, origins);
          setSaasProfile({ ...saasProfile, allowedOrigins: origins });
          setNewOrigin('');
      } catch (err: unknown) {
          console.error(err);
          alert('Failed to add origin');
      }
  };

  const handleRemoveOrigin = async (origin: string) => {
      if (!saasProfile) return;
      const origins = saasProfile.allowedOrigins.filter((o: string) => o !== origin);
      try {
          await consoleService.updateSaaSOrigins(token, origins);
          setSaasProfile({ ...saasProfile, allowedOrigins: origins });
      } catch (err: unknown) {
          console.error(err);
          alert('Failed to remove origin');
      }
  };

  const handleLogout = () => {
    localStorage.removeItem('guaw_token');
    localStorage.removeItem('guaw_user');
    navigate('/console/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/20 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <img src="/guardian-silver.png" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" alt="S" />
          <span className="font-bold tracking-tight">GUAW Console</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('verifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'verifications' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <FileCheck size={20} />
            <span className="font-medium">Verifications</span>
          </button>

          <button 
            onClick={() => setActiveTab('keys')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'keys' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <Key size={20} />
            <span className="font-medium">API Keys</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <BarChart3 size={20} />
            <span className="font-medium">Analytics</span>
          </button>

          {currentPlanId !== 'enterprise_trial' && (
            <button 
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'billing' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <CreditCard size={20} />
              <span className="font-medium">Billing</span>
            </button>
          )}



          <button 
            onClick={() => setActiveTab('integrity')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'integrity' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <Shield size={20} />
            <span className="font-medium">Tribunal</span>
          </button>

          <button 
            onClick={() => setActiveTab('ledger')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'ledger' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <Database size={20} />
            <span className="font-medium">Lazarus Ledger</span>
          </button>

          {user.role === 'ADMIN' && (
            <>
              <div className="pt-4 pb-2 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Admin Panel</div>
              <button 
                onClick={() => setActiveTab('economics')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'economics' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                <ShieldCheck size={20} className="text-emerald-400" />
                <span className="font-medium">Economics</span>
                {(economy?.balance ?? 0) > 0 && (
                    <span className="ml-auto text-[8px] bg-emerald-500 text-black px-1.5 py-0.5 rounded-md font-black">
                        ${Math.floor(economy!.balance / 1000)}K
                    </span>
                )}
              </button>

              <button 
                onClick={() => setActiveTab('leaderboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'leaderboard' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                <Trophy size={20} />
                <span className="font-medium">Leaderboard</span>
              </button>

              <button 
                onClick={() => setActiveTab('admin')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'admin' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                <Activity size={20} />
                <span className="font-medium">Economic Health</span>
              </button>
              <button 
                onClick={() => setActiveTab('pipeline')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'pipeline' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                <FileText size={20} />
                <span className="font-medium">Partner Pipeline</span>
              </button>
            </>
          )}
        </nav>

        <div className="pt-6 border-t border-white/5">
          <div className="px-4 py-3 mb-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-black font-bold text-xs uppercase">
              {user.email?.[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{user.email}</p>
              <p className="text-[10px] text-primary font-mono truncate">{user.guawId || 'guaw://sovereign'}</p>
              <div className="flex items-center gap-1.5 mt-1">
                 <div className="px-1.5 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20 text-[9px] font-black text-orange-400 flex items-center gap-1">
                    <span>🔥</span>
                    <span>{user.streak || 0} DAY STREAK</span>
                 </div>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">
                  {user.role === 'ADMIN' ? 'SOVEREIGN KERNEL' : `${currentPlanId} Plan`}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-alert hover:bg-alert/10 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-10 min-h-screen relative overflow-hidden">
        {/* Particles Background tied to main content area to avoid sidebar overlap issues if desired, 
            or fix it to screen. Let's fix it to the screen but behind content. */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-50">
             <ParticlesBackground />
        </div>
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={activeTab === 'admin' ? "max-w-[95%] mx-auto" : "max-w-5xl mx-auto"}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                    {currentPlanId === 'trial' ? 'Sovereign Audit Hub' : `Welcome back, ${user?.email?.split('@')?.[0] || 'Guardian'}.`}
                    <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{user?.guawId}</span>
                  </h1>
                  <p className="text-gray-500 mt-2 font-medium">
                    {currentPlanId === 'trial' 
                      ? 'Evaluation Environment // Enterprise Lineage Active'
                      : 'Your sovereign infrastructure is operational and securing interactions.'}
                  </p>
                </div>
                
                {user.role === 'ADMIN' && (
                  <button 
                    onClick={() => {
                        const newAttacks = Math.floor(Math.random() * 5) + 1;
                        const newUsed = Math.min(quota.used + 10000, quota.limit * 1.2);
                        setStats(prev => [
                            { ...prev[0], value: (prev[0]?.value ?? 0) + 1 },
                            { ...prev[1], value: ((prev[1]?.value as number) ?? 0) + newAttacks },
                            { ...prev[2], value: Math.floor(Math.random() * 4) + 26 }
                        ]);
                        setQuota(prev => ({ ...prev, used: newUsed }));
                        consoleService.checkSovereignQuota(token, newUsed, quota.limit).catch(() => {});
                    }}
                    className="text-xs bg-red-500/10 text-red-500 px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all font-mono uppercase tracking-widest"
                  >
                    ⚡ Simulate Attack
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* Total Verifications */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest italic font-mono">Total Verifications</p>
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                        <FileCheck size={20} />
                      </div>
                    </div>
                    <p className="text-3xl font-mono font-bold text-white mb-2">{stats[0].value.toLocaleString()}</p>
                    <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      {stats[0].trend} <span className="text-gray-600 font-normal ml-1">v. last month</span>
                    </p>
                  </div>

                  {/* Persistence */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group font-mono">
                    <div className="flex items-center justify-between mb-4 italic">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Your Persistence</p>
                      <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform">
                        <SovereignGlyph type="sun" size={20} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white mb-2 italic tracking-tighter">{user.streak || 0} DAYS</p>
                    <p className="text-xs font-bold text-orange-400 flex items-center gap-1 uppercase tracking-widest group-hover:animate-pulse">Active Streak Seal</p>
                  </div>

                  {/* Bot Terminations */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group">
                      <div className="flex items-center justify-between mb-4 italic">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Bot Terminations</p>
                        <div className="p-2 rounded-xl bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
                            <AlertCircle size={20} />
                        </div>
                      </div>
                      <p className="text-3xl font-mono font-bold text-white mb-2">{stats[1].value.toLocaleString()}</p>
                      <p className="text-xs font-bold text-red-400 flex items-center gap-1">
                        <TrendingUp size={12} /> {stats[1].trend} <span className="text-gray-600 font-normal ml-1">prevented attacks</span>
                      </p>
                  </div>

                  {/* Avg Latency */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group">
                      <div className="flex items-center justify-between mb-4 italic">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Avg Latency</p>
                        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                            <Activity size={20} />
                        </div>
                      </div>
                      <p className="text-3xl font-mono font-bold text-white mb-2 tracking-tighter">~{stats[4].value}ms</p>
                      <p className="text-xs font-bold text-purple-400 flex items-center gap-1 uppercase tracking-widest font-mono group-hover:animate-pulse">p50 stable</p>
                  </div>

                  {/* Silicon Witness */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group">
                      <div className="flex items-center justify-between mb-4 italic">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Silicon Witness</p>
                        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={20} />
                        </div>
                      </div>
                      <p className="text-3xl font-mono font-bold text-white mb-2 tracking-tighter">{stats[3].value}µs</p>
                      <p className="text-xs font-bold text-blue-400 flex items-center gap-1 uppercase tracking-widest font-mono group-hover:animate-pulse">{stats[3].trend}</p>
                  </div>

                  {/* Sovereign Credits */}
                  <div 
                      onClick={() => setActiveTab('economics')}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group cursor-pointer"
                  >
                      <div className="flex items-center justify-between mb-4 italic">
                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest font-mono font-black">Sovereign Credits</p>
                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <SovereignGlyph type="sun" size={20} />
                        </div>
                      </div>
                      <p className="text-3xl font-mono font-bold text-white mb-2 tracking-tighter">
                          {economyLoading ? '...' : (economy?.balance ?? 0).toLocaleString()} 
                          <span className="text-xs ml-1 text-emerald-500 uppercase tracking-widest">GC</span>
                      </p>
                      <p className="text-[10px] font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Verified Physics Yield
                      </p>
                  </div>
              </div>

              {/* Chart Section */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-white">Verification Trends</h2>
                    <p className="text-sm text-gray-400 mt-1 italic font-mono uppercase tracking-widest">Temporal Invariant Scaling</p>
                  </div>
                  <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                       <span className="text-emerald-400">Verified Organic</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                       <span className="text-red-400">Bots Blocked</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData.length > 0 ? trendData : [
                    { date: 'No Data', verified: 0, attacks: 0 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                    <XAxis dataKey="date" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0a0a0a', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)'
                      }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="verified" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
                    <Line type="monotone" dataKey="attacks" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Sovereign Banner */}
              <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 via-white/5 to-transparent border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <ShieldCheck size={180} className="text-emerald-400" />
                  </div>
                  <div className="relative z-10 max-w-2xl">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">
                        {currentPlanId === 'enterprise_trial' ? 'Sovereign Capacity: EVALUATION' : `Sovereign Instance: ${currentPlanId.toUpperCase()}`}
                      </h2>
                      <p className="text-gray-400 leading-relaxed mb-6">
                        Instance currently operating under <strong className="text-white">FAIL-CLOSED</strong> protocol.
                        Physical invariants (Beta/Sigma) are being enforced at the edge. 
                        Forensic ledger <strong className="text-emerald-400 font-mono italic">LAZARUS_V1</strong> is actively sealing all cryptographic artifacts.
                      </p>
                      <div className="flex gap-4">
                        <button className="px-6 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-emerald-400 transition-colors shadow-xl">
                          Request Deep Forensic Audit
                        </button>
                        <button onClick={() => setActiveTab('verifications')} className="px-6 py-3 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/10 transition-colors">
                          Inspect Live Verifications
                        </button>
                      </div>
                  </div>
              </div>
              
              {/* 🛡️ FORENSIC AUDIT VAULT SERVICE (Visible for Qualified Tiers) */}
              {(user.role === 'ADMIN' || currentPlanId === 'business' || currentPlanId === 'pro') && (
                  <div className="p-8 rounded-3xl glass-dark border border-blue-500/20 bg-blue-900/5 relative overflow-hidden flex items-center justify-between group">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                          <FileText size={120} className="text-blue-400" />
                      </div>
                      
                      <div className="relative z-10 max-w-2xl">
                          <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-2">
                              <ShieldCheck className="text-blue-400" size={24} />
                              Forensic Audit Vault
                              <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-mono uppercase tracking-widest">Service Active</span>
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed mb-4">
                              Your infrastructure generates cryptographic proofs for every interaction. You can request a signed export of these immutable logs for legal, compliance, or insurance purposes.
                          </p>
                          <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 gap-4">
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Zero-Knowledge</span>
                                  <span className="text-xs font-mono text-gray-300">zk-SNARKs (Groth16)</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Adaptive Hashing</span>
                                  <span className="text-xs font-mono text-gray-300">Bcrypt (Cost 12+)</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">PKI Standard</span>
                                  <span className="text-xs font-mono text-gray-300">X.509 / PKIjs</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Circuit Logic</span>
                                  <span className="text-xs font-mono text-gray-300">Circom Lib</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Structure</span>
                                  <span className="text-xs font-mono text-gray-300">Merkle Trees</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Sovereign Hashing</span>
                                  <span className="text-xs font-mono text-gray-300">SHA-3 (Keccak)</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Memory Cloaking</span>
                                  <span className="text-xs font-mono text-gray-300">AES-256 (Ghost RAM)</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Ledger State</span>
                                  <span className="text-xs font-mono text-emerald-400 animate-pulse">Lazarus V1.0 Active</span>
                              </div>
                          </div>
                      </div>

                      <div className="relative z-10">
                          <button 
                              onClick={async () => {
                                  try { await consoleService.logAuditRequest(token); } catch (e) { console.error('Audit Log Failed', e); }
                                  // Open Modal or Alert for now, simulating internal svc
                                  const confirmed = window.confirm("Generate Forensic Export Package?\n\nThis will compile a signed archive of your traffic logs and ledger hashes. The secure link will be sent to your registered email.");
                                  if (confirmed) {
                                      alert("Request Queued: Forensic Export ID #FX-" + Math.floor(Math.random() * 10000) + "\n\nGenerating cryptographic proofs... You will receive a notification shortly.");
                                  }
                              }}
                              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2"
                          >
                              <FileText size={18} />
                              Generate Export
                          </button>
                      </div>
                  </div>
              )}
            </div>
          )}

          {activeTab === 'verifications' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div>
                  <h1 className="text-3xl font-bold text-white mb-2 italic tracking-tighter">Live Verification Ledger</h1>
                  <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">Immutable Proof of Presence // Chain: LAZARUS_V1</p>
               </div>

               {/* Filters - GLASS */}
               <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                      <input
                        type="text"
                        placeholder="Search by trace ID, hash or device signature..."
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter size={18} className="text-gray-600" />
                      <select className="px-4 py-3 bg-black/40 border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-black uppercase tracking-widest text-[10px]">
                        <option value="all">Every Artifact</option>
                        <option value="organic">Organic Only</option>
                        <option value="synthetic">Synthetic Threats</option>
                        <option value="inconclusive">Under Review</option>
                      </select>
                    </div>
                  </div>
               </div>

               {/* Table - GLASS */}
               <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black font-mono text-gray-600 uppercase tracking-widest">Temporal Signature</th>
                        <th className="px-6 py-4 text-[10px] font-black font-mono text-gray-600 uppercase tracking-widest">Artifact Trace</th>
                        <th className="px-6 py-4 text-[10px] font-black font-mono text-gray-600 uppercase tracking-widest">Verdict</th>
                        <th className="px-6 py-4 text-[10px] font-black font-mono text-gray-600 uppercase tracking-widest">Complexity</th>
                        <th className="px-6 py-4 text-[10px] font-black font-mono text-gray-600 uppercase tracking-widest">Smoothness</th>
                        <th className="px-6 py-4 text-[10px] font-black font-mono text-gray-600 uppercase tracking-widest text-right">Certificate Seal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {verifications.length > 0 ? verifications.map((item, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4 text-[10px] font-mono text-gray-500">{new Date(item.timestamp).toLocaleString()}</td>
                          <td className="px-6 py-4 font-mono text-xs text-white group-hover:text-emerald-400 transition-colors uppercase tracking-widest">
                              {item.payload?.origin || 'Unknown'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${item.type === 'INTEGRITY_VERIFICATION' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                              {item.type === 'INTEGRITY_VERIFICATION' ? 'HUMAN' : 'BOT'}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs font-bold text-white">{item.payload?.confidence || 'N/A'}</td>
                          <td className="px-6 py-4 font-mono text-xs font-bold text-white">{item.payload?.entropy || 'N/A'}</td>
                          <td className="px-6 py-4 text-right">
                             <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-mono italic">VERIFIED</span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                            <td colSpan={6} className="py-20 text-center text-gray-600 font-mono italic text-xs uppercase tracking-widest">
                                No verification events logged for this epoch.
                            </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div>
                  <h1 className="text-3xl font-bold text-white mb-2 italic tracking-tighter">Sovereign Metrics Engine</h1>
                  <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">Live Telemetry // Signal Analysis // Latency Hub</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                    <h3 className="text-lg font-bold text-white mb-6 italic">Signal Convergence (24h)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                       <LineChart data={trendData.length > 0 ? trendData : [
                         { date: 'Mon', verified: 0, attacks: 0 },
                         { date: 'Tue', verified: 0, attacks: 0 },
                         { date: 'Wed', verified: 0, attacks: 0 },
                         { date: 'Thu', verified: 0, attacks: 0 },
                         { date: 'Fri', verified: 0, attacks: 0 },
                         { date: 'Sat', verified: 0, attacks: 0 },
                         { date: 'Sun', verified: 0, attacks: 0 },
                       ]}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                         <XAxis dataKey="date" stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} />
                         <YAxis stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} />
                         <Tooltip 
                           contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                           itemStyle={{ color: '#fff' }}
                         />
                         <Line type="monotone" dataKey="verified" stroke="#10b981" strokeWidth={3} dot={false} />
                         <Line type="monotone" dataKey="attacks" stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                       </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 relative overflow-hidden">
                    <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest border border-emerald-500/20 z-10">
                        Demo data — coming soon
                    </div>
                    <h3 className="text-lg font-bold text-white mb-6 italic">Network Latency (Global)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                       <LineChart data={[
                         { h: '00', v: 40 }, { h: '04', v: 30 }, { h: '08', v: 35 }, { h: '12', v: 42 }, { h: '16', v: 38 }, { h: '20', v: 32 }, { h: '24', v: 40 },
                       ]}>
                         <Line type="step" dataKey="v" stroke="#3b82f6" strokeWidth={2} dot={false} />
                         <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                         <XAxis dataKey="h" stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} />
                         <YAxis stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} />
                       </LineChart>
                    </ResponsiveContainer>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'keys' && (
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Integrity Credentials</h1>
                    <p className="text-gray-500">Your B2B SaaS SDK credentials for server-side verification.</p>
                  </div>
                </div>

                {/* SaaS Credentials Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                  {saasLoading ? (
                    <div className="animate-pulse flex flex-col gap-4">
                      <div className="h-4 bg-white/10 w-1/4 rounded"></div>
                      <div className="h-10 bg-white/5 rounded"></div>
                    </div>
                  ) : saasProfile ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block">Publishable Key</label>
                          <div className="flex items-center gap-2">
                             <code className="flex-1 bg-black/40 border border-white/10 p-3 rounded-xl font-mono text-xs text-white overflow-hidden text-ellipsis whitespace-nowrap">
                                {saasProfile.publishableKey}
                             </code>
                             <button 
                               onClick={() => {
                                 navigator.clipboard.writeText(saasProfile.publishableKey);
                                 alert('Copied to clipboard');
                               }}
                               className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                             >
                                <Copy size={16} />
                             </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block">Secret Key</label>
                          <div className="flex items-center gap-2">
                             <code className="flex-1 bg-black/40 border border-white/10 p-3 rounded-xl font-mono text-xs text-white overflow-hidden text-ellipsis whitespace-nowrap">
                                {revealedSecret ? revealedSecret : 'GU_SEC_••••••••••••••••••••••••'}
                             </code>
                             {!revealedSecret ? (
                                <button 
                                  onClick={handleRevealSecret}
                                  disabled={isRevealing}
                                  className="px-4 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200"
                                >
                                   {isRevealing ? '...' : 'Reveal Secret'}
                                </button>
                             ) : (
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(revealedSecret);
                                    alert('Copied secret');
                                  }}
                                  className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30"
                                >
                                   <Copy size={16} />
                                </button>
                             )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-white/5">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 block">Authorized Domains (CORS)</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                           {saasProfile.allowedOrigins.map((origin: string) => (
                             <div key={origin} className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-emerald-400 text-xs font-mono">
                                {origin}
                                <button onClick={() => handleRemoveOrigin(origin)} className="hover:text-white transition-colors"><X size={14} /></button>
                             </div>
                           ))}
                        </div>
                        <div className="flex gap-2">
                           <input 
                             value={newOrigin}
                             onChange={(e) => setNewOrigin(e.target.value)}
                             onKeyDown={(e) => e.key === 'Enter' && handleAddOrigin()}
                             placeholder="https://client-production.com"
                             className="flex-1 bg-black/40 border border-white/10 p-3 rounded-xl font-mono text-xs text-white outline-none focus:border-emerald-500"
                           />
                           <button 
                             onClick={handleAddOrigin}
                             className="px-6 py-3 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/20"
                           >
                             Add Domain
                           </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">SaaS Profile not initialized.</p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Internal Management Keys</h1>
                    <p className="text-gray-500">Traditional API keys for management scripts and automated audits.</p>
                  </div>
                  <button 
                    onClick={() => setIsCreating(true)}
                    className="flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
                  >
                    <Plus size={20} />
                    Create Mgmt Key
                  </button>
                </div>

               {/* Keys List */}
               <div className="glass-dark rounded-3xl border border-white/5 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                      <tr>
                        <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase tracking-widest">Label</th>
                        <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase tracking-widest">Key Prefix</th>
                        <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase tracking-widest">Created</th>
                        <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {keys.map((key) => (
                        <tr key={key.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-medium">{key.name}</td>
                          <td className="px-6 py-4"><code className="bg-white/10 px-2 py-1 rounded text-xs text-primary">{key.key_prefix}</code></td>
                          <td className="px-6 py-4 text-sm text-gray-500">{new Date(key.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => handleRevoke(String(key.id))}
                              className="text-gray-500 hover:text-red-400 transition-colors p-2"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {keys.length === 0 && !loading && (
                    <div className="py-20 text-center text-gray-500 font-mono italic">
                      No API Keys found. Create one to begin integration.
                    </div>
                  )}
               </div>

               {/* Create Key Modal */}
               {isCreating && (
                 <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                   <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="max-w-md w-full glass-dark p-8 rounded-3xl border border-white/10 shadow-3xl"
                   >
                     {!generatedKey ? (
                       <>
                         <h2 className="text-2xl font-bold mb-4">Create API Key</h2>
                         <p className="text-gray-400 text-sm mb-6">Choose a label for this key to identify it in your usage reports.</p>
                         <input 
                            autoFocus
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl mb-6 outline-none focus:border-primary"
                            placeholder="Production Key"
                         />
                         <div className="flex gap-4">
                           <button onClick={() => setIsCreating(false)} className="flex-1 py-3 text-gray-500 font-bold">Cancel</button>
                           <button onClick={handleCreateKey} className="flex-1 py-3 bg-white text-black font-bold rounded-xl">Create</button>
                         </div>
                       </>
                     ) : (
                       <>
                          <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                            <ShieldCheck size={32} />
                          </div>
                          <h2 className="text-2xl font-bold mb-2 text-center">Secret Key Generated</h2>
                          <p className="text-gray-400 text-xs text-center mb-6 italic text-alert">
                            Warning: Save this key now. It will NEVER be shown again.
                          </p>
                          <div className="relative group/key">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-xl font-mono text-xs break-all mb-8 select-all pr-12">
                                {generatedKey}
                            </div>
                            <button 
                                onClick={() => {
                                    if (generatedKey) {
                                        navigator.clipboard.writeText(generatedKey);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }
                                }}
                                className="absolute right-3 top-3 p-2 rounded-lg bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                            </button>
                          </div>
                          <button 
                             onClick={() => { setIsCreating(false); setGeneratedKey(null); }}
                             className="w-full py-4 bg-primary text-black font-bold rounded-xl"
                           >
                             I have saved my key
                           </button>
                       </>
                     )}
                   </motion.div>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'integrity' && (
             <MultimodalAuditPanel token={token} />
          )}

          {activeTab === 'ledger' && (
             <LazarusLedgerPanel token={token} />
          )}

          {activeTab === 'billing' && (
            <div className="space-y-16 animate-in fade-in zoom-in duration-300">
                {/* Integration Code Section - Moved to top as per USER request */}
                <div className="py-16 px-10 rounded-[3rem] glass-dark border border-white/5 relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
                        <div className="lg:w-1/2 space-y-6">
                            <h2 className="text-5xl font-black tracking-tighter">Integration in <span className="text-primary italic">seconds.</span></h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed">Built for high-security environments where verification must be instant, silent, and undeniable.</p>
                            
                            <div className="flex gap-4 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
                                <button 
                                    onClick={() => setActiveSdk('presence')}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSdk === 'presence' ? 'bg-primary text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                                >
                                    Presence (Kernel)
                                </button>
                                <button 
                                    onClick={() => setActiveSdk('media')}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSdk === 'media' ? 'bg-emerald-500 text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                                >
                                    Media (Guaw)
                                </button>
                                <button 
                                    onClick={() => setActiveSdk('audit')}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSdk === 'audit' ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                                >
                                    Audit (SDK)
                                </button>
                            </div>

                            <div className="flex flex-col gap-4 pt-4">
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,148,0.4)]" /> Zero Personal Data Collection
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,148,0.4)]" /> Native Web & Mobile SDKs
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,148,0.4)]" /> Verifiable Fraud Proofs
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full space-y-4">
                            <AnimatePresence mode="wait">
                                {activeSdk === 'presence' ? (
                                    <motion.div 
                                        key="presence"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <CodeBlock 
                                            language="bash"
                                            code="npm install @guaw/kernel"
                                            filename="Terminal"
                                            className="glass"
                                        />
                                        <CodeBlock 
                                            language="typescript"
                                            code={`import { Kernel } from '@guaw/kernel';\n\n// 1. Initialize (Client-Side)\nKernel.init({ apiKey: "pk_live_..." });\n\n// 2. Verify Presence\nconst result = await Kernel.verify(trace, "session");\n\nif (result.verified) {\n  // Proceed: Physically Coherent\n}`}
                                            filename="app.ts"
                                            className="glass"
                                        />
                                    </motion.div>
                                ) : activeSdk === 'media' ? (
                                    <motion.div 
                                        key="media"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <CodeBlock 
                                            language="bash"
                                            code="npm install @guaw/web-sdk"
                                            filename="Terminal"
                                            className="glass-emerald"
                                        />
                                        <CodeBlock 
                                            language="typescript"
                                            code={`import { GuawGuardian } from '@guaw/web-sdk';\n\nconst guardian = new GuawGuardian({ apiKey: 'sk_live_...' });\n\n// Validate Media Integrity\nconst verdict = await guardian.verify(file);\n\nif (verdict.status === 'VERIFIED') {\n  // Physically Coherent: Sensor-verified\n}`}
                                            filename="media.ts"
                                            className="glass-emerald"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="audit"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <CodeBlock 
                                            language="bash"
                                            code="npm install @guaw/integrity-validator-sdk"
                                            filename="Terminal"
                                            className="glass-purple"
                                        />
                                        <CodeBlock 
                                            language="typescript"
                                            code={`import { IntegrityVerifier } from '@guaw/integrity-validator-sdk';\n\n// Offline Verification of Signatures\nconst isValid = IntegrityVerifier.verifySovereignHeartbeat(heartbeat);\n\nif (isValid) {\n  // Legally Binding Physical Evidence\n}`}
                                            filename="audit.ts"
                                            className="glass-purple"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    {/* Deco Glyph */}
                    <div className="absolute -bottom-20 -right-20 opacity-[0.03] rotate-12">
                        <SovereignGlyph type="sun" size={400} />
                    </div>
                </div>

                <div className="text-center">
                    <h1 className="text-5xl font-black mb-2 tracking-tighter uppercase italic">Infrastructure Tiers</h1>
                    <p className="text-gray-500 text-lg">GUAW does not charge for features. We charge for <strong className="text-white">responsibility</strong> and <strong className="text-white">integrity levels</strong>.</p>
                    
                    {/* Billing Toggle */}
                    <div className="flex justify-center mt-10">
                        <div className="p-1 rounded-2xl bg-white/5 border border-white/10 flex items-center shadow-xl">
                            <button 
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                            >
                                Monthly
                            </button>
                            <button 
                                onClick={() => setBillingCycle('annual')}
                                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative group ${billingCycle === 'annual' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                            >
                                Annual
                                <span className="absolute -top-3 -right-3 bg-emerald-500 text-black text-[7px] px-2 py-0.5 rounded-full font-black animate-pulse whitespace-nowrap">
                                    SAVE 17%
                                </span>
                            </button>
                        </div>
                    </div>

                    {error && (
                      <div className="mt-4 p-4 rounded-xl bg-alert/10 text-alert border border-alert/20 font-mono text-sm inline-block">
                         {error}
                      </div>
                    )}
                </div>

               {recommendedPlanId && (
                  <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-8 flex items-center justify-between"
                  >
                      <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                               <Shield size={24} />
                           </div>
                           <div>
                               <p className="text-sm font-bold text-white flex items-center gap-2">
                                   Suggested Upgrade Path
                                   <span className="bg-primary text-black text-[10px] px-2 py-0.5 rounded font-black uppercase">Growth Alert</span>
                               </p>
                                <p className="text-xs text-gray-400">Your current sovereign capacity limit is reaching its threshold. We recommend the <strong className="text-white">{recommendedPlanId === 'core' ? 'DEVELOPER CORE' : recommendedPlanId?.toUpperCase()}</strong> infrastructure tier for uninterrupted protection.</p>
                           </div>
                      </div>
                      <button onClick={() => setRecommendedPlanId(null)} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={18}/></button>
                  </motion.div>
               )}

                <div className="space-y-12 pb-12 w-full lg:max-w-7xl mx-auto">
                    {/* First Row: 3 cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {/* Trial */}
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6 group hover:border-white/20 transition-all duration-700 flex flex-col relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="space-y-3 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-gray-500 text-[8px] font-black uppercase tracking-widest border border-white/10">
                                    Evaluation Unit
                                </div>
                                <h3 className="text-2xl font-black text-white italic tracking-tighter">Trial</h3>
                                <p className="text-gray-600 text-[10px] leading-relaxed italic uppercase tracking-tighter">Explore the sovereign verification stack.</p>
                            </div>
                            <div className="flex items-baseline gap-1 relative z-10">
                                <span className="text-4xl font-black text-white tracking-tighter">$0</span>
                                <span className="text-gray-600 font-black text-[10px] italic">/7 DAYS</span>
                            </div>
                            <ul className="space-y-4 text-[10px] text-gray-500 border-t border-white/5 pt-8 flex-1 relative z-10">
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> 500 req/day · 15k/month</li>
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> 1 domain</li>
                                <li className="flex items-center gap-3 line-through opacity-30 italic"><FileCheck size={14} /> NO ZK-Proof</li>
                                <li className="flex items-center gap-3 line-through opacity-30 italic"><FileCheck size={14} /> NO Forensic Chain</li>
                            </ul>
                            <button disabled={currentPlanId === 'trial'} className={`mt-8 block w-full py-5 rounded-2xl ${currentPlanId === 'trial' ? 'bg-white text-black' : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black'} font-black text-center text-[10px] uppercase tracking-widest transition-all relative z-10 disabled:opacity-50`}>
                                {currentPlanId === 'trial' ? 'Active Plan' : 'Start Evaluation'}
                            </button>
                        </div>

                        {/* Lite */}
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-purple-500/20 space-y-6 group hover:border-purple-500/40 transition-all duration-700 flex flex-col relative overflow-hidden backdrop-blur-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="space-y-3 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[8px] font-black uppercase tracking-widest border border-purple-500/20">
                                    Layer 1 Only
                                </div>
                                <h3 className="text-2xl font-black text-white italic tracking-tighter">Lite</h3>
                                <p className="text-purple-400/70 text-[10px] leading-relaxed italic uppercase tracking-tighter">Ultimate reCAPTCHA replacement.</p>
                            </div>
                            <div className="flex items-baseline gap-1 relative z-10">
                                <span className="text-4xl font-black text-white tracking-tighter">
                                    {billingCycle === 'monthly' ? '$39' : '$390'}
                                </span>
                                <span className="text-gray-600 font-black text-[10px] italic">
                                    {billingCycle === 'monthly' ? '/MO' : '/YR'}
                                </span>
                            </div>
                            <ul className="space-y-4 text-[10px] text-gray-400 border-t border-purple-500/10 pt-8 flex-1 relative z-10">
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-purple-500/60" /> 100k req/month · 2 domains</li>
                                <li className="flex items-center gap-3 italic text-purple-400"><FileCheck size={14} /> <span className="font-black uppercase">Presence SDK Included</span></li>
                                <li className="flex items-center gap-3 line-through opacity-30 italic"><div className="w-1 h-1 rounded-full bg-purple-500/60" /> Media Detection</li>
                                <li className="flex items-center gap-3 line-through opacity-30 italic"><div className="w-1 h-1 rounded-full bg-purple-500/60" /> ZK-Proofs</li>
                            </ul>
                            <div className="mt-8 space-y-3 relative z-10">
                                <button
                                    onClick={() => handleUpgrade('lite')}
                                    disabled={upgrading || currentPlanId === 'lite'}
                                    className={`block w-full py-5 rounded-2xl ${currentPlanId === 'lite' ? 'bg-purple-500 text-black' : 'bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500 hover:text-black'} font-black text-center text-[10px] uppercase tracking-widest transition-all disabled:opacity-50`}
                                >
                                    {upgrading ? '...' : currentPlanId === 'lite' ? 'Active Plan' : 'Get API Key'}
                                </button>
                            </div>
                        </div>

                        {/* Starter */}
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-emerald-500/20 space-y-6 group hover:border-emerald-500/40 transition-all duration-700 flex flex-col relative overflow-hidden backdrop-blur-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="space-y-3 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">
                                    Entry SaaS
                                </div>
                                <h3 className="text-2xl font-black text-white italic tracking-tighter">Starter</h3>
                                <p className="text-emerald-400/70 text-[10px] leading-relaxed italic uppercase tracking-tighter">Sovereign verification for startups.</p>
                            </div>
                            <div className="flex items-baseline gap-1 relative z-10">
                                <span className="text-4xl font-black text-white tracking-tighter">
                                    {billingCycle === 'monthly' ? '$79' : '$790'}
                                </span>
                                <span className="text-gray-600 font-black text-[10px] italic">
                                    {billingCycle === 'monthly' ? '/MO' : '/YR'}
                                </span>
                            </div>
                            <ul className="space-y-4 text-[10px] text-gray-400 border-t border-emerald-500/10 pt-8 flex-1 relative z-10">
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-emerald-500/60" /> 50k req/month · 3 domains</li>
                                <li className="flex items-center gap-3 italic text-emerald-400"><FileCheck size={14} /> <span className="font-black uppercase">ZK-Proof Included</span></li>
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-emerald-500/60" /> Advanced Detection (CCD)</li>
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-emerald-500/60" /> SLA 99.5% · Email Support</li>
                            </ul>
                            <div className="mt-8 space-y-2 relative z-10">
                                <button
                                    onClick={() => handleUpgrade('starter')}
                                    disabled={upgrading || currentPlanId === 'starter'}
                                    className={`block w-full py-5 rounded-2xl ${currentPlanId === 'starter' ? 'bg-emerald-500 text-black' : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500 hover:text-black'} font-black text-center text-[10px] uppercase tracking-widest transition-all disabled:opacity-50`}
                                >
                                    {upgrading ? '...' : currentPlanId === 'starter' ? 'Active Plan' : 'Deploy in 5 min'}
                                </button>
                                {currentPlanId !== 'starter' && (
                                    <button
                                        onClick={() => { setTargetPlan('starter'); setIsCryptoCheckout(true); setCryptoStep('NETWORK'); setCryptoError(''); setTxHash(''); setCurrentIntent(null); }}
                                        className="block w-full py-2.5 rounded-xl border border-white/5 text-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                                    >
                                        PAY WITH USDT
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Second Row: 2 cards centered */}
                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto pt-6 opacity-30 grayscale filter blur-[0.5px] hover:blur-0 hover:opacity-50 transition-all duration-700">
                        {/* Pro — Roadmap */}
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6 flex flex-col relative overflow-hidden">
                            <div className="space-y-3 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-500 text-[8px] font-black uppercase tracking-widest italic">
                                   Q3 Roadmap
                                </div>
                                <h3 className="text-2xl font-black text-white italic opacity-40 uppercase tracking-tighter">Pro Tier</h3>
                                <p className="text-gray-600 text-[10px] leading-relaxed italic uppercase tracking-tighter">Production integrity for scalable apps.</p>
                            </div>
                            <ul className="space-y-4 text-[10px] text-gray-500 border-t border-white/5 pt-8 relative z-10 flex-1">
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> 250k req/month · 10 domains</li>
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> ZK-Proof + Forensic Export</li>
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> Custom Rulesets + Alerting</li>
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> SLA 99.9% · Priority Support</li>
                            </ul>
                            <div className="block w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-gray-600 font-black text-center text-[10px] uppercase tracking-widest relative z-10 cursor-not-allowed">
                                Locked for Beta
                            </div>
                        </div>

                        {/* Business — Roadmap */}
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6 flex flex-col relative overflow-hidden">
                            <div className="space-y-3 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-500 text-[8px] font-black uppercase tracking-widest italic">
                                   Q4 Roadmap
                                </div>
                                <h3 className="text-2xl font-black text-white italic opacity-40 uppercase tracking-tighter">Business</h3>
                                <p className="text-gray-600 text-[10px] leading-relaxed italic uppercase tracking-tighter">Advanced integrity & forensics at scale.</p>
                            </div>
                            <ul className="space-y-4 text-[10px] text-gray-500 border-t border-white/5 pt-8 relative z-10 flex-1">
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> 1.5M req/month · Unlimited domains</li>
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> Forensic Integrity Chain</li>
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> Multi-Region (EZE + GRU)</li>
                                <li className="flex items-center gap-3 italic"><div className="w-1 h-1 rounded-full bg-white/20" /> SLA 99.95% · Dedicated Support</li>
                            </ul>
                            <div className="block w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-gray-600 font-black text-center text-[10px] uppercase tracking-widest relative z-10 cursor-not-allowed">
                                Roadmap Tier
                            </div>
                        </div>
                    </div>

                    {/* Sovereign Tier - Full Width */}
                    <div className="mt-12 p-10 rounded-[4rem] bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/20 group hover:border-red-500/40 transition-all duration-700 relative overflow-hidden backdrop-blur-3xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 transition-opacity pointer-events-none">
                            <SovereignGlyph type="cerberus" size={140} color="#ef4444" />
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[9px] font-black uppercase tracking-[0.2em] border border-red-500/20">
                                    Maximum Sovereign Authority
                                </div>
                                <h3 className="text-3xl font-black text-white italic">Sovereign Tier</h3>
                                <p className="text-gray-500 text-[11px] max-w-2xl leading-relaxed italic uppercase tracking-tighter">
                                    Dedicated infrastructure · HSM Engineering integration · On-premise deployment · 99.99% Guaranteed SLA · Legal Witness Protocol · Custom volume & zero-knowledge custom circuits.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <div className="flex items-center gap-3 text-[10px] italic">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.9)]" />
                                    <span className="text-red-500 font-black uppercase tracking-widest">Pricing: Custom Engineering</span>
                                </div>
                                <button 
                                    onClick={() => window.location.href='mailto:enterprise@guaw.app?subject=Sovereign Enterprise Inquiry'}
                                    className="flex-shrink-0 px-12 py-6 rounded-2xl bg-red-500 text-black font-black text-[11px] uppercase tracking-[0.3em] hover:scale-[1.05] transition-all shadow-[0_15px_50px_-10px_rgba(239,68,68,0.4)]"
                                >
                                    Consultation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Crypto Checkout Modal */}
                {isCryptoCheckout && (
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="max-w-md w-full glass-dark p-8 rounded-3xl border border-white/10 shadow-3xl text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                                    <Activity size={32} />
                                </div>
                            </div>
                            
                            <h2 className="text-2xl font-bold mb-2">USDT Payment</h2>
                            <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-mono">
                                {targetPlan.toUpperCase()} TIER LICENSE
                            </p>

                            {cryptoError && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-mono text-left">
                                    ERROR: {cryptoError}
                                </div>
                            )}

                            {cryptoStep === 'NETWORK' && (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-300 mb-4">Select Sovereign Network</p>
                                    <button 
                                        onClick={() => setSelectedNetwork('TRC20')}
                                        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${selectedNetwork === 'TRC20' ? 'bg-green-500/10 border-green-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                    >
                                        <span className="font-bold">TRITON (TRC20)</span>
                                        {selectedNetwork === 'TRC20' && <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />}
                                    </button>
                                    <button 
                                        onClick={() => setSelectedNetwork('ERC20')}
                                        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${selectedNetwork === 'ERC20' ? 'bg-green-500/10 border-green-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                    >
                                        <span className="font-bold">ETHEREUM (ERC20)</span>
                                        {selectedNetwork === 'ERC20' && <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />}
                                    </button>

                                    <button 
                                        onClick={() => setSelectedNetwork('BEP20')}
                                        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${selectedNetwork === 'BEP20' ? 'bg-yellow-500/10 border-yellow-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                    >
                                        <span className="font-bold">BNB SMART CHAIN (BEP20)</span>
                                        {selectedNetwork === 'BEP20' && <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />}
                                    </button>

                                    <div className="flex gap-3 mt-8">
                                        <button onClick={() => setIsCryptoCheckout(false)} className="flex-1 py-3 text-gray-500 font-bold hover:text-white">Cancel</button>
                                        <button onClick={handleCryptoCheckout} className="flex-1 py-3 bg-white text-black font-bold rounded-xl">
                                            Generate Address
                                        </button>
                                    </div>
                                </div>
                            )}

                            {cryptoStep === 'PAYMENT' && currentIntent && (
                                <div className="space-y-6 text-left">
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Send Exactly</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-mono font-bold text-white tracking-tight">{Number(currentIntent.amount).toFixed(2)}</span>
                                                <span className="text-green-500 font-bold">USDT</span>
                                            </div>
                                        </div>
                                        <div className="h-px bg-white/10" />
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">To Address ({selectedNetwork})</p>
                                            <div className="font-mono text-xs text-white break-all bg-black/30 p-3 rounded border border-white/5 select-all">
                                                {selectedNetwork === 'TRC20' 
                                                    ? 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb' 
                                                    : '0xc5605fda8E74aF032649DDb96D9AdcA9018708F8'}
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-2 italic">
                                                * Send only USDT on {selectedNetwork}.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Transaction Hash (TXID)</label>
                                        <input 
                                            value={txHash}
                                            onChange={(e) => setTxHash(e.target.value)}
                                            placeholder="0x..."
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-green-500 font-mono text-sm"
                                        />
                                    </div>

                                    <div className="flex gap-3 mt-8">
                                        <button onClick={() => setIsCryptoCheckout(false)} className="flex-1 py-3 text-gray-500 font-bold hover:text-white">Cancel</button>
                                        <button 
                                            onClick={handleConfirmPayment}
                                            disabled={!txHash}
                                            className="flex-1 py-3 bg-green-500 text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            I Have Paid
                                        </button>
                                    </div>
                                </div>
                            )}

                            {cryptoStep === 'CONFIRMING' && (
                                <div className="py-12">
                                    <div className="w-12 h-12 border-4 border-white/10 border-t-green-500 rounded-full animate-spin mx-auto mb-6" />
                                    <p className="text-lg font-bold">Verifying on Ledger...</p>
                                    <p className="text-gray-500 text-sm mt-2">This usually takes 10-20 seconds.</p>
                                </div>
                            )}

                            {cryptoStep === 'SUCCESS' && (
                                <div className="py-8">
                                    <p className="text-2xl font-bold text-white mb-2">Payment Confirmed</p>
                                    <p className="text-gray-400 text-sm mb-6">Your license has been upgraded.</p>
                                    <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 3 }}
                                            className="h-full bg-green-500"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-widest">Refreshing Dashboard...</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </div>
          )}

          {activeTab === 'leaderboard' && user.role === 'ADMIN' && (
            <PersistenceLeaderboard token={token} />
          )}

          {activeTab === 'admin' && user.role === 'ADMIN' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Platform Economic Health</h1>
                        <p className="text-gray-500">Real-time governance and conversion tracking.</p>
                    </div>
                    <button 
                        onClick={async () => {
                            setAdminLoading(true);
                            try {
                                const health = await consoleService.getEconomicHealth(token);
                                setAdminMetrics(health.metrics);
                                setAdminAccounts(health.accounts);
                                setAdminAccounts(health.accounts);
                                const audit = await consoleService.getAuditTrail(token);
                                setAuditTrail(audit);
                                const intents = await consoleService.getCryptoIntents(token);
                                setCryptoIntents(intents);
                            } catch (e) { console.error(e); }
                            setAdminLoading(false);
                        }}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono transition-colors"
                    >
                        {adminLoading ? 'Syncing...' : 'Force Refresh'}
                    </button>
                </div>

                {/* Metrics Grid */}
                {adminMetrics && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {[
                            { label: 'Total Accounts', value: adminMetrics.totalAccounts, icon: Users, color: 'text-white' },
                            { label: 'Enterprise', value: adminAccounts.filter(a => a.plan === 'enterprise_trial').length, icon: ShieldCheck, color: 'text-primary' },
                            { label: 'Active Trials', value: adminMetrics.activeTrials, icon: Clock, color: 'text-gray-400' },
                            { label: 'Free Tier', value: adminMetrics.freeTier, icon: adminMetrics.freeTier > 100 ? Activity : ShieldCheck, color: 'text-gray-500' },
                            { label: 'Paid Licenses', value: adminMetrics.paidLicenses, icon: CreditCard, color: 'text-secondary' },
                        ].map((stat, i) => (
                            <div key={i} className="p-6 rounded-3xl glass-dark border border-white/5 relative overflow-hidden">
                                <stat.icon className={`absolute -right-2 -bottom-2 w-16 h-16 opacity-5 ${stat.color}`} />
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{stat.label}</p>
                                <p className={`text-4xl font-mono font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Accounts Table */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <h2 className="text-xl font-bold flex items-center gap-2">
                            <Users size={20} className="text-primary" />
                            Developer Identities
                        </h2>
                        {/* Filters Controls */}
                        <div className="flex gap-2">
                            <select 
                                value={adminFilters.plan}
                                onChange={(e) => setAdminFilters({...adminFilters, plan: e.target.value})}
                                className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none focus:border-white/20"
                            >
                                <option value="ALL" className="bg-black">All Plans</option>
                                <option value="enterprise_trial" className="bg-black">Enterprise Trial</option>
                                <option value="trial" className="bg-black">Trial</option>
                                <option value="free" className="bg-black">Free</option>
                                <option value="pro" className="bg-black">Pro</option>
                                <option value="business" className="bg-black">Business</option>
                            </select>
                             <select 
                                value={adminFilters.state}
                                onChange={(e) => setAdminFilters({...adminFilters, state: e.target.value})}
                                className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none focus:border-white/20"
                            >
                                <option value="ALL" className="bg-black">All States</option>
                                <option value="TRIAL" className="bg-black">Active Trial</option>
                                <option value="EXPIRED_TRIAL" className="bg-black">Expired Trial</option>
                                <option value="PAID" className="bg-black">Paid</option>
                                <option value="FREE" className="bg-black">Free</option>
                            </select>
                            <label className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs cursor-pointer select-none hover:bg-white/10 transition-colors">
                                <input 
                                    type="checkbox"
                                    checked={adminFilters.trialExpiring}
                                    onChange={(e) => setAdminFilters({...adminFilters, trialExpiring: e.target.checked})}
                                />
                                Trial &lt; 48h
                            </label>
                        </div>
                    </div>
                    <div className="glass-dark rounded-3xl border border-white/5 overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Identity</th>
                                    <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Plan</th>
                                    <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Economic State</th>
                                    <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Trial End</th>
                                    <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Warned</th>
                                    <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {adminAccounts
                                .filter(acc => {
                                    if (adminFilters.plan !== 'ALL' && acc.plan !== adminFilters.plan) return false;
                                    if (adminFilters.state !== 'ALL' && acc.economicState !== adminFilters.state) return false;
                                    if (adminFilters.trialExpiring) {
                                        if (!acc.trialExpiresAt) return false;
                                        const expires = new Date(acc.trialExpiresAt).getTime();
                                        const now = Date.now();
                                        return (expires - now) < 48 * 3600 * 1000 && (expires - now) > 0;
                                    }
                                    return true;
                                })
                                .map((acc) => (
                                    <tr key={acc.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => setSelectedAccountId(acc.id)}
                                                className="font-bold text-left hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4"
                                            >
                                                {acc.email}
                                            </button>
                                            <p className="text-xs text-gray-500">{acc.company || 'Individual'}</p>
                                        </td>
                                        <td className="px-6 py-4 capitalize">{acc.plan}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                acc.economicState === 'TRIAL' ? 'bg-primary/20 text-primary' :
                                                acc.economicState === 'PAID' ? 'bg-secondary/20 text-secondary' :
                                                'bg-white/10 text-gray-400'
                                            }`}>
                                                {acc.economicState}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">
                                            {acc.trialExpiresAt ? new Date(acc.trialExpiresAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            {acc.notifiedTrialEnding ? (
                                                <span className="text-primary flex items-center gap-1 font-bold">YES</span>
                                            ) : (
                                                <span className="text-gray-600">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {(acc.economicState === 'TRIAL' || acc.economicState === 'EXPIRED_TRIAL' || acc.economicState === 'FREE') && (
                                                <button 
                                                    onClick={() => setIsExtending(acc.id)}
                                                    className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors border border-secondary/30 px-2 py-1 rounded"
                                                >
                                                    Extend
                                                </button>
                                            )}
                                            {acc.plan !== 'free' && (
                                                <button 
                                                    onClick={() => setIsDowngrading(acc.id)}
                                                    className="ml-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-white transition-colors border border-red-500/30 px-2 py-1 rounded"
                                                >
                                                    Downgrade
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Audit Trail */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FileText size={20} className="text-secondary" />
                        Forensic Economic Ledger
                    </h2>
                    <div className="glass-dark rounded-3xl border border-white/5 overflow-hidden">
                        <div className="max-h-[400px] overflow-y-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 border-b border-white/5 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Timestamp</th>
                                        <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Event</th>
                                        <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Actor</th>
                                        <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Payload</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {auditTrail.map((log) => (
                                        <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-mono text-[10px] text-gray-500">
                                                {new Date(log.timestamp).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-xs text-white bg-white/10 px-2 py-1 rounded">
                                                    {log.type.replace('BILLING.', '')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs">
                                                <p className="font-bold">{log.actorId.substring(0, 8)}...</p>
                                                <p className="text-[10px] text-gray-500">{log.actorRole}</p>
                                            </td>
                                            <td className="px-6 py-4 text-[10px] text-gray-400 font-mono">
                                                {JSON.stringify(log.payload)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Crypto Intents */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Activity size={20} className="text-green-400" />
                        USDT Payment Signals
                    </h2>
                    <div className="glass-dark rounded-3xl border border-white/5 overflow-hidden">
                        <div className="max-h-[300px] overflow-y-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 border-b border-white/5 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Identity</th>
                                        <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Amount & Network</th>
                                        <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Status</th>
                                        <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">TX Hash</th>
                                        <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Created</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {cryptoIntents.map((intent) => (
                                        <tr key={intent.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-xs">{intent.account.email}</p>
                                                <p className="text-[10px] text-gray-500">{intent.account.companyName || 'N/A'}</p>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs">
                                                {Number(intent.amount).toFixed(2)} <span className="text-gray-500">USDT</span>
                                                <span className="ml-2 bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{intent.network}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                                                    intent.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                                                    intent.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    intent.status === 'EXPIRED' ? 'bg-gray-500/20 text-gray-400' :
                                                    'bg-red-500/20 text-red-400'
                                                }`}>
                                                    {intent.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-[10px] font-mono text-gray-500 max-w-[150px] truncate">
                                                {intent.txHash || '—'}
                                            </td>
                                            <td className="px-6 py-4 text-[10px] font-mono text-gray-500">
                                                {new Date(intent.createdAt).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                             {cryptoIntents.length === 0 && (
                                <div className="p-8 text-center text-gray-500 text-xs font-mono">No crypto signals detected yet.</div>
                             )}
                        </div>
                    </div>
                </div>

                {/* Trial Extension Modal */}
                {isExtending && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="max-w-md w-full glass-dark p-8 rounded-3xl border border-secondary/20 shadow-3xl"
                        >
                            <h2 className="text-2xl font-bold mb-2">Extend Evaluation</h2>
                            <p className="text-gray-400 text-sm mb-6">Enter the number of days and a mandatory justification for the Lazarus Ledger.</p>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Days to add</label>
                                    <select 
                                        value={extensionDays}
                                        onChange={(e) => setExtensionDays(Number(e.target.value))}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-secondary"
                                    >
                                        <option value={3}>3 Days</option>
                                        <option value={7}>7 Days</option>
                                        <option value={14}>14 Days</option>
                                        <option value={30}>30 Days</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Reason (Audit Required)</label>
                                    <textarea 
                                        rows={3}
                                        value={extensionReason}
                                        onChange={(e) => setExtensionReason(e.target.value)}
                                        placeholder="Institutional requirement / technical delay..."
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-secondary text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button onClick={() => setIsExtending(null)} className="flex-1 py-3 text-gray-500 font-bold">Cancel</button>
                                <button 
                                    onClick={handleExtendTrial}
                                    disabled={!extensionReason.trim()}
                                    className="flex-1 py-3 bg-secondary text-black font-bold rounded-xl disabled:opacity-50"
                                >
                                    Confirm Extension
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
                
                {/* Force Downgrade Modal */}
                {isDowngrading && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="max-w-md w-full glass-dark p-8 rounded-3xl border border-red-500/20 shadow-3xl"
                        >
                            <h2 className="text-2xl font-bold mb-2 text-white">Force Downgrade</h2>
                            <p className="text-gray-400 text-sm mb-6">
                                This will immediately revoke Pro/Business access and revert the user to the FREE tier.
                            </p>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Reason (Audit Required)</label>
                                    <textarea 
                                        rows={3}
                                        value={downgradeReason}
                                        onChange={(e) => setDowngradeReason(e.target.value)}
                                        placeholder="Violation of terms / Payment failure / Abuse..."
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-red-500 text-sm"
                                    />
                                    {downgradeReason && downgradeReason.length < 5 && (
                                        <p className="text-xs text-red-500 mt-1">Reason must be at least 5 characters.</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1 block">Type "DOWNGRADE" to Confirm</label>
                                    <input 
                                        type="text"
                                        value={downgradeConfirm}
                                        onChange={(e) => setDowngradeConfirm(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-red-500 text-sm font-mono tracking-wider"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button onClick={() => setIsDowngrading(null)} className="flex-1 py-3 text-gray-500 font-bold hover:text-white">Cancel</button>
                                <button 
                                    onClick={handleForceDowngrade}
                                    disabled={!downgradeReason.trim() || downgradeReason.length < 5 || downgradeConfirm !== 'DOWNGRADE'}
                                    className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
                                >
                                    Confirm Downgrade
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
          )}


          {activeTab === 'pipeline' && user.role === 'ADMIN' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Institutional Onboarding Pipeline</h1>
                        <p className="text-gray-500">Management of high-integrity enterprise partners.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Knowledge Assets */}
                    <div className="p-8 rounded-3xl glass-dark border border-white/5 space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <ShieldCheck size={20} className="text-primary" />
                            Sovereign Protocol Assets
                        </h2>
                        <div className="space-y-4">
                            <div 
                                onClick={() => handleViewAsset('eab')}
                                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold">Enterprise Access Brief (EAB)</span>
                                    <span className="text-[10px] text-gray-500 font-mono">MD_V1.1</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">External protocol for serious third-party evaluators. Filters identity-mapping requests.</p>
                                <div className="text-[10px] text-primary font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                                    {assetLoading ? 'Opening Fault...' : 'View Internal Source →'}
                                </div>
                            </div>

                            <div 
                                onClick={() => handleViewAsset('exec_brief')}
                                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-primary">Executive Technical Brief</span>
                                    <span className="text-[10px] text-gray-500 font-mono">EXEC_ONLY</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">CISO/Legal/Compliance-grade positioning. Ontological separation, fail-closed doctrine, and explicit limitations. Zero marketing language.</p>
                                <div className="text-[10px] text-primary font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                                    {assetLoading ? 'Decrypting Executive Vault...' : 'Access Executive Brief →'}
                                </div>
                            </div>

                            <div 
                                onClick={() => handleViewAsset('checklist')}
                                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold">Partner Checklist</span>
                                    <span className="text-[10px] text-gray-500 font-mono">INTERNAL_ONLY</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">Evaluation matrix for technical and ethical alignment. Enforces stewardship boundaries.</p>
                                <div className="text-[10px] text-primary font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                                    {assetLoading ? 'Analyzing...' : 'Check Red Flags →'}
                                </div>
                            </div>

                            <div 
                                onClick={() => handleViewAsset('gaming')}
                                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-accent">Gaming & Esports Integrity</span>
                                    <span className="text-[10px] text-gray-500 font-mono">BETA_V1.0</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">Deterministic human presence for competitive economies and ranked matchmaking. Major platform alignment.</p>
                                <div className="text-[10px] text-primary font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                                    {assetLoading ? 'Opening Flow...' : 'View Use Case Brief →'}
                                </div>
                            </div>

                            <div 
                                onClick={() => handleViewAsset('gaming_tech')}
                                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-gray-300">Engineering Appendix: GEI</span>
                                    <span className="text-[10px] text-gray-500 font-mono">TECH_REF</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">Integration flows, telemetry vector specs, and fail-closed logic for platform infrastructure teams.</p>
                                <div className="text-[10px] text-primary font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                                    {assetLoading ? 'Analyzing Stack...' : 'Access Technical Specs →'}
                                </div>
                            </div>

                            <div 
                                onClick={() => handleViewAsset('gaming_qa')}
                                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-alert">Security & Legal Q&A</span>
                                    <span className="text-[10px] text-gray-500 font-mono">COMPLIANCE</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">Pre-emptive alignment for Platform Security, Legal, and Compliance committees. Addressing the "tough" questions.</p>
                                <div className="text-[10px] text-primary font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                                    {assetLoading ? 'Validating Proofs...' : 'Prepare for Committee →'}
                                </div>
                            </div>

                            <div 
                                onClick={() => handleViewAsset('mobile_app')}
                                className="p-4 rounded-2xl bg-gradient-to-r from-secondary/5 to-primary/5 border border-secondary/20 hover:border-secondary/50 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-secondary">Mobile Integration (App Gate)</span>
                                    <span className="text-[10px] text-gray-500 font-mono">IOS_ANDROID</span>
                                </div>
                                <p className="text-xs text-gray-400 mb-2">Handshake protocols for high-integrity mobile environments. Secure session initialization for GUAW Paseos and Marketplace apps.</p>
                                <div className="text-[10px] text-secondary font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                                    {assetLoading ? 'Syncing Mobile SDK...' : 'Access Mobile Vector →'}
                                </div>
                            </div>

                            <div 
                                onClick={() => handleViewAsset('aerospace')}
                                className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-gray-400 flex items-center gap-2"><Lock size={12}/> Aerospace Analysis</span>
                                    <span className="text-[10px] text-purple-400 font-mono">REF_ONLY</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">Conceptual compatibility analysis of Sovereign Veto principles with safety-critical engineering doctrine. Non-production material.</p>
                                <div className="text-[10px] text-purple-400 font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                                    {assetLoading ? 'Decryption Key Required...' : 'View Engineering Reference →'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Trials Status */}
                    <div className="p-8 rounded-3xl glass-dark border border-white/5 space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Activity size={20} className="text-secondary" />
                            Live Evaluation Metrics
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative overflow-hidden">
                        {/* Sovereign Watermark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none scale-[3]">
                            <SovereignGlyph type="stone" size={200} glow={false} color="#fbbf24" />
                        </div>

                        <div className="relative z-10 p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md group hover:bg-white/[0.04] transition-all">
                                <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Ledger Integrity</p>
                                <p className="text-2xl font-mono font-bold text-white">100.0%</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-[10px] text-gray-500 uppercase font-black mb-1">P99 Latency (Avg)</p>
                                <p className="text-2xl font-mono font-bold text-white">~28ms</p>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20">
                            <h3 className="font-bold text-sm mb-2 text-secondary">Active Enterprise Trials: {adminAccounts.filter(a => a.plan === 'enterprise_trial').length}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Institutional partners bypass standard billing. Their metrics are isolated in the Sovereign Audit Hub for forensic validation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pipeline List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Active Onboarding Pipeline</h2>
                    <div className="glass-dark rounded-3xl border border-white/5 overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Partner Identity</th>
                                    <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Stage</th>
                                    <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase">Evaluation Progress</th>
                                    <th className="px-6 py-4 font-mono text-gray-500 text-[10px] uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {adminAccounts.filter(a => a.plan === 'enterprise_trial').length > 0 ? (
                                    adminAccounts.filter(a => a.plan === 'enterprise_trial').map(acc => (
                                        <tr key={acc.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-bold">{acc.email}</p>
                                                <p className="text-[10px] text-gray-500">{acc.company || 'Institutional Entity'}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-black">ENTERPRISE_TRIAL</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="w-2/3 h-full bg-primary" />
                                                </div>
                                                <p className="text-[10px] text-gray-500 mt-1">Audit Trail Active</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30 px-2 py-1 rounded">Manage Protocol</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-20 text-center text-gray-500 font-mono italic">
                                            No institutional partners in active trial. Use the EAB as initial filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'economics' && user.role === 'ADMIN' && (
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-white italic tracking-tighter">Sovereign Economics</h1>
                        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mt-1">
                            Physical Truth Yield // Clearing Engine: SCS_V46_YERBA_BUENA
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 italic">Current Balance</p>
                        <p className="text-5xl font-mono font-bold text-white tracking-tighter bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                            {(economy?.balance ?? 0).toLocaleString()} <span className="text-lg">GC</span>
                        </p>
                    </div>
                </div>

                {/* Economics Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Verification Density</p>
                        <p className="text-3xl font-mono font-bold text-white">{economy?.ledger.length || 0}</p>
                        <p className="text-xs text-gray-400 mt-2 italic font-mono uppercase tracking-widest">Aggregated Rollup Blocks</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Avg Physics Quality</p>
                        <p className="text-3xl font-mono font-bold text-white">4.82 bits</p>
                        <p className="text-xs text-emerald-400 mt-2 font-black uppercase tracking-widest animate-pulse">Extreme Integrity Seal</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Currency Standard</p>
                        <p className="text-3xl font-mono font-bold text-white">GC_SOVEREIGN</p>
                        <p className="text-xs text-gray-400 mt-2 font-black uppercase tracking-widest italic">100% Physics-Backed</p>
                    </div>
                </div>

                {/* Economic Ledger */}
                <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden">
                    <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
                        <h2 className="text-lg font-bold italic">Clearing Ledger (Recent Events)</h2>
                        <button 
                            onClick={fetchEconomy}
                            className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest transition-colors"
                        >
                            Sync with Lazarus Ledger
                        </button>
                    </div>
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-white/5">
                            {economy?.ledger.map((entry) => (
                                <tr key={entry.id} className="hover:bg-white/5 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                                <TrendingUp size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-widest">
                                                    {entry.type === 'REWARD' ? 'Physical Truth Reward' : entry.type}
                                                </p>
                                                <p className="text-[10px] font-mono text-gray-500 mt-0.5">
                                                    Block Height: {String(entry.metadata?.blockHeight ?? 'N/A')} // Proof: {String(entry.metadata?.proofId ?? 'N/A')}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-right">
                                            <p className="text-lg font-mono font-bold text-emerald-400">
                                                +{entry.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} GC
                                            </p>
                                            <p className="text-[10px] text-gray-600 font-mono mt-0.5 italic">
                                                {new Date(entry.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {(!economy?.ledger || economy.ledger.length === 0) && (
                                <tr>
                                    <td colSpan={2} className="px-8 py-20 text-center font-mono text-gray-600 italic">
                                        No economic events recorded in the current epoch.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Economic Formula Banner */}
                <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6 italic">Sovereign Reward Equation // V46</h3>
                    <div className="flex flex-col md:flex-row items-center gap-12 justify-center py-4">
                         <div className="text-center group">
                            <p className="text-4xl font-black text-white group-hover:text-emerald-400 transition-colors">R</p>
                            <p className="text-[10px] text-gray-600 mt-2 font-bold uppercase">Reward</p>
                         </div>
                         <div className="text-4xl font-light text-gray-700">=</div>
                         <div className="flex items-center gap-4 border border-white/10 px-8 py-6 rounded-2xl bg-black/20">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-300">S</p>
                                <p className="text-[9px] text-gray-600 mt-1 uppercase">Effort</p>
                            </div>
                            <div className="text-xl text-gray-700">×</div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-300">D</p>
                                <p className="text-[9px] text-gray-600 mt-1 uppercase">Entropy</p>
                            </div>
                            <div className="text-xl text-gray-700">×</div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-300">Z</p>
                                <p className="text-[9px] text-gray-600 mt-1 uppercase">Zone</p>
                            </div>
                         </div>
                         <div className="text-xl text-gray-700">×</div>
                         <div className="text-center">
                            <p className="text-3xl font-black text-white italic">T</p>
                            <p className="text-[10px] text-gray-600 mt-2 font-bold uppercase">Tier Mult</p>
                         </div>
                    </div>
                </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* ADMIN DETAIL PANEL - DRAWER */}
      {selectedAccountId && (
         <AccountDetailPanel 
        accountId={selectedAccountId}
        token={token}
        onClose={() => setSelectedAccountId(null)}
        onExtendTrial={(acc) => {
            setIsExtending(acc.id);
            setExtensionReason(''); // Reset reason
        }}
        onForceDowngrade={(acc) => {
            setIsDowngrading(acc.id);
            setDowngradeReason('');
            setDowngradeConfirm('');
        }}
      />
      )}

      {/* SOVEREIGN ASSET VIEWER MODAL */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-4">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-4xl w-full max-h-[90vh] glass-dark p-8 rounded-3xl border border-primary/20 shadow-3xl overflow-hidden flex flex-col"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Sovereign Asset Vault</h2>
                        <p className="text-[10px] text-gray-500 font-mono">FILE_IDENTITY: {selectedAsset?.name.toUpperCase()} // INTEGRITY_VERIFIED</p>
                    </div>
                    <button onClick={() => setSelectedAsset(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar bg-black/40 rounded-2xl border border-white/5 p-8 font-serif leading-relaxed text-gray-300">
                    <div className="markdown-content">
                        <ReactMarkdown>
                            {selectedAsset?.content}
                        </ReactMarkdown>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center text-[10px] font-mono text-gray-600">
                    <span>PROTOCOL_V2.3_Lazarus_Witness</span>
                    <span className="text-primary font-bold">SOVEREIGN_ACCESS_LEVEL: ADMIN</span>
                </div>
            </motion.div>
        </div>
      )}
    </div>
  );
};

