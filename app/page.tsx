"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowRight, Bell, ShoppingBag } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CharacterQuiz } from "@/components/CharacterQuiz"
import { PolishingGame } from "@/components/PolishingGame"
import { BirthdayCountdown } from "@/components/BirthdayCountdown"
import { AdventureGame } from "@/components/AdventureGame"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { NojpaStore } from "@/components/NojpaStore"

export default function Home() {
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [quizDifficulty, setQuizDifficulty] = useState<"easy" | "normal" | "hard">("normal")
  const [showSecretInput, setShowSecretInput] = useState(false)
  const [secretPassword, setSecretPassword] = useState("")
  const [jozkoUnlocked, setJozkoUnlocked] = useState(false)
  const secretInputRef = useRef<HTMLInputElement>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [isStoreOpen, setIsStoreOpen] = useState(false)

  useEffect(() => {
    let typedKeys = ""
    const handleKeyDown = (e: KeyboardEvent) => {
      typedKeys += e.key
      if (typedKeys.endsWith("8589")) {
        setShowSecretInput(true)
        setTimeout(() => {
          secretInputRef.current?.focus()
        }, 0)
      }
      // Reset after 1 second of no typing
      setTimeout(() => {
        typedKeys = ""
      }, 1000)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (secretPassword === "jozkojemojkamos") {
      setJozkoUnlocked(true)
      setShowSecretInput(false)
      setSecretPassword("")
    }
  }, [secretPassword])

  const friendsInfo = {
    nojpa: {
      name: "Nojpa",
      description: "Priateľský troll s veľkými ušami a ešte väčším srdcom.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Bn5i42E28iRCxtdr2cSlWMp8O4sNfh.png",
      color: "from-[#2C1810] to-[#6B4423]",
      buttonText: "Vybrať Nojpu",
    },
    poti: {
      name: "Poti",
      description: "Extrémne holohlavý kamarát s lesklou hlavou a veľkým srdcom.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BF9FA727A-3C4F-472E-9E40-0A1609F886DC%7D-fNeKg9vVdsxi9AO3yt0CTRA8kGmdrj.png",
      color: "from-[#2C1810] to-[#6B4423]",
      buttonText: "Vybrať Potiho",
    },
    hutis: {
      name: "Hutís",
      description: "Nízkorozpočtový Spider-Man a študent Avengers školy s talentom na kreslenie.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KKYvoY3XmYap74SGffbzC9p7QkMPXy.png",
      color: "from-[#2C1810] to-[#6B4423]",
      buttonText: "Vybrať Hutísa",
    },
    cabi: {
      name: "Čabi",
      description: "Športovec, spisovateľ a finančník s francúzskym vplyvom. Kľudný, ale občas konfliktný.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AEhMvPTVcFA1mMtBGZKZYK9Gmymznl.png",
      color: "from-[#2C1810] to-[#6B4423]",
      buttonText: "Vybrať Čabiho",
    },
    ladis: {
      name: "Ladís",
      description: "ABSOLÚTNA LEGENDA, ktorá inšpiruje všetkých okolo seba!",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Obr%C3%A1zok%20WhatsApp%202025-02-25%20o%C2%A019.11.31_6cc6b9fd.jpg-t0CqdkGvoY3z4z4DnMowMvGGrxqRoU.jpeg",
      color: "from-[#2C1810] to-[#6B4423]",
      buttonText: "Vybrať Ladísa",
    },
    jozko: {
      name: "Jožko",
      description: "Jožko je môj kamoš",
      image: "/placeholder.svg?height=400&width=400",
      color: "from-[#2C1810] to-[#6B4423]",
      buttonText: "Vybrať Jožka",
    },
  }

  const updateLogs = [
    {
      updates: [
        "Pridaný nový kamarát Ladís",
        "Spustený Nojpov oficiálny merch obchod",
        "Pridaná sekcia 'Na čabiho Poviedkach sa pracuje'",
      ],
    },
    {
      updates: [
        "Pridaná sekcia 'Naši Kamaráti' na hlavnej stránke",
        "Aktualizované podmienky používania",
        "Zmenený copyright rok na 2025",
      ],
    },
    {
      updates: ["Pridaný nový kamarát Hutís", "Vylepšená responzívnosť dizajnu"],
    },
    {
      updates: ["Spustená webová stránka Nojpa a Kamaráti", "Predstavení kamaráti Nojpa a Poti"],
    },
  ]

  const nojpaQuizQuestions = {
    easy: [
      {
        question: "Aké sú Nojpove najvýraznejšie črty?",
        options: ["Veľké uši", "Dlhé vlasy", "Veľký nos", "Vysoká postava"],
        correctAnswer: 0,
      },
      { question: "Akej farby má Nojpa čiapku?", options: ["Modrý", "Zelený", "Hnedý", "Červený"], correctAnswer: 2 },
      { question: "Je Nojpa troll?", options: ["Áno", "Nie"], correctAnswer: 0 },
    ],
    normal: [
      {
        question: "Aké sú Nojpove najvýraznejšie črty?",
        options: ["Veľké uši", "Dlhé vlasy", "Veľký nos", "Vysoká postava"],
        correctAnswer: 0,
      },
      { question: "Čo je Nojpa zač?", options: ["Elf", "Troll", "Človek", "Trpaslík"], correctAnswer: 1 },
      {
        question: "Aká je Nojpova najlepšia vlastnosť?",
        options: ["Rýchlosť", "Sila", "Schopnosť počúvať", "Magické schopnosti"],
        correctAnswer: 2,
      },
      {
        question: "Kde Nojpa najradšej trávi čas?",
        options: ["V lese", "V meste", "Pri vode", "V jaskyni"],
        correctAnswer: 0,
      },
      {
        question: "Aký je Nojpov obľúbený nápoj?",
        options: ["Káva", "Čaj", "Mlieko", "Lesná šťava"],
        correctAnswer: 3,
      },
      { question: "Koľko rokov má Nojpa?", options: ["10", "50", "100", "1000"], correctAnswer: 2 },
      {
        question: "Aké je Nojpovo obľúbené ročné obdobie?",
        options: ["Jar", "Leto", "Jeseň", "Zima"],
        correctAnswer: 1,
      },
    ],
    hard: [
      {
        question: "Aký je presný odtieň Nojpovej kože?",
        options: ["Svetlohnedá", "Tmavohnedá", "Olivová", "Sivozelená"],
        correctAnswer: 1,
      },
      { question: "Koľko chlpov má Nojpa na ľavom uchu?", options: ["1337", "420", "69", "0"], correctAnswer: 2 },
      {
        question: "Aké je Nojpovo obľúbené jedlo?",
        options: ["Hubová polievka", "Lesné plody", "Malinový koláč", "Všetko vyššie uvedené"],
        correctAnswer: 3,
      },
      {
        question: "Ktorý hudobný nástroj Nojpa ovláda?",
        options: ["Flauta", "Bubon", "Harfa", "Didgeridoo"],
        correctAnswer: 1,
      },
      {
        question: "Aký je Nojpov životný cieľ?",
        options: ["Stať sa kráľom trollov", "Nájsť poklad", "Chrániť les", "Naučiť sa lietať"],
        correctAnswer: 2,
      },
      {
        question: "Ktoré zviera je Nojpovým najlepším priateľom?",
        options: ["Sova", "Medveď", "Jeleň", "Veverička"],
        correctAnswer: 0,
      },
      {
        question: "Aký je Nojpov obľúbený spôsob cestovania?",
        options: ["Chôdza", "Lietanie na vtákoch", "Teleportácia", "Plávanie"],
        correctAnswer: 1,
      },
      { question: "Koľko jazykov Nojpa ovláda?", options: ["1", "3", "5", "7"], correctAnswer: 3 },
      { question: "Aký je Nojpov najväčší strach?", options: ["Tma", "Výšky", "Oheň", "Samota"], correctAnswer: 2 },
    ],
  }

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
      {
        question: "Kto sedem krát postrelil Čabiho vo Francúzsku?",
        options: ["Nojpa", "Hutís", "Majéť", "Fazúľ"],
        correctAnswer: 3,
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
      {
        question: "Kto sedem krát postrelil Čabiho vo Francúzsku?",
        options: ["Nojpa", "Hutís", "Majéť", "Fazúľ"],
        correctAnswer: 3,
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
      {
        question: "Kto sedem krát postrelil Čabiho vo Francúzsku?",
        options: ["Nojpa", "Hutís", "Majéť", "Fazúľ"],
        correctAnswer: 3,
      },
    ],
  }

  const renderFriendContent = useCallback(() => {
    switch (selectedFriend) {
      case "nojpa":
        return (
          <div className="space-y-8">
            <section className="bg-gradient-to-b from-[#2C1810] to-[#6B4423] py-12 md:py-20">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-1/2 space-y-4 text-center md:text-left">
                    <Badge variant="secondary" className="inline-block bg-[#8B5E3C] text-[#E6D5C0]">
                      Spoznaj Svojho Nového Kamaráta
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#E6D5C0]">Objav Nojpu: Priateľského Trolla</h1>
                    <p className="text-xl text-[#E6D5C0]/90">
                      Jedinečný troll s veľkými ušami a srdcom zo zlata. Malý vzrastom, ale veľký osobnosťou!
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="lg" className="bg-[#6B4423] hover:bg-[#8B5E3C] text-[#E6D5C0]">
                          Dozvedieť sa viac
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#F5F0E8] text-[#2C1810]">
                        <DialogHeader>
                          <DialogTitle>Vitaj! Ja som Nojpa</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="relative h-60 w-full">
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8WmjoSSRUxHZsNQGQOVnPilzGui4y1.png"
                              alt="Nojpa sa predstavuje"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="text-[#6B4423]">
                            Čau! Som Nojpa, tvoj nový kámoš s ušiskami ako satelity a srdcom väčším než Everest. Možno
                            nie som najvyšší v partii, ale som expert na počúvanie a vždy pripravený na nové
                            dobrodružstvá! Poď so mnou objavovať svet, budeme spolu tak cool, že aj ľadovce začnú
                            závidieť!
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="md:w-1/2 mt-8 md:mt-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Bn5i42E28iRCxtdr2cSlWMp8O4sNfh.png"
                      alt="Nojpa"
                      width={400}
                      height={400}
                      className="mx-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#E6D5C0] py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#2C1810]">Nojpove Špeciálne Vlastnosti</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Veľké Priateľské Uši</h3>
                      <p className="text-[#6B4423]">Dokonalé na počúvanie všetkých vašich príbehov a dobrodružstiev</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Kompaktná Veľkosť</h3>
                      <p className="text-[#6B4423]">
                        Malý, ale mocný, Nojpa dokazuje, že dobré veci prichádzajú v malých baleniach
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Ľudský Vzhľad</h3>
                      <p className="text-[#6B4423]">Priateľská tvár, ktorá spája svet trollov a ľudí</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-6 text-center">
                  <Card className="bg-[#F5F0E8] inline-block">
                    <CardContent className="p-6">
                      <p className="text-[#6B4423] italic">
                        (Poznámka: Nojpa občas podlieha záchvatom hnevu. Prosím, buďte opatrní.)
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section className="bg-[#F5F0E8] py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#2C1810]">Galéria Nojpu</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex justify-center">
                    <div className="relative w-64 h-64 rounded-lg overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cffiWWceBaLfQMIZTvkDxS0VyywIJP.png"
                        alt="Nojpa zozadu"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-64 h-64 rounded-lg overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8WmjoSSRUxHZsNQGQOVnPilzGui4y1.png"
                        alt="Nojpa počúva"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-64 h-64 rounded-lg overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L8Yc0NkprCMJi7BzMubWEwDTZBqVA2.png"
                        alt="Nojpa s čiapkou"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#E6D5C0] py-12">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-[#2C1810]">Zábava s Nojpom</h2>
                <div className="space-y-4">
                  <div className="flex justify-center space-x-4"></div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-[#6B4423] hover:bg-[#8B5E3C] text-[#E6D5C0]">
                        Hrať Nojpov Kvíz
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#F5F0E8] text-[#2C1810] max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Nojpov Kvíz</DialogTitle>
                      </DialogHeader>
                      <CharacterQuiz questions={nojpaQuizQuestions[quizDifficulty]} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>
            <section className="bg-[#F5F0E8] py-12">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-[#2C1810]">Nojpovo Dobrodružstvo</h2>
                <AdventureGame />
              </div>
            </section>
          </div>
        )
      case "poti":
        return (
          <div className="space-y-8">
            <section className="bg-gradient-to-b from-[#2C1810] to-[#6B4423] py-12 md:py-20">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-[#E6D5C0] mb-4">Spoznajte Potiho</h1>
                <p className="text-xl text-[#E6D5C0]/90 mb-8">
                  Náš extrémne holohlavý kamarát s lesklou hlavou a veľkým srdcom!
                </p>
                <div className="flex justify-center items-center space-x-8">
                  <div className="text-center">
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden border-4 border-[#E6D5C0] mx-auto">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BF9FA727A-3C4F-472E-9E40-0A1609F886DC%7D-fNeKg9vVdsxi9AO3yt0CTRA8kGmdrj.png"
                        alt="Poti v roku 2025"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-[#E6D5C0] text-[#2C1810] px-4 py-2 rounded-full mt-4">Poti 2025</div>
                    <p className="text-[#E6D5C0] text-sm mt-2">Štýlový a sebavedomý, s cool slnečnými okuliarmi</p>
                  </div>
                  <ArrowRight className="w-12 h-12 text-[#E6D5C0]" />
                  <div className="text-center">
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden border-4 border-[#E6D5C0] mx-auto">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-81PYF7XhZqHbFvq9DwmCLTm1nSVJio.png"
                        alt="Poti v roku 2068"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-[#E6D5C0] text-[#2C1810] px-4 py-2 rounded-full mt-4">Poti 2068</div>
                    <p className="text-[#E6D5C0] text-sm mt-2">Legendárny mudrc s dokonale vyleštenou hlavou</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#E6D5C0] py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#2C1810]">Potiho Špeciálne Vlastnosti</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Extrémna Holohlavosť</h3>
                      <p className="text-[#6B4423]">
                        Potiho hlava je tak lesklá, že sa v nej môžete vidieť ako v zrkadle!
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Úspora na Šampóne</h3>
                      <p className="text-[#6B4423]">Poti nikdy nemíňa peniaze na šampón. Ekologické a ekonomické!</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Aerodynamický Dizajn</h3>
                      <p className="text-[#6B4423]">Vďaka svojej hladkej hlave je Poti neuveriteľne rýchly pri behu!</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section className="bg-[#F5F0E8] py-12">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-[#2C1810]">Odpočet do Potiho Narodenín</h2>
                <BirthdayCountdown />
              </div>
            </section>

            <section className="bg-[#F5F0E8] py-12">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-[#2C1810]">Vylešti Potiho!</h2>
                <PolishingGame />
              </div>
            </section>
          </div>
        )
      case "hutis":
        return (
          <div className="space-y-8">
            <section className="bg-gradient-to-b from-[#2C1810] to-[#6B4423] py-12 md:py-20">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-1/2 space-y-4 text-center md:text-left">
                    <Badge variant="secondary" className="inline-block bg-[#8B5E3C] text-[#E6D5C0]">
                      Spoznaj Svojho Nového Kamaráta
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#E6D5C0]">
                      Objav Hutísa: Nízkorozpočtového Spider-Mana
                    </h1>
                    <p className="text-xl text-[#E6D5C0]/90">
                      Tiež známy ako Hutís Platís Atlantís, Huto, Hútnica - náš nízkorozpočtový Spider-Man a študent
                      Avengers školy s talentom na kreslenie!
                    </p>
                  </div>
                  <div className="md:w-1/2 mt-8 md:mt-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KKYvoY3XmYap74SGffbzC9p7QkMPXy.png"
                      alt="Hutís"
                      width={400}
                      height={400}
                      className="mx-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#E6D5C0] py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#2C1810]">Hutísove Špeciálne Vlastnosti</h2>
                <div className="grid gridcols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Nízkorozpočtový Superhrdina</h3>
                      <p className="text-[#6B4423]">Hutís dokazuje, že nepotrebujete drahý oblek na záchranu sveta!</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Študent Avengers Školy</h3>
                      <p className="text-[#6B4423]">
                        Učí sa od najlepších, aj keď občas zaspí na prednáškach o lietaní.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Majster Improvizácie a Kreslenia</h3>
                      <p className="text-[#6B4423]">
                        Kto potrebuje high-tech vybavenie, keď máte šikovné ruky, dobrú predstavivosť a talent na
                        kreslenie?
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section className="bg-[#F5F0E8] py-12">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-[#2C1810]">Hutísov Denný Rozvrh</h2>
                <p className="text-xl text-[#6B4423] mb-8">
                  Od ranného tréningu pavúčích skokov až po večerné patrolovanie mesta s domácky vyrobeným vybavením a
                  kreslenie komiksov o svojich dobrodružstvách.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#2C1810]">Hutísove Superschopnosti:</h3>
                    <ul className="list-disc list-inside text-[#6B4423] space-y-2 text-left">
                      <li>Lepenie na steny pomocou lepiacej pásky</li>
                      <li>Vystrelenie pavučiny (vlastne je to len špagát)</li>
                      <li>Superrýchle prezliekanie do kostýmu (za 5 minút)</li>
                      <li>Nekonečný optimizmus a odhodlanie</li>
                      <li>Kreslenie komiksových scén v rekordnom čase</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#2C1810]">Hutísove Plány do Budúcnosti:</h3>
                    <ul className="list-disc list-inside text-[#6B4423] space-y-2 text-left">
                      <li>Absolvovať Avengers školu (aj keď to bude trvať dlhšie)</li>
                      <li>Vynájsť skutočnú pavučinu (zatiaľ používa špagáty)</li>
                      <li>Získať aspoň jedného skutočného superpadúcha</li>
                      <li>Naučiť sa lietať (alebo aspoň elegantne padať)</li>
                      <li>Vydať vlastný komiksový seriál o svojich dobrodružstvách</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
      case "ladis":
        return (
          <div className="space-y-8">
            <section className="bg-gradient-to-b from-[#2C1810] to-[#6B4423] py-12 md:py-20 min-h-screen">
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-64 h-64 mb-8 overflow-hidden rounded-full border-4 border-[#E6D5C0]">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rWwKyr5sx7FFR4JnAsePj3EYCeBSrU.png"
                      alt="Ladís"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-[#E6D5C0] mb-4">PRÍSTUP ZAMIETNUTÝ</h2>
                  <div className="max-w-2xl text-center space-y-4">
                    <p className="text-[#E6D5C0] text-xl font-bold">PRÁVNE UPOZORNENIE</p>
                    <p className="text-[#E6D5C0]">
                      Táto sekcia je momentálne nedostupná z dôvodu prebiehajúceho právneho konania. Akékoľvek pokusy o
                      neoprávnený prístup budú trestne stíhané v plnom rozsahu zákona.
                    </p>
                    <p className="text-[#E6D5C0] text-sm italic">
                      Pre viac informácií kontaktujte náš právny tím na: pravne.hrozby@nojpa-kamarati.sk
                    </p>
                    <div className="mt-8 inline-block bg-[#E6D5C0]/10 px-4 py-2 rounded-lg">
                      <p className="text-[#E6D5C0] font-mono">Poser sa • 20:57</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
      case "cabi":
        return (
          <div className="space-y-8">
            <section className="bg-gradient-to-b from-[#2C1810] to-[#6B4423] py-12 md:py-20">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-1/2 space-y-4 text-center md:text-left">
                    <Badge variant="secondary" className="inline-block bg-[#8B5E3C] text-[#E6D5C0]">
                      Spoznaj Svojho Nového Kamaráta
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#E6D5C0]">
                      Objav Čabiho: Športovca a Spisovateľa
                    </h1>
                    <p className="text-xl text-[#E6D5C0]/90">
                      Kľudný športovec s talentom na písanie, ktorý sa vyhýba matematike a rád cestuje po Francúzsku.
                    </p>
                  </div>
                  <div className="md:w-1/2 mt-8 md:mt-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AEhMvPTVcFA1mMtBGZKZYK9Gmymznl.png"
                      alt="Čabi"
                      width={400}
                      height={400}
                      className="mx-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#E6D5C0] py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#2C1810]">Čabiho Špeciálne Vlastnosti</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Kľudný Športovec</h3>
                      <p className="text-[#6B4423]">
                        Čabi je kľudný všetkými smermi. Vie hrať futbal, pekne písať a je to spisovateľ. Jeho slabá
                        stránka je matematika a počítanie, kde sa kompletne vyplaší.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Konfliktný Kľudáčik</h3>
                      <p className="text-[#6B4423]">
                        Čabi je veľmi kľudný ale konfliktný človek. Vie rozmýšľať rozumne, ale v niektorých prípadoch sa
                        dokáže dosť vytočiť.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Majster Improvizácie</h3>
                      <p className="text-[#6B4423]">
                        Čabi vie dobre riešiť problémy vďaka svojej improvizácii a schopnosti rýchlo jednať pod tlakom.
                        Preto vie kamos utekať napríklad po ihrisku alebo z iných zariadení. Vie sa rýchlo dostať cez
                        hranice a navždy zmiznúť.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section className="bg-[#F5F0E8] py-12">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-[#2C1810]">Čabiho Finančné Dobrodružstvá</h2>
                <p className="text-xl text-[#6B4423] mb-8">
                  Ako spravovateľ financií a neriešiteľ problémov, Čabi cestuje po Francúzsku vďaka svojmu
                  spisovateľskému umu a jeho poviedzkovým príbehom.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#2C1810]">Čabiho Finančné Tipy:</h3>
                    <ul className="list-disc list-inside text-[#6B4423] space-y-2 text-left">
                      <li>Nikdy neriešiť problémy, len ich odložiť na neskôr</li>
                      <li>Investovať do športového vybavenia namiesto akcií</li>
                      <li>Písať poviedky o finančných katastrofách</li>
                      <li>Utekať pred matematickými výpočtami</li>
                      <li>Vždy mať plán úteku cez hranice</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#2C1810]">Čabiho Cestovateľské Plány:</h3>
                    <ul className="list-disc list-inside text-[#6B4423] space-y-2 text-left">
                      <li>Navštíviť všetky futbalové štadióny vo Francúzsku</li>
                      <li>Napísať bestseller o finančných únikoch</li>
                      <li>Založiť školu pre kľudných konfliktných ľudí</li>
                      <li>Vytvoriť mapu únikových ciest cez európske hranice</li>
                      <li>Naučiť sa ignorovať matematiku na profesionálnej úrovni</li>
                    </ul>
                  </div>
                </div>
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

            <section className="bg-[#E6D5C0] py-12">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-[#2C1810]">Zábava s Čabim</h2>
                <div className="space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-[#6B4423] hover:bg-[#8B5E3C] text-[#E6D5C0]">
                        Hrať Čabiho Kvíz
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#F5F0E8] text-[#2C1810] max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Čabiho Kvíz</DialogTitle>
                      </DialogHeader>
                      <CharacterQuiz questions={cabiQuizQuestions[quizDifficulty]} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>
          </div>
        )
      case "jozko":
        return (
          <div className="space-y-8">
            <section className="bg-gradient-to-b from-[#2C1810] to-[#6B4423] py-12 md:py-20">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-1/2 space-y-4 text-center md:text-left">
                    <Badge variant="secondary" className="inline-block bg-[#8B5E3C] text-[#E6D5C0]">
                      Tajomný Nový Kamarát
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#E6D5C0]">Spoznajte Jožka: Môjho Kamoša</h1>
                    <p className="text-xl text-[#E6D5C0]/90">Jožko je môj kamoš</p>
                  </div>
                  <div className="md:w-1/2 mt-8 md:mt-0">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Jožko"
                      width={400}
                      height={400}
                      className="mx-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-[#E6D5C0] py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#2C1810]">Jožkove Vlastnosti</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Verný Priateľ</h3>
                      <p className="text-[#6B4423]">Jožko je vždy tu pre svojich kamošov, v dobrom aj v zlom.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Tajomná Osobnosť</h3>
                      <p className="text-[#6B4423]">
                        Nikto presne nevie, odkiaľ Jožko prišiel, ale všetci ho majú radi.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F5F0E8]">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-[#2C1810]">Skrytý Talent</h3>
                      <p className="text-[#6B4423]">
                        Jožko má mnoho skrytých talentov, ktoré prekvapujú jeho priateľov.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </div>
        )
      default:
        return null
    }
  }, [selectedFriend, quizDifficulty])

  if (showIntro) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#2C1810] to-[#6B4423] items-center justify-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          onAnimationComplete={() => {
            setTimeout(() => setShowIntro(false), 1000)
          }}
          className="text-4xl md:text-6xl font-bold text-[#E6D5C0]"
        >
          Nojpa a Kamaráti
        </motion.h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]">
      <AnimatePresence>
        {!selectedFriend ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#2C1810] to-[#6B4423]"
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-8 text-[#E6D5C0] text-center">
              Vyber si svojho kamaráta
            </h1>
            {showSecretInput && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg">
                  <Input
                    ref={secretInputRef}
                    type="password"
                    placeholder="Zadajte tajné heslo"
                    value={secretPassword}
                    onChange={(e) => setSecretPassword(e.target.value)}
                    className="mb-2"
                  />
                  <div className="flex justify-between">
                    <Button
                      onClick={() => {
                        if (secretPassword === "jozkojemojkamos") {
                          setJozkoUnlocked(true)
                          setShowSecretInput(false)
                          setSecretPassword("")
                        }
                      }}
                    >
                      Potvrdiť
                    </Button>
                    <Button onClick={() => setShowSecretInput(false)}>Zavrieť</Button>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl">
              {Object.entries(friendsInfo).map(([key, friend]) => {
                if (key === "jozko" && !jozkoUnlocked) return null
                return (
                  <Card
                    key={key}
                    className={`cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br ${friend.color} flex flex-col`}
                    onClick={() => setSelectedFriend(key)}
                  >
                    <CardContent className="p-6 flex flex-col items-center flex-1 justify-between">
                      <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                          <Image
                            src={friend.image || "/placeholder.svg"}
                            alt={friend.name}
                            fill
                            className={`object-cover ${friend.name === "Ladís" ? "object-right" : "object-center"}`}
                          />
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-[#E6D5C0]">{friend.name}</h2>
                        <p className="text-sm text-[#E6D5C0]/90 text-center mb-4">{friend.description}</p>
                      </div>
                      <Button className="w-full bg-[#E6D5C0] text-[#2C1810] hover:bg-[#E6D5C0]/80">
                        {friend.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col"
          >
            <header className="sticky top-0 z-50 bg-[#2C1810] text-[#E6D5C0]">
              <div className="container mx-auto flex items-center justify-between h-16 px-4">
                <span className="text-xl font-semibold">
                  {selectedFriend ? friendsInfo[selectedFriend as keyof typeof friendsInfo].name : "Nojpa & Kamaráti"}
                </span>
                <nav className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    className="text-[#E6D5C0] hover:text-[#E6D5C0]/80"
                    onClick={() => setIsStoreOpen(true)}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Nojpov Merch
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-[#E6D5C0] hover:text-[#E6D5C0]/80"
                    onClick={() => setSelectedFriend(null)}
                  >
                    Zmeniť kamaráta
                  </Button>
                  <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-[#E6D5C0] hover:text-[#E6D5C0]/80">
                        <Bell className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#F5F0E8] text-[#2C1810] sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#6B4423]">Aktualizácie</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="mt-4 max-h-[60vh]">
                        {updateLogs.map((log, index) => (
                          <div key={index} className="mb-6">
                            <ul className="list-disc list-inside text-[#6B4423]">
                              {log.updates.map((update, updateIndex) => (
                                <li key={updateIndex}>{update}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </nav>
              </div>
            </header>
            <main className="flex-1">{renderFriendContent()}</main>
            <footer className="bg-[#2C1810] text-[#E6D5C0] py-4">
              <div className="container mx-auto px-4 flex items-center justify-between">
                <span className="text-sm">© 2025 Nojpa & Priatelia. Všetky práva vyhradené.</span>
                <nav className="flex items-center gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-[#E6D5C0]/80 hover:text-[#E6D5C0]">
                        Súkromie
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#F5F0E8] text-[#2C1810] max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#6B4423]">Zásady ochrany súkromia</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 text-[#8B4513] max-h-[60vh] overflow-y-auto">
                        <p className="mb-4 font-bold text-red-600">PRÁVNE ZÁVÄZNÉ UPOZORNENIE:</p>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>
                            Používaním tejto stránky sa zaväzujete k absolútnej mlčanlivosti o všetkom, čo tu uvidíte.
                          </li>
                          <li>Akékoľvek porušenie súkromia našich kamarátov bude trestané v plnom rozsahu zákona.</li>
                          <li>
                            Zákaz kopírovania, fotografovania a zdieľania obsahu pod hrozbou okamžitého právneho
                            konania.
                          </li>
                          <li>Vaše osobné údaje budú spracované s maximálnou bezpečnosťou (možno).</li>
                          <li>
                            Neoprávnené zdieľanie obrázkov našich kamarátov bude mať za následok trestné oznámenie.
                          </li>
                          <li>Všetky vaše aktivity na stránke sú monitorované našim právnym tímom.</li>
                          <li>V prípade úniku informácií budete čeliť astronomickým pokutám.</li>
                          <li>Akékoľvek sťažnosti budú ignorované a môžu viesť k právnym následkom.</li>
                          <li>Používaním cookies súhlasíte s večným záväzkom mlčanlivosti.</li>
                          <li>Porušenie týchto zásad môže viesť k doživotnému zákazu prístupu na stránku.</li>
                        </ol>
                        <p className="mt-4 text-sm italic">
                          Pre viac právnych hrozieb nás kontaktujte na: pravne.hrozby@nojpa-kamarati.sk
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-[#E6D5C0]/80 hover:text-[#E6D5C0]">
                        Podmienky
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#F5F0E8] text-[#2C1810] max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#6B4423]">Podmienky používania</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 text-[#8B4513] max-h-[60vh] overflow-y-auto">
                        <p className="mb-4 font-bold text-red-600">PRÁVNE ZÁVÄZNÉ PODMIENKY:</p>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Akékoľvek spochybňovanie existencie našich kamarátov bude trestne stíhané.</li>
                          <li>Kritika Potiho holej hlavy sa trestá doživotným zákazom prístupu.</li>
                          <li>Znevažovanie Hutísových superschopností bude riešené súdnou cestou.</li>
                          <li>Pochybnosti o Nojpových ušiach budú mať právne následky.</li>
                          <li>Spochybňovanie Ladísovej legendárnosti je trestným činom.</li>
                          <li>Zdieľanie obsahu bez písomného súhlasu = okamžitá žaloba.</li>
                          <li>Používanie stránky v zlej nálade je zakázané pod hrozbou pokuty.</li>
                          <li>Nedostatočný rešpekt voči našim postavám = právne konanie.</li>
                          <li>Kopírovanie našich originálnych fráz bude trestne stíhané.</li>
                          <li>Akékoľvek pochybnosti o našich právnych hrozbách budú mať právne následky.</li>
                        </ol>
                        <p className="mt-4 font-bold text-red-600">
                          POUŽÍVANÍM TEJTO STRÁNKY SÚHLASÍTE S TÝMITO PODMIENKAMI A VZDÁVATE SA VŠETKÝCH PRÁV NA
                          SŤAŽNOSTI.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </nav>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
      {isStoreOpen && <NojpaStore onClose={() => setIsStoreOpen(false)} />}
    </div>
  )
}

