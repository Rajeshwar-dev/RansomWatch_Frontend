import { motion } from "framer-motion"
import CountUp from "./CountUp"

export default function StatCard({ title, value, icon: Icon, trend, cardType = "dark" }) {
  const borderColors = {
    dark: "rgba(255, 255, 255, 0.06)",
    green: "rgba(181, 255, 77, 0.2)",
    danger: "rgba(255, 77, 77, 0.2)",
    safe: "rgba(77, 255, 145, 0.2)",
    white: "rgba(255, 255, 255, 0.06)"
  }

  const glows = {
    dark: "hover:shadow-white/5",
    green: "hover:shadow-accent/10 hover:border-accent/30",
    danger: "hover:shadow-danger/10 hover:border-danger/30",
    safe: "hover:shadow-safe/10 hover:border-safe/30",
    white: "hover:shadow-white/5"
  }

  const iconColors = {
    dark: "text-white/60",
    green: "text-accent",
    danger: "text-danger",
    safe: "text-safe",
    white: "text-white/60"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card p-6 rounded-card relative overflow-hidden`}
      style={{ borderColor: borderColors[cardType] }}
    >
      {/* Background radial accent glow */}
      {cardType !== "dark" && (
        <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full blur-2xl opacity-10 ${
          cardType === "green" ? "bg-accent" : cardType === "danger" ? "bg-danger" : "bg-safe"
        }`} />
      )}

      <div className="flex items-center justify-between mb-4">
        <span className="text-white/50 text-sm font-semibold tracking-wider uppercase">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${iconColors[cardType]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-4xl font-extrabold text-white tracking-wide">
          <CountUp value={value} />
        </p>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 border ${
            trend.positive ? "text-safe border-safe/25" : "text-danger border-danger/25"
          }`}>
            {trend.value}
          </span>
        )}
      </div>
    </motion.div>
  )
}
