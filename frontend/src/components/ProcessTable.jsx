import { useState } from "react"
import { motion } from "framer-motion"
import { Cpu, Circle, AlertOctagon, Terminal, Trash2 } from "lucide-react"
import Modal from "./Modal"
import { useToast } from "../context/ToastContext"

export default function ProcessTable({ processes }) {
  const [selectedProcess, setSelectedProcess] = useState(null)
  const [processList, setProcessList] = useState(processes)
  const { addToast } = useToast()

  const sortedProcesses = [...processList].sort((a, b) => b.threatScore - a.threatScore)

  const getStatusBadge = (status) => {
    const colors = {
      safe: "bg-safe/25 text-safe border border-safe/40",
      suspicious: "bg-warning/25 text-warning border border-warning/40",
      critical: "bg-danger/25 text-danger border border-danger/40",
    }
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${colors[status]}`}>{status}</span>
  }

  const getLeftBorder = (status) => {
    if (status === "critical") return "border-l-4 border-l-danger"
    if (status === "suspicious") return "border-l-4 border-l-warning"
    return "border-l-4 border-l-safe"
  }

  const getScoreColor = (score) => {
    if (score < 30) return "bg-safe"
    if (score < 70) return "bg-warning"
    return "bg-danger"
  }

  const handleKillProcess = (pid, name) => {
    addToast(`Issuing SIGKILL command for PID ${pid}...`, "info")
    setTimeout(() => {
      setProcessList((prev) => prev.filter((p) => p.pid !== pid))
      setSelectedProcess(null)
      addToast(`Process ${name} (PID ${pid}) successfully terminated`, "success")
    }, 1200)
  }

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-card p-6 overflow-hidden backdrop-blur-md">
        <h3 className="text-white font-bold mb-4 text-lg tracking-wide">Active Processes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/10">
                <th className="text-left py-3 px-4">Process Name</th>
                <th className="text-left py-3 px-4">PID</th>
                <th className="text-left py-3 px-4">Files/min</th>
                <th className="text-left py-3 px-4">Renames</th>
                <th className="text-left py-3 px-4">Threat Score</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedProcesses.map((process, index) => (
                <motion.tr
                  key={process.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedProcess(process)}
                  className={`border-b border-white/5 ${getLeftBorder(process.status)} hover:bg-white/5 transition-all cursor-pointer`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-white/70" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{process.name}</span>
                        {process.status === "critical" && (
                          <motion.div
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Circle className="w-2 h-2 fill-danger text-danger" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/70 font-mono text-sm">{process.pid}</td>
                  <td className="py-4 px-4 text-white/70">{process.filesPerMin}</td>
                  <td className="py-4 px-4 text-white/70">{process.renameRate}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${process.threatScore}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full ${getScoreColor(process.threatScore)}`}
                        />
                      </div>
                      <span className="text-white font-bold w-8">{process.threatScore}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(process.status)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Details Modal */}
      <Modal
        isOpen={!!selectedProcess}
        onClose={() => setSelectedProcess(null)}
        title="Process Diagnostics"
      >
        {selectedProcess && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30 text-accent">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white leading-tight">{selectedProcess.name}</h4>
                <p className="text-sm text-white/50 font-mono">PID: {selectedProcess.pid}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                <span className="text-xs text-white/40 block mb-1">Threat Score</span>
                <span className={`text-3xl font-extrabold ${selectedProcess.threatScore > 70 ? "text-danger" : selectedProcess.threatScore > 30 ? "text-warning" : "text-safe"}`}>
                  {selectedProcess.threatScore}%
                </span>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                <span className="text-xs text-white/40 block mb-1">Action Rate</span>
                <span className="text-3xl font-extrabold text-white">
                  {selectedProcess.filesPerMin}/min
                </span>
              </div>
            </div>

            {/* Diagnostics Fields */}
            <div className="space-y-3">
              <div>
                <span className="text-xs text-white/40 block mb-1">Executable Path</span>
                <p className="text-sm font-mono bg-white/5 p-3 rounded-lg border border-white/10 break-all text-white/80">
                  C:\Windows\System32\{selectedProcess.name}
                </p>
              </div>
              <div>
                <span className="text-xs text-white/40 block mb-1">Activity Classification</span>
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                  {selectedProcess.status === "critical" ? (
                    <AlertOctagon className="w-5 h-5 text-danger flex-shrink-0" />
                  ) : (
                    <Terminal className="w-5 h-5 text-accent flex-shrink-0" />
                  )}
                  <span className="text-sm font-semibold text-white/80">
                    {selectedProcess.status === "critical"
                      ? "High entropy encryption behaviors detected"
                      : "Standard system process operation"}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedProcess(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
              >
                Close Logs
              </button>
              <button
                type="button"
                onClick={() => handleKillProcess(selectedProcess.pid, selectedProcess.name)}
                className="flex items-center gap-2 px-5 py-2 bg-danger hover:bg-danger/90 text-white rounded-lg text-sm font-bold transition-colors cursor-pointer shadow-lg hover:shadow-danger/20"
              >
                <Trash2 className="w-4 h-4" />
                Kill Process
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
