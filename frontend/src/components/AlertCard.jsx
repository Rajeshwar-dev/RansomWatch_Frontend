import { motion } from "framer-motion"
import { Circle, Terminal, AlertTriangle, ShieldAlert } from "lucide-react"

export default function AlertCard({ alert }) {
  const getLeftBorder = () => {
    if (alert.type === "critical") return "border-l-4 border-l-danger"
    if (alert.type === "warning") return "border-l-4 border-l-warning"
    return "border-l-4 border-l-accent"
  }

  const getTypeBadge = () => {
    const colors = {
      critical: "bg-danger/20 text-danger border border-danger/30",
      warning: "bg-warning/20 text-warning border border-warning/30",
      info: "bg-accent/20 text-accent border border-accent/30",
    }
    const icons = {
      critical: <ShieldAlert className="w-3.5 h-3.5" />,
      warning: <AlertTriangle className="w-3.5 h-3.5" />,
      info: <Terminal className="w-3.5 h-3.5" />,
    }
    return (
      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors[alert.type]}`}>
        {icons[alert.type]}
        {alert.type}
      </span>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className={`glass-card rounded-card p-6 text-white ${getLeftBorder()}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {getTypeBadge()}
          <span className="text-white/40 text-xs font-mono">{new Date(alert.timestamp).toLocaleString()}</span>
        </div>
        {alert.type === "critical" && (
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Circle className="w-2.5 h-2.5 fill-danger text-danger" />
          </motion.div>
        )}
      </div>
      
      <h4 className="text-white font-bold text-lg mb-2 tracking-wide">{alert.message}</h4>
      
      <div className="space-y-1 bg-white/[0.02] border border-white/5 p-3 rounded-lg text-sm text-white/70">
        <p>
          <span className="font-semibold text-white/50">Process Name:</span> <code className="text-accent bg-white/5 px-1 py-0.5 rounded">{alert.processName}</code> (PID: {alert.processPid})
        </p>
        {alert.filePath && (
          <p className="truncate">
            <span className="font-semibold text-white/50">Target Path:</span> <code className="text-white/80 font-mono text-xs">{alert.filePath}</code>
          </p>
        )}
        <div className="flex gap-6 mt-2 pt-2 border-t border-white/5 text-xs text-white/40 font-semibold uppercase tracking-wider">
          {alert.entropyScore && (
            <span>Entropy Level: <strong className="text-white/80">{alert.entropyScore}</strong></span>
          )}
          {alert.threatScore && (
            <span>Risk Index: <strong className="text-white/80">{alert.threatScore}%</strong></span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
