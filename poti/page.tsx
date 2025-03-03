"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowRight } from "lucide-react"

export default function Poti() {
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
                Spoznajte Potiho
              </h1>
              <p className="max-w-[600px] text-[#E6D5C0]/90 md:text-xl mb-8">
                Náš extrémne holohlavý kamarát s lesklou hlavou a veľkým srdcom!
              </p>
              <div className="relative w-64 h-64 rounded-full overflow-hidden mb-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QfzCIVBQD3rZ95cwjhy2B8yEaXiARs.png"
                  alt="Poti"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-[#E6D5C0]">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12 text-[#2C1810]">
              Potiho Časová Os (aj do budúcnosti!)
            </h2>
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#6B4423] transform -translate-y-1/2" />
              <div className="relative z-10 flex justify-between items-center max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden border-4 border-[#6B4423]">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BF9FA727A-3C4F-472E-9E40-0A1609F886DC%7D-fNeKg9vVdsxi9AO3yt0CTRA8kGmdrj.png"
                      alt="Poti v roku 2025"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#6B4423] text-[#E6D5C0] px-4 py-2 rounded-full">Poti 2025</div>
                  <p className="text-[#6B4423] text-center text-sm max-w-[200px]">
                    Štýlový a sebavedomý, s cool slnečnými okuliarmi
                  </p>
                </div>
                <ArrowRight className="w-12 h-12 text-[#6B4423]" />
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden border-4 border-[#6B4423]">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-81PYF7XhZqHbFvq9DwmCLTm1nSVJio.png"
                      alt="Poti v roku 2068"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#6B4423] text-[#E6D5C0] px-4 py-2 rounded-full">Poti 2068</div>
                  <p className="text-[#6B4423] text-center text-sm max-w-[200px]">
                    Legendárny mudrc s dokonale vyleštenou hlavou
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-[#F5F0E8]">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-[#2C1810]">Galéria Potiho</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex justify-center">
                <div className="relative w-64 h-64 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BF9FA727A-3C4F-472E-9E40-0A1609F886DC%7D-fNeKg9vVdsxi9AO3yt0CTRA8kGmdrj.png"
                    alt="Poti so slnečnými okuliarmi"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-64 h-64 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QfzCIVBQD3rZ95cwjhy2B8yEaXiARs.png"
                    alt="Poti zblízka"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-64 h-64 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-81PYF7XhZqHbFvq9DwmCLTm1nSVJio.png"
                    alt="Poti v budúcnosti"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-[#F5F0E8]">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-[#2C1810]">Potiho Špeciálne Vlastnosti</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-[#E6D5C0] shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2 text-[#2C1810]">Extrémna Holohlavosť</h3>
                  <p className="text-[#6B4423]">Potiho hlava je tak lesklá, že sa v nej môžete vidieť ako v zrkadle!</p>
                </CardContent>
              </Card>
              <Card className="bg-[#E6D5C0] shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2 text-[#2C1810]">Úspora na Šampóne</h3>
                  <p className="text-[#6B4423]">Poti nikdy nemíňa peniaze na šampón. Ekologické a ekonomické!</p>
                </CardContent>
              </Card>
              <Card className="bg-[#E6D5C0] shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2 text-[#2C1810]">Aerodynamický Dizajn</h3>
                  <p className="text-[#6B4423]">Vďaka svojej hladkej hlave je Poti neuveriteľne rýchly pri behu!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-[#F5F0E8]">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#2C1810]">Potiho Denná Rutina</h2>
            <p className="text-[#6B4423] mb-8 max-w-2xl mx-auto">
              Namiesto česania vlasov Poti každé ráno leští svoju hlavu. Je to jeho tajomstvo k žiarivému vzhľadu a
              pozitívnemu prístupu k životu!
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#6B4423] hover:bg-[#8B5E3C] text-[#E6D5C0]">Zistite viac o Potim</Button>
              </DialogTrigger>
              <DialogContent className="bg-[#F5F0E8] text-[#2C1810] max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Potiho Príbeh a Budúcnosť</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <p className="text-[#6B4423]">
                    Poti, náš holohlavý hrdina, nie je len trendsetter dneška, ale aj vizionár zajtrajška. Od štýlového
                    mladíka v roku 2025 až po legendárneho mudrca v roku 2068, Poti dokazuje, že holá hlava nikdy
                    nevyjde z módy!
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-bold mb-2 text-[#2C1810]">Potiho Súčasné Tipy:</h3>
                      <ul className="list-disc list-inside text-[#6B4423] space-y-2">
                        <li>Štýlové slnečné okuliare sú must-have</li>
                        <li>Graffiti tričká pre urban look</li>
                        <li>Každodenné leštenie pre extra shine</li>
                        <li>Sebavedomie je najlepší doplnok</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-[#2C1810]">Potiho Vízia 2068:</h3>
                      <ul className="list-disc list-inside text-[#6B4423] space-y-2">
                        <li>Dosiahnutie statusu holohlavého mudrca</li>
                        <li>Založenie akadémie leštenia hlavy</li>
                        <li>Vydanie knihy "Cesta k dokonalej holohlavosti"</li>
                        <li>Inšpirovanie ďalšej generácie holohlavcov</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <footer className="border-t bg-[#2C1810] text-[#E6D5C0]">
        <div className="container flex items-center justify-between h-14 px-4 md:px-6">
          <span className="text-sm text-[#E6D5C0]/80">© 2024 Nojpa & Poti. Všetky práva vyhradené.</span>
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

