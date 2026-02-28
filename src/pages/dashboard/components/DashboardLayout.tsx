import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ParticlesBackground } from '../../../components/ui/ParticlesBackground';

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Particles Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
