import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  Lock,
  Activity,
  Zap,
  WifiOff,
  LayoutDashboard,
  ChevronDown,
  ArrowRight,
  Cpu,
} from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Terminal from "../components/Terminal"
import CountUp from "../components/CountUp"
import PageWrapper from "../components/PageWrapper"

const features = [
  {
    icon: Lock,
    title: "Canary File System",
    description: "Deploy silent honeytoken traps in critical directories to intercept encryption pipelines instantly.",
    cardType: "white", // will map to cyan/blue style
  },
  {
    icon: Activity,
    title: "Entropy Analyzer",
    description: "Measure real-time file randomization rates to identify active silent encryption routines.",
    cardType: "green", // will map to green style
  },
  {
    icon: Cpu,
    title: "Process Monitor",
    description: "Continuously scan active runtime processes to evaluate threat score weights dynamically.",
    cardType: "danger", // will map to danger/red style
  },
  {
    icon: Zap,
    title: "AI Threat Score",
    description: "Generate 0-100 real-time security telemetry rankings utilizing advanced heuristic models.",
    cardType: "green",
  },
  {
    icon: WifiOff,
    title: "Network Kill Switch",
    description: "Sever network interfaces automatically when severe encryption spikes trigger security alarms.",
    cardType: "danger",
  },
  {
    icon: LayoutDashboard,
    title: "Live Operations Room",
    description: "A centralized control dashboard broadcasting system file logs and audit histories.",
    cardType: "white",
  },
]

const howItWorksSteps = [
  {
    step: "01",
    title: "Monitoring Initiation",
    description: "The lightweight agent initializes deep kernel hook interfaces to listen to all storage operations in real time.",
  },
  {
    step: "02",
    title: "Continuous File Scanning",
    description: "All reads, writes, and modifications are verified through process parent trees and signature pipelines.",
  },
  {
    step: "03",
    title: "Heuristic Entropy Analysis",
    description: "Files are audited for high-randomness file entropy spikes, distinguishing standard zip compression from hostile encryption.",
  },
  {
    step: "04",
    title: "Threat Index Calculation",
    description: "Advanced machine learning pipelines assign process risk scores based on telemetry anomalies.",
  },
  {
    step: "05",
    title: "Emergency Alert Broadcast",
    description: "Floating toast indicators and warning signals immediately fire to alert operators in the security center.",
  },
  {
    step: "06",
    title: "Air-Gapped Isolation",
    description: "Autonomous defense mechanisms sever external internet gateways and isolate local services to block ransomware replication.",
  },
]

export default function Landing() {
  const [expandedStep, setExpandedStep] = useState(null)

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#0b0c10] text-white relative overflow-hidden font-sans pb-10">
        {/* Ambient Cyber Glows */}
        <div className="cyber-glow bg-accent/5 w-[600px] h-[600px] top-[-200px] left-[-200px]" />
        <div className="cyber-glow bg-blue-500/5 w-[500px] h-[500px] top-[35%] right-[-100px]" />
        <div className="cyber-glow bg-danger/5 w-[600px] h-[600px] bottom-[-200px] left-[15%]" />
        <div className="absolute inset-0 cyber-grid pointer-events-none" />

        <Navbar />

        <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto relative z-10">
          
          {/* Hero */}
          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-1.5 bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  Active Protection Engine V2
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                  Stop Ransomware
                  <br />
                  <span className="bg-gradient-to-r from-accent via-[#5ce1e6] to-[#4dff91] bg-clip-text text-transparent">
                    Before It Starts
                  </span>
                </h1>
                <p className="text-white/60 text-lg mb-8 max-w-md leading-relaxed font-light">
                  Enterprise-grade real-time monitoring, AI-powered entropy analysis, and autonomous air-gapped network isolation to safeguard your critical files.
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-dark px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-accent/15 hover:shadow-accent/25 cursor-pointer"
                  >
                    Start Monitoring
                    <ArrowRight className="w-4.5 h-4.5" />
                  </Link>
                  <a
                    href="#how-it-works"
                    className="flex items-center gap-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    See How It Works
                  </a>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -top-4 -right-4 bg-accent/10 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg backdrop-blur-md z-20">
                  Live Simulation
                </div>
                <Terminal />
              </motion.div>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Files Monitored"
                value="4,821"
                cardType="dark"
                delay={0}
              />
              <StatCard
                title="Detection Speed"
                value="0.3s"
                cardType="white"
                delay={0.1}
              />
              <StatCard
                title="Attacks Stopped"
                value="3"
                cardType="green"
                delay={0.2}
              />
            </div>
          </section>

          {/* Features */}
          <section id="features" className="mb-24">
            <div className="text-center mb-16">
              <span className="inline-block bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                Advanced Modules
              </span>
              <h2 className="text-4xl font-extrabold tracking-wide">Everything you need to stay protected</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} delay={index * 0.05} />
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="mb-24">
            <div className="text-center mb-16">
              <span className="inline-block bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                Operation Flow
              </span>
              <h2 className="text-4xl font-extrabold tracking-wide">How RansomWatch Works</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {howItWorksSteps.map((step, index) => (
                <AccordionItem
                  key={index}
                  step={step}
                  isExpanded={expandedStep === index}
                  onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                />
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="mb-10">
            <div className="glass-card border border-accent/20 bg-gradient-to-br from-white/[0.01] to-accent/[0.01] rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
              <h2 className="text-3xl font-extrabold text-white mb-6 tracking-wide">
                Ready to protect your system?
              </h2>
              <p className="text-white/40 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
                Deploy our intelligent honeytoken monitors and start safeguarding your workspace files in seconds.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-dark px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-accent/15 hover:shadow-accent/25 transition-all cursor-pointer"
              >
                Launch Control Room
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 px-6 bg-[#08090d]/60 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-7 h-7 text-accent" />
              <span className="text-lg font-bold tracking-wider text-white">RansomWatch</span>
            </div>
            <div className="flex gap-8 text-white/50 text-sm font-semibold">
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                How It Works
              </a>
              <Link to="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
            </div>
            <p className="text-white/30 text-xs">
              © 2026 RansomWatch. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </PageWrapper>
  )
}

function StatCard({ title, value, cardType, delay }) {
  const getCardTheme = () => {
    if (cardType === "dark") {
      return {
        icon: Shield,
        color: "text-white/95",
        glow: "hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]",
        border: "border-white/5 hover:border-white/10"
      }
    }
    if (cardType === "white") {
      return {
        icon: Activity,
        color: "text-accent",
        glow: "hover:shadow-[0_0_30px_rgba(181,255,77,0.06)]",
        border: "border-accent/10 hover:border-accent/30"
      }
    }
    return {
      icon: Zap,
      color: "text-danger",
      glow: "hover:shadow-[0_0_30px_rgba(255,77,77,0.06)]",
      border: "border-danger/10 hover:border-danger/30"
    }
  }

  const theme = getCardTheme()
  const Icon = theme.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card rounded-card p-8 text-center flex flex-col items-center border ${theme.border} ${theme.glow}`}
    >
      <div className="w-11 h-11 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-4">
        <Icon className={`w-5 h-5 ${theme.color}`} />
      </div>
      <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 mb-2">
        {title}
      </p>
      <p className={`text-5xl font-extrabold tracking-tight ${theme.color}`}>
        <CountUp value={value} />
      </p>
    </motion.div>
  )
}

function FeatureCard({ feature, delay }) {
  const Icon = feature.icon

  const getFeatureColors = (cardType) => {
    if (cardType === "green") {
      return {
        text: "text-accent",
        border: "hover:border-accent/30 hover:shadow-[0_0_20px_rgba(181,255,77,0.04)]",
        iconBg: "bg-accent/10 border-accent/20"
      }
    }
    if (cardType === "white") {
      return {
        text: "text-blue-400",
        border: "hover:border-blue-400/30 hover:shadow-[0_0_20px_rgba(96,165,250,0.04)]",
        iconBg: "bg-blue-400/10 border-blue-400/20"
      }
    }
    return {
      text: "text-danger",
      border: "hover:border-danger/30 hover:shadow-[0_0_20px_rgba(255,77,77,0.04)]",
      iconBg: "bg-danger/10 border-danger/20"
    }
  }

  const theme = getFeatureColors(feature.cardType)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card rounded-card p-6 flex flex-col justify-between border border-white/5 ${theme.border}`}
    >
      <div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 ${theme.iconBg}`}>
          <Icon className={`w-6 h-6 ${theme.text}`} />
        </div>
        <h3 className="text-lg font-bold mb-2 tracking-wide text-white">{feature.title}</h3>
        <p className="text-sm text-white/50 mb-6 leading-relaxed font-light">
          {feature.description}
        </p>
      </div>
      <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer ${theme.text}`}>
        Learn more
        <ArrowRight className="w-3.5 h-3.5" />
      </span>
    </motion.div>
  )
}

function AccordionItem({ step, isExpanded, onClick }) {
  return (
    <motion.div
      className={`rounded-card overflow-hidden transition-all duration-300 border ${
        isExpanded ? "bg-white/[0.02] border-accent/25" : "bg-white/[0.01] border-white/5 hover:border-white/10"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <span
            className={`text-xl font-mono font-extrabold ${
              isExpanded ? "text-accent" : "text-white/40"
            }`}
          >
            {step.step}
          </span>
          <h3
            className={`text-lg font-bold tracking-wide transition-colors ${
              isExpanded ? "text-white" : "text-white/80"
            }`}
          >
            {step.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown
            className={`w-5 h-5 ${
              isExpanded ? "text-accent" : "text-white/40"
            }`}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5"
          >
            <div className="px-6 py-4 bg-black/10">
              <p className="text-white/50 text-sm leading-relaxed font-light">{step.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
