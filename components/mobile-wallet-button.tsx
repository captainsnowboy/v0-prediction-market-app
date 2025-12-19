"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import { WalletConnectModal } from "./wallet-connect-modal"
import { ProfileEditModal } from "./profile-edit-modal"

export function MobileWalletButton() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [balance, setBalance] = useState(0)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showProfileEditModal, setShowProfileEditModal] = useState(false)

  useEffect(() => {
    const checkWallet = () => {
      const connected = localStorage.getItem("oracle_wallet_connected") === "true"
      const bal = Number.parseInt(localStorage.getItem("oracle_wallet_balance") || "0")
      setIsWalletConnected(connected)
      setBalance(bal)
    }

    checkWallet()

    window.addEventListener("storage", checkWallet)
    return () => window.removeEventListener("storage", checkWallet)
  }, [])

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
    setBalance(200)
    window.dispatchEvent(new Event("storage"))

    // Show profile edit modal after successful connection on mobile
    setTimeout(() => {
      const hasProfile = localStorage.getItem("oracle_profile_complete") === "true"
      if (!hasProfile) {
        setShowProfileEditModal(true)
      }
    }, 500)
  }

  const handleProfileSave = (displayName: string, pfpUrl: string) => {
    localStorage.setItem("oracle_profile_complete", "true")
    localStorage.setItem("oracle_display_name", displayName)
    localStorage.setItem("oracle_pfp_url", pfpUrl)
    window.dispatchEvent(new Event("storage"))
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleConnectWallet}
        className="md:hidden fixed top-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-xs font-medium text-foreground hover:border-primary/50 transition-colors glass-card"
      >
        <Wallet className="w-3.5 h-3.5" />
        {isWalletConnected ? `${balance} CC` : "Connect"}
      </motion.button>

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
