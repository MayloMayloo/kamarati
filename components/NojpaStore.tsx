"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, X, Minus, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const products = [
  {
    id: 1,
    name: "Nojpa Energy Drink",
    description: "Energetický nápoj s príchuťou Nojpových dobrodružstiev. Dodá vám energiu na celý deň!",
    price: 4.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/contemporary-aluminum-can-mockup-trendy-minimalist-packaging-in-warm-pastel-setting-045.jpg-QCIIsyGWhXkAZqnsUMs0G3XiXmT75T.jpeg",
    characterImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Bn5i42E28iRCxtdr2cSlWMp8O4sNfh.png",
  },
  {
    id: 2,
    name: "Nojpa Vankúš",
    description: "Dekoratívny vankúš s Nojpovou tvárou. Ideálny na každú pohovku alebo posteľ!",
    price: 24.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern-lounge-cushion-mockup-on-chair-0013.jpg-RBYkG8JpF2kuIIO9j6NEFUQBCmGrD2.jpeg",
    characterImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Bn5i42E28iRCxtdr2cSlWMp8O4sNfh.png",
  },
  {
    id: 3,
    name: "Nojpa Plagát",
    description: "Limitovaná edícia plagátu s Nojpom. Perfektná dekorácia do každej izby!",
    price: 19.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hanging-poster-mockup-black-frame-modern-studio-setup-creative-ambience-00129.jpg-EhJT2M2oKakqR1ORTHTyFEikBkIW0o.jpeg",
    characterImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Bn5i42E28iRCxtdr2cSlWMp8O4sNfh.png",
  },
]

type CartItem = {
  id: number
  quantity: number
  name: string
  price: number
  image: string
}

export function NojpaStore({ onClose }: { onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (product: (typeof products)[0]) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)
      if (existingItem) {
        return currentCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [
        ...currentCart,
        { id: product.id, quantity: 1, name: product.name, price: product.price, image: product.image },
      ]
    })
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart((currentCart) => {
      return currentCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + delta)
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#2C1810]">Nojpov Oficiálny Merch</h1>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="mb-8">
          <Input
            type="search"
            placeholder="Hľadať produkty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                {product.characterImage && (
                  <div className="absolute bottom-2 right-2 w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-lg group/char">
                    <div className="absolute inset-0 transition-transform duration-300 origin-bottom-right group-hover/char:scale-[2]">
                      <Image
                        src={product.characterImage || "/placeholder.svg"}
                        alt="Character"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
                  <Button className="bg-[#6B4423] hover:bg-[#8B5E3C] text-white" onClick={() => addToCart(product)}>
                    Pridať do košíka
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-[#F5F0E8] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#2C1810] mb-4">Dôležité Upozornenie</h2>
          <p className="text-[#6B4423] mb-4">
            Všetky produkty v Nojpovom oficiálnom obchode sú momentálne vo fáze intenzívneho vývoja a testovania našimi
            odvážnymi kamarátmi. Očakávaný dátum spustenia predaja je niekedy medzi "čoskoro" a "keď bude Poti spokojný
            s leskom svojej hlavy".
          </p>
          <p className="text-[#6B4423] mb-4">
            Prosíme o trpezlivosť - kvalita našich produktov je pre nás rovnako dôležitá ako Čabiho snaha vyhnúť sa
            matematike.
          </p>
          <p className="text-[#6B4423] font-bold">
            Sledujte naše oznámenia pre aktualizácie o dostupnosti. Medzitým sa môžete tešiť na príchod týchto
            unikátnych kúskov!
          </p>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 Nojpa & Kamaráti. Všetky práva vyhradené.</p>
        </footer>
      </div>

      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <div className="fixed bottom-4 right-4">
          <Button className="bg-[#6B4423] hover:bg-[#8B5E3C] text-white" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Košík ({totalItems})
          </Button>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Košík</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500">Košík je prázdny</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.price.toFixed(2)} €</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, -1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Spolu:</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                </div>
                <Button className="w-full bg-[#6B4423] hover:bg-[#8B5E3C] text-white">Pokračovať k pokladni</Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

