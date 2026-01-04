"use client"

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download } from "lucide-react"
import { FaXTwitter } from "react-icons/fa6"

interface ShareImageModalProps {
  isOpen: boolean
  onClose: () => void
  question: string
  yesPrice: number
  noPrice: number
  volume: number
}

export function ShareImageModal({ isOpen, onClose, question, yesPrice, noPrice, volume }: ShareImageModalProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  const shareToX = () => {
    const text = `Check out this prediction market on Oracle:\n\n${question}\n\nYes: ${(yesPrice * 100).toFixed(0)}% | No: ${(noPrice * 100).toFixed(0)}%\nPool: ${(volume / 1000).toFixed(1)}K CC\n\n#Oracle #PredictionMarket #Canton`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg z-[101]"
          >
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Share to X</h3>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div
                ref={canvasRef}
                className="relative bg-gradient-to-br from-[#0f0f12] via-[#1a1a24] to-[#0f0f12] border border-primary/20 rounded-xl p-8 mb-6 shadow-[0_0_40px_rgba(136,85,255,0.2)]"
              >
                {/* Oracle logo small top-left */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <svg viewBox="0 0 100 100" className="w-6 h-6">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#0052FF" strokeWidth="4" opacity="0.8" />
                    <circle cx="50" cy="35" r="8" fill="#0052FF" />
                    <path d="M 40 50 Q 50 45 60 50" stroke="#0052FF" strokeWidth="4" fill="none" />
                    <circle cx="35" cy="50" r="3" fill="#0052FF" />
                    <circle cx="65" cy="50" r="3" fill="#0052FF" />
                  </svg>
                  <span className="text-white font-bold text-sm">Oracle</span>
                </div>

                {/* Market question centered */}
                <div className="mt-12 mb-8 text-center">
                  <h4 className="text-xl md:text-2xl font-bold text-white line-clamp-3 px-4">{question}</h4>
                </div>

                {/* Large Yes/No buttons with Canton blue accents */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/40 backdrop-blur-sm rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <div className="text-sm text-blue-300 mb-2 font-medium">YES</div>
                    <div className="text-4xl font-bold text-white">{(yesPrice * 100).toFixed(0)}¢</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/40 backdrop-blur-sm rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <div className="text-sm text-red-300 mb-2 font-medium">NO</div>
                    <div className="text-4xl font-bold text-white">{(noPrice * 100).toFixed(0)}¢</div>
                  </div>
                </div>

                {/* Volume text at bottom */}
                <div className="mt-6 text-center">
                  <span className="text-white/60 text-sm">{(volume / 1000).toFixed(1)}K CC volume</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={shareToX}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white font-semibold hover:bg-black/80 transition-all"
                >
                  <FaXTwitter className="w-5 h-5" />
                  Post to X
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground hover:bg-white/5 transition-all"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
