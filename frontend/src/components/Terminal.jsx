import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const terminalLines = [
  { type: "ok", text: "[OK]     Monitoring 4,821 files..." },
  { type: "ok", text: "[OK]     Canary files placed in 12 dirs" },
  { type: "info", text: "[INFO]   update.exe — 3 files/min" },
  { type: "warn", text: "[WARN]   Entropy spike: report.docx → 7.6" },
  { type: "warn", text: "[WARN]   Entropy spike: budget.xlsx → 7.8" },
  { type: "alert", text: "[ALERT]  Canary file touched!" },
  { type: "alert", text: "[ALERT]  Threat score: 94/100 — CRITICAL" },
  { type: "action", text: "[ACTION] Network isolated. Attack stopped." },
]

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState([])
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    let index = 0
    let timeoutId = null
    const interval = setInterval(() => {
      if (index < terminalLines.length) {
        const currentLine = terminalLines[index]
        if (currentLine) {
          setVisibleLines((prev) => [...prev, currentLine])
        }
        index++
      } else {
        clearInterval(interval)
        timeoutId = setTimeout(() => {
          setVisibleLines([])
          setResetKey((prev) => prev + 1)
        }, 3000)
      }
    }, 400)

    return () => {
      clearInterval(interval)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [resetKey])

  const getLineColor = (type) => {
    switch (type) {
      case "ok":
        return "text-safe"
      case "info":
        return "text-blue-400"
      case "warn":
        return "text-warning"
      case "alert":
        return "text-danger"
      case "action":
        return "text-accent"
      default:
        return "text-white"
    }
  }

  return (
    <div className="bg-[#0d0d14] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="p-4 font-mono text-sm">
        <div className="space-y-1 min-h-[200px]">
          {visibleLines.map((line, index) => line && (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={getLineColor(line.type)}
            >
              {line.text}
            </motion.div>
          ))}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-white ml-1 align-middle"
          />
        </div>
      </div>
    </div>
  )
}
