import { useEffect, useState } from 'react';
import { FileCheck, TrendingUp, AlertCircle, DollarSign, Activity, ShieldCheck, Wifi, WifiOff } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { SovereignSDK } from '../../services/SovereignSDK';

// Mock data - replace with real API calls
const stats = {
  totalVerifications: 12453,
  thisMonth: 1847,
  successRate: 94.2,
  revenue: 5420
};

const chartData = [
  { date: 'Jan 28', verifications: 45, synthetic: 3 },
  { date: 'Jan 29', verifications: 52, synthetic: 4 },
  { date: 'Jan 30', verifications: 48, synthetic: 2 },
  { date: 'Jan 31', verifications: 61, synthetic: 5 },
  { date: 'Feb 1', verifications: 55, synthetic: 3 },
  { date: 'Feb 2', verifications: 67, synthetic: 4 },
  { date: 'Feb 3', verifications: 72, synthetic: 6 },
  { date: 'Feb 4', verifications: 58, synthetic: 2 },
];

const recentVerifications = [
  { id: '1', fileHash: 'a1b2c3d4e5f6...', verdict: 'VERIFIED_ORGANIC', confidence: 0.96, timestamp: Date.now() - 300000 },
  { id: '2', fileHash: 'f6e5d4c3b2a1...', verdict: 'SYNTHETIC_DETECTED', confidence: 0.89, timestamp: Date.now() - 600000 },
  { id: '3', fileHash: '1a2b3c4d5e6f...', verdict: 'VERIFIED_ORGANIC', confidence: 0.94, timestamp: Date.now() - 900000 },
  { id: '4', fileHash: '6f5e4d3c2b1a...', verdict: 'VERIFIED_ORGANIC', confidence: 0.98, timestamp: Date.now() - 1200000 },
];

export function OverviewPage() {
  const [networkStatus, setNetworkStatus] = useState<'HEALTHY' | 'DEGRADED' | 'HALTED' | 'CONNECTING'>('CONNECTING');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
        // 1. Initialize SDK (In a real app, token comes from Auth Context)
        const sdk = SovereignSDK.getInstance();
        const connected = await sdk.connect("mock_token_for_demo"); // Bridge Handshake
        setIsConnected(connected);

        if (connected) {
            const status = await sdk.getConsensusStatus();
            setNetworkStatus(status);
        } else {
            setNetworkStatus('HALTED');
        }
    };

    checkStatus();
    // Poll every 30s for network health (Heartbeat)
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Sovereign Header & Network Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
            Sovereign Overview
          </h1>
          <p className="text-gray-400 mt-1">Real-time telemetry from the Guardians Consensus Engine.</p>
        </div>

        {/* Network Health Indicator */}
        <div className={`px-4 py-2 rounded-lg border flex items-center gap-3 transition-colors ${
            networkStatus === 'HEALTHY' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : networkStatus === 'CONNECTING'
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
            {isConnected ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            <div>
                <div className="text-xs uppercase font-bold tracking-wider opacity-70">Consensus Status</div>
                <div className="font-mono font-semibold">{networkStatus}</div>
            </div>
            <Activity className={`w-5 h-5 ${networkStatus === 'HEALTHY' ? 'animate-pulse' : ''}`} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Verifications"
          value={stats.totalVerifications.toLocaleString()}
          change="+12.5% from last month"
          changeType="positive"
          icon={FileCheck}
          iconColor="text-emerald-500"
        />
        <StatsCard
          title="This Month"
          value={stats.thisMonth.toLocaleString()}
          change="+8.2% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Success Rate"
          value={`${stats.successRate}%`}
          change="+2.1% from last month"
          changeType="positive"
          icon={AlertCircle}
          iconColor="text-purple-500"
        />
        <StatsCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          change="+15.3% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-amber-500"
        />
      </div>

      {/* Chart */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">Verification Trends</h2>
          <p className="text-sm text-gray-400">Last 7 days</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="verifications" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Verified"
            />
            <Line 
              type="monotone" 
              dataKey="synthetic" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Synthetic"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Verifications */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Recent Verifications</h2>
          <a href="/dashboard/verifications" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">
            View all →
          </a>
        </div>
        <div className="space-y-4">
          {recentVerifications.map((v) => (
            <div key={v.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5">
              <div className="flex-1">
                <p className="font-mono text-sm text-white">{v.fileHash}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(v.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  v.verdict === 'VERIFIED_ORGANIC' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {v.verdict === 'VERIFIED_ORGANIC' ? '✓ Verified' : '✗ Synthetic'}
                </span>
                <span className="text-sm text-gray-400 font-medium">
                  {(v.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
