import { useState } from "react"
import { Bell, Search, User, ShieldCheck, Sun, Moon } from "lucide-react"

export default function Topbar({ isMonitoringActive }) {
  const [search, setSearch] = useState("")

  return (
    <header className="sticky top-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0b0c10]/70 border-b border-white/5 backdrop-blur-md text-white">
      {/* Search bar */}
      <div className="relative w-72 hidden sm:block">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search endpoints or processes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-accent/40 transition-colors text-xs"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Live system state */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isMonitoringActive ? "bg-safe" : "bg-warning"
            }`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isMonitoringActive ? "bg-safe" : "bg-warning"
            }`} />
          </span>
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-white/50">
            {isMonitoringActive ? "Heuristics Online" : "Defense Paused"}
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
          <Bell className="w-4.5 h-4.5 text-white/70 group-hover:text-white transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-accent/30 flex items-center justify-center text-white/80 cursor-pointer transition-colors">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold leading-none mb-0.5">Operator Node</p>
            <p className="text-[10px] text-white/40 leading-none">RW-ADMIN-01</p>
          </div>
        </div>
      </div>
    </header>
  )
}
