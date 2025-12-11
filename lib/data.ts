export interface Market {
  id: string
  question: string
  yesPrice: number
  noPrice: number
  volume: number
  endTime: string
  category: string
  comments: Comment[]
}

export interface Comment {
  id: string
  username: string
  avatar: string
  text: string
  timestamp: string
}

export interface FunPoll {
  id: string
  question: string
  yesVotes: number
  noVotes: number
  endTime: string
}

export interface LeaderboardEntry {
  rank: number
  username: string
  avatar: string
  profit: number
  isCurrentUser?: boolean
}

export const markets: Market[] = [
  {
    id: "1",
    question: "Bitcoin closes above $110,000 this week?",
    yesPrice: 0.62,
    noPrice: 0.38,
    volume: 45230,
    endTime: "2025-12-08T23:59:59Z",
    category: "Crypto",
    comments: [
      {
        id: "1",
        username: "cryptoking",
        avatar: "🐋",
        text: "BTC looking strong, expecting a breakout",
        timestamp: "2h ago",
      },
      { id: "2", username: "hodler99", avatar: "💎", text: "Diamond hands prevail", timestamp: "4h ago" },
      {
        id: "3",
        username: "traderview",
        avatar: "📊",
        text: "RSI showing overbought signals though",
        timestamp: "5h ago",
      },
    ],
  },
  {
    id: "2",
    question: "ETH 2.0 fully withdrawable before July 2025?",
    yesPrice: 0.78,
    noPrice: 0.22,
    volume: 32100,
    endTime: "2025-07-01T23:59:59Z",
    category: "Crypto",
    comments: [
      { id: "1", username: "ethmaxi", avatar: "⟠", text: "Already confirmed by devs", timestamp: "1h ago" },
      { id: "2", username: "defiking", avatar: "🔥", text: "This is basically free money", timestamp: "3h ago" },
    ],
  },
  {
    id: "3",
    question: "Canton daily active addresses exceed 100K in 2025?",
    yesPrice: 0.55,
    noPrice: 0.45,
    volume: 18750,
    endTime: "2025-12-31T23:59:59Z",
    category: "Canton",
    comments: [
      { id: "1", username: "cantonbull", avatar: "🏛️", text: "Canton ecosystem growing fast", timestamp: "30m ago" },
      { id: "2", username: "defi_degen", avatar: "🎰", text: "Partnerships looking solid", timestamp: "2h ago" },
    ],
  },
  {
    id: "4",
    question: "Next Fed rate decision: 25bps or 50bps?",
    yesPrice: 0.71,
    noPrice: 0.29,
    volume: 67800,
    endTime: "2025-01-29T19:00:00Z",
    category: "Finance",
    comments: [
      {
        id: "1",
        username: "fedwatcher",
        avatar: "🏦",
        text: "Powell hinted at 25bps in last speech",
        timestamp: "45m ago",
      },
      {
        id: "2",
        username: "macro_trader",
        avatar: "📈",
        text: "Inflation data supports smaller cut",
        timestamp: "1h ago",
      },
    ],
  },
]

export const funPolls: FunPoll[] = [
  { id: "1", question: "Will BTC pump >5% today?", yesVotes: 234, noVotes: 189, endTime: "2025-12-05T23:59:59Z" },
  { id: "2", question: "Elon tweet in next 24h?", yesVotes: 456, noVotes: 123, endTime: "2025-12-05T23:59:59Z" },
  { id: "3", question: "ETH flips BTC volume today?", yesVotes: 89, noVotes: 267, endTime: "2025-12-05T23:59:59Z" },
  { id: "4", question: "Any major CEX outage today?", yesVotes: 45, noVotes: 312, endTime: "2025-12-05T23:59:59Z" },
]

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "whale_hunter", avatar: "🐋", profit: 12450 },
  { rank: 2, username: "crypto_sage", avatar: "🧙", profit: 9820 },
  { rank: 3, username: "diamond_hands", avatar: "💎", profit: 7650 },
  { rank: 4, username: "you", avatar: "👤", profit: 5230, isCurrentUser: true },
  { rank: 5, username: "trader_joe", avatar: "📊", profit: 4890 },
  { rank: 6, username: "moon_master", avatar: "🌙", profit: 3210 },
  { rank: 7, username: "hodl_king", avatar: "👑", profit: 2890 },
]

export const volumeChartData = [
  { time: "00:00", volume: 2400 },
  { time: "04:00", volume: 1398 },
  { time: "08:00", volume: 4800 },
  { time: "12:00", volume: 3908 },
  { time: "16:00", volume: 6800 },
  { time: "20:00", volume: 5200 },
  { time: "Now", volume: 7100 },
]

export const crowdAccuracyData: Record<
  string,
  {
    accuracy: number
    correct: number
    total: number
    examples: { question: string; correct: boolean }[]
  }
> = {
  "1": {
    accuracy: 72,
    correct: 7,
    total: 10,
    examples: [
      { question: "BTC closes above $100K last week?", correct: true },
      { question: "BTC breaks $105K before Dec?", correct: true },
      { question: "BTC dips below $90K this month?", correct: false },
    ],
  },
  "2": {
    accuracy: 81,
    correct: 8,
    total: 10,
    examples: [
      { question: "ETH Shanghai upgrade on time?", correct: true },
      { question: "ETH staking APY above 4%?", correct: true },
      { question: "ETH gas below 10 gwei avg?", correct: false },
    ],
  },
  "3": {
    accuracy: 68,
    correct: 7,
    total: 10,
    examples: [
      { question: "Canton TVL exceeds $1B?", correct: true },
      { question: "Canton launches mainnet Q4?", correct: true },
      { question: "Canton 50K addresses in Nov?", correct: false },
    ],
  },
  "4": {
    accuracy: 76,
    correct: 8,
    total: 10,
    examples: [
      { question: "Fed holds rates in Sept?", correct: true },
      { question: "25bps cut in November?", correct: true },
      { question: "50bps cut in December?", correct: false },
    ],
  },
  "poll-1": {
    accuracy: 65,
    correct: 6,
    total: 10,
    examples: [
      { question: "BTC pumped >5% on Monday?", correct: true },
      { question: "BTC pumped >5% last Thursday?", correct: false },
    ],
  },
  "poll-2": {
    accuracy: 85,
    correct: 9,
    total: 10,
    examples: [
      { question: "Elon tweeted last Tuesday?", correct: true },
      { question: "Elon tweeted about crypto?", correct: true },
    ],
  },
  "poll-3": {
    accuracy: 54,
    correct: 5,
    total: 10,
    examples: [
      { question: "ETH flipped BTC volume Dec 1?", correct: false },
      { question: "ETH flipped BTC volume Nov 28?", correct: true },
    ],
  },
  "poll-4": {
    accuracy: 78,
    correct: 8,
    total: 10,
    examples: [
      { question: "Binance outage last week?", correct: false },
      { question: "No major outages in Nov?", correct: true },
    ],
  },
}
