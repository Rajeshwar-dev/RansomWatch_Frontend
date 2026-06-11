import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Cpu, Activity, ShieldAlert, AlertTriangle } from "lucide-react"
import Sidebar from "../components/Sidebar"
import ProcessTable from "../components/ProcessTable"
import PageWrapper from "../components/PageWrapper"
import { mockProcesses } from "../data/mockData"

export default function Processes() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true"
  )

  useEffect(() => {
    const handleToggle = () => {
      setSidebarCollapsed(localStorage.getItem("sidebar-collapsed") === "true")
    }
    window.addEventListener("sidebar-toggle", handleToggle)
    return () => window.removeEventListener("sidebar-toggle", handleToggle)
  }, [])

  const sortedProcesses = useMemo(() => {
    return [...mockProcesses]
      .sort((a, b) => b.threatScore - a.threatScore)
      .filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  }, [searchQuery])

  const topSuspicious = sortedProcesses.filter(
    (p) => p.status !== "safe"
  )

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#0b0c10] text-white flex relative overflow-hidden font-sans">
        {/* Ambient Cyber Glows */}
        <div className="cyber-glow bg-accent/5 w-[500px] h-[500px] top-[-100px] left-[-100px]" />
        <div className="cyber-glow bg-danger/5 w-[500px] h-[500px] bottom-[-100px] right-[-100px]" />
        <div className="absolute inset-0 cyber-grid pointer-events-none" />

      <Sidebar />
      <main 
        className={`flex-1 pb-24 md:pb-10 relative z-10 transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <div className="p-6 md:p-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold mb-1 tracking-wide flex items-center gap-2">
              <Cpu className="w-8 h-8 text-accent" />
              Process Inspector
            </h1>
            <p className="text-white/50 text-sm">Real-time listing of active runtime processes and heuristic risk scores.</p>
          </div>

          {/* Suspicious Section */}
          {topSuspicious.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-danger tracking-wide uppercase text-xs tracking-widest font-extrabold">
                <ShieldAlert className="w-5 h-5 text-danger animate-pulse" />
                Anomalous Process Alerts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topSuspicious.map((process, index) => (
                  <motion.div
                    key={process.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-6 rounded-card border relative overflow-hidden ${
                      process.status === "critical"
                        ? "border-danger/30 hover:border-danger/60"
                        : "border-warning/30 hover:border-warning/60"
                    }`}
                  >
                    {/* Radial red/yellow glow in corner */}
                    <div className={`absolute -right-6 -top-6 w-16 h-16 rounded-full blur-xl opacity-10 ${
                      process.status === "critical" ? "bg-danger" : "bg-warning"
                    }`} />

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white truncate">{process.name}</h3>
                        <p className="text-white/40 text-xs font-mono">PID: {process.pid}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-white/40 uppercase">Threat Level</span>
                          <span className={process.status === "critical" ? "text-danger" : "text-warning"}>
                            {process.threatScore}% Risk
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div
                            className={`h-full ${
                              process.status === "critical" ? "bg-danger" : "bg-warning"
                            }`}
                            style={{ width: `${process.threatScore}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-xs pt-1">
                        <span className="text-white/40">File Actions</span>
                        <span className="text-white/80 font-bold">{process.filesPerMin} / min</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">Rename Rate</span>
                        <span className="text-white/80 font-bold">{process.renameRate} / min</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Search Table Section */}
          <div className="mb-6 flex items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-card backdrop-blur-md">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search processes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors text-sm"
              />
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-white/40 font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-accent animate-pulse" />
              Telemetry live feed
            </div>
          </div>

          {/* Process Table Grid */}
          <ProcessTable processes={sortedProcesses} />
        </div>
      </main>
      </div>
    </PageWrapper>
  )
}
