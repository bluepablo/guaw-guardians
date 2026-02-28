export const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-background text-white">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <div className="text-2xl font-bold text-primary mb-10">GUAW</div>
        <nav className="space-y-4 text-gray-400">
          <div className="text-white font-medium">Overview</div>
          <div>API Keys</div>
          <div>Billing</div>
          <div>Settings</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Console Overview</h1>
          <div className="text-sm text-gray-500">logged in as pablo@guaw.app</div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Requests (24h)", value: "124,592", change: "+12%" },
            { label: "Threats Blocked", value: "8,920", change: "-2%" },
            { label: "Estimated Savings", value: "$420.00", change: "+5%" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-surface rounded-xl border border-white/5">
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className="text-3xl font-mono font-bold">{stat.value}</div>
              <div className="text-xs text-primary mt-2">{stat.change}</div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-surface rounded-xl border border-white/5 h-64 flex items-center justify-center text-gray-600">
          Chart Placeholder (Human vs Bot Traffic)
        </div>
      </main>
    </div>
  );
};
