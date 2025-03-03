"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles } from "lucide-react"

export function PolishingGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "complete">("intro")
  const [isMobile, setIsMobile] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isPolishingRef = useRef(false)
  const lastPolishPosition = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const startGame = () => {
    setGameState("playing")

    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Create a radial gradient for more depth
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2,
        )
        gradient.addColorStop(0, "#8B4513")
        gradient.addColorStop(1, "#654321")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI)
        ctx.fill()
        ctx.globalCompositeOperation = "destination-out"
      }
    }
  }

  const handlePolishStart = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== "playing") return
    isPolishingRef.current = true
    handlePolish(event)
  }

  const handlePolishEnd = () => {
    isPolishingRef.current = false
    lastPolishPosition.current = null
  }

  const handlePolish = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== "playing" || !isPolishingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    let x, y
    if (event.type.startsWith("touch")) {
      const touch = (event as React.TouchEvent).touches[0]
      x = touch.clientX - rect.left
      y = touch.clientY - rect.top
    } else {
      x = (event as React.MouseEvent).clientX - rect.left
      y = (event as React.MouseEvent).clientY - rect.top
    }

    const ctx = canvas.getContext("2d")
    if (ctx) {
      // If we have a last position, draw a line between points for smoother effect
      if (lastPolishPosition.current) {
        const { x: lastX, y: lastY } = lastPolishPosition.current
        const dx = x - lastX
        const dy = y - lastY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const steps = Math.max(1, Math.floor(distance / 5))

        for (let i = 0; i <= steps; i++) {
          const px = lastX + (dx * i) / steps
          const py = lastY + (dy * i) / steps

          // Main eraser
          ctx.beginPath()
          ctx.arc(px, py, 40, 0, 2 * Math.PI)
          ctx.fill()

          // Shine effect
          ctx.globalCompositeOperation = "source-over"
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, 40)
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(px, py, 40, 0, 2 * Math.PI)
          ctx.fill()
          ctx.globalCompositeOperation = "destination-out"
        }
      } else {
        // Single point polish
        ctx.beginPath()
        ctx.arc(x, y, 40, 0, 2 * Math.PI)
        ctx.fill()

        // Shine effect
        ctx.globalCompositeOperation = "source-over"
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, 40, 0, 2 * Math.PI)
        ctx.fill()
        ctx.globalCompositeOperation = "destination-out"
      }

      lastPolishPosition.current = { x, y }

      // Check completion
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      let polishedPixels = 0
      let totalPixelsInCircle = 0

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = canvas.width / 2 - 10

      for (let i = 0; i < pixels.length; i += 4) {
        const px = (i / 4) % canvas.width
        const py = Math.floor(i / 4 / canvas.width)
        const distance = Math.sqrt(Math.pow(px - centerX, 2) + Math.pow(py - centerY, 2))

        if (distance <= radius) {
          totalPixelsInCircle++
          if (pixels[i + 3] === 0) {
            polishedPixels++
          }
        }
      }

      if (polishedPixels / totalPixelsInCircle >= 0.92) {
        setGameState("complete")
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-[#2C1810]">Vylešti Potiho Hlavu!</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {gameState === "intro" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="relative w-[300px] h-[300px] mx-auto rounded-full overflow-hidden group cursor-pointer">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BF9FA727A-3C4F-472E-9E40-0A1609F886DC%7D-fNeKg9vVdsxi9AO3yt0CTRA8kGmdrj.png"
                  alt="Poti čaká na leštenie"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/40">
                  <div className="text-center px-4">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-white animate-pulse" />
                    <p className="text-white text-xl font-bold">Poti potrebuje tvoju pomoc s leštením!</p>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-4">
                <p className="text-[#6B4423]">
                  {isMobile ? "Ťahaj prstom" : "Použi myš"} po Potiho hlave a vylešti ju do dokonalého lesku!
                </p>
                <Button onClick={startGame} className="bg-[#6B4423] hover:bg-[#8B5E3C] text-[#E6D5C0] animate-bounce">
                  Začať Leštenie
                </Button>
              </div>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="mx-auto cursor-pointer rounded-full"
                onMouseDown={handlePolishStart}
                onMouseMove={handlePolish}
                onMouseUp={handlePolishEnd}
                onMouseLeave={handlePolishEnd}
                onTouchStart={handlePolishStart}
                onTouchMove={handlePolish}
                onTouchEnd={handlePolishEnd}
              />
            </motion.div>
          )}

          {gameState === "complete" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 text-center"
            >
              <div className="p-4 rounded-lg bg-green-100 text-green-800">
                <h3 className="text-xl font-bold mb-2">DOKONALÉ! 🌟</h3>
                <p>Potiho hlava sa leskne ako zrkadlo! Si majster leštič!</p>
              </div>
              <Button onClick={() => setGameState("intro")} className="bg-[#6B4423] hover:bg-[#8B5E3C] text-[#E6D5C0]">
                Hrať Znova
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

