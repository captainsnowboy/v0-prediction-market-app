"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, BarChart3, Trophy, User, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/markets", label: "Markets", icon: BarChart3 },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
]

export function TopNavigation() {
  const pathname = usePathname()
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  useEffect(() => {
    const checkWallet = () => {
      const connected = localStorage.getItem("oracle_wallet_connected") === "true"
      setIsWalletConnected(connected)
    }

    checkWallet()

    window.addEventListener("storage", checkWallet)
    return () => window.removeEventListener("storage", checkWallet)
  }, [])

  const filteredNavItems = navItems.filter((item) => {
    if (item.href === "/profile" && !isWalletConnected) {
      return false
    }
    return true
  })

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 hidden md:block"
    >
      <div className="glass-card border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0052FF" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <filter id="navGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="56"
                  stroke="url(#navGradient)"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#navGlow)"
                />
                <ellipse cx="60" cy="60" rx="32" ry="18" stroke="url(#navGradient)" strokeWidth="2.5" fill="none" />
                <circle cx="60" cy="60" r="10" fill="url(#navGradient)" />
                <circle cx="63" cy="57" r="3" fill="white" opacity="0.9" />
              </svg>
              <span className="text-xl font-bold gradient-text">Oracle</span>
            </Link>

            <nav className="flex items-center gap-1">
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.href || (item.href === "/markets" && pathname.startsWith("/market/"))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-secondary rounded-lg"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {isWalletConnected ? (
              <Link href="/profile">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">200 CC</span>
                </motion.button>
              </Link>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  localStorage.setItem("oracle_wallet_connected", "true")
                  localStorage.setItem("oracle_wallet_balance", "200")
                  localStorage.setItem("oracle_bet_count", "0")
                  window.dispatchEvent(new Event("storage"))
                  window.location.href = "/profile"
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export function BottomNavigation() {
  const pathname = usePathname()
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  useEffect(() => {
    const checkWallet = () => {
      const connected = localStorage.getItem("oracle_wallet_connected") === "true"
      setIsWalletConnected(connected)
    }

    checkWallet()

    window.addEventListener("storage", checkWallet)
    return () => window.removeEventListener("storage", checkWallet)
  }, [])

  const filteredNavItems = navItems.filter((item) => {
    if (item.href === "/profile" && !isWalletConnected) {
      return false
    }
    return true
  })

  return (
    <motion.nav
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div
        className="glass-card border-t border-border/50 px-2 pt-2 pb-safe"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom, 8px), 8px)" }}
      >
        <div className="flex items-center justify-around">
          {filteredNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href === "/markets" && pathname.startsWith("/market/"))
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center gap-1 px-4 py-2 min-w-[64px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <Icon
                  className={cn(
                    "w-5 h-5 relative z-10 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                />
                <span
                  className={cn(
                    "text-xs relative z-10 transition-colors",
                    isActive ? "text-foreground font-medium" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
