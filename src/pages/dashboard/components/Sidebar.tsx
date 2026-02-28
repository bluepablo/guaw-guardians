import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCheck, 
  BarChart3, 
  Key, 
  CreditCard, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Verifications', href: '/dashboard/verifications', icon: FileCheck },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col w-64 bg-[#0f1419] border-r border-white/5 relative z-10">
      {/* Logo */}
      <div className="flex items-center gap-3 h-16 px-6 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-black">
          G
        </div>
        <span className="font-bold text-lg text-white">GUAW</span>
        <span className="text-xs text-gray-500 ml-auto">Enterprise</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                transition-colors
                ${isActive 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }
              `}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/5 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
