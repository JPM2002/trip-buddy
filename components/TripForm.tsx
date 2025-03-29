"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import DynamicBackground from "./DynamicBackground"

const outputOptions = [
  { id: "pdf", label: "📄 PDF / Travel Handbook" },
  { id: "video", label: "🎥 AI-generated Video Guide" },
  { id: "checklist", label: "🧳 Packing Checklist" },
  { id: "playlist", label: "🎶 Custom Music Playlist" },
  { id: "culture", label: "🧠 Local Culture Tips" },
  { id: "food", label: "🍽️ Food & Drink Recommendations" },
]

export default function TripForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    season: "",
    destination: "",
    days: 1,
    people: 1,
    outputs: [] as string[],
  })

  const handleOutputChange = (id: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        outputs: [...formData.outputs, id],
      })
    } else {
      setFormData({
        ...formData,
        outputs: formData.outputs.filter((item) => item !== id),
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.season || !formData.destination || formData.outputs.length === 0) {
      alert("Please fill out all required fields and select at least one output type")
      return
    }

    // Store form data in localStorage for use on results page
    localStorage.setItem("tripData", JSON.stringify(formData))

    // Navigate to loading page
    router.push("/loading")
  }

  return (
    <>
      <DynamicBackground destination={formData.destination} />
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-4">TripBuddy</h1>
          <p className="text-xl text-white/90 max-w-md mx-auto">
            Your personal travel companion for the perfect adventure
          </p>
        </div>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="season" className="text-white">
                Season
              </Label>
              <Select value={formData.season} onValueChange={(value) => setFormData({ ...formData, season: value })}>
                <SelectTrigger id="season" className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="fall">Fall</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="text-white">
                Destination
              </Label>
              <Input
                id="destination"
                placeholder="Where are you going?"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="days" className="text-white">
                  Number of Days
                </Label>
                <Input
                  id="days"
                  type="number"
                  min="1"
                  className="bg-white/20 border-white/30 text-white"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: Number.parseInt(e.target.value) || 1 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="people" className="text-white">
                  Number of People
                </Label>
                <Input
                  id="people"
                  type="number"
                  min="1"
                  className="bg-white/20 border-white/30 text-white"
                  value={formData.people}
                  onChange={(e) => setFormData({ ...formData, people: Number.parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-white">Output Types (Select at least one)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {outputOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={formData.outputs.includes(option.id)}
                      onCheckedChange={(checked) => handleOutputChange(option.id, checked as boolean)}
                      className="border-white data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <Label htmlFor={option.id} className="text-white cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Generate My Trip
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

