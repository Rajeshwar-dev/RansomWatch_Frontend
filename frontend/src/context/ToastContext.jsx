import { createContext, useContext, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react"

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const iconMap = {
              success: <CheckCircle className="w-5 h-5 text-safe" />,
              danger: <XCircle className="w-5 h-5 text-danger" />,
              warning: <AlertTriangle className="w-5 h-5 text-warning" />,
              info: <Info className="w-5 h-5 text-accent" />,
            }

            const borderMap = {
              success: "border-safe/30 bg-safe/10",
              danger: "border-danger/30 bg-danger/10",
              warning: "border-warning/30 bg-warning/10",
              info: "border-accent/30 bg-accent/10",
            }

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                className={`flex items-start gap-3 p-4 rounded-card border backdrop-blur-xl shadow-2xl pointer-events-auto ${borderMap[toast.type]} text-white`}
              >
                <div className="flex-shrink-0 mt-0.5">{iconMap[toast.type]}</div>
                <div className="flex-1 text-sm font-medium pr-4">{toast.message}</div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
