"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Upload, Sparkles } from "lucide-react"

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (displayName: string, pfpUrl: string) => void
}

export function ProfileEditModal({ isOpen, onClose, onSave }: ProfileEditModalProps) {
  const [displayName, setDisplayName] = useState("")
  const [pfpUrl, setPfpUrl] = useState("")
  const [generating, setGenerating] = useState(false)

  const generatePFP = () => {
    setGenerating(true)
    const walletAddress = localStorage.getItem("oracle_wallet_address") || ""
    // Generate avatar based on wallet address
    const colors = ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4", "FFEAA7", "DFE6E9", "A29BFE", "FD79A8"]
    const colorIndex = Number.parseInt(walletAddress.slice(4, 6), 16) % colors.length
    const avatarUrl = `https://ui-avatars.com/api/?name=${displayName || "User"}&background=${colors[colorIndex]}&color=fff&size=200&bold=true`
    setTimeout(() => {
      setPfpUrl(avatarUrl)
      setGenerating(false)
    }, 800)
  }

  const handleSave = () => {
    if (!displayName.trim()) return
    if (!pfpUrl) {
      generatePFP()
    }
    onSave(
      displayName,
      pfpUrl || `https://ui-avatars.com/api/?name=${displayName}&background=0052FF&color=fff&size=200&bold=true`,
    )
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
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Set up your profile</h3>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Complete your profile to unlock the full Oracle dashboard experience
              </p>

              {/* PFP Preview */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-secondary border-2 border-primary/30 overflow-hidden flex items-center justify-center">
                  {pfpUrl ? (
                    <img src={pfpUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Display Name */}
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="AnonTrader42"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  maxLength={20}
                />
                <p className="text-xs text-muted-foreground mt-1">{displayName.length}/20 characters</p>
              </div>

              {/* PFP Generation */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Profile Picture</label>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generatePFP}
                    disabled={generating || !displayName}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-medium hover:bg-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {generating ? (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    Generate Avatar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground hover:bg-white/5 transition-all duration-300"
                  >
                    <Upload className="w-4 h-4" />
                  </motion.button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Auto-generate from your name or upload a custom image
                </p>
              </div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={!displayName.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Profile
              </motion.button>

              <button
                onClick={onClose}
                className="w-full mt-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip for now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
