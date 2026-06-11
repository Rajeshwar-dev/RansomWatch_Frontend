import { motion } from "framer-motion"
import { File, FileText, FileX, ShieldCheck, ShieldAlert } from "lucide-react"

export default function FileEventFeed({ events }) {
  const getEntropyBadge = (entropy) => {
    if (entropy > 7)
      return <span className="px-2.5 py-0.5 bg-danger/10 text-danger border border-danger/30 text-[10px] font-bold uppercase rounded-full">HIGH RISK ({entropy})</span>
    if (entropy > 5)
      return <span className="px-2.5 py-0.5 bg-warning/10 text-warning border border-warning/30 text-[10px] font-bold uppercase rounded-full">MEDIUM ({entropy})</span>
    return <span className="px-2.5 py-0.5 bg-safe/10 text-safe border border-safe/30 text-[10px] font-bold uppercase rounded-full">SAFE ({entropy})</span>
  }

  const getFileIcon = (name) => {
    if (name.endsWith(".txt")) return <FileText className="w-4.5 h-4.5 text-accent" />
    if (name.endsWith(".docx")) return <FileText className="w-4.5 h-4.5 text-white/70" />
    if (name.endsWith(".xlsx")) return <File className="w-4.5 h-4.5 text-safe" />
    return <File className="w-4.5 h-4.5 text-white/50" />
  }

  return (
    <div className="glass-card rounded-card p-6 text-white relative">
      <h3 className="text-white/80 font-bold mb-4 text-lg tracking-wide">File System Audit Log</h3>
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-white/30">
          <FileX className="w-12 h-12 mb-3" />
          <p className="text-sm">No telemetry records yet</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {events.map((event, index) => (
            <motion.div
              key={event.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  {getFileIcon(event.filePath)}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">{event.filePath.split(/[/\\]/).pop()}</p>
                  <p className="text-white/40 text-xs">
                    {event.processName} • {new Date(event.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              {getEntropyBadge(event.entropyAfter)}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
