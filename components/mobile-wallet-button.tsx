"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Wallet } from "lucide-react"

export function MobileWalletButton() {
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

  const handleConnectWallet = () => {
    // Clear wallet state to trigger onboarding modal
    localStorage.removeItem("oracle_wallet_connected")
    window.dispatchEvent(new Event("storage"))
    // Reload to show onboarding carousel
    window.location.reload()
  }

  if (isWalletConnected) return null

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleConnectWallet}
      className="md:hidden fixed top-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-xs font-medium text-foreground hover:border-primary/50 transition-colors glass-card"
    >
      <Wallet className="w-3.5 h-3.5" />
      Connect
    </motion.button>
  )
}
