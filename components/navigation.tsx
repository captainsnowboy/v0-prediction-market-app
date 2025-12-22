"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, BarChart3, Trophy, User, Wallet, ChevronDown, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { WalletConnectModal } from "./wallet-connect-modal"
import { ProfileEditModal } from "./profile-edit-modal"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/markets", label: "Markets", icon: BarChart3 },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
]

export function TopNavigation() {
  const pathname = usePathname()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [balance, setBalance] = useState(0)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showProfileEditModal, setShowProfileEditModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const checkWallet = () => {
      const connected = localStorage.getItem("oracle_wallet_connected") === "true"
      const address = localStorage.getItem("oracle_wallet_address") || ""
      const bal = Number.parseInt(localStorage.getItem("oracle_wallet_balance") || "0")
      setIsWalletConnected(connected)
      setWalletAddress(address)
      setBalance(bal)
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

  const handleConnectWallet = () => {
    setShowWalletModal(true)
  }

  const handleWalletConnect = (walletId: string) => {
    const fakeAddress = `capta${Math.random().toString(36).substr(2, 9)}8d1e`
    localStorage.setItem("oracle_wallet_connected", "true")
    localStorage.setItem("oracle_wallet_address", fakeAddress)
    localStorage.setItem("oracle_wallet_balance", "200")
    localStorage.setItem("oracle_bet_count", "0")
    setIsWalletConnected(true)
    setWalletAddress(fakeAddress)
    setBalance(200)
    window.dispatchEvent(new Event("storage"))
    setTimeout(() => {
      const hasProfile = localStorage.getItem("oracle_profile_complete") === "true"
      if (!hasProfile) {
        setShowProfileEditModal(true)
      }
    }, 500)
  }

  const handleDisconnect = () => {
    localStorage.removeItem("oracle_wallet_connected")
    localStorage.removeItem("oracle_wallet_address")
    localStorage.removeItem("oracle_wallet_balance")
    localStorage.removeItem("oracle_bet_count")
    localStorage.removeItem("oracle_profile_complete")
    localStorage.removeItem("oracle_display_name")
    localStorage.removeItem("oracle_pfp_url")
    setIsWalletConnected(false)
    setWalletAddress("")
    setBalance(0)
    setShowDropdown(false)
    window.dispatchEvent(new Event("storage"))
    window.location.href = "/"
  }

  const handleProfileSave = (displayName: string, pfpUrl: string) => {
    localStorage.setItem("oracle_profile_complete", "true")
    localStorage.setItem("oracle_display_name", displayName)
    localStorage.setItem("oracle_pfp_url", pfpUrl)
    window.dispatchEvent(new Event("storage"))
  }

  return (
    <>
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
                  const isActive =
                    pathname === item.href || (item.href === "/markets" && pathname.startsWith("/market/"))
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

              <div className="flex items-center gap-3">
                <ThemeToggle />
                {isWalletConnected ? (
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
                    >
                      <Wallet className="w-4 h-4" />
                      <span>{balance} CC</span>
                      <ChevronDown className="w-3 h-3" />
                    </motion.button>
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-64 glass-card rounded-xl border border-border/50 p-2 shadow-xl">
                        <div className="px-3 py-2 mb-2 border-b border-border/50">
                          <p className="text-xs text-muted-foreground mb-1">Connected</p>
                          <p className="text-sm font-medium text-foreground font-mono">
                            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                          </p>
                        </div>
                        <button
                          onClick={handleDisconnect}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Disconnect Wallet
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConnectWallet}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleWalletConnect}
      />

      <ProfileEditModal
        isOpen={showProfileEditModal}
        onClose={() => setShowProfileEditModal(false)}
        onSave={handleProfileSave}
      />
    </>
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
