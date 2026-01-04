"use client"

import type React from "react"

import { useState } from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Copy, Heart } from "lucide-react"
import type { Market } from "@/lib/data"
import { crowdAccuracyData } from "@/lib/data"
import { CrowdAccuracyBadge } from "./crowd-accuracy-modal"
import { LiveOdds } from "./live-odds"
import { CCLogo } from "./cc-logo"

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
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("oracle_favorites") || "[]")
      return favorites.includes(market.id)
    }
    return false
  })

  const accuracyData = crowdAccuracyData[market.id] || {
    accuracy: 70,
    correct: 7,
    total: 10,
    examples: [],
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const favorites = JSON.parse(localStorage.getItem("oracle_favorites") || "[]")
    if (isFavorite) {
      const filtered = favorites.filter((id: string) => id !== market.id)
      localStorage.setItem("oracle_favorites", JSON.stringify(filtered))
    } else {
      favorites.push(market.id)
      localStorage.setItem("oracle_favorites", JSON.stringify(favorites))
    }
    setIsFavorite(!isFavorite)
  }

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const url = `${window.location.origin}/market/${market.id}`
    navigator.clipboard.writeText(url).catch(() => {})
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
      <Link href={`/market/${market.id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(136,85,255,0.15)] relative"
          style={{ borderWidth: "1px" }}
        >
          <div className="p-5">
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={copyLink}
                className="p-2 rounded-lg bg-secondary/80 backdrop-blur-sm hover:bg-secondary transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFavorite}
                className="p-2 rounded-lg bg-secondary/80 backdrop-blur-sm hover:bg-secondary transition-colors"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                />
              </motion.button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                {market.image && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-secondary/50">
                    <img
                      src={market.image || "/placeholder.svg"}
                      alt={market.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
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
                    <LiveOdds initialPrice={market.yesPrice} type="yes" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-center"
                  >
                    <div className="text-xs text-muted-foreground mb-1">No</div>
                    <LiveOdds initialPrice={market.noPrice} type="no" />
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <CrowdAccuracyBadge
                  accuracy={accuracyData.accuracy}
                  category={market.category}
                  accuracyData={accuracyData}
                />
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CCLogo className="w-4 h-4" />
                  <span>{formatVolume(market.volume)} CC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeRemaining(market.endTime)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function MarketCardHorizontal({ market, index = 0 }: MarketCardProps) {
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("oracle_favorites") || "[]")
      return favorites.includes(market.id)
    }
    return false
  })

  const accuracyData = crowdAccuracyData[market.id] || {
    accuracy: 70,
    correct: 7,
    total: 10,
    examples: [],
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const favorites = JSON.parse(localStorage.getItem("oracle_favorites") || "[]")
    if (isFavorite) {
      const filtered = favorites.filter((id: string) => id !== market.id)
      localStorage.setItem("oracle_favorites", JSON.stringify(filtered))
    } else {
      favorites.push(market.id)
      localStorage.setItem("oracle_favorites", JSON.stringify(favorites))
    }
    setIsFavorite(!isFavorite)
  }

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const url = `${window.location.origin}/market/${market.id}`
    navigator.clipboard.writeText(url).catch(() => {})
  }

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
          className="glass-card rounded-2xl overflow-hidden cursor-pointer h-full transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_25px_rgba(136,85,255,0.12)] relative"
        >
          <div className="p-5">
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={copyLink}
                className="p-1.5 rounded-lg bg-secondary/80 backdrop-blur-sm hover:bg-secondary transition-colors"
              >
                <Copy className="w-3 h-3 text-muted-foreground" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFavorite}
                className="p-1.5 rounded-lg bg-secondary/80 backdrop-blur-sm hover:bg-secondary transition-colors"
              >
                <Heart className={`w-3 h-3 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
              </motion.button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                {market.image && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-secondary/50">
                    <img
                      src={market.image || "/placeholder.svg"}
                      alt={market.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium w-fit inline-block mb-2">
                    {market.category}
                  </span>
                  <h3 className="text-foreground font-semibold text-sm leading-tight line-clamp-2">
                    {market.question}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 bg-success/10 border border-success/20 rounded-lg px-3 py-2 text-center">
                  <div className="text-[10px] text-muted-foreground">Yes</div>
                  <LiveOdds initialPrice={market.yesPrice} type="yes" />
                </div>
                <div className="flex-1 bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 text-center">
                  <div className="text-[10px] text-muted-foreground">No</div>
                  <LiveOdds initialPrice={market.noPrice} type="no" />
                </div>
              </div>

              <div className="flex justify-center">
                <CrowdAccuracyBadge
                  accuracy={accuracyData.accuracy}
                  category={market.category}
                  accuracyData={accuracyData}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <CCLogo className="w-3.5 h-3.5" />
                  <span>{formatVolume(market.volume)} CC</span>
                </div>
                <span>{formatTimeRemaining(market.endTime)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
