"use client"

import { Share2 } from "lucide-react"
import { motion } from "framer-motion"

interface ShareButtonProps {
  question: string
  yesPrice: number
  noPrice: number
}

export function ShareButton({ question, yesPrice, noPrice }: ShareButtonProps) {
  const handleShare = () => {
    const tweetText = `🔮 ${question}

📊 Current Odds:
✅ YES: ${yesPrice.toFixed(2)}
❌ NO: ${noPrice.toFixed(2)}

Make your prediction on Oracle — the privacy-first prediction market on Canton Network.

#Oracle #PredictionMarket #Canton #Web3`

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(tweetUrl, "_blank", "noopener,noreferrer,width=550,height=420")
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-all"
    >
      <Share2 className="w-4 h-4" />
      <span className="text-sm font-medium">Share on X</span>
    </motion.button>
  )
}
