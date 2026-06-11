import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import PageWrapper from "../components/PageWrapper"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts"
import { Shield, Download, Calendar, Filter, Activity, BarChart2 } from "lucide-react"
import Sidebar from "../components/Sidebar"
import { useToast } from "../context/ToastContext"

// Mock Data for Charts
const attackTrendsData = [
  { name: "Mon", threatsBlocked: 12, filesScanned: 840 },
  { name: "Tue", threatsBlocked: 19, filesScanned: 1200 },
  { name: "Wed", threatsBlocked: 3, filesScanned: 950 },
  { name: "Thu", threatsBlocked: 5, filesScanned: 1100 },
  { name: "Fri", threatsBlocked: 25, filesScanned: 1600 },
  { name: "Sat", threatsBlocked: 8, filesScanned: 600 },
  { name: "Sun", threatsBlocked: 14, filesScanned: 720 },
]

const threatDistributionData = [
  { name: "Ransomware", value: 45, color: "#FF4D4D" }, // danger
  { name: "Trojan", value: 25, color: "#FFD84D" }, // warning
  { name: "Spyware", value: 15, color: "#B5FF4D" }, // accent
  { name: "Adware", value: 15, color: "#4DFF91" }, // safe
]

const fileActivityData = [
  { name: "00:00", reads: 400, writes: 240, deletes: 10 },
  { name: "04:00", reads: 300, writes: 139, deletes: 50 },
  { name: "08:00", reads: 900, writes: 780, deletes: 120 },
  { name: "12:00", reads: 1200, writes: 980, deletes: 230 },
  { name: "16:00", reads: 1100, writes: 1100, deletes: 190 },
  { name: "20:00", reads: 700, writes: 590, deletes: 40 },
]

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d")
  const { addToast } = useToast()
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

  const handleExport = () => {
    addToast("Exporting audit logs & analytics report as CSV...", "info")
    
    setTimeout(() => {
      addToast("Report exported successfully", "success")
    }, 1500)
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-dark text-white flex">
      <Sidebar />
      <main 
        className={`flex-1 pb-24 md:pb-10 transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <div className="p-6 md:p-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
                <BarChart2 className="w-8 h-8 text-accent" />
                Threat Analytics
              </h1>
              <p className="text-white/60">Live audit logs, activity feeds, and cryptographic anomaly analysis.</p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
                <button
                  onClick={() => setTimeRange("24h")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    timeRange === "24h" ? "bg-accent text-dark" : "text-white/70 hover:text-white"
                  }`}
                >
                  24 Hours
                </button>
                <button
                  onClick={() => setTimeRange("7d")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    timeRange === "7d" ? "bg-accent text-dark" : "text-white/70 hover:text-white"
                  }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setTimeRange("30d")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    timeRange === "30d" ? "bg-accent text-dark" : "text-white/70 hover:text-white"
                  }`}
                >
                  30 Days
                </button>
              </div>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Left/Middle block: Main Trend chart */}
            <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-card backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Ransomware Vectors Blocked</h3>
                  <p className="text-xs text-white/50">Simulated encryption attacks caught by entropy spikes.</p>
                </div>
                <Activity className="w-5 h-5 text-danger animate-pulse" />
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attackTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF4D4D" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#FF4D4D" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorFiles" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B5FF4D" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#B5FF4D" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                    <XAxis dataKey="name" stroke="#ffffff40" fontSize={11} tickLine={false} />
                    <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#191A23",
                        borderColor: "rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Area
                      name="Threats Blocked"
                      type="monotone"
                      dataKey="threatsBlocked"
                      stroke="#FF4D4D"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorThreats)"
                    />
                    <Area
                      name="Files Audited (x10)"
                      type="monotone"
                      dataKey="filesScanned"
                      stroke="#B5FF4D"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorFiles)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right block: Threat Distribution */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-card backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Threat Distribution</h3>
                <p className="text-xs text-white/50 mb-6">Categorized events by severity vectors.</p>
              </div>

              <div className="h-[200px] w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={threatDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {threatDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#191A23",
                        borderColor: "rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Total indicators inside pie */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-white">100%</span>
                  <span className="text-[10px] uppercase tracking-wider text-white/40">Anomaly distribution</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                {threatDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-semibold text-white/80">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lower Section: File IO Activity Graph */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-card backdrop-blur-md">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">File System Telemetry</h3>
              <p className="text-xs text-white/50 mb-6">Cryptographic file action metrics (Reads vs Writes vs Deletions).</p>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fileActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={11} tickLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#191A23",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar name="File Reads" dataKey="reads" fill="#4DFF91" radius={[4, 4, 0, 0]} />
                  <Bar name="File Writes" dataKey="writes" fill="#B5FF4D" radius={[4, 4, 0, 0]} />
                  <Bar name="File Deletes" dataKey="deletes" fill="#FF4D4D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </main>
      </div>
    </PageWrapper>
  )
}
