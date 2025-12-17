"use client"

import { motion } from "framer-motion"
import { TopNavigation, BottomNavigation } from "@/components/navigation"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "What is Oracle?",
    answer:
      "Oracle is a privacy-first prediction market on Canton Network where you can bet on real-world events using CC tokens. Make predictions on crypto prices, technology adoption, and more.",
  },
  {
    question: "How do I get started?",
    answer:
      "Connect your wallet to create an account. You'll receive 200 CC as a beta bonus to start betting. Browse markets, choose Yes or No, set your amount, and confirm your bet.",
  },
  {
    question: "What are CC tokens?",
    answer:
      "CC (Canton Credits) are the native tokens used for betting on Oracle. They're tied to real value and can be withdrawn after placing 5 bets.",
  },
  {
    question: "How does betting work?",
    answer:
      "Each market has Yes/No options with dynamic odds. Place your bet, and if your prediction is correct when the market resolves, you'll win based on the odds at the time you bet.",
  },
  {
    question: "When can I withdraw?",
    answer:
      "New users must place 5 bets to unlock withdrawals. This prevents abuse and ensures real engagement with the platform.",
  },
  {
    question: "How do rewards work?",
    answer:
      "Earn bonus CC through daily streaks (up to 40 CC), completing tasks (up to 70 CC), and referring friends (50 CC per referral). Climb the leaderboard for recognition.",
  },
  {
    question: "Is Oracle safe?",
    answer:
      "Oracle is built on Canton Network with privacy-first principles. Your wallet is your account—no email or personal data required. Smart contracts handle all bets transparently.",
  },
  {
    question: "What is Canton Network?",
    answer:
      "Canton Network is a privacy-focused blockchain designed for institutional-grade applications. It enables secure, private transactions while maintaining transparency where needed.",
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors"
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-muted-foreground">{answer}</p>
      </motion.div>
    </motion.div>
  )
}

export default function GuidePage() {
  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <TopNavigation />
      <BottomNavigation />

      <main className="pt-4 md:pt-24 px-4 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Guide & FAQs</h1>
          <p className="text-muted-foreground mb-8">Everything you need to know about Oracle prediction markets</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mt-8 text-center"
        >
          <h2 className="text-xl font-bold text-foreground mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">Join our community for support</p>
          <div className="flex gap-3 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="px-6 py-2 rounded-lg bg-primary text-white font-medium"
            >
              Join Discord
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="px-6 py-2 rounded-lg bg-secondary border border-border text-foreground font-medium"
            >
              Join Telegram
            </motion.a>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
