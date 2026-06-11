import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Settings as SettingsIcon, AlertTriangle, ShieldCheck, Terminal, HardDrive } from "lucide-react"
import Sidebar from "../components/Sidebar"
import PageWrapper from "../components/PageWrapper"
import { useToast } from "../context/ToastContext"

export default function Settings() {
  const [settings, setSettings] = useState({
    enableMonitoring: true,
    enableCanary: true,
    autoStart: false,
    entropyThreshold: 7.0,
    threatThreshold: 80,
    filesThreshold: 200,
    autoKillSwitch: true,
    emailAlerts: false,
    email: "",
    watchDirs: "C:\\Users\\test\\Documents, C:\\Users\\test\\Desktop",
    canaryPerDir: 5,
  })

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const { addToast } = useToast()

  // Avoid triggering unsaved changes on initial render
  const [isInitialized, setIsInitialized] = useState(false)
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
    if (!isInitialized) {
      setIsInitialized(true)
      return
    }
    setHasUnsavedChanges(true)
  }, [settings])

  const handleSave = () => {
    setHasUnsavedChanges(false)
    addToast("Configuration values successfully written to registry", "success")
  }

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleClearAlerts = () => {
    addToast("Audit log database cleared successfully", "info")
  }

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
              <SettingsIcon className="w-8 h-8 text-white/80" />
              Settings Configuration
            </h1>
            <p className="text-white/50 text-sm">Tune the AI model thresholds, watch directories, and defense responses.</p>
          </div>

          <div className="max-w-3xl space-y-6">
            
            {/* Monitoring Settings */}
            <div className="glass-card rounded-card p-6">
              <h2 className="text-lg font-bold mb-4 border-b border-white/5 pb-2 text-white/95 flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-accent" />
                Monitoring Settings
              </h2>
              <div className="space-y-4">
                <ToggleRow
                  label="Enable File System Watchdog"
                  description="Watch active file modifications in real-time."
                  checked={settings.enableMonitoring}
                  onToggle={() => handleToggle("enableMonitoring")}
                />
                <ToggleRow
                  label="Deploy Honeytoken Canary Traps"
                  description="Spawn decoy files in user directories."
                  checked={settings.enableCanary}
                  onToggle={() => handleToggle("enableCanary")}
                />
                <ToggleRow
                  label="Run Daemon on System Boot"
                  description="Start protection automatically in the background."
                  checked={settings.autoStart}
                  onToggle={() => handleToggle("autoStart")}
                />
                
                <div className="pt-2">
                  <label className="block text-xs uppercase tracking-wider text-white/40 font-bold mb-2">
                    Watched Directories
                  </label>
                  <textarea
                    value={settings.watchDirs}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        watchDirs: e.target.value,
                      }))
                    }
                    className="w-full p-3 rounded-lg border border-white/10 text-white bg-white/5 font-mono text-xs focus:outline-none focus:border-accent/50 transition-colors"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 font-bold mb-2">
                      Canaries Per Directory
                    </label>
                    <input
                      type="number"
                      value={settings.canaryPerDir}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          canaryPerDir: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent/50 transition-colors font-semibold text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Thresholds */}
            <div className="glass-card rounded-card p-6">
              <h2 className="text-lg font-bold mb-4 border-b border-white/5 pb-2 text-white/95 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-warning" />
                Alert Trigger Thresholds
              </h2>
              <div className="space-y-6">
                <SliderRow
                  label="Entropy Alert Level"
                  description="Randomness limit indicating file encryption spikes."
                  value={settings.entropyThreshold}
                  min={0}
                  max={8}
                  step={0.1}
                  onChange={(val) =>
                    setSettings((prev) => ({
                      ...prev,
                      entropyThreshold: val,
                    }))
                  }
                />
                <SliderRow
                  label="AI Risk Score Alert"
                  description="Risk index score required to fire incident alarms."
                  value={settings.threatThreshold}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(val) =>
                    setSettings((prev) => ({
                      ...prev,
                      threatThreshold: val,
                    }))
                  }
                />
                <SliderRow
                  label="IO Actions/Min Limit"
                  description="Maximum operations per process before firing spikes."
                  value={settings.filesThreshold}
                  min={0}
                  max={1000}
                  step={10}
                  onChange={(val) =>
                    setSettings((prev) => ({
                      ...prev,
                      filesThreshold: val,
                    }))
                  }
                />
              </div>
            </div>

            {/* Network & Notifications */}
            <div className="glass-card rounded-card p-6">
              <h2 className="text-lg font-bold mb-4 border-b border-white/5 pb-2 text-white/95 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-safe" />
                Defensive Responses
              </h2>
              <div className="space-y-4">
                <ToggleRow
                  label="Autonomous Network Kill Switch"
                  description="Isolate system immediately on high-risk critical events."
                  checked={settings.autoKillSwitch}
                  onToggle={() => handleToggle("autoKillSwitch")}
                />
                <ToggleRow
                  label="Push Email Alerts"
                  description="Alert IT administrators via secure API keys."
                  checked={settings.emailAlerts}
                  onToggle={() => handleToggle("emailAlerts")}
                />
                <AnimatePresence>
                  {settings.emailAlerts && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2">
                        <label className="block text-xs uppercase tracking-wider text-white/40 font-bold mb-2">
                          Destination Email
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          placeholder="operator@ransomwatch.io"
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors text-sm"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-card border-danger/20 bg-danger/5 rounded-card p-6 relative overflow-hidden">
              <h2 className="text-lg font-bold mb-4 text-danger flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-danger animate-pulse" />
                Danger Operations
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleClearAlerts}
                  className="px-5 py-3 rounded-xl font-bold bg-white/5 border border-danger/30 hover:bg-danger/20 text-white transition-all text-xs tracking-wider uppercase cursor-pointer"
                >
                  Clear Incident Database
                </button>
              </div>
              <p className="text-white/40 text-xs mt-4">
                * Note: Dangerous tasks override system safety checkpoints and cannot be undone.
              </p>
            </div>
          </div>

          <AnimatePresence>
            {hasUnsavedChanges && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 right-6 z-50"
              >
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-accent text-dark px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase flex items-center gap-2 shadow-lg hover:shadow-accent/20 transition-all cursor-pointer"
                >
                  Apply Configuration
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      </div>
    </PageWrapper>
  )
}

function ToggleRow({ label, description, checked, onToggle }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
      <div>
        <span className="font-semibold text-white/90 block">{label}</span>
        {description && <span className="text-xs text-white/40 block mt-0.5">{description}</span>}
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer border ${
          checked ? "bg-accent border-accent" : "bg-white/10 border-white/5"
        }`}
      >
        <motion.div
          animate={{ x: checked ? 26 : 2 }}
          className="absolute top-0.5 w-4 h-4 bg-dark rounded-full"
        />
      </button>
    </div>
  )
}

function SliderRow({ label, description, value, min, max, step, onChange }) {
  return (
    <div className="border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
      <div className="flex justify-between items-center mb-1">
        <div>
          <span className="font-semibold text-white/90 block">{label}</span>
          {description && <span className="text-xs text-white/40 block mt-0.5">{description}</span>}
        </div>
        <span className="text-accent font-extrabold text-lg">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
      />
    </div>
  )
}
