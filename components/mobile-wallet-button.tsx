"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Wallet, ChevronDown, LogOut } from "lucide-react"
import { WalletConnectModal } from "./wallet-connect-modal"
import { ProfileEditModal } from "./profile-edit-modal"

export function MobileWalletButton() {
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

  const handleProfileSave = (displayName: string, pfpUrl: string) => {
    localStorage.setItem("oracle_profile_complete", "true")
    localStorage.setItem("oracle_display_name", displayName)
    localStorage.setItem("oracle_pfp_url", pfpUrl)
    window.dispatchEvent(new Event("storage"))
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

  const handleButtonClick = () => {
    if (isWalletConnected) {
      setShowDropdown(!showDropdown)
    } else {
      handleConnectWallet()
    }
  }

  return (
    <>
      <div className="md:hidden fixed top-4 right-4 z-40">
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleButtonClick}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-xs font-medium text-foreground hover:border-primary/50 transition-colors glass-card"
        >
          <Wallet className="w-3.5 h-3.5" />
          {isWalletConnected ? (
            <>
              <span>{balance} CC</span>
              <ChevronDown className="w-3 h-3" />
            </>
          ) : (
            <span>Connect</span>
          )}
        </motion.button>

        {isWalletConnected && showDropdown && (
          <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl border border-border/50 p-2 shadow-xl">
            <div className="px-3 py-2 mb-2 border-b border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Connected</p>
              <p className="text-xs font-medium text-foreground font-mono">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
            </div>
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>

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
