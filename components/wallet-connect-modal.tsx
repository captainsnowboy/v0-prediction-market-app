"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Wallet, ExternalLink } from "lucide-react"

const WALLETS = [
  {
    name: "Console",
    icon: "https://console.xyz/favicon.ico",
    id: "console",
    description: "Canton's premier wallet",
  },
  {
    name: "Loop",
    icon: "https://loop.top/favicon.ico",
    id: "loop",
    description: "Fast & secure",
  },
  {
    name: "Zoro",
    icon: "https://zoro.io/favicon.ico",
    id: "zoro",
    description: "Privacy-focused",
  },
  {
    name: "WalletConnect",
    icon: "🔗",
    id: "walletconnect",
    description: "Connect any wallet",
  },
]

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (walletId: string) => void
}

export function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleConnect = async (walletId: string) => {
    setConnecting(walletId)
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onConnect(walletId)
    setConnecting(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[101]"
          >
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Connect Wallet</h3>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-6">Choose your Canton-compatible wallet</p>

              <div className="space-y-2">
                {WALLETS.map((wallet) => (
                  <motion.button
                    key={wallet.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleConnect(wallet.id)}
                    disabled={connecting !== null}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="flex items-center gap-3">
                      {wallet.icon.startsWith("http") ? (
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                          <img
                            src={wallet.icon || "/placeholder.svg"}
                            alt={wallet.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none"
                              const fallback = document.createElement("span")
                              fallback.textContent = wallet.name[0]
                              fallback.className = "text-lg font-bold text-primary"
                              e.currentTarget.parentElement?.appendChild(fallback)
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-2xl">{wallet.icon}</span>
                      )}
                      <div className="text-left">
                        <div className="font-medium text-foreground">{wallet.name}</div>
                        {wallet.description && (
                          <div className="text-xs text-muted-foreground">{wallet.description}</div>
                        )}
                      </div>
                    </div>
                    {connecting === wallet.id ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-primary/50 transition-colors" />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-muted-foreground flex items-start gap-2">
                  <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>By connecting, you agree to Oracle's Terms of Service and Privacy Policy</span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
