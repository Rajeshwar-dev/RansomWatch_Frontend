import { motion } from "framer-motion"
import { ShieldAlert, ShieldCheck, FileText, CheckCircle2, AlertOctagon } from "lucide-react"

export default function CanaryStatus({ canaryFiles }) {
  const hasTouched = canaryFiles.some((file) => file.status === "touched")

  return (
    <div
      className={`glass-card rounded-card p-6 relative overflow-hidden transition-all duration-500 ${
        hasTouched
          ? "border-danger/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),0_0_25px_rgba(255,77,77,0.12)]"
          : "border-white/10"
      }`}
    >
      {/* Background warning red flash if canary triggered */}
      {hasTouched && (
        <div className="absolute inset-0 bg-danger/5 animate-pulse pointer-events-none" />
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white/80 font-bold text-lg tracking-wide">Decoy Canary Files</h3>
          <p className="text-white/40 text-xs mt-0.5">Honeypot directory files deployed to intercept encryption pipelines.</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-wider text-white/70">
          {canaryFiles.length} Active Traps
        </div>
      </div>

      {/* Canary Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr className="text-white/40 text-[10px] uppercase tracking-widest border-b border-white/5">
              <th className="text-left pb-3 font-semibold">Decoy File</th>
              <th className="text-left pb-3 font-semibold">Directory</th>
              <th className="text-left pb-3 font-semibold">Status</th>
              <th className="text-right pb-3 font-semibold">Alert Info</th>
            </tr>
          </thead>
          <tbody>
            {canaryFiles.map((file, index) => (
              <motion.tr
                key={file.id || index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors`}
              >
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <FileText className={`w-4.5 h-4.5 ${
                      file.status === "safe" ? "text-white/40" : "text-danger"
                    }`} />
                    <span className="text-sm font-semibold text-white/95 break-all max-w-[140px] truncate block">
                      {file.filePath.split(/[/\\]/).pop()}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-xs font-mono text-white/40">
                  {file.directory}
                </td>
                <td className="py-3 pr-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 border text-[9px] font-bold uppercase tracking-wider rounded-full ${
                    file.status === "safe"
                      ? "bg-safe/10 text-safe border-safe/30"
                      : "bg-danger/10 text-danger border-danger/30 animate-pulse"
                  }`}>
                    {file.status === "safe" ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        Safe
                      </>
                    ) : (
                      <>
                        <AlertOctagon className="w-3 h-3" />
                        Triggered
                      </>
                    )}
                  </span>
                </td>
                <td className="py-3 text-right">
                  {file.status === "touched" ? (
                    <div>
                      <p className="text-danger text-xs font-bold leading-none mb-0.5">{file.touchedBy}</p>
                      <p className="text-white/40 text-[9px] leading-none">{new Date(file.touchedAt).toLocaleTimeString()}</p>
                    </div>
                  ) : (
                    <span className="text-[10px] text-white/30">—</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center">
        {hasTouched ? (
          <motion.span
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-danger/25 border border-danger/30 text-danger rounded-full font-bold text-xs tracking-widest uppercase shadow-lg shadow-danger/10 cursor-default"
          >
            Encryption Probe Intercepted
          </motion.span>
        ) : (
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-safe/15 border border-safe/25 text-safe rounded-full font-bold text-xs tracking-widest uppercase cursor-default">
            Honeytoken Monitors Intact
          </span>
        )}
      </div>
    </div>
  )
}
