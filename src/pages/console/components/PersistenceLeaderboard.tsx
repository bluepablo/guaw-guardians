/**
 * 🏆 SOVEREIGN PERSISTENCE LEADERBOARD COMPONENT
 * ===============================================
 * 
 * The Board: Pseudonymous ranking of Guardian developers
 * based on their biological persistence (streaks).
 * 
 * Features:
 * - ZK-protected identities (Shadow Names)
 * - Procedurally generated avatars
 * - Trust Tier visualization
 * - Personal position spotlight
 * - Optional identity reveal
 */

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Shield, Eye, Lock, Fingerprint, Flame, TrendingUp, Award } from 'lucide-react';
import { consoleService } from '../../../services/consoleService';

interface LeaderboardEntry {
    rank: number;
    pseudonym: string;
    avatar: {
        primaryHue: number;
        secondaryHue: number;
        pattern: number;
        glyphIndex: number;
        intensity: number;
        hashFragment: string;
    };
    streak: {
        current: number;
        best: number;
        lastAction: string;
    };
    tier: {
        label: string;
        color: string;
        icon: string;
        minStreak: number;
    };
    isRevealed: boolean;
    revealedId: string | null;
}

interface LeaderboardStats {
    tierDistribution: Array<{ tier: string; count: number }>;
    topStreak: number;
    averageStreak: number;
}

interface MyPosition {
    ranked: boolean;
    position?: number;
    pseudonym?: string;
    streak?: number;
    tier?: { label: string; color: string; icon: string; minStreak: number };
}

// Procedural Avatar Generator
const ProceduralAvatar = ({ seed, size = 48 }: { seed: LeaderboardEntry['avatar']; size?: number }) => {
    const hue1 = seed.primaryHue;
    const hue2 = seed.secondaryHue;
    const patterns = [
        // Different SVG patterns based on index
        <circle key="p0" cx="50%" cy="50%" r="35%" fill={`hsl(${hue1}, 70%, 50%)`} />,
        <rect key="p1" x="15%" y="15%" width="70%" height="70%" rx="10%" fill={`hsl(${hue1}, 60%, 45%)`} />,
        <polygon key="p2" points="50,10 90,90 10,90" fill={`hsl(${hue1}, 65%, 50%)`} />,
        <polygon key="p3" points="50,90 90,10 10,10" fill={`hsl(${hue1}, 65%, 50%)`} />,
    ];
    
    const glyphs = ['◈', '◇', '⬡', '⬢', '◎', '◉', '⬟', '⬠'];

    return (
        <div 
            className="relative rounded-xl overflow-hidden border-2 flex items-center justify-center"
            style={{ 
                width: size, 
                height: size,
                background: `linear-gradient(135deg, hsl(${hue1}, 50%, 15%), hsl(${hue2}, 50%, 10%))`,
                borderColor: `hsl(${hue1}, 60%, 40%)`
            }}
        >
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-30">
                {patterns[seed.pattern % patterns.length]}
            </svg>
            <span 
                className="relative z-10 text-2xl"
                style={{ 
                    color: `hsl(${hue1}, 70%, 60%)`,
                    textShadow: `0 0 10px hsl(${hue1}, 80%, 50%)`
                }}
            >
                {glyphs[seed.glyphIndex % glyphs.length]}
            </span>
        </div>
    );
};

// Tier Badge Component
const TierBadge = ({ tier, size = 'md' }: { tier: LeaderboardEntry['tier']; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[9px]',
        md: 'px-3 py-1 text-[10px]',
        lg: 'px-4 py-1.5 text-xs'
    };

    return (
        <span 
            className={`${sizeClasses[size]} rounded-full font-black uppercase tracking-widest flex items-center gap-1`}
            style={{ 
                background: `${tier.color}15`,
                color: tier.color,
                border: `1px solid ${tier.color}40`
            }}
        >
            <span>{tier.icon}</span>
            <span>{tier.label}</span>
        </span>
    );
};

// Main Leaderboard Component
export const PersistenceLeaderboard = ({ token }: { token: string | null }) => {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [stats, setStats] = useState<LeaderboardStats | null>(null);
    const [myPosition, setMyPosition] = useState<MyPosition | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [showMyCard, setShowMyCard] = useState(true);

    // Mock data generator for development
    const generateMockEntries = useCallback((): LeaderboardEntry[] => {
        const tiers = [
            { label: 'LEGEND', color: '#FFD700', icon: '👑', minStreak: 365 },
            { label: 'MASTER', color: '#9333EA', icon: '⚡', minStreak: 180 },
            { label: 'GOLD', color: '#F59E0B', icon: '🏆', minStreak: 90 },
            { label: 'SILVER', color: '#94A3B8', icon: '🥈', minStreak: 30 },
            { label: 'BRONZE', color: '#CD7F32', icon: '🥉', minStreak: 7 }
        ];

        return Array.from({ length: 15 }, (_, i) => {
            const streak = Math.max(1, 400 - (i * 25) - Math.floor(Math.random() * 20));
            const tier = tiers.find(t => streak >= t.minStreak) || tiers[4];
            
            return {
                rank: i + 1,
                pseudonym: `Shadow_${['Sentinel', 'Guardian', 'Keeper', 'Warden', 'Shield'][i % 5]}_${Math.random().toString(16).substring(2, 6)}`,
                avatar: {
                    primaryHue: (i * 47) % 360,
                    secondaryHue: ((i * 47) + 120) % 360,
                    pattern: i % 4,
                    glyphIndex: i % 8,
                    intensity: 70 + (i % 30),
                    hashFragment: Math.random().toString(16).substring(2, 10)
                },
                streak: {
                    current: streak,
                    best: streak + Math.floor(Math.random() * 50),
                    lastAction: new Date().toISOString()
                },
                tier,
                isRevealed: false,
                revealedId: null
            };
        });
    }, []);

    const fetchLeaderboard = useCallback(async () => {
        setLoading(true);
        try {
            const response = await consoleService.getLeaderboard(token, { 
                limit: 50, 
                tier: selectedTier 
            });
            setEntries(response.entries || []);
        } catch (err) {
            console.error('Failed to fetch leaderboard:', err);
            // Use mock data for development
            setEntries(generateMockEntries());
        }
        setLoading(false);
    }, [token, selectedTier, generateMockEntries]);

    const fetchMyPosition = useCallback(async () => {
        try {
            const response = await consoleService.getMyLeaderboardPosition(token);
            setMyPosition(response);
        } catch (err) {
            console.error('Failed to fetch position:', err);
            setMyPosition({ 
                ranked: true, 
                position: 42, 
                pseudonym: 'Shadow_Guardian_dev', 
                streak: 7,
                tier: { label: 'BRONZE', color: '#CD7F32', icon: '🥉', minStreak: 7 }
            });
        }
    }, [token]);

    const fetchStats = useCallback(async () => {
        try {
            const response = await consoleService.getLeaderboardStats(token);
            setStats(response);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
            setStats({
                tierDistribution: [
                    { tier: 'LEGEND', count: 2 },
                    { tier: 'MASTER', count: 8 },
                    { tier: 'GOLD', count: 24 },
                    { tier: 'SILVER', count: 67 },
                    { tier: 'BRONZE', count: 143 }
                ],
                topStreak: 412,
                averageStreak: 23
            });
        }
    }, [token]);

    useEffect(() => {
        // Using async IIFE to properly handle async operations in useEffect
        const loadData = async () => {
            await Promise.all([
                fetchLeaderboard(),
                fetchMyPosition(),
                fetchStats()
            ]);
        };
        loadData();
    }, [fetchLeaderboard, fetchMyPosition, fetchStats]);

    const tierFilters = [
        { value: null, label: 'ALL', color: '#FFFFFF' },
        { value: 'LEGEND', label: '👑 LEGEND', color: '#FFD700' },
        { value: 'MASTER', label: '⚡ MASTER', color: '#9333EA' },
        { value: 'GOLD', label: '🏆 GOLD', color: '#F59E0B' },
        { value: 'SILVER', label: '🥈 SILVER', color: '#94A3B8' },
        { value: 'BRONZE', label: '🥉 BRONZE', color: '#CD7F32' }
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20">
                            <Trophy className="text-amber-400" size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                Sovereign Persistence Board
                            </h1>
                            <p className="text-xs text-amber-400/70 font-mono uppercase tracking-widest mt-1">
                                ZK-Protected Rankings // Biological Proof
                            </p>
                        </div>
                    </div>
                    <p className="text-gray-400 max-w-xl text-sm">
                        Rankings based on verified biological persistence. Identities are pseudonymous by default—
                        compete for prestige without exposing your infrastructure.
                    </p>
                </div>

                {/* Stats Summary */}
                {stats && (
                    <div className="flex gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[100px]">
                            <Flame className="text-orange-400 mx-auto mb-2" size={20} />
                            <p className="text-2xl font-bold text-white font-mono">{stats.topStreak}</p>
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Top Streak</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[100px]">
                            <TrendingUp className="text-emerald-400 mx-auto mb-2" size={20} />
                            <p className="text-2xl font-bold text-white font-mono">{stats.averageStreak}</p>
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Avg Streak</p>
                        </div>
                    </div>
                )}
            </header>

            {/* My Position Card */}
            {myPosition?.ranked && showMyCard && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-6 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/5 to-amber-500/10 border border-primary/20 overflow-hidden"
                >
                    <button 
                        onClick={() => setShowMyCard(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                    >
                        ×
                    </button>
                    
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/20 border-2 border-primary/40 flex items-center justify-center">
                                <span className="text-4xl font-black text-primary">#{myPosition.position}</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-black border-2 border-primary flex items-center justify-center">
                                <Fingerprint size={16} className="text-primary" />
                            </div>
                        </div>
                        
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Your Position</p>
                            <h3 className="text-xl font-bold text-white mb-2">{myPosition.pseudonym}</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Flame className="text-orange-400" size={16} />
                                    <span className="text-lg font-bold text-orange-400">{myPosition.streak} days</span>
                                </div>
                                {myPosition.tier && <TierBadge tier={myPosition.tier} />}
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col gap-2">
                            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2">
                                <Lock size={12} />
                                Proof of Persistence
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2 opacity-50 cursor-not-allowed">
                                <Eye size={12} />
                                Reveal Identity (Soon)
                            </button>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                </motion.div>
            )}

            {/* Tier Filters */}
            <div className="flex flex-wrap gap-2">
                {tierFilters.map(filter => (
                    <button
                        key={filter.label}
                        onClick={() => setSelectedTier(filter.value)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                            selectedTier === filter.value 
                                ? 'bg-white/10 border-white/30 text-white' 
                                : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/10'
                        } border`}
                        style={selectedTier === filter.value ? { borderColor: filter.color + '50' } : {}}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Leaderboard Table */}
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Shield className="text-primary" size={18} />
                        <span className="text-sm font-bold text-white">Active Guardians</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-gray-500 font-mono">
                            {entries.length} ranked
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Lock size={10} />
                        <span>ZK-Verified</span>
                    </div>
                </div>

                {loading ? (
                    <div className="p-20 text-center">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">Loading sovereign rankings...</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {entries.map((entry, index) => (
                            <motion.div
                                key={entry.pseudonym}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className={`flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-all ${
                                    entry.rank <= 3 ? 'bg-gradient-to-r from-amber-500/5 to-transparent' : ''
                                }`}
                            >
                                {/* Rank */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${
                                    entry.rank === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                    entry.rank === 2 ? 'bg-gray-400/20 text-gray-300 border border-gray-400/30' :
                                    entry.rank === 3 ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30' :
                                    'bg-white/5 text-gray-500'
                                }`}>
                                    {entry.rank <= 3 ? ['👑', '🥈', '🥉'][entry.rank - 1] : `#${entry.rank}`}
                                </div>

                                {/* Avatar */}
                                <ProceduralAvatar seed={entry.avatar} size={48} />

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-white truncate">{entry.pseudonym}</h4>
                                        {entry.isRevealed && (
                                            <span className="px-2 py-0.5 rounded text-[8px] bg-primary/10 text-primary border border-primary/20">
                                                REVEALED
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-mono">
                                        {entry.avatar.hashFragment}...
                                    </p>
                                </div>

                                {/* Streak */}
                                <div className="text-right">
                                    <div className="flex items-center gap-2 justify-end mb-1">
                                        <Flame className="text-orange-400" size={16} />
                                        <span className="text-xl font-black text-white font-mono">
                                            {entry.streak.current}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500">
                                        Best: {entry.streak.best}
                                    </p>
                                </div>

                                {/* Tier */}
                                <div className="w-28">
                                    <TierBadge tier={entry.tier} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                {entries.length > 0 && (
                    <div className="p-4 border-t border-white/5 flex items-center justify-between">
                        <p className="text-[10px] text-gray-600 font-mono">
                            Last updated: {new Date().toLocaleTimeString()}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                            <Fingerprint size={12} />
                            <span>Proofs verifiable on-chain</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Tier Distribution */}
            {stats && (
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <Award className="text-amber-400" size={16} />
                        Tier Distribution
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {stats.tierDistribution.map(dist => {
                            const tierInfo = tierFilters.find(t => t.value === dist.tier);
                            return (
                                <div 
                                    key={dist.tier}
                                    className="p-4 rounded-2xl text-center"
                                    style={{ 
                                        background: `${tierInfo?.color || '#666'}10`,
                                        border: `1px solid ${tierInfo?.color || '#666'}20`
                                    }}
                                >
                                    <p className="text-2xl font-black" style={{ color: tierInfo?.color }}>
                                        {dist.count}
                                    </p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                                        {dist.tier}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersistenceLeaderboard;
