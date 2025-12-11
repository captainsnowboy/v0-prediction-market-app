"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LiveOddsProps {
  initialPrice: number
  type: "yes" | "no"
  size?: "sm" | "lg"
}

export function LiveOdds({ initialPrice, type, size = "sm" }: LiveOddsProps) {
  const [price, setPrice] = useState(initialPrice)
  const [isGlowing, setIsGlowing] = useState(false)

  useEffect(() => {
    const interval = setInterval(
      () => {
        // Random small fluctuation within ±0.02
        const fluctuation = (Math.random() - 0.5) * 0.04
        const newPrice = Math.max(0.01, Math.min(0.99, price + fluctuation))

        if (Math.abs(newPrice - price) > 0.005) {
          setIsGlowing(true)
          setTimeout(() => setIsGlowing(false), 600)
        }

        setPrice(newPrice)
      },
      2000 + Math.random() * 2000,
    ) // Random interval between 2-4 seconds

    return () => clearInterval(interval)
  }, [price])

  const colorClass = type === "yes" ? "text-success" : "text-destructive"
  const glowClass = type === "yes" ? "shadow-[0_0_20px_rgba(34,197,94,0.6)]" : "shadow-[0_0_20px_rgba(239,68,68,0.6)]"

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={price.toFixed(2)}
        initial={{ opacity: 0.7, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className={`${colorClass} font-bold ${size === "lg" ? "text-4xl" : "text-lg"} transition-shadow duration-300 ${isGlowing ? glowClass : ""}`}
        style={{
          textShadow: isGlowing
            ? type === "yes"
              ? "0 0 10px rgba(34,197,94,0.8)"
              : "0 0 10px rgba(239,68,68,0.8)"
            : "none",
        }}
      >
        {price.toFixed(2)}
      </motion.span>
    </AnimatePresence>
  )
}
