"use client"

import { useState } from "react"
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
} from "lucide-react"
import { TopNavigation, BottomNavigation } from "@/components/navigation"

type Tab = "profile" | "rewards"

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
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const referralCode = "ORACLE-7X92K"
  const currentStreak = 4
  const totalBets = 4
  const betsToUnlock = 5
  const successfulReferrals = 3
  const maxReferrals = 20

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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-2xl font-bold text-white">Y</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">you</h1>
              <p className="text-muted-foreground text-sm">Member since Dec 2024</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-foreground font-medium hover:border-primary/50 transition-all duration-300"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-card rounded-2xl p-1.5 mb-6 flex gap-1"
        >
          {[
            { id: "profile" as Tab, label: "Profile", icon: TrendingUp },
            { id: "rewards" as Tab, label: "Rewards", icon: Gift },
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

        <AnimatePresence mode="wait">
          {activeTab === "profile" ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Balance Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
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

              {/* Menu Items */}
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
          ) : (
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

                {/* Streak Progress */}
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

                {/* Day Rewards */}
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

                {/* Tasks Progress */}
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

                {/* Task List */}
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

                {/* Referral Code */}
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

                {/* Referral Stats */}
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
          )}
        </AnimatePresence>

        {/* Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Oracle v1.0.0 - Built for Canton Network
        </motion.p>
      </main>
    </div>
  )
}
