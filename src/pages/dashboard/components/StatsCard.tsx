import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  iconColor: string;
}

export function StatsCard({ title, value, change, changeType, icon: Icon, iconColor }: StatsCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
        <div className={`p-2 rounded-lg bg-white/5 ${iconColor}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-2">{value}</p>
      <p className={`text-sm font-medium ${
        changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
      }`}>
        {change}
      </p>
    </div>
  );
}
