"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, TrendingUp } from "lucide-react"
import type { Market } from "@/lib/data"

interface MarketCardProps {
  market: Market
  index?: number
}

function formatTimeRemaining(endTime: string): string {
  const end = new Date(endTime)
  const now = new Date()
  const diff = end.getTime() - now.getTime()

  if (diff < 0) return "Ended"

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (days > 0) return `${days}d ${hours}h left`
  return `${hours}h left`
}

function formatVolume(volume: number): string {
  if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
  return volume.toString()
}

export function MarketCard({ market, index = 0 }: MarketCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
      <Link href={`/market/${market.id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="glass-card glass-card-hover rounded-2xl p-5 cursor-pointer glow-primary transition-all duration-300"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-foreground font-semibold text-base leading-tight line-clamp-2 flex-1">
                {market.question}
              </h3>
              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium shrink-0">
                {market.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 bg-success/10 border border-success/30 rounded-xl px-4 py-3 text-center"
                >
                  <div className="text-xs text-muted-foreground mb-1">Yes</div>
                  <div className="text-success font-bold text-lg">{market.yesPrice.toFixed(2)}</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-center"
                >
                  <div className="text-xs text-muted-foreground mb-1">No</div>
                  <div className="text-destructive font-bold text-lg">{market.noPrice.toFixed(2)}</div>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>{formatVolume(market.volume)} CC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{formatTimeRemaining(market.endTime)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function MarketCardHorizontal({ market, index = 0 }: MarketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="min-w-[300px] md:min-w-[340px]"
    >
      <Link href={`/market/${market.id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="glass-card glass-card-hover rounded-2xl p-5 cursor-pointer h-full"
        >
          <div className="flex flex-col gap-3">
            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium w-fit">
              {market.category}
            </span>

            <h3 className="text-foreground font-semibold text-sm leading-tight line-clamp-2 min-h-[40px]">
              {market.question}
            </h3>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-success/10 border border-success/20 rounded-lg px-3 py-2 text-center">
                <div className="text-[10px] text-muted-foreground">Yes</div>
                <div className="text-success font-bold">{market.yesPrice.toFixed(2)}</div>
              </div>
              <div className="flex-1 bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 text-center">
                <div className="text-[10px] text-muted-foreground">No</div>
                <div className="text-destructive font-bold">{market.noPrice.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span>{formatVolume(market.volume)} CC</span>
              <span>{formatTimeRemaining(market.endTime)}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
