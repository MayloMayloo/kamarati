import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ImageGalleryProps {
  images: { src: string; alt: string }[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 cursor-pointer hover:opacity-80 transition-opacity rounded-lg overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  onClick={() => setSelectedImage(image.src)}
                />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <div className="relative aspect-square">
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-contain" />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}

