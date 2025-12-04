"use client"

import { motion } from "framer-motion"
import { Sparkles, TrendingUp } from "lucide-react"
import { TopNavigation, BottomNavigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { MarketCard, MarketCardHorizontal } from "@/components/market-card"
import { FunPollCard } from "@/components/fun-poll-card"
import { markets, funPolls } from "@/lib/data"

export default function HomePage() {
  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <TopNavigation />
      <BottomNavigation />

      <main className="pt-4 md:pt-24 px-4 max-w-7xl mx-auto">
        <Hero />

        {/* Trending Markets - Horizontal Scroll on Mobile */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Trending Markets</h2>
          </motion.div>

          {/* Mobile horizontal scroll */}
          <div className="md:hidden -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {markets.map((market, index) => (
                <div key={market.id} className="snap-start">
                  <MarketCardHorizontal market={market} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-4">
            {markets.map((market, index) => (
              <MarketCard key={market.id} market={market} index={index} />
            ))}
          </div>
        </section>

        {/* Daily Fun Polls */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-2"
          >
            <Sparkles className="w-5 h-5 text-warning" />
            <h2 className="text-xl font-bold text-foreground">Daily Fun</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground mb-6">
            Quick 5 CC bets • Just for fun
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {funPolls.map((poll, index) => (
              <FunPollCard key={poll.id} poll={poll} index={index} />
            ))}
          </div>
        </section>

        {/* Stats Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 md:p-8 glow-primary"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Total Volume", value: "2.4M CC" },
              { label: "Active Markets", value: "47" },
              { label: "Total Users", value: "12.8K" },
              { label: "Resolved", value: "234" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  )
}
