"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    dni: number
    hodín: number
    minút: number
    sekúnd: number
  } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      let birthdayDate = new Date(currentYear, 5, 10) // Month is 0-indexed, so 5 is June

      // If this year's birthday has passed, set for next year
      if (now > birthdayDate) {
        birthdayDate = new Date(currentYear + 1, 5, 10)
      }

      const difference = birthdayDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          dni: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hodín: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minút: Math.floor((difference / 1000 / 60) % 60),
          sekúnd: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft(null)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) return <p>Je čas na oslavu!</p>

  return (
    <Card className="bg-[#E6D5C0]">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-4 text-[#2C1810]">Do Potiho narodenín zostáva:</h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div className="text-3xl font-bold text-[#6B4423]">{value}</div>
              <div className="text-sm text-[#2C1810]">{unit}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

