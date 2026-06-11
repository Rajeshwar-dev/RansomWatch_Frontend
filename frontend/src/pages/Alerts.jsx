import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, CheckCircle, Bell, ShieldAlert } from "lucide-react"
import Sidebar from "../components/Sidebar"
import AlertCard from "../components/AlertCard"
import PageWrapper from "../components/PageWrapper"
import { mockAlerts } from "../data/mockData"

const FILTERS = ["all", "critical", "warning", "info"]

export default function Alerts() {
  const [filter, setFilter] = useState("all")
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

  const filteredAlerts = useMemo(() => {
    return mockAlerts.filter((alert) => {
      const matchesFilter = filter === "all" || alert.type === filter
      const matchesSearch =
        searchQuery === "" ||
        alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.processName.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [filter, searchQuery])

  const alertCounts = useMemo(() => {
    return mockAlerts.reduce(
      (acc, alert) => {
        acc[alert.type]++
        acc.all++
        return acc
      },
      { all: 0, critical: 0, warning: 0, info: 0 }
    )
  }, [])

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#0b0c10] text-white flex relative overflow-hidden font-sans">
        {/* Ambient Cyber Glows */}
        <div className="cyber-glow bg-danger/5 w-[500px] h-[500px] top-[-100px] right-[-100px]" />
        <div className="cyber-glow bg-accent/5 w-[500px] h-[500px] bottom-[-100px] left-[-100px]" />
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
              <ShieldAlert className="w-8 h-8 text-danger" />
              Incidents & Alerts
            </h1>
            <p className="text-white/50 text-sm">Security telemetry alerts triggered by real-time behavioral analysis.</p>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 justify-between items-start lg:items-center bg-white/5 border border-white/10 p-4 rounded-card backdrop-blur-md">
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    filter === f
                      ? "bg-accent border-accent text-dark font-extrabold"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {f} ({alertCounts[f]})
                </button>
              ))}
            </div>
            
            <div className="w-full lg:max-w-xs">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors text-sm"
                />
              </div>
            </div>
          </div>

          {/* Alerts Timeline List */}
          {filteredAlerts.length > 0 ? (
            <div className="space-y-4">
              {filteredAlerts.map((alert, index) => alert && (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AlertCard alert={alert} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center glass-card border-white/10 rounded-card">
              <CheckCircle className="w-20 h-20 text-safe mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Clean Security State</h3>
              <p className="text-white/50 text-sm max-w-sm">
                {searchQuery
                  ? "Adjust search params to locate specific alerts."
                  : "Excellent! No active security anomalies have been detected."}
              </p>
            </div>
          )}

        </div>
      </main>
      </div>
    </PageWrapper>
  )
}
