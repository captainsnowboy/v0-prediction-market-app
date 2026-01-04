"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, MessageCircle, Check, Loader2, Copy, Heart } from "lucide-react"
import { TopNavigation, BottomNavigation } from "@/components/navigation"
import { VolumeChart } from "@/components/volume-chart"
import { markets } from "@/lib/data"
import { Slider } from "@/components/ui/slider"
import { Confetti, useFirstBetCelebration } from "@/components/confetti"
import { ShareImageModal } from "@/components/share-image-modal"
import { LiveOdds } from "@/components/live-odds"
import { MarketCard } from "@/components/market-card"
import { CCLogo } from "@/components/cc-logo"

export default function MarketDetailPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const market = markets.find((m) => m.id === id)

  const [selectedSide, setSelectedSide] = useState<"yes" | "no" | null>(null)
  const [betAmount, setBetAmount] = useState(100)
  const [isPlacing, setIsPlacing] = useState(false)
  const [betPlaced, setBetPlaced] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window !== "undefined" && market) {
      const favorites = JSON.parse(localStorage.getItem("oracle_favorites") || "[]")
      return favorites.includes(market.id)
    }
    return false
  })

  const { showConfetti, celebrate } = useFirstBetCelebration()

  if (!market) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Market not found</p>
      </div>
    )
  }

  const selectedPrice = selectedSide === "yes" ? market.yesPrice : market.noPrice
  const potentialPayout = selectedSide ? (betAmount / selectedPrice).toFixed(2) : "0.00"

  const handlePlaceBet = async () => {
    if (!selectedSide) return
    setIsPlacing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsPlacing(false)
    setBetPlaced(true)

    celebrate()

    setTimeout(() => setBetPlaced(false), 3000)
  }

  const formatTimeRemaining = (endTime: string) => {
    const end = new Date(endTime)
    const now = new Date()
    const diff = end.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    return days > 0 ? `${days}d ${hours}h remaining` : `${hours}h remaining`
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("oracle_favorites") || "[]")
    if (isFavorite) {
      const filtered = favorites.filter((fid: string) => fid !== market.id)
      localStorage.setItem("oracle_favorites", JSON.stringify(filtered))
    } else {
      favorites.push(market.id)
      localStorage.setItem("oracle_favorites", JSON.stringify(favorites))
    }
    setIsFavorite(!isFavorite)
  }

  const copyLink = () => {
    const url = `${window.location.origin}/market/${market.id}`
    navigator.clipboard.writeText(url).catch(() => {})
  }

  const relatedMarkets = markets.filter((m) => m.category === market.category && m.id !== market.id).slice(0, 3)

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <Confetti show={showConfetti} />
      <ShareImageModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        question={market.question}
        yesPrice={market.yesPrice}
        noPrice={market.noPrice}
        volume={market.volume}
      />

      <TopNavigation />
      <BottomNavigation />

      <main className="pt-4 md:pt-24 px-4 max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Markets</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden mb-6 glow-primary"
        >
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              {market.image && (
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-secondary/50">
                  <img
                    src={market.image || "/placeholder.svg"}
                    alt={market.category}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                    {market.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsShareModalOpen(true)}
                      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyLink}
                      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Copy className="w-4 h-4 text-foreground" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleFavorite}
                      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                    </motion.button>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{formatTimeRemaining(market.endTime)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-pretty">{market.question}</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSide("yes")}
                className={`relative p-6 rounded-2xl border-2 transition-all ${
                  selectedSide === "yes"
                    ? "bg-success/20 border-success glow-success"
                    : "bg-success/5 border-success/30 hover:bg-success/10"
                }`}
              >
                <div className="text-sm text-muted-foreground mb-1">Yes</div>
                <div className="mb-2">
                  <LiveOdds initialPrice={market.yesPrice} type="yes" size="lg" />
                </div>
                <div className="text-xs text-muted-foreground">
                  +{((1 / market.yesPrice - 1) * 100).toFixed(0)}% potential
                </div>
                {selectedSide === "yes" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-success flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-success-foreground" />
                  </motion.div>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSide("no")}
                className={`relative p-6 rounded-2xl border-2 transition-all ${
                  selectedSide === "no"
                    ? "bg-destructive/20 border-destructive glow-destructive"
                    : "bg-destructive/5 border-destructive/30 hover:bg-destructive/10"
                }`}
              >
                <div className="text-sm text-muted-foreground mb-1">No</div>
                <div className="mb-2">
                  <LiveOdds initialPrice={market.noPrice} type="no" size="lg" />
                </div>
                <div className="text-xs text-muted-foreground">
                  +{((1 / market.noPrice - 1) * 100).toFixed(0)}% potential
                </div>
                {selectedSide === "no" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-destructive flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-destructive-foreground" />
                  </motion.div>
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {selectedSide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Bet Amount</span>
                    <span className="text-lg font-bold text-foreground">{betAmount} CC</span>
                  </div>

                  <Slider
                    value={[betAmount]}
                    onValueChange={(value) => setBetAmount(value[0])}
                    min={50}
                    max={10000}
                    step={50}
                    className="py-4"
                  />

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Min: 50 CC</span>
                    <span>Max: 10,000 CC</span>
                  </div>

                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Potential Payout</span>
                      <span className="text-xl font-bold text-foreground">{potentialPayout} CC</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Profit if {selectedSide}</span>
                      <span className="text-lg font-semibold text-success">
                        +{(Number.parseFloat(potentialPayout) - betAmount).toFixed(2)} CC
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handlePlaceBet}
                    disabled={isPlacing || betPlaced}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                      betPlaced
                        ? "bg-success text-success-foreground"
                        : "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40"
                    } disabled:opacity-70`}
                  >
                    {isPlacing ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Placing Bet...
                      </span>
                    ) : betPlaced ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" />
                        Bet Placed!
                      </span>
                    ) : (
                      `Place ${selectedSide?.toUpperCase()} Bet`
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <CCLogo className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-foreground">Pool</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{(market.volume / 1000).toFixed(1)}K</div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">1,247</div>
              <div className="text-sm text-muted-foreground">Traders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">8.2K</div>
              <div className="text-sm text-muted-foreground">Bets</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <VolumeChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Comments</h2>
            <span className="text-sm text-muted-foreground">({market.comments.length})</span>
          </div>

          <div className="space-y-4">
            {market.comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex gap-3 p-4 rounded-xl bg-secondary/50"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg shrink-0">
                  {comment.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{comment.username}</span>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
              >
                Post
              </motion.button>
            </div>
          </div>
        </motion.div>

        {relatedMarkets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Related Markets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedMarkets.map((relatedMarket, index) => (
                <MarketCard key={relatedMarket.id} market={relatedMarket} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
