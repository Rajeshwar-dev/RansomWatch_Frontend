import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react"
import Modal from "./Modal"
import { useToast } from "../context/ToastContext"

export default function NetworkStatus({ isConnected, onToggle }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const { addToast } = useToast()

  const handleActionClick = () => {
    if (isConnected) {
      setIsConfirmOpen(true)
    } else {
      onToggle()
      addToast("Network connection restored successfully", "success")
    }
  }

  const handleConfirmIsolation = (e) => {
    e.preventDefault()
    if (confirmPassword === "admin" || confirmPassword.length >= 4) {
      setIsConfirmOpen(false)
      setConfirmPassword("")
      onToggle()
      addToast("SYSTEM ISOLATED: Automatic network kill switch triggered", "danger")
    } else {
      addToast("Invalid authorization code", "danger")
    }
  }

  return (
    <>
      <div 
        className="glass-card rounded-card p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-500"
        style={{
          boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 25px ${isConnected ? "rgba(77, 255, 145, 0.03)" : "rgba(255, 77, 77, 0.08)"}`
        }}
      >
        <h3 className="text-white/80 font-bold mb-4 text-lg tracking-wide">Network Connection Mapping</h3>

        {/* Futuristic SVG Network Topology Map */}
        <div className="h-44 w-full flex items-center justify-center relative mb-4">
          <svg className="w-full h-full max-w-[280px]" viewBox="0 0 200 120">
            {/* Connection Links */}
            {isConnected ? (
              <>
                {/* Node Links with running dashed animation */}
                <line x1="30" y1="30" x2="100" y2="60" stroke="#4DFF91" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
                <line x1="30" y1="90" x2="100" y2="60" stroke="#4DFF91" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
                <line x1="170" y1="30" x2="100" y2="60" stroke="#4DFF91" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
                <line x1="170" y1="90" x2="100" y2="60" stroke="#4DFF91" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
              </>
            ) : (
              <>
                {/* Isolated broken red links */}
                <line x1="30" y1="30" x2="100" y2="60" stroke="#FF4D4D" strokeWidth="1.5" strokeDasharray="3 6" />
                <line x1="30" y1="90" x2="100" y2="60" stroke="#FF4D4D" strokeWidth="1.5" strokeDasharray="3 6" />
                <line x1="170" y1="30" x2="100" y2="60" stroke="#FF4D4D" strokeWidth="1.5" strokeDasharray="3 6" />
                <line x1="170" y1="90" x2="100" y2="60" stroke="#FF4D4D" strokeWidth="1.5" strokeDasharray="3 6" />
              </>
            )}

            {/* Glowing filter definition */}
            <defs>
              <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Endpoint nodes */}
            {/* Node 1 */}
            <circle cx="30" cy="30" r="8" fill="#12131a" stroke={isConnected ? "#4DFF91" : "#FF4D4D"} strokeWidth="2" filter={isConnected ? "url(#glow-green)" : "url(#glow-red)"} />
            <circle cx="30" cy="30" r="3" fill={isConnected ? "#4DFF91" : "#FF4D4D"} />
            {/* Node 2 */}
            <circle cx="30" cy="90" r="8" fill="#12131a" stroke={isConnected ? "#4DFF91" : "#FF4D4D"} strokeWidth="2" filter={isConnected ? "url(#glow-green)" : "url(#glow-red)"} />
            <circle cx="30" cy="90" r="3" fill={isConnected ? "#4DFF91" : "#FF4D4D"} />
            {/* Node 3 */}
            <circle cx="170" cy="30" r="8" fill="#12131a" stroke={isConnected ? "#4DFF91" : "#FF4D4D"} strokeWidth="2" filter={isConnected ? "url(#glow-green)" : "url(#glow-red)"} />
            <circle cx="170" cy="30" r="3" fill={isConnected ? "#4DFF91" : "#FF4D4D"} />
            {/* Node 4 */}
            <circle cx="170" cy="90" r="8" fill="#12131a" stroke={isConnected ? "#4DFF91" : "#FF4D4D"} strokeWidth="2" filter={isConnected ? "url(#glow-green)" : "url(#glow-red)"} />
            <circle cx="170" cy="90" r="3" fill={isConnected ? "#4DFF91" : "#FF4D4D"} />

            {/* Central Gateway Node */}
            <circle cx="100" cy="60" r="14" fill="#12131a" stroke={isConnected ? "#B5FF4D" : "#FF4D4D"} strokeWidth="2.5" />
            <circle cx="100" cy="60" r="8" fill={isConnected ? "#B5FF4D" : "#FF4D4D"} className={isConnected ? "animate-pulse" : ""} />
          </svg>

          {/* Add CSS animation for dash running */}
          <style>{`
            .animate-dash {
              animation: dashRun 0.8s infinite linear;
            }
            @keyframes dashRun {
              to {
                stroke-dashoffset: -12;
              }
            }
          `}</style>
        </div>

        {/* Interface status and action button */}
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            {isConnected ? (
              <motion.div
                key="connected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center gap-1.5 px-3 py-1 bg-safe/10 border border-safe/30 text-safe rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Network Interfaces Bridged
                </div>
                <p className="text-white/40 text-xs max-w-[220px] mb-4">
                  Normal communications active. Monitoring API connections.
                </p>
                <button
                  onClick={handleActionClick}
                  className="bg-danger hover:bg-danger/95 text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-danger/10 hover:shadow-danger/20 cursor-pointer"
                >
                  Trigger Kill Switch
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="isolated"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center gap-1.5 px-3 py-1 bg-danger/15 border border-danger/30 text-danger rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 animate-pulse">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Air-Gapped Isolation Triggered
                </div>
                <p className="text-white/40 text-xs max-w-[220px] mb-4">
                  Connection severed. System protected from spreading ransomware.
                </p>
                <button
                  onClick={handleActionClick}
                  className="bg-safe hover:bg-safe/95 text-dark px-6 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-safe/10 hover:shadow-safe/20 cursor-pointer"
                >
                  Restore Interfaces
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Isolation Confirmation Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false)
          setConfirmPassword("")
        }}
        title="Confirm System Isolation"
      >
        <form onSubmit={handleConfirmIsolation} className="space-y-6">
          <div className="flex items-start gap-3 bg-danger/10 border border-danger/20 p-4 rounded-lg text-sm text-danger-400">
            <AlertTriangle className="w-6 h-6 text-danger flex-shrink-0" />
            <p className="text-white/80">
              <strong className="text-danger">WARNING:</strong> Triggering the kill switch will disable all network interfaces. You will lose remote SSH/RDP access, and databases will be isolated.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">
              Enter Authorization Code (use <code className="bg-white/10 px-1.5 py-0.5 rounded text-accent">admin</code>)
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-danger/50 transition-colors"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsConfirmOpen(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-danger hover:bg-danger/90 text-white rounded-lg text-sm font-bold transition-colors cursor-pointer"
            >
              Trigger Kill Switch
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
