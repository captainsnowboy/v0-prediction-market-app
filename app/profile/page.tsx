"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wallet, Copy, Check, Flame, Gift, Settings, ChevronRight, Lock, TrendingUp, History, Bell } from "lucide-react"
import { TopNavigation, BottomNavigation } from "@/components/navigation"

export default function ProfilePage() {
  const [copied, setCopied] = useState(false)
  const referralCode = "ORACLE-7X92K"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setCopied(true)
    } catch {
      // Fallback: create a temporary input element
      const textArea = document.createElement("textarea")
      textArea.value = referralCode
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
        setCopied(true)
      } catch {
        // If both methods fail, just show copied anyway for UX
        setCopied(true)
      }
      document.body.removeChild(textArea)
    }
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <TopNavigation />
      <BottomNavigation />

      <main className="pt-4 md:pt-24 px-4 max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-6 glow-primary"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">you</h1>
              <p className="text-muted-foreground text-sm">Member since Dec 2024</p>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-foreground font-medium hover:border-primary/50 transition-colors"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </motion.button>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Balance</h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-warning/10 border border-warning/30">
              <Lock className="w-3 h-3 text-warning" />
              <span className="text-xs text-warning font-medium">4/5 bets to unlock</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold gradient-text">200</span>
            <span className="text-xl text-muted-foreground">CC</span>
            <span className="text-sm text-muted-foreground ml-2">available</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3 rounded-xl bg-primary text-primary-foreground font-medium"
            >
              Deposit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3 rounded-xl bg-secondary text-secondary-foreground font-medium border border-border"
            >
              Withdraw
            </motion.button>
          </div>
        </motion.div>

        {/* Streak & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-muted-foreground">Current Streak</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">7</span>
              <span className="text-muted-foreground">days</span>
            </div>
            <div className="flex gap-1 mt-3">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-orange-500" />
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Win Rate</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">67</span>
              <span className="text-muted-foreground">%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">12 wins / 18 total</p>
          </div>
        </motion.div>

        {/* Referral Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Referral Code</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Share your code and earn 50 CC for each friend who joins!
          </p>

          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border font-mono text-foreground">
              {referralCode}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                copied ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </motion.button>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Referrals</span>
              <span className="font-semibold text-foreground">3 users</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Earned</span>
              <span className="font-semibold text-success">+150 CC</span>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {[
            { icon: History, label: "Bet History", href: "#" },
            { icon: Bell, label: "Notifications", href: "#" },
            { icon: Settings, label: "Settings", href: "#" },
          ].map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="flex items-center justify-between p-4 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.a>
          ))}
        </motion.div>

        {/* Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Oracle v1.0.0 • Built for Canton Network
        </motion.p>
      </main>
    </div>
  )
}
