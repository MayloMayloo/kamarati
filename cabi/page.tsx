"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowRight } from "lucide-react"
import { CharacterQuiz } from "@/components/CharacterQuiz"
import { useState } from "react"

export default function Cabi() {
  const [quizDifficulty, setQuizDifficulty] = useState<"easy" | "normal" | "hard">("normal")

  const cabiQuizQuestions = {
    easy: [
      {
        question: "Aký šport Čabi najradšej hrá?",
        options: ["Futbal", "Basketbal", "Tenis", "Plávanie"],
        correctAnswer: 0,
      },
      {
        question: "Čo je Čabiho slabá stránka?",
        options: ["Matematika", "Písanie", "Šport", "Cestovanie"],
        correctAnswer: 0,
      },
      {
        question: "Je Čabi konfliktný?",
        options: ["Áno, aj keď je kľudný", "Nie, nikdy"],
        correctAnswer: 0,
      },
    ],
    normal: [
      {
        question: "Aký šport Čabi najradšej hrá?",
        options: ["Futbal", "Basketbal", "Tenis", "Plávanie"],
        correctAnswer: 0,
      },
      {
        question: "Čo je Čabiho slabá stránka?",
        options: ["Matematika", "Písanie", "Šport", "Cestovanie"],
        correctAnswer: 0,
      },
      {
        question: "Ktorá krajina je Čabiho obľúbenou destináciou?",
        options: ["Taliansko", "Španielsko", "Francúzsko", "Nemecko"],
        correctAnswer: 2,
      },
      {
        question: "Čo Čabi rád robí vo voľnom čase?",
        options: ["Počíta príklady", "Píše poviedky", "Rieši problémy", "Nakupuje"],
        correctAnswer: 1,
      },
      {
        question: "Aký je Čabiho postoj k riešeniu problémov?",
        options: ["Rieši ich okamžite", "Odkladá ich", "Deleguje ich", "Ignoruje ich"],
        correctAnswer: 1,
      },
      {
        question: "Ako by ste opísali Čabiho osobnosť?",
        options: ["Hlučný a agresívny", "Kľudný, ale konfliktný", "Tichý a plachý", "Energický a bezstarostný"],
        correctAnswer: 1,
      },
      {
        question: "Čo Čabi robí, keď sa dostane do problémov?",
        options: ["Čelí im priamo", "Hľadá pomoc", "Uteká", "Medituje"],
        correctAnswer: 2,
      },
    ],
    hard: [
      {
        question: "Aký je Čabiho presný plán úteku v prípade matematického testu?",
        options: ["Cez okno", "Cez zadné dvere", "Cez európske hranice", "Nemá plán"],
        correctAnswer: 2,
      },
      {
        question: "Koľko poviedok Čabi napísal o finančných katastrofách?",
        options: ["3", "7", "12", "Presne 42"],
        correctAnswer: 3,
      },
      {
        question: "Ktorý francúzsky futbalový štadión je Čabiho najobľúbenejší?",
        options: ["Parc des Princes", "Stade de France", "Stade Vélodrome", "Všetky, nemá obľúbený"],
        correctAnswer: 3,
      },
      {
        question: "Aká je Čabiho tajná technika na vyhýbanie sa počítaniu?",
        options: ["Predstiera chorobu", "Používa kalkulačku", "Rýchly beh", "Všetky vyššie uvedené"],
        correctAnswer: 3,
      },
      {
        question: "Aký je názov Čabiho pripravovanej knihy?",
        options: ["Ako sa stať futbalistom", "Ako sa vyhnúť matematike", "Môj život vo Francúzsku", "Umenie konfliktu"],
        correctAnswer: 1,
      },
      {
        question: "Koľko rôznych únikových ciest má Čabi naplánovaných?",
        options: ["5", "10", "15", "Nekonečno"],
        correctAnswer: 3,
      },
      {
        question: "Aký je Čabiho rekord v rýchlosti úteku z matematickej hodiny?",
        options: ["10 sekúnd", "5 sekúnd", "3.14 sekundy", "Rýchlejšie než učiteľ stihne povedať 'test'"],
        correctAnswer: 3,
      },
      {
        question: "Čo Čabi nosí vždy pri sebe pre prípad núdze?",
        options: ["Kalkulačku", "Mapu únikových ciest", "Francúzsky slovník", "Všetko vyššie uvedené"],
        correctAnswer: 3,
      },
      {
        question: "Aký je Čabiho najväčší životný cieľ?",
        options: [
          "Stať sa profesionálnym futbalistom",
          "Napísať bestseller",
          "Vytvoriť svet bez matematiky",
          "Založiť školu pre kľudných konfliktných ľudí",
        ],
        correctAnswer: 2,
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]">
      <header className="border-b bg-[#2C1810] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14 px-4 md:px-6">
          <Link href="/">
            <span className="text-xl font-semibold text-[#E6D5C0] hover:text-[#E6D5C0]/80">Nojpa</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-[#E6D5C0] hover:text-[#E6D5C0]/80">
                Domov
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#2C1810] to-[#6B4423]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#E6D5C0] mb-4">
                Spoznajte Čabiho
              </h1>
              <p className="max-w-[600px] text-[#E6D5C0]/90 md:text-xl mb-8">
                Športovec, spravovateľ financií a neriešiteľ problémov. Super kamos a cestovateľ!
              </p>
              <div className="relative w-64 h-64 rounded-full overflow-hidden mb-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AEhMvPTVcFA1mMtBGZKZYK9Gmymznl.png"
                  alt="Čabi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-[#E6D5C0]">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12 text-[#2C1810]">Čabiho Životná Cesta</h2>
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#6B4423] transform -translate-y-1/2" />
              <div className="relative z-10 flex justify-between items-center max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden border-4 border-[#6B4423]">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AEhMvPTVcFA1mMtBGZKZYK9Gmymznl.png"
                      alt="Čabi ako športovec"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#6B4423] text-[#E6D5C0] px-4 py-2 rounded-full">Čabi Športovec</div>
                  <p className="text-[#6B4423] text-center text-sm max-w-[200px]">
                    Kľudný futbalista a spisovateľ s talentom na písanie
                  </p>
                </div>
                <ArrowRight className="w-12 h-12 text-[#6B4423]" />
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden border-4 border-[#6B4423]">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AEhMvPTVcFA1mMtBGZKZYK9Gmymznl.png"
                      alt="Čabi ako finančník"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#6B4423] text-[#E6D5C0] px-4 py-2 rounded-full">Čabi Finančník</div>
                  <p className="text-[#6B4423] text-center text-sm max-w-[200px]">
                    Spravovateľ financií s francúzskym vplyvom a rýchlymi nohami
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-[#F5F0E8]">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-[#2C1810]">Čabiho Vlastnosti</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-[#E6D5C0] shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2 text-[#2C1810]">Kľudný Športovec</h3>
                  <p className="text-[#6B4423]">
                    Čabi je kľudný všetkými smermi. Vie hrať futbal, pekne písať a je to spisovateľ. Jeho slabá stránka
                    je matematika a počítanie, kde sa kompletne vyplaší.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#E6D5C0] shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2 text-[#2C1810]">Konfliktný Kľudáčik</h3>
                  <p className="text-[#6B4423]">
                    Čabi je veľmi kľudný ale konfliktný človek. Vie rozmýšľať rozumne, ale v niektorých prípadoch sa
                    (kamos Čabko) dokáže dosť vytočiť.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#E6D5C0] shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2 text-[#2C1810]">Majster Improvizácie</h3>
                  <p className="text-[#6B4423]">
                    Čabi vie dobre riešiť problémy vďaka svojej improvizácii a schopnosti rýchlo jednať pod tlakom.
                    Preto vie kamos utekať napríklad po ihrisku alebo z iných zariadení.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-[#F5F0E8]">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#2C1810]">Čabiho Denná Rutina</h2>
            <p className="text-[#6B4423] mb-8 max-w-2xl mx-auto">
              Namiesto riešenia problémov Čabi každé ráno trénuje svoje športové schopnosti a píše poviedky. Je to jeho
              tajomstvo k úspešnému vyhýbaniu sa matematike a počítaniu!
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#6B4423] hover:bg-[#8B5E3C] text-[#E6D5C0]">Zistite viac o Čabim</Button>
              </DialogTrigger>
              <DialogContent className="bg-[#F5F0E8] text-[#2C1810] max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Čabiho Príbeh a Budúcnosť</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <p className="text-[#6B4423]">
                    Čabi, náš športovo-finančný hrdina, nie je len spisovateľom dneška, ale aj majstrom útekov
                    zajtrajška. Od kľudného futbalistu až po konfliktného finančníka, Čabi dokazuje, že matematika a
                    počítanie nie sú pre každého!
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-bold mb-2 text-[#2C1810]">Čabiho Finančné Tipy:</h3>
                      <ul className="list-disc list-inside text-[#6B4423] space-y-2">
                        <li>Nikdy neriešiť problémy, len ich odložiť</li>
                        <li>Investovať do športového vybavenia</li>
                        <li>Písať poviedky o finančných katastrofách</li>
                        <li>Mať vždy pripravenú únikovú cestu</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-[#2C1810]">Čabiho Vízia Budúcnosti:</h3>
                      <ul className="list-disc list-inside text-[#6B4423] space-y-2">
                        <li>Cestovať po celom Francúzsku</li>
                        <li>Založiť školu pre kľudných konfliktných ľudí</li>
                        <li>Vydanie knihy "Ako sa vyhnúť matematike"</li>
                        <li>Vytvoriť mapu únikových ciest cez európske hranice</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <section className="bg-[#F5F0E8] py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#2C1810]">Na čabiho Poviedkach sa pracuje</h2>
            <Card className="max-w-2xl mx-auto bg-[#E6D5C0]">
              <CardContent className="p-6">
                <p className="text-[#6B4423] text-lg mb-4">
                  Čabi momentálne intenzívne pracuje na svojich poviedkach. Každý deň pridáva nové príbehy o svojich
                  dobrodružstvách, útekoch pred matematikou a cestách po Francúzsku.
                </p>
                <p className="text-[#6B4423] text-lg">Sledujte tento priestor pre aktualizácie a nové príbehy!</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="w-full py-12 bg-[#E6D5C0]">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-8 text-[#2C1810]">Zábava s Čabim</h2>
            <div className="space-y-4">
              <p className="text-[#6B4423] mb-4">Otestuj svoje znalosti o Čabim v našom kvíze!</p>
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  onClick={() => setQuizDifficulty("easy")}
                  variant={quizDifficulty === "easy" ? "default" : "outline"}
                  className={
                    quizDifficulty === "easy" ? "bg-[#6B4423] text-[#E6D5C0]" : "border-[#6B4423] text-[#6B4423]"
                  }
                >
                  Ľahký
                </Button>
                <Button
                  onClick={() => setQuizDifficulty("normal")}
                  variant={quizDifficulty === "normal" ? "default" : "outline"}
                  className={
                    quizDifficulty === "normal" ? "bg-[#6B4423] text-[#E6D5C0]" : "border-[#6B4423] text-[#6B4423]"
                  }
                >
                  Stredný
                </Button>
                <Button
                  onClick={() => setQuizDifficulty("hard")}
                  variant={quizDifficulty === "hard" ? "default" : "outline"}
                  className={
                    quizDifficulty === "hard" ? "bg-[#6B4423] text-[#E6D5C0]" : "border-[#6B4423] text-[#6B4423]"
                  }
                >
                  Ťažký
                </Button>
              </div>
              <CharacterQuiz questions={cabiQuizQuestions[quizDifficulty]} />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-[#2C1810] text-[#E6D5C0]">
        <div className="container flex items-center justify-between h-14 px-4 md:px-6">
          <span className="text-sm text-[#E6D5C0]/80">© 2025 Nojpa & Čabi. Všetky práva vyhradené.</span>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-[#E6D5C0]/80 hover:text-[#E6D5C0]">
              Súkromie
            </Button>
            <Button variant="ghost" size="sm" className="text-[#E6D5C0]/80 hover:text-[#E6D5C0]">
              Podmienky
            </Button>
          </nav>
        </div>
      </footer>
    </div>
  )
}

