"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft, Wallet, TrendingUp, CheckCircle, Sparkles } from "lucide-react"

export function OnboardingCarousel() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isWalletConnected, setIsWalletConnected] = useState(true)

  useEffect(() => {
    const walletConnected = localStorage.getItem("oracle_wallet_connected") === "true"
    setIsWalletConnected(walletConnected)

    // Show modal only if wallet is NOT connected
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
    localStorage.setItem("oracle_wallet_connected", "true")
    localStorage.setItem("oracle_wallet_balance", "200")
    localStorage.setItem("oracle_bet_count", "0")
    handleClose()
    // Trigger storage event for other components
    window.dispatchEvent(new Event("storage"))
    // Redirect to profile
    window.location.href = "/profile"
  }

  if (isWalletConnected) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[10px] z-[100]"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-[90%] md:w-[60%] h-[80%] md:h-[70%] glass-card rounded-3xl p-6 md:p-8 glow-primary flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Slides */}
              <div className="flex-1 flex flex-col overflow-auto">
                <AnimatePresence mode="wait">
                  {currentSlide === 0 && (
                    <motion.div
                      key="slide-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col items-center justify-center text-center px-4"
                    >
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 120 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mb-6"
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
                      <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Welcome to Oracle</h1>
                      <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                        The privacy-first prediction market on Canton Network. Bet on what you believe, win real CC, all
                        with complete privacy.
                      </p>
                    </motion.div>
                  )}

                  {currentSlide === 1 && (
                    <motion.div
                      key="slide-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 px-4"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">How to Place a Bet</h2>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          {[
                            { num: 1, text: "Connect wallet" },
                            { num: 2, text: "Browse markets" },
                            { num: 3, text: "Choose Yes/No + amount" },
                            { num: 4, text: "Confirm & wait for resolution" },
                          ].map((step) => (
                            <div key={step.num} className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-primary">{step.num}</span>
                              </div>
                              <p className="text-foreground font-medium pt-1">{step.text}</p>
                            </div>
                          ))}
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                          <div className="relative">
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                              <TrendingUp className="w-16 h-16 text-primary" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-success/20 border-2 border-success flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-success" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentSlide === 2 && (
                    <motion.div
                      key="slide-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col items-center justify-center text-center px-4"
                    >
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <Wallet className="w-10 h-10 text-primary" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        Connect your wallet to create a profile and start predicting
                      </h2>
                      <p className="text-muted-foreground mb-8 max-w-md">
                        Your wallet is your account – no email needed
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConnectWallet}
                          className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold"
                        >
                          Connect Wallet
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => (window.location.href = "/guide")}
                          className="flex-1 py-3 px-6 rounded-xl bg-secondary border border-border text-foreground font-semibold"
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {currentSlide === 3 && (
                    <motion.div
                      key="slide-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col items-center justify-center text-center px-4"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 to-primary/20 flex items-center justify-center mb-6">
                        <Sparkles className="w-10 h-10 text-primary" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Earn Rewards</h2>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Build daily streaks, complete tasks, and climb the leaderboard
                      </p>
                      <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-6">
                        <div className="glass-card rounded-xl p-4">
                          <div className="text-2xl mb-1">🔥</div>
                          <div className="text-sm text-muted-foreground">Streak</div>
                        </div>
                        <div className="glass-card rounded-xl p-4">
                          <div className="text-2xl mb-1">✅</div>
                          <div className="text-sm text-muted-foreground">Tasks</div>
                        </div>
                        <div className="glass-card rounded-xl p-4">
                          <div className="text-2xl mb-1">🏆</div>
                          <div className="text-sm text-muted-foreground">Leaderboard</div>
                        </div>
                      </div>
                      <div className="px-4 py-2 rounded-full bg-warning/10 border border-warning/30">
                        <span className="text-sm font-medium text-warning">Coming soon after beta</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
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
  )
}
