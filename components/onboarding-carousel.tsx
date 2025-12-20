"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft, Wallet, Sparkles, Eye, MousePointer, DollarSign } from "lucide-react"
import Link from "next/link"
import { WalletConnectModal } from "./wallet-connect-modal"

export function OnboardingCarousel() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isWalletConnected, setIsWalletConnected] = useState(true)
  const [showWalletModal, setShowWalletModal] = useState(false)

  useEffect(() => {
    const walletConnected = localStorage.getItem("oracle_wallet_connected") === "true"
    setIsWalletConnected(walletConnected)

    if (!walletConnected) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleNext = () => {
    if (currentSlide < 3) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleConnectWallet = () => {
    handleClose()
    setShowWalletModal(true)
  }

  const handleWalletConnect = (walletId: string) => {
    const fakeAddress = `capta${Math.random().toString(36).substr(2, 9)}8d1e`
    localStorage.setItem("oracle_wallet_connected", "true")
    localStorage.setItem("oracle_wallet_address", fakeAddress)
    localStorage.setItem("oracle_wallet_balance", "200")
    localStorage.setItem("oracle_bet_count", "0")
    localStorage.setItem("oracle_show_profile_edit", "true")
    window.dispatchEvent(new Event("storage"))
    window.location.href = "/profile"
  }

  if (isWalletConnected) return null

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
              onClick={handleClose}
            />

            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-[70%] max-h-[90vh] md:w-[60%] md:max-h-[70vh] glass-card rounded-[24px] p-6 md:p-8 glow-primary flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-colors z-10"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>

                <div className="flex-1 flex flex-col min-h-0">
                  <AnimatePresence mode="wait">
                    {/* Slide 1: Welcome */}
                    {currentSlide === 0 && (
                      <motion.div
                        key="slide-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col items-center justify-center text-center px-2 md:px-4"
                      >
                        <svg
                          width="80"
                          height="80"
                          viewBox="0 0 120 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mb-6 md:mb-8"
                        >
                          <defs>
                            <linearGradient id="welcomeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#0052FF" />
                              <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                            <filter id="welcomeGlow" x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>
                          <circle
                            cx="60"
                            cy="60"
                            r="56"
                            stroke="url(#welcomeGradient)"
                            strokeWidth="3"
                            fill="none"
                            filter="url(#welcomeGlow)"
                          />
                          <ellipse
                            cx="60"
                            cy="60"
                            rx="32"
                            ry="18"
                            stroke="url(#welcomeGradient)"
                            strokeWidth="2.5"
                            fill="none"
                          />
                          <circle cx="60" cy="60" r="10" fill="url(#welcomeGradient)" />
                          <circle cx="63" cy="57" r="3" fill="white" opacity="0.9" />
                        </svg>
                        <h1 className="text-2xl md:text-5xl font-bold gradient-text mb-4 md:mb-6 text-balance leading-tight">
                          Welcome to Oracle
                        </h1>
                        <p className="text-sm md:text-xl text-foreground/90 max-w-lg leading-relaxed text-balance px-2">
                          The privacy-first prediction market on Canton Network. Bet on what you believe, win real CC.
                        </p>
                      </motion.div>
                    )}

                    {/* Slide 2: How to Place a Bet */}
                    {currentSlide === 1 && (
                      <motion.div
                        key="slide-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 px-2 md:px-4 py-4 md:py-6 flex flex-col justify-center"
                      >
                        <h2 className="text-xl md:text-4xl font-bold text-foreground mb-4 md:mb-8 text-balance">
                          How to Place a Bet
                        </h2>
                        <div className="space-y-3 md:space-y-5">
                          {[
                            { num: 1, text: "Connect wallet", icon: Wallet },
                            { num: 2, text: "Browse markets", icon: Eye },
                            { num: 3, text: "Choose Yes/No + amount", icon: MousePointer },
                            { num: 4, text: "Confirm & wait", icon: DollarSign },
                          ].map((step) => (
                            <div key={step.num} className="flex items-center gap-3 md:gap-4">
                              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm md:text-lg font-bold text-primary">{step.num}</span>
                              </div>
                              <p className="text-sm md:text-lg text-foreground font-medium text-balance leading-snug">
                                {step.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Slide 3: Connect Wallet */}
                    {currentSlide === 2 && (
                      <motion.div
                        key="slide-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col items-center justify-center text-center px-2 md:px-4"
                      >
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                          <Wallet className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                        </div>
                        <h2 className="text-lg md:text-4xl font-bold text-foreground mb-3 md:mb-4 text-balance leading-tight px-2">
                          Connect your wallet to start predicting
                        </h2>
                        <p className="text-xs md:text-lg text-muted-foreground mb-4 md:mb-8 max-w-md text-balance px-2">
                          Your wallet is your account – no email needed
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full max-w-md px-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleConnectWallet}
                            className="flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm md:text-base"
                          >
                            Connect Wallet
                          </motion.button>
                          <Link href="/guide" className="flex-1" onClick={handleClose}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-2.5 md:py-3 px-4 md:px-6 rounded-xl bg-secondary border border-border text-foreground font-semibold text-sm md:text-base"
                            >
                              Learn More
                            </motion.button>
                          </Link>
                        </div>
                      </motion.div>
                    )}

                    {/* Slide 4: Earn Rewards */}
                    {currentSlide === 3 && (
                      <motion.div
                        key="slide-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col items-center justify-center text-center px-2 md:px-4"
                      >
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-500/20 to-primary/20 flex items-center justify-center mb-4 md:mb-6">
                          <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                        </div>
                        <h2 className="text-xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 text-balance">
                          Earn Rewards
                        </h2>
                        <p className="text-xs md:text-lg text-muted-foreground mb-4 md:mb-6 max-w-md text-balance px-2">
                          Build daily streaks, complete tasks, and climb the leaderboard
                        </p>
                        <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-md mb-4 md:mb-6 px-2">
                          <div className="glass-card rounded-xl p-2 md:p-4">
                            <div className="text-2xl md:text-4xl mb-1 md:mb-2">🔥</div>
                            <div className="text-xs md:text-base text-muted-foreground">Streak</div>
                          </div>
                          <div className="glass-card rounded-xl p-2 md:p-4">
                            <div className="text-2xl md:text-4xl mb-1 md:mb-2">✅</div>
                            <div className="text-xs md:text-base text-muted-foreground">Tasks</div>
                          </div>
                          <div className="glass-card rounded-xl p-2 md:p-4">
                            <div className="text-2xl md:text-4xl mb-1 md:mb-2">🏆</div>
                            <div className="text-xs md:text-base text-muted-foreground">Board</div>
                          </div>
                        </div>
                        <div className="px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-warning/10 border border-warning/30">
                          <span className="text-xs md:text-base font-medium text-warning">Coming soon after beta</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
                  <button
                    onClick={handlePrev}
                    disabled={currentSlide === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === currentSlide ? "w-6 bg-primary" : "bg-secondary"
                        }`}
                      />
                    ))}
                  </div>

                  {currentSlide < 3 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                      Get Started
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleWalletConnect}
      />
    </>
  )
}
