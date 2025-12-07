"use client"

import { motion } from "framer-motion"
import { Download, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export default function BrandPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
    } catch {
      const textArea = document.createElement("textarea")
      textArea.value = color
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
    }
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const downloadSVG = (filename: string) => {
    const link = document.createElement("a")
    link.href = `/logo/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const logos = [
    { name: "Icon (Transparent)", file: "oracle-icon.svg", preview: "/logo/oracle-icon.svg" },
    { name: "Icon (Black BG)", file: "oracle-icon-black-bg.svg", preview: "/logo/oracle-icon-black-bg.svg" },
    { name: "Full Logo (Transparent)", file: "oracle-logo-full.svg", preview: "/logo/oracle-logo-full.svg" },
    { name: "Full Logo (Black BG)", file: "oracle-logo-black-bg.svg", preview: "/logo/oracle-logo-black-bg.svg" },
    { name: "Wordmark", file: "oracle-wordmark.svg", preview: "/logo/oracle-wordmark.svg" },
  ]

  const colors = [
    { name: "Canton Blue", hex: "#0052FF", usage: "Primary brand color" },
    { name: "Canton Blue Light", hex: "#3B82F6", usage: "Gradient end, accents" },
    { name: "Background", hex: "#0f0f12", usage: "App background" },
    { name: "Pure Black", hex: "#000000", usage: "Logo backgrounds" },
    { name: "White", hex: "#FFFFFF", usage: "Text, wordmark" },
  ]

  return (
    <div className="min-h-screen bg-[#0f0f12] text-white pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Link href="/" className="inline-block mb-8">
            <Button variant="ghost" className="text-white/60 hover:text-white">
              ← Back to App
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Oracle Brand Kit</h1>
          <p className="text-white/60 text-lg">Premium Web3 assets for Canton Network</p>
        </motion.div>

        {/* Logo Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Logo Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.file}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="glass-card rounded-2xl p-6 group"
              >
                <div
                  className={`aspect-video rounded-xl mb-4 flex items-center justify-center overflow-hidden ${
                    logo.file.includes("black-bg") ? "bg-black" : "bg-[#1a1a1f]"
                  }`}
                >
                  <img
                    src={logo.preview || "/placeholder.svg"}
                    alt={logo.name}
                    className="max-w-[80%] max-h-[80%] object-contain"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{logo.name}</h3>
                    <p className="text-sm text-white/40">{logo.file}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => downloadSVG(logo.file)}
                    className="bg-[#0052FF] hover:bg-[#0052FF]/80"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Color Palette */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Color Palette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {colors.map((color, index) => (
              <motion.div
                key={color.hex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="glass-card rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => copyColor(color.hex)}
              >
                <div className="h-24 relative" style={{ backgroundColor: color.hex }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    {copiedColor === color.hex ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <Copy className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm">{color.name}</h3>
                  <p className="text-xs text-white/60 font-mono">{color.hex}</p>
                  <p className="text-xs text-white/40 mt-1">{color.usage}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Typography */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Typography</h2>
          <div className="glass-card rounded-2xl p-8">
            <div className="space-y-8">
              <div>
                <p className="text-sm text-white/40 mb-2">Primary Font</p>
                <p className="text-5xl font-bold">Inter</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-white/40 mb-2">Bold (800)</p>
                  <p className="text-2xl font-extrabold">Oracle</p>
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-2">Semibold (600)</p>
                  <p className="text-2xl font-semibold">Prediction Markets</p>
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-2">Regular (400)</p>
                  <p className="text-2xl font-normal">Privacy-first trading</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Usage Guidelines */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-2xl font-bold mb-8">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-green-400 mb-4">Do</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>• Use logo on dark backgrounds only</li>
                <li>• Maintain minimum clear space around logo</li>
                <li>• Use Canton Blue (#0052FF) as primary accent</li>
                <li>• Keep the eye icon proportional to wordmark</li>
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-red-400 mb-4">Don't</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>• Place logo on light or busy backgrounds</li>
                <li>• Rotate, skew, or distort the logo</li>
                <li>• Change the gradient colors</li>
                <li>• Add shadows or effects to the logo</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
