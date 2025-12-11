"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
  rotation: number
  scale: number
}

export function useFirstBetCelebration() {
  const [showConfetti, setShowConfetti] = useState(false)

  const celebrate = useCallback(() => {
    // Check if this is the first bet
    if (typeof window !== "undefined") {
      const hasPlacedBet = localStorage.getItem("oracle_first_bet")
      if (!hasPlacedBet) {
        localStorage.setItem("oracle_first_bet", "true")
        setShowConfetti(true)

        // Play celebration sound
        playWinSound()

        setTimeout(() => setShowConfetti(false), 3000)
        return true // First bet
      }
    }
    return false // Not first bet
  }, [])

  return { showConfetti, celebrate }
}

function playWinSound() {
  if (typeof window === "undefined") return

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    // Create a pleasant ascending arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = freq
      oscillator.type = "sine"

      const startTime = audioContext.currentTime + i * 0.1
      const duration = 0.3

      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
    })
  } catch (e) {
    // Audio not supported, fail silently
  }
}

export function Confetti({ show }: { show: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (show) {
      const colors = ["#8855FF", "#0052FF", "#22c55e", "#FFD700", "#FF6B6B", "#00D4FF"]
      const newPieces: ConfettiPiece[] = []

      for (let i = 0; i < 100; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.5,
        })
      }

      setPieces(newPieces)
    } else {
      setPieces([])
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                x: `${piece.x}vw`,
                y: -20,
                rotate: 0,
                scale: piece.scale,
              }}
              animate={{
                y: "110vh",
                rotate: piece.rotation + 720,
                x: `${piece.x + (Math.random() - 0.5) * 20}vw`,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.5 + Math.random(),
                delay: piece.delay,
                ease: "easeIn",
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ backgroundColor: piece.color }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
