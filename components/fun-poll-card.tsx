"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CCLogo } from "./cc-logo"
import type { FunPoll } from "@/lib/data"
import { crowdAccuracyData } from "@/lib/data"
import { CrowdAccuracyBadge } from "./crowd-accuracy-modal"

interface FunPollCardProps {
  poll: FunPoll
  index?: number
}

export function FunPollCard({ poll, index = 0 }: FunPollCardProps) {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null)
  const [votes, setVotes] = useState({ yes: poll.yesVotes, no: poll.noVotes })

  const totalVotes = votes.yes + votes.no
  const yesPercent = totalVotes > 0 ? (votes.yes / totalVotes) * 100 : 50

  const accuracyData = crowdAccuracyData[`poll-${poll.id}`] || {
    accuracy: 70,
    correct: 7,
    total: 10,
    examples: [],
  }

  const handleVote = (choice: "yes" | "no") => {
    if (voted) return
    setVoted(choice)
    setVotes((prev) => ({
      ...prev,
      [choice]: prev[choice] + 1,
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-xl p-4"
    >
      <div className="flex flex-col gap-3">
        <p className="text-foreground font-medium text-sm leading-tight">{poll.question}</p>

        {voted ? (
          <div className="space-y-2">
            <div className="relative h-8 rounded-lg overflow-hidden bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${yesPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-success/60 to-success/40"
              />
              <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-medium">
                <span className={voted === "yes" ? "text-success" : "text-muted-foreground"}>
                  Yes {yesPercent.toFixed(0)}%
                </span>
                <span className={voted === "no" ? "text-destructive" : "text-muted-foreground"}>
                  No {(100 - yesPercent).toFixed(0)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {totalVotes} votes • Your vote: {voted.toUpperCase()}
            </p>
          </div>
        ) : (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVote("yes")}
              className="flex-1 py-2 rounded-lg bg-success/10 border border-success/30 text-success text-sm font-medium hover:bg-success/20 transition-colors"
            >
              Yes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVote("no")}
              className="flex-1 py-2 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors"
            >
              No
            </motion.button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CCLogo className="w-3 h-3" />
            <span>5 CC bet</span>
          </div>
          <CrowdAccuracyBadge accuracy={accuracyData.accuracy} category="Fun Polls" accuracyData={accuracyData} />
        </div>
      </div>
    </motion.div>
  )
}
