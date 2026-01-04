"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Heart } from "lucide-react"
import { TopNavigation, BottomNavigation } from "@/components/navigation"
import { MarketCard } from "@/components/market-card"
import { markets } from "@/lib/data"

const categories = ["All", "Crypto", "Canton", "Finance", "Sports", "Politics"]

export default function MarketsPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [sortBy, setSortBy] = useState<"volume" | "time" | "newest">("volume")
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "resolving" | "resolved">("all")
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all")
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const loadFavorites = () => {
      const stored = JSON.parse(localStorage.getItem("oracle_favorites") || "[]")
      setFavorites(stored)
    }
    loadFavorites()

    // Listen for storage changes
    const handleStorage = () => {
      loadFavorites()
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const filteredMarkets = markets
    .filter((market) => {
      const matchesSearch = market.question.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === "All" || market.category === activeCategory
      const matchesTab = activeTab === "all" || favorites.includes(market.id)
      const matchesStatus = statusFilter === "all" || statusFilter === "open" // Simplified for now
      return matchesSearch && matchesCategory && matchesTab && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "volume") return b.volume - a.volume
      if (sortBy === "time") {
        return new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
      }
      // newest - sort by ID descending (assuming newer IDs are higher)
      return Number.parseInt(b.id) - Number.parseInt(a.id)
    })

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <TopNavigation />
      <BottomNavigation />

      <main className="pt-4 md:pt-24 px-4 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Markets</h1>
          <p className="text-muted-foreground">Browse and trade on prediction markets</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex gap-2 mb-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All Markets
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("favorites")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "favorites"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <Heart className={`w-4 h-4 ${activeTab === "favorites" ? "fill-current" : ""}`} />
            Favorites ({favorites.length})
          </motion.button>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search markets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground hover:bg-secondary/80 transition-colors sm:w-auto w-full"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <AnimatePresence>
              {showFilterDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 glass-card rounded-xl p-4 border border-white/10 z-20"
                >
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Sort by</h4>
                    <div className="space-y-2">
                      {(["volume", "time", "newest"] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => setSortBy(option)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            sortBy === option
                              ? "bg-primary/20 text-primary font-medium"
                              : "text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          {option === "volume" && "Volume (High to Low)"}
                          {option === "time" && "Time Left (Ending Soon)"}
                          {option === "newest" && "Newest First"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Status</h4>
                    <div className="space-y-2">
                      {(["all", "open", "resolving", "resolved"] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize ${
                            statusFilter === status
                              ? "bg-primary/20 text-primary font-medium"
                              : "text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMarkets.map((market, index) => (
            <MarketCard key={market.id} market={market} index={index} />
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-muted-foreground">
              {activeTab === "favorites" ? "No favorite markets yet" : "No markets found matching your criteria"}
            </p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
