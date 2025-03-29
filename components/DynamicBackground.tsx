"use client"

import { useEffect, useState } from "react"

type BackgroundType = {
  destination: string
}

export default function DynamicBackground({ destination }: BackgroundType) {
  const [backgroundImage, setBackgroundImage] = useState("/backgrounds/default.jpg")

  useEffect(() => {
    if (!destination) return

    const lowercaseDest = destination.toLowerCase()

    // Simple mapping of keywords to background images
    if (lowercaseDest.includes("beach") || lowercaseDest.includes("hawaii") || lowercaseDest.includes("bali")) {
      setBackgroundImage("/backgrounds/beach.jpg")
    } else if (
      lowercaseDest.includes("mountain") ||
      lowercaseDest.includes("alps") ||
      lowercaseDest.includes("everest")
    ) {
      setBackgroundImage("/backgrounds/mountain.jpg")
    } else if (lowercaseDest.includes("city") || lowercaseDest.includes("tokyo") || lowercaseDest.includes("york")) {
      setBackgroundImage("/backgrounds/city.jpg")
    } else if (
      lowercaseDest.includes("desert") ||
      lowercaseDest.includes("canyon") ||
      lowercaseDest.includes("sahara")
    ) {
      setBackgroundImage("/backgrounds/desert.jpg")
    } else if (
      lowercaseDest.includes("forest") ||
      lowercaseDest.includes("amazon") ||
      lowercaseDest.includes("jungle")
    ) {
      setBackgroundImage("/backgrounds/forest.jpg")
    } else if (
      lowercaseDest.includes("snow") ||
      lowercaseDest.includes("winter") ||
      lowercaseDest.includes("iceland")
    ) {
      setBackgroundImage("/backgrounds/snow.jpg")
    } else {
      // Default background for other destinations
      setBackgroundImage("/backgrounds/default.jpg")
    }
  }, [destination])

  return (
    <div
      className="fixed inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}

