import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Bell, Cpu, Zap, Activity } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import PageWrapper from "../components/PageWrapper"
import StatCard from "../components/StatCard"
import ThreatMeter from "../components/ThreatMeter"
import FileEventFeed from "../components/FileEventFeed"
import CanaryStatus from "../components/CanaryStatus"
import NetworkStatus from "../components/NetworkStatus"
import ProcessTable from "../components/ProcessTable"
import {
  mockStats,
  mockProcesses,
  mockFileEvents,
  mockCanaryFiles,
} from "../data/mockData"

const realTimeActivityData = [
  { name: "10:00", entropy: 3.4, systemIO: 180 },
  { name: "10:05", entropy: 4.1, systemIO: 240 },
  { name: "10:10", entropy: 3.9, systemIO: 190 },
  { name: "10:15", entropy: 7.6, systemIO: 820 },
  { name: "10:20", entropy: 6.8, systemIO: 650 },
  { name: "10:25", entropy: 4.2, systemIO: 290 },
]

export default function Dashboard() {
  const [threatScore, setThreatScore] = useState(mockStats.threatScore)
  const [fileEvents, setFileEvents] = useState(mockFileEvents)
  const [isMonitoringActive, setIsMonitoringActive] = useState(true)
  const [networkConnected, setNetworkConnected] = useState(true)

  // Listen to sidebar collapsible state
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

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatScore((prev) => {
        const change = Math.floor(Math.random() * 11) - 5
        const newScore = Math.max(0, Math.min(100, prev + change))
        return newScore
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const fakeFiles = [
        "budget.xlsx",
        "report.pdf",
        "presentation.pptx",
        "notes.txt",
        "data.csv",
      ]
      const randomFile = fakeFiles[Math.floor(Math.random() * fakeFiles.length)]
      const randomEntropy = (Math.random() * 8).toFixed(1)
      const fakeEvent = {
        id: Date.now(),
        filePath: `C:/Users/test/documents/${randomFile}`,
        eventType: "modified",
        processName: Math.random() > 0.8 ? "suspicious.exe" : "system.exe",
        entropyAfter: parseFloat(randomEntropy),
        timestamp: new Date().toISOString(),
      }
      setFileEvents((prev) => [fakeEvent, ...prev].slice(0, 10))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#0b0c10] text-white flex relative overflow-hidden font-sans">
        {/* Ambient Cyber Glows */}
        <div className="cyber-glow bg-accent/5 w-[500px] h-[500px] top-[-150px] left-[-150px]" />
        <div className="cyber-glow bg-danger/5 w-[500px] h-[500px] bottom-[-150px] right-[-150px]" />
        <div className="absolute inset-0 cyber-grid pointer-events-none" />

      <Sidebar />
      
      {/* Dynamic margins based on Sidebar collapsible state */}
      <main 
        className={`flex-1 pb-24 md:pb-10 relative z-10 transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* Sticky Topbar */}
        <Topbar isMonitoringActive={isMonitoringActive} />

        <div className="p-6 md:p-8">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold mb-1 tracking-wide bg-gradient-to-r from-white via-white/95 to-white/60 bg-clip-text text-transparent">
                Security Operations Center
              </h1>
              <p className="text-white/50 text-sm">System telemetry monitoring and proactive ransomware detection.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMonitoringActive(!isMonitoringActive)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all shadow-lg cursor-pointer ${
                  isMonitoringActive
                    ? "bg-danger text-white hover:bg-danger/90 shadow-danger/10 hover:shadow-danger/20"
                    : "bg-safe text-dark hover:bg-safe/90 shadow-safe/10 hover:shadow-safe/20"
                }`}
              >
                {isMonitoringActive ? "Pause Heuristics" : "Resume Heuristics"}
              </button>
            </div>
          </div>

          {/* Stat Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Protected Files"
              value={mockStats.filesMonitored.toLocaleString()}
              icon={Shield}
              cardType="white"
            />
            <StatCard
              title="Threat Index"
              value={`${threatScore}%`}
              icon={Zap}
              cardType="green"
            />
            <StatCard
              title="Monitored Processes"
              value={mockStats.activeProcesses}
              icon={Cpu}
              cardType="dark"
            />
            <StatCard
              title="Alerts Resolved"
              value={mockStats.alertsToday}
              icon={Bell}
              cardType="danger"
            />
          </div>

          {/* Interactive Chart & Live Matrix Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Live Chart Widget */}
            <div className="lg:col-span-2 glass-card rounded-card p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white/80 font-bold text-lg tracking-wide">Threat Ingestion Trends</h3>
                  <p className="text-white/40 text-xs mt-0.5">Real-time entropy levels compared with system file I/O operations.</p>
                </div>
                <Activity className="w-5 h-5 text-accent animate-pulse" />
              </div>

              {/* Chart container */}
              <div className="h-56 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={realTimeActivityData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="glowEntropy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B5FF4D" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#B5FF4D" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" />
                    <XAxis dataKey="name" stroke="#ffffff30" fontSize={10} tickLine={false} />
                    <YAxis stroke="#ffffff30" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#12131a",
                        borderColor: "rgba(255,255,255,0.08)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      name="Entropy Spike"
                      type="monotone"
                      dataKey="entropy"
                      stroke="#B5FF4D"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#glowEntropy)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Threat Dial Component */}
            <ThreatMeter score={threatScore} />
          </div>

          {/* Canary Files & Kill Switch Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CanaryStatus canaryFiles={mockCanaryFiles} />
            <div className="space-y-6">
              <NetworkStatus
                isConnected={networkConnected}
                onToggle={() => setNetworkConnected(!networkConnected)}
              />
              <FileEventFeed events={fileEvents} />
            </div>
          </div>

          {/* Process Table Grid */}
          <div className="w-full">
            <ProcessTable processes={mockProcesses} />
          </div>

        </div>
      </main>
      </div>
    </PageWrapper>
  )
}
