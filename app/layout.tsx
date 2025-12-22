import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "Oracle | Privacy-First Prediction Market",
    template: "%s | Oracle",
  },
  description:
    "The privacy-first prediction market powered by Canton Network. Trade on real-world events with CC tokens.",
  applicationName: "Oracle",
  keywords: ["prediction market", "crypto", "betting", "Canton Network", "privacy", "decentralized"],
  authors: [{ name: "Oracle Team" }],
  creator: "Oracle",
  publisher: "Oracle",
  metadataBase: new URL("https://oracle.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oracle.vercel.app",
    siteName: "Oracle",
    title: "Oracle | Privacy-First Prediction Market",
    description:
      "The privacy-first prediction market powered by Canton Network. Trade on real-world events with CC tokens.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oracle | Privacy-First Prediction Market",
    description: "The privacy-first prediction market powered by Canton Network.",
    creator: "@OracleMarket",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0f0f12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  userScalable: true, // Allow pinch zoom for accessibility
  viewportFit: "cover", // Support iOS safe areas
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
