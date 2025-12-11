"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, TrendingUp, Check, XIcon } from "lucide-react"

interface AccuracyData {
  accuracy: number
  correct: number
  total: number
  examples: { question: string; correct: boolean }[]
}

interface CrowdAccuracyModalProps {
  isOpen: boolean
  onClose: () => void
  data: AccuracyData
  category: string
}

export function CrowdAccuracyModal({ isOpen, onClose, data, category }: CrowdAccuracyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50"
          >
            <div className="glass-card rounded-2xl p-5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Crowd Accuracy</h3>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Last 10 {category} markets: {data.correct} right, {data.total - data.correct} wrong
              </p>

              {/* Bar Chart */}
              <div className="flex items-end gap-1.5 h-32 mb-4 px-2">
                {Array.from({ length: 10 }).map((_, i) => {
                  const isCorrect = i < data.correct
                  return (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: isCorrect ? "100%" : "40%" }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className={`flex-1 rounded-t-md ${
                        isCorrect
                          ? "bg-gradient-to-t from-success/60 to-success"
                          : "bg-gradient-to-t from-destructive/40 to-destructive/60"
                      }`}
                    />
                  )
                })}
              </div>

              <div className="flex justify-center gap-4 text-xs text-muted-foreground mb-5">
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-success" />
                  Correct
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-destructive/60" />
                  Incorrect
                </span>
              </div>

              {/* Examples */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent Examples</p>
                {data.examples.map((example, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5">
                    <div className={`p-1 rounded-full ${example.correct ? "bg-success/20" : "bg-destructive/20"}`}>
                      {example.correct ? (
                        <Check className="w-3 h-3 text-success" />
                      ) : (
                        <XIcon className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                    <p className="text-sm text-foreground/80 leading-tight">{example.question}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface CrowdAccuracyBadgeProps {
  accuracy: number
  category: string
  accuracyData: AccuracyData
}

export function CrowdAccuracyBadge({ accuracy, category, accuracyData }: CrowdAccuracyBadgeProps) {
  const [showModal, setShowModal] = useState(false)
  const isGreen = accuracy >= 60

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShowModal(true)
        }}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
          isGreen
            ? "bg-success/15 text-success border border-success/30 hover:bg-success/25"
            : "bg-warning/15 text-warning border border-warning/30 hover:bg-warning/25"
        }`}
      >
        <TrendingUp className="w-2.5 h-2.5" />
        Crowd: {accuracy}%
      </motion.button>
      <CrowdAccuracyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={accuracyData}
        category={category}
      />
    </>
  )
}
