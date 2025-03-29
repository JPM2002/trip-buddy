"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DynamicBackground from "@/components/DynamicBackground"

export default function LoadingPage() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [loadingText, setLoadingText] = useState("Creating your custom trip")
  const [dots, setDots] = useState("")

  useEffect(() => {
    // Get trip data from localStorage
    const tripData = localStorage.getItem("tripData")
    if (tripData) {
      const { destination } = JSON.parse(tripData)
      setDestination(destination)
    }

    // Animate loading dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""))
    }, 500)

    // Cycle through loading messages
    const messages = [
      "Creating your custom trip",
      "Gathering local insights",
      "Preparing your travel handbook",
      "Curating the perfect experience",
      "Almost there",
    ]

    let messageIndex = 0
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length
      setLoadingText(messages[messageIndex])
    }, 3000)

    // Redirect to results page after a delay (simulating processing)
    const redirectTimeout = setTimeout(() => {
      router.push("/results")
    }, 8000)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(messageInterval)
      clearTimeout(redirectTimeout)
    }
  }, [router])

  return (
    <>
      <DynamicBackground destination={destination} />
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 border-t-4 border-primary border-solid rounded-full animate-spin mx-auto mb-8"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4">
            {loadingText}
            <span className="inline-block w-12 text-left">{dots}</span>
          </h1>
          <p className="text-xl text-white/90 max-w-md mx-auto">
            We're crafting the perfect travel package just for you
          </p>
        </div>
      </div>
    </>
  )
}

