import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Menu, X, ArrowRight } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (window.scrollY < 100) {
        setActiveSection("")
      }
    }
    window.addEventListener("scroll", handleScroll)

    // IntersectionObserver to set active section highlight
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -45% 0px", // triggers when section dominates the screen
      threshold: 0.1,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    const timer = setTimeout(() => {
      const ids = ["features", "how-it-works"]
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 500)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const navLinks = [
    { name: "Features", path: "/#features" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Dashboard", path: "/dashboard" },
  ]

  const handleLinkClick = (e, path) => {
    if (path.startsWith("/#")) {
      e.preventDefault()
      const id = path.replace("/#", "")
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold text-white">RansomWatch</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isAnchor = link.path.startsWith("/#")
              const sectionId = link.path.replace("/#", "")
              const isActive = isAnchor && activeSection === sectionId

              return isAnchor ? (
                <a
                  key={link.name}
                  href={link.path.replace("/", "")}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`transition-colors font-semibold text-sm cursor-pointer ${
                    isActive ? "text-accent font-bold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white/70 hover:text-white transition-colors font-semibold text-sm"
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex">
            <Link
              to={location.pathname === "/" ? "/login" : "/"}
              className="flex items-center gap-2 bg-white text-dark px-6 py-2.5 rounded-full font-semibold hover:bg-white/90 transition-all"
            >
              {location.pathname === "/" ? "Get Started" : "Home"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isAnchor = link.path.startsWith("/#")
                const sectionId = link.path.replace("/#", "")
                const isActive = isAnchor && activeSection === sectionId

                return isAnchor ? (
                  <a
                    key={link.name}
                    href={link.path.replace("/", "")}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false)
                      handleLinkClick(e, link.path)
                    }}
                    className={`text-lg cursor-pointer ${
                      isActive ? "text-accent font-bold" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/70 hover:text-white text-lg"
                  >
                    {link.name}
                  </Link>
                )
              })}
              <Link
                to={location.pathname === "/" ? "/login" : "/"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-accent text-dark px-6 py-3 rounded-full font-semibold"
              >
                {location.pathname === "/" ? "Get Started" : "Home"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
