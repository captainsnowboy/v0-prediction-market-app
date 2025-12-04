"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, TrendingUp, Crown } from "lucide-react"
import { TopNavigation, BottomNavigation } from "@/components/navigation"
import { leaderboard } from "@/lib/data"

const tabs = ["This Week", "This Month", "All Time"]

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("This Week")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return <span className="text-muted-foreground font-medium">#{rank}</span>
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30"
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30"
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30"
      default:
        return "bg-secondary/50 border-border"
    }
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <TopNavigation />
      <BottomNavigation />

      <main className="pt-4 md:pt-24 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-2"
        >
          <Trophy className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground mb-8">
          Top traders ranked by net profit
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          {/* 2nd Place */}
          <div className="flex flex-col items-center pt-8">
            <motion.div whileHover={{ scale: 1.05 }} className="glass-card rounded-2xl p-4 text-center w-full">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-400/20 flex items-center justify-center text-3xl border-2 border-gray-400/30">
                {leaderboard[1].avatar}
              </div>
              <Medal className="w-6 h-6 mx-auto mb-1 text-gray-300" />
              <p className="font-medium text-foreground text-sm truncate">{leaderboard[1].username}</p>
              <p className="text-success font-bold">+{leaderboard[1].profit.toLocaleString()} CC</p>
            </motion.div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-2xl p-4 text-center w-full glow-primary"
            >
              <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-yellow-500/20 flex items-center justify-center text-4xl border-2 border-yellow-500/30">
                {leaderboard[0].avatar}
              </div>
              <Crown className="w-7 h-7 mx-auto mb-1 text-yellow-400" />
              <p className="font-semibold text-foreground truncate">{leaderboard[0].username}</p>
              <p className="text-success font-bold text-lg">+{leaderboard[0].profit.toLocaleString()} CC</p>
            </motion.div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center pt-12">
            <motion.div whileHover={{ scale: 1.05 }} className="glass-card rounded-2xl p-4 text-center w-full">
              <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-amber-600/20 flex items-center justify-center text-2xl border-2 border-amber-600/30">
                {leaderboard[2].avatar}
              </div>
              <Medal className="w-5 h-5 mx-auto mb-1 text-amber-600" />
              <p className="font-medium text-foreground text-sm truncate">{leaderboard[2].username}</p>
              <p className="text-success font-bold text-sm">+{leaderboard[2].profit.toLocaleString()} CC</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 border-b border-border text-sm text-muted-foreground font-medium">
            <div className="w-12">Rank</div>
            <div>Trader</div>
            <div className="text-right">Profit</div>
          </div>

          <div className="divide-y divide-border">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`grid grid-cols-[auto_1fr_auto] gap-4 p-4 items-center ${
                  entry.isCurrentUser ? "bg-primary/10 border-l-4 border-l-primary" : ""
                }`}
              >
                <div className="w-12 flex items-center justify-center">{getRankIcon(entry.rank)}</div>
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 border ${getRankStyle(entry.rank)}`}
                  >
                    {entry.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className={`font-medium truncate ${entry.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                      {entry.username}
                      {entry.isCurrentUser && <span className="ml-2 text-xs text-primary">(You)</span>}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-success font-bold">+{entry.profit.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-1">CC</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 glass-card rounded-2xl p-6 border border-primary/30 glow-primary"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Your Performance</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">#4</div>
              <div className="text-sm text-muted-foreground">Current Rank</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">+5,230</div>
              <div className="text-sm text-muted-foreground">Net Profit</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">67%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
