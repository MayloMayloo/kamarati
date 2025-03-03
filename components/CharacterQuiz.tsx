"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

interface CharacterQuizProps {
  questions: Question[]
}

export function CharacterQuiz({ questions }: CharacterQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswer = () => {
    if (selectedAnswer === null) return

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizCompleted(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-[#F5F0E8] border-[#6B4423]">
      <CardHeader className="border-b border-[#6B4423]/20">
        <CardTitle className="text-2xl font-bold text-center text-[#2C1810]">Kvíz o kamarátoch</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!quizCompleted ? (
          <>
            <p className="mb-4 text-lg text-[#2C1810]">{questions[currentQuestion].question}</p>
            <RadioGroup onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))} className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#6B4423]/10">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-[#2C1810] cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              onClick={handleAnswer}
              className="w-full mt-6 bg-[#6B4423] hover:bg-[#8B5E3C] text-[#E6D5C0]"
              disabled={selectedAnswer === null}
            >
              {currentQuestion + 1 === questions.length ? "Dokončiť kvíz" : "Ďalšia otázka"}
            </Button>
          </>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-2xl font-bold text-[#2C1810]">Kvíz dokončený!</p>
            <div className="p-4 rounded-lg bg-[#6B4423]/10">
              <p className="text-xl text-[#2C1810]">
                Tvoje skóre: {score} z {questions.length}
              </p>
              <p className="text-[#6B4423]">
                {score === questions.length
                  ? "Perfektné! Si skutočný expert!"
                  : score > questions.length / 2
                    ? "Celkom dobré! Skús to znova pre lepší výsledok!"
                    : "Nevadí, skús to znova a určite sa zlepšíš!"}
              </p>
            </div>
            <Button onClick={resetQuiz} className="bg-[#6B4423] hover:bg-[#8B5E3C] text-[#E6D5C0]">
              Skúsiť znova
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

