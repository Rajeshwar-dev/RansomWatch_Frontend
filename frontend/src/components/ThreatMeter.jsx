import { motion } from "framer-motion"
import { ShieldCheck, ShieldAlert, Cpu, Eye } from "lucide-react"

export default function ThreatMeter({ score }) {
  const radius = 76
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const getColor = () => {
    if (score < 30) return "#4DFF91" // safe
    if (score < 70) return "#FFD84D" // warning
    return "#FF4D4D" // danger
  }

  const getGlow = () => {
    if (score < 30) return "rgba(77, 255, 145, 0.1)"
    if (score < 70) return "rgba(255, 216, 77, 0.1)"
    return "rgba(255, 77, 77, 0.1)"
  }

  const getStatus = () => {
    if (score < 30) return "SYSTEM SECURE"
    if (score < 70) return "SUSPICIOUS ACTIVITY"
    return "IMMEDIATE CRITICAL THREAT"
  }

  const statusColors = {
    safe: "bg-safe/10 text-safe border-safe/30",
    warning: "bg-warning/10 text-warning border-warning/30",
    danger: "bg-danger/10 text-danger border-danger/30"
  }

  const currentStatus = score < 30 ? "safe" : score < 70 ? "warning" : "danger"

  return (
    <div 
      className="glass-card rounded-card p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-500"
      style={{
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 25px ${getGlow()}`
      }}
    >
      <h3 className="text-white/80 font-bold mb-6 text-lg tracking-wide">AI Threat Evaluator HUD</h3>
      
      <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
        {/* HUD Circular Gauges */}
        <div className="relative w-52 h-52 flex items-center justify-center">
          {/* Ambient Glow Orb */}
          <div 
            className="absolute w-28 h-28 rounded-full blur-3xl opacity-20 transition-colors duration-500"
            style={{ backgroundColor: getColor() }}
          />

          {/* SVG Dials */}
          <svg className="w-full h-full absolute">
            {/* Outer Slow Rotating Dashed HUD circle */}
            <circle
              cx="104"
              cy="104"
              r="92"
              stroke={getColor()}
              strokeWidth="1"
              strokeDasharray="6 8"
              fill="none"
              className="animate-spin-slow opacity-35"
              style={{ transformOrigin: "center" }}
            />

            {/* Inner Thin dotted HUD circle */}
            <circle
              cx="104"
              cy="104"
              r="84"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              strokeDasharray="2 3"
              fill="none"
            />

            {/* Main Threat progress circle */}
            <circle
              cx="104"
              cy="104"
              r={radius}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="8"
              fill="none"
            />
            
            {/* Animated Threat progression arc */}
            <motion.circle
              cx="104"
              cy="104"
              r={radius}
              stroke={getColor()}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="-rotate-90"
              style={{ transformOrigin: "center" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: score / 100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>

          {/* HUD Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-extrabold text-white tracking-tighter leading-none mb-1">{score}</span>
            <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Threat Index</span>
          </div>

          <style>{`
            .animate-spin-slow {
              animation: spinSlow 30s infinite linear;
            }
            @keyframes spinSlow {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>

        {/* HUD Details Info (Parameters) */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center gap-2 p-2 bg-white/5 border border-white/5 rounded-lg">
            {score < 30 ? (
              <ShieldCheck className="w-5 h-5 text-safe flex-shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-danger flex-shrink-0" />
            )}
            <div>
              <span className="text-[10px] text-white/40 block leading-none font-bold uppercase tracking-wider">Classification</span>
              <span className={`text-xs font-bold ${score > 70 ? "text-danger" : score > 30 ? "text-warning" : "text-safe"}`}>
                {getStatus()}
              </span>
            </div>
          </div>

          {/* AI parameters details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-center">
              <span className="text-[9px] uppercase text-white/40 font-bold block mb-1">AI Confidence</span>
              <span className="text-sm font-extrabold text-white">98.4%</span>
            </div>
            <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-center">
              <span className="text-[9px] uppercase text-white/40 font-bold block mb-1">Response Time</span>
              <span className="text-sm font-extrabold text-white">0.3s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
