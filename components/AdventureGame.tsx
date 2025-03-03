import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GameStep {
  text: string
  choices: {
    text: string
    nextStep: string
  }[]
  isEnding?: boolean
  isSuccess?: boolean
}

const gameSteps: Record<string, GameStep> = {
  start: {
    text: "Nojpa sa zobudí v temnom lese a nevie, kde je. Čo by mal urobiť?",
    choices: [
      { text: "Ísť hľadať pomoc", nextStep: "findHelp" },
      { text: "Zostať na mieste a čakať", nextStep: "stayPut" },
    ],
  },
  findHelp: {
    text: "Nojpa sa rozhodne ísť hľadať pomoc. Po chvíli chôdze narazí na rázcestie. Ktorým smerom by mal ísť?",
    choices: [
      { text: "Ísť doľava k horám", nextStep: "mountains" },
      { text: "Ísť doprava k rieke", nextStep: "river" },
    ],
  },
  stayPut: {
    text: "Nojpa sa rozhodne zostať na mieste. Po hodine čakania začuje zvuk v kríkoch. Čo urobí?",
    choices: [
      { text: "Schovať sa", nextStep: "hide" },
      { text: "Zavolať 'Haló?'", nextStep: "callOut" },
    ],
  },
  mountains: {
    text: "Nojpa príde k horám a nájde jaskyňu. V jaskyni stretne medveďa, ktorý ho napadne. Nojpa, žiaľ, neprežije toto stretnutie.",
    choices: [{ text: "Hrať znova", nextStep: "start" }],
    isEnding: true,
    isSuccess: false,
  },
  river: {
    text: "Nojpa príde k rieke a pokúsi sa ju preplávať. Žiaľ, prúd je príliš silný a Nojpa sa utopí.",
    choices: [{ text: "Hrať znova", nextStep: "start" }],
    isEnding: true,
    isSuccess: false,
  },
  hide: {
    text: "Nojpa sa schová za strom. Z kríkov vyjde vlk, ktorý ho zacíti a zaútočí. Nojpa, bohužiaľ, nemá šancu uniknúť.",
    choices: [{ text: "Hrať znova", nextStep: "start" }],
    isEnding: true,
    isSuccess: false,
  },
  callOut: {
    text: "Nojpa zavolá 'Haló?'. Z kríkov vyskočí zajac, ktorý sa zľakne a utečie. Nojpa sa rozosmeje a uvedomí si, že domov je hneď za ďalším kopcom. Úspech!",
    choices: [{ text: "Hrať znova", nextStep: "start" }],
    isEnding: true,
    isSuccess: true,
  },
}

export function AdventureGame() {
  const [currentStep, setCurrentStep] = useState<string>("start")
  const [history, setHistory] = useState<string[]>([])

  const handleChoice = (nextStep: string) => {
    if (nextStep === "start") {
      setHistory([])
    } else {
      setHistory([...history, currentStep])
    }
    setCurrentStep(nextStep)
  }

  const step = gameSteps[currentStep]

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#F5F0E8] border-[#6B4423]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-[#2C1810]">
          Nojpovo Nebezpečné Dobrodružstvo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          {history.map((stepId, index) => (
            <div key={index} className="mb-4">
              <p className="text-[#6B4423] opacity-75">{gameSteps[stepId].text}</p>
            </div>
          ))}
          <div
            className={`mb-4 ${step.isEnding ? (step.isSuccess ? "text-green-600" : "text-red-600") : "text-[#6B4423]"}`}
          >
            <p className="text-lg font-medium">{step.text}</p>
          </div>
        </ScrollArea>
        <div className="flex flex-col space-y-2 mt-4">
          {step.choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => handleChoice(choice.nextStep)}
              className={`${
                choice.nextStep === "start" ? "bg-[#8B5E3C] hover:bg-[#6B4423]" : "bg-[#6B4423] hover:bg-[#8B5E3C]"
              } text-[#E6D5C0]`}
            >
              {choice.text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

