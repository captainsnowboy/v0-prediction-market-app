"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Wallet,
  Copy,
  Check,
  Flame,
  Gift,
  Settings,
  ChevronRight,
  Lock,
  TrendingUp,
  History,
  Bell,
  CheckCircle2,
  Circle,
  ExternalLink,
  Users,
  Sparkles,
  ChevronDown,
  LogOut,
} from "lucide-react"
import { TopNavigation, BottomNavigation } from "@/components/navigation"

type Tab = "overview" | "rewards" | "settings"

const tasks = [
  { id: "twitter-follow", label: "Follow @OracleCanton on X", reward: 10, type: "verify", completed: true },
  { id: "twitter-retweet", label: "Retweet launch post", reward: 10, type: "verify", completed: false },
  { id: "telegram", label: "Join Telegram", reward: 10, type: "verify", completed: true },
  { id: "first-bet", label: "Place first bet", reward: 10, type: "auto", completed: true },
  { id: "share-referral", label: "Share referral code", reward: 10, type: "verify", completed: false },
  { id: "daily-poll", label: "Complete a daily fun poll", reward: 20, type: "auto", completed: false },
]

const streakRewards = [
  { day: 1, reward: 5, unlocked: true },
  { day: 2, reward: 0, unlocked: true },
  { day: 3, reward: 10, unlocked: true },
  { day: 4, reward: 0, unlocked: true },
  { day: 5, reward: 0, unlocked: false },
  { day: 6, reward: 0, unlocked: false },
  { day: 7, reward: 25, unlocked: false },
]

export default function ProfilePage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const [totalBets, setTotalBets] = useState(0)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [pfpUrl, setPfpUrl] = useState("")
  const [email, setEmail] = useState("")
  const betsToUnlock = 5
  const referralCode = "ORACLE-7X92K"
  const currentStreak = 4
  const successfulReferrals = 3
  const maxReferrals = 20

  useEffect(() => {
    const bets = Number.parseInt(localStorage.getItem("oracle_bet_count") || "0")
    setTotalBets(bets)

    const connected = localStorage.getItem("oracle_wallet_connected") === "true"
    const address = localStorage.getItem("oracle_wallet_address") || ""
    setIsWalletConnected(connected)
    setWalletAddress(address)

    const profileComplete = localStorage.getItem("oracle_profile_complete") === "true"
    const name = localStorage.getItem("oracle_display_name") || ""
    const pfp = localStorage.getItem("oracle_pfp_url") || ""
    const savedEmail = localStorage.getItem("oracle_email") || ""
    setHasProfile(profileComplete)
    setDisplayName(name)
    setPfpUrl(pfp)
    setEmail(savedEmail)

    const handleStorageChange = () => {
      const updatedBets = Number.parseInt(localStorage.getItem("oracle_bet_count") || "0")
      setTotalBets(updatedBets)
      const connected = localStorage.getItem("oracle_wallet_connected") === "true"
      const address = localStorage.getItem("oracle_wallet_address") || ""
      setIsWalletConnected(connected)
      setWalletAddress(address)

      const profileComplete = localStorage.getItem("oracle_profile_complete") === "true"
      const name = localStorage.getItem("oracle_display_name") || ""
      const pfp = localStorage.getItem("oracle_pfp_url") || ""
      setHasProfile(profileComplete)
      setDisplayName(name)
      setPfpUrl(pfp)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleDisconnect = () => {
    localStorage.removeItem("oracle_wallet_connected")
    localStorage.removeItem("oracle_wallet_address")
    localStorage.removeItem("oracle_wallet_balance")
    localStorage.removeItem("oracle_bet_count")
    localStorage.removeItem("oracle_profile_complete")
    localStorage.removeItem("oracle_display_name")
    localStorage.removeItem("oracle_pfp_url")
    localStorage.removeItem("oracle_email")
    setIsWalletConnected(false)
    setWalletAddress("")
    setShowDropdown(false)
    window.dispatchEvent(new Event("storage"))
    window.location.href = "/"
  }

  const handleEmailSave = () => {
    localStorage.setItem("oracle_email", email)
  }

  const handleExportData = () => {
    const data = {
      walletAddress,
      displayName,
      balance: 200,
      totalBets,
      currentStreak,
      referralCode,
      successfulReferrals,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `oracle-profile-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTaskReward = tasks.reduce((acc, t) => acc + t.reward, 0)
  const earnedTaskReward = tasks.filter((t) => t.completed).reduce((acc, t) => acc + t.reward, 0)

  const maxStreakReward = 40
  const earnedStreakReward = streakRewards.filter((s) => s.unlocked).reduce((acc, s) => acc + s.reward, 0)
  const streakComplete = currentStreak >= 7

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setCopied(true)
    } catch {
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
        setCopied(true)
      }
      document.body.removeChild(textArea)
    }
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8 px-4">
      <TopNavigation />
      <BottomNavigation />

      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2 text-balance">Your Profile</h1>
          <p className="text-muted-foreground text-balance">Track your performance and manage your wallet</p>
        </motion.div>

        {isWalletConnected && !hasProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8 mb-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-warning" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Complete Your Profile</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Set up your display name and avatar to unlock your full dashboard
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Edit Profile to Unlock
            </motion.button>
          </motion.div>
        )}

        {isWalletConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 mb-6 relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {hasProfile && pfpUrl && (
                  <img
                    src={pfpUrl || "/placeholder.svg"}
                    alt={displayName}
                    className="w-12 h-12 rounded-full border-2 border-primary/30"
                  />
                )}
                <div>
                  {hasProfile && displayName && (
                    <p className="text-sm font-semibold text-foreground mb-1">{displayName}</p>
                  )}
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
                  >
                    <Wallet className="w-4 h-4" />
                    <span className="font-mono">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                    <span className="text-success">Connected</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            {showDropdown && (
              <div className="absolute top-full mt-2 right-6 w-48 glass-card rounded-xl border border-border/50 p-2 shadow-xl z-10">
                <button
                  onClick={handleDisconnect}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect Wallet
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 mb-6"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </motion.button>
          </motion.div>
        )}

        {hasProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card rounded-2xl p-1.5 mb-6 flex gap-1"
          >
            {[
              { id: "overview" as Tab, label: "Overview", icon: TrendingUp },
              { id: "rewards" as Tab, label: "Rewards", icon: Gift },
              { id: "settings" as Tab, label: "Settings", icon: Settings },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        )}

        {hasProfile && (
          <AnimatePresence mode="wait">
            {activeTab === "overview" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-2xl p-6 mb-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Balance</h2>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/30">
                      <Lock className="w-3 h-3 text-warning" />
                      <span className="text-xs text-warning font-medium">
                        {totalBets}/{betsToUnlock} bets to unlock
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold gradient-text">200</span>
                    <span className="text-xl text-muted-foreground">CC</span>
                    <span className="text-sm text-muted-foreground ml-2">available</span>
                  </div>

                  <div className="mb-4 p-3 rounded-xl bg-secondary/50 border border-border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Bonuses Locked</p>
                      <p className="text-xs text-muted-foreground">
                        Place {betsToUnlock - totalBets} more bet{betsToUnlock - totalBets !== 1 ? "s" : ""} to unlock
                        withdrawals
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-all duration-300"
                    >
                      Deposit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-3 rounded-xl bg-secondary text-secondary-foreground font-medium border border-border transition-all duration-300"
                    >
                      Withdraw
                    </motion.button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="glass-card rounded-2xl p-6 mb-6"
                  >
                    <h2 className="text-lg font-semibold text-foreground mb-4">Recent Bets</h2>
                    <div className="space-y-3">
                      {[
                        {
                          question: "Bitcoin closes above $110,000?",
                          bet: "Yes",
                          amount: 100,
                          outcome: "won",
                          payout: 161,
                        },
                        {
                          question: "ETH 2.0 fully withdrawable?",
                          bet: "No",
                          amount: 50,
                          outcome: "pending",
                          payout: 0,
                        },
                        {
                          question: "Canton daily active addresses exceed 100K?",
                          bet: "Yes",
                          amount: 75,
                          outcome: "lost",
                          payout: 0,
                        },
                      ].map((bet, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground mb-1">{bet.question}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className={bet.bet === "Yes" ? "text-success" : "text-destructive"}>{bet.bet}</span>
                              <span>•</span>
                              <span>{bet.amount} CC</span>
                            </div>
                          </div>
                          <div className="text-right">
                            {bet.outcome === "won" && (
                              <span className="text-sm font-semibold text-success">+{bet.payout - bet.amount} CC</span>
                            )}
                            {bet.outcome === "lost" && (
                              <span className="text-sm font-semibold text-destructive">-{bet.amount} CC</span>
                            )}
                            {bet.outcome === "pending" && (
                              <span className="text-xs px-2 py-1 rounded-full bg-warning/10 text-warning">Pending</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

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
                      <span className="text-3xl font-bold text-foreground">{currentStreak}</span>
                      <span className="text-muted-foreground">days</span>
                    </div>
                    <div className="flex gap-1 mt-3">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            i < currentStreak ? "bg-orange-500" : "bg-secondary"
                          }`}
                        />
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  {[
                    { icon: History, label: "Bet History", href: "#" },
                    { icon: Bell, label: "Notifications", href: "#" },
                    { icon: Settings, label: "Settings", href: "#" },
                  ].map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="flex items-center justify-between p-4 border-b border-border last:border-0 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            ) : activeTab === "rewards" ? (
              <motion.div
                key="rewards"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card rounded-2xl p-6 mb-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Flame className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Daily Streak</h2>
                        <p className="text-xs text-muted-foreground">Max 40 CC lifetime</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-bold text-orange-500">x{currentStreak}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span>
                        {earnedStreakReward}/{maxStreakReward} CC earned
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(earnedStreakReward / maxStreakReward) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                    {streakRewards.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            day.unlocked
                              ? "bg-orange-500 text-white"
                              : i === currentStreak
                                ? "bg-orange-500/20 border-2 border-orange-500 border-dashed"
                                : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {day.unlocked ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-medium">{day.day}</span>
                          )}
                        </motion.div>
                        {day.reward > 0 && (
                          <span
                            className={`text-[10px] font-medium ${day.unlocked ? "text-orange-500" : "text-muted-foreground"}`}
                          >
                            +{day.reward}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {streakComplete && (
                    <div className="mt-4 p-3 rounded-xl bg-success/10 border border-success/30 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium text-success">Streak complete! Max 40 CC earned</span>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card rounded-2xl p-6 mb-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Tasks</h2>
                        <p className="text-xs text-muted-foreground">Max 70 CC lifetime</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {completedTasks}/{tasks.length}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span>
                        {earnedTaskReward}/{totalTaskReward} CC earned
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(earnedTaskReward / totalTaskReward) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {tasks.map((task, i) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                          task.completed
                            ? "bg-success/5 border border-success/20"
                            : "bg-secondary/50 border border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                          <span
                            className={`text-sm font-medium ${task.completed ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {task.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${task.completed ? "text-success" : "text-primary"}`}>
                            +{task.reward} CC
                          </span>
                          {!task.completed && task.type === "verify" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-xs font-medium text-primary hover:bg-primary/20 transition-all duration-300"
                            >
                              <span className="flex items-center gap-1">
                                Verify <ExternalLink className="w-3 h-3" />
                              </span>
                            </motion.button>
                          )}
                          {task.completed && (
                            <span className="px-2 py-1 rounded-md bg-success/10 text-[10px] font-medium text-success">
                              Done
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card rounded-2xl p-6 mb-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Referral Program</h2>
                      <p className="text-xs text-muted-foreground">Earn 50 CC per referral</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/50 border border-border mb-4">
                    <p className="text-sm text-foreground mb-2 font-medium">
                      Invite friends and both get 50 CC after they place 5 bets!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Share your unique code below. Max {maxReferrals} referrals.
                    </p>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border font-mono text-foreground flex items-center justify-between">
                      <span>{referralCode}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCopy}
                      className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        copied ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Successful Referrals</p>
                      <p className="text-lg font-bold text-foreground">
                        {successfulReferrals}
                        <span className="text-sm text-muted-foreground font-normal">/{maxReferrals}</span>
                      </p>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                          style={{ width: `${(successfulReferrals / maxReferrals) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-success/5 border border-success/20">
                      <p className="text-xs text-muted-foreground mb-1">Total Earned</p>
                      <p className="text-lg font-bold text-success">+{successfulReferrals * 50} CC</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Max {maxReferrals * 50} CC</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card rounded-2xl p-6 mb-6"
                >
                  <h2 className="text-lg font-semibold text-foreground mb-4">Notification Settings</h2>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-foreground mb-2 block">Email for Notifications</label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleEmailSave}
                        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300"
                      >
                        Save
                      </motion.button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Receive notifications about bet outcomes and rewards
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card rounded-2xl p-6 mb-6"
                >
                  <h2 className="text-lg font-semibold text-foreground mb-4">Account Actions</h2>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleExportData}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary border border-border hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <ExternalLink className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">Export Data</p>
                          <p className="text-xs text-muted-foreground">Download your profile and bet history</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleDisconnect}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-destructive/5 border border-destructive/20 hover:bg-destructive/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                          <LogOut className="w-5 h-5 text-destructive" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-destructive">Disconnect Wallet</p>
                          <p className="text-xs text-muted-foreground">Sign out and clear profile data</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Oracle v1.0.0 - Built for Canton Network
        </motion.p>
      </div>
    </div>
  )
}
