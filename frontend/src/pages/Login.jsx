import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Shield, Mail, Lock, ArrowRight, Github } from "lucide-react"
import { useToast } from "../context/ToastContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false)
      addToast("Successfully authenticated as Admin", "success")
      navigate("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-dark text-white flex font-sans overflow-hidden">
      {/* Left side: Animated Cyber Panel (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-black via-[#0f111a] to-[#12162b] border-r border-white/5 items-center justify-center p-12 overflow-hidden">
        {/* Animated Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Glowing Ambient light */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-danger/5 rounded-full filter blur-[100px] animate-pulse" />

        {/* Center UI illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-card shadow-2xl z-10"
        >
          {/* Scanning line animation */}
          <motion.div
            animate={{ y: [0, 240, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 pointer-events-none"
          />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/30">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <span className="text-xl font-bold tracking-wider">RansomWatch</span>
          </div>

          <h2 className="text-2xl font-bold mb-4 tracking-wide text-white">
            AI-Driven Ransomware Defense
          </h2>
          <p className="text-white/60 mb-6 leading-relaxed">
            Real-time file system monitoring, active behavior analysis, and automated threat mitigation. Protect your corporate environment instantly.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-safe animate-ping" />
              <span className="text-sm font-semibold text-white/80">Canary Files Protected</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              <span className="text-sm font-semibold text-white/80">AI Entropy Monitor Online</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-10 right-10 flex gap-2">
          <span className="text-white/60 text-sm">Don't have an account?</span>
          <Link to="/signup" className="text-accent hover:underline text-sm font-semibold">
            Sign up
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md w-full bg-white/5 md:bg-transparent border border-white/10 md:border-none p-8 md:p-0 rounded-card md:rounded-none backdrop-blur-md md:backdrop-blur-none"
        >
          {/* Logo on Mobile */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Shield className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold">RansomWatch</span>
          </div>

          <h1 className="text-3xl font-bold tracking-wide mb-2">Access Portal</h1>
          <p className="text-white/60 mb-8">Sign in to monitor system threats in real time.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="admin@ransomwatch.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-white/80">Password</label>
                <a href="#" className="text-sm text-accent hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-white/95 text-dark font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-white/40 text-xs uppercase tracking-wider">
                Or Continue With
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <button
              type="button"
              onClick={() => {
                addToast("OAuth features are in demo mode", "info")
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
