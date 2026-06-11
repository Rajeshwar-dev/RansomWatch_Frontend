import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Shield, LayoutDashboard, Bell, Cpu, Settings, BarChart2, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "../context/ToastContext"

export default function Sidebar() {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true"
  )

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Alerts", path: "/alerts", icon: Bell },
    { name: "Analytics", path: "/analytics", icon: BarChart2 },
    { name: "Processes", path: "/processes", icon: Cpu },
    { name: "Settings", path: "/settings", icon: Settings },
  ]

  const handleLogout = () => {
    addToast("Logged out successfully", "success")
    navigate("/login")
  }

  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
    window.dispatchEvent(new Event("sidebar-toggle"))
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:flex fixed left-0 top-0 bottom-0 bg-[#0b0c10]/95 border-r border-white/5 flex-col z-40 transition-all duration-300 backdrop-blur-xl ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Toggle button */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-7 w-6 h-6 rounded-full border border-white/10 bg-[#12131a] flex items-center justify-center text-white/70 hover:text-white cursor-pointer z-50 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Logo area */}
        <div className={`p-6 flex items-center gap-3 overflow-hidden ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-accent" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-white/95 to-white/70 bg-clip-text text-transparent">
              RansomWatch
            </span>
          )}
        </div>

        {/* Nav list */}
        <div className="flex-1 px-3 py-2 space-y-1.5 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              title={isCollapsed ? item.name : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-xl transition-all duration-200 cursor-pointer ${
                  isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
                } ${
                  isActive
                    ? "bg-accent/15 border-l-2 border-accent text-accent font-bold shadow-[inset_4px_0_12px_rgba(181,255,77,0.05)]"
                    : "text-white/50 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-semibold tracking-wide">{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* Footer profile & actions */}
        <div className="p-3 border-t border-white/5 flex flex-col gap-2">
          <div className={`flex items-center rounded-xl bg-white/[0.02] border border-white/5 p-3 ${isCollapsed ? "justify-center" : "gap-3"}`}>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-dark font-extrabold text-xs flex-shrink-0 shadow-lg shadow-accent/10">
              JD
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate leading-none mb-1">John Doe</p>
                <p className="text-[10px] text-white/40 truncate leading-none">operator@ransomwatch.io</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            title={isCollapsed ? "Sign Out" : undefined}
            className={`flex items-center justify-center rounded-xl border border-white/5 hover:border-danger/30 hover:bg-danger/10 text-white/50 hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer ${
              isCollapsed ? "p-3" : "gap-2 py-3 w-full"
            }`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0b0c10]/95 border-t border-white/5 z-40 backdrop-blur-xl">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all ${
                  isActive ? "text-accent font-bold" : "text-white/40"
                }`
              }
            >
              <item.icon className="w-5.5 h-5.5" />
              <span className="text-[10px] uppercase tracking-wider">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}
