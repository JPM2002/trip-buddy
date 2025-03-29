"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import DynamicBackground from "@/components/DynamicBackground"
import { Download, FileText, Video, CheckSquare, Music, Brain, Utensils, Package } from "lucide-react"
import Link from "next/link"

type TripData = {
  season: string
  destination: string
  days: number
  people: number
  outputs: string[]
}

const outputDetails = {
  pdf: {
    title: "Travel Handbook",
    description: "A comprehensive guide with itineraries, local tips, and must-see attractions.",
    icon: FileText,
  },
  video: {
    title: "Video Guide",
    description: "An AI-generated video showcasing the highlights of your destination.",
    icon: Video,
  },
  checklist: {
    title: "Packing Checklist",
    description: "A customized packing list based on your destination, season, and trip duration.",
    icon: CheckSquare,
  },
  playlist: {
    title: "Music Playlist",
    description: "A curated playlist featuring local artists and music that captures the essence of your destination.",
    icon: Music,
  },
  culture: {
    title: "Local Culture Tips",
    description: "Insights into local customs, traditions, and etiquette to help you connect with the local culture.",
    icon: Brain,
  },
  food: {
    title: "Food & Drink Guide",
    description: "Recommendations for must-try local dishes, drinks, and dining experiences.",
    icon: Utensils,
  },
}

export default function ResultsPage() {
  const [tripData, setTripData] = useState<TripData | null>(null)

  useEffect(() => {
    // Get trip data from localStorage
    const storedData = localStorage.getItem("tripData")
    if (storedData) {
      setTripData(JSON.parse(storedData))
    }
  }, [])

  if (!tripData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No trip data found</h1>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDownload = (outputType: string) => {
    // In a real app, this would trigger a download of the actual file
    alert(`Downloading ${outputDetails[outputType as keyof typeof outputDetails].title}...`)
  }

  const handleDownloadAll = () => {
    // In a real app, this would trigger a download of all files as a zip
    alert("Downloading all files as a zip...")
  }

  return (
    <>
      <DynamicBackground destination={tripData.destination} />
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">Here's Your Trip Package!</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Your custom travel package for {tripData.people} {tripData.people === 1 ? "person" : "people"} to{" "}
              {tripData.destination} for {tripData.days} {tripData.days === 1 ? "day" : "days"} during {tripData.season}{" "}
              is ready!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tripData.outputs.map((output) => {
              const details = outputDetails[output as keyof typeof outputDetails]
              const Icon = details.icon

              return (
                <Card key={output} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6" />
                      <CardTitle>{details.title}</CardTitle>
                    </div>
                    <CardDescription className="text-white/70">{details.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-white/5 rounded-md flex items-center justify-center">
                      <p className="text-white/50">Preview not available</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleDownload(output)} className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {tripData.outputs.length > 1 && (
            <div className="flex justify-center">
              <Button onClick={handleDownloadAll} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Package className="mr-2 h-5 w-5" />
                Download All Files
              </Button>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Plan Another Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

