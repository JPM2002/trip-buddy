"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plane, MapPin, Calendar, Users, FileText, Video, Briefcase, Music, Brain, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const outputTypes = [
  {
    id: "pdf",
    label: "📄 PDF / Travel Handbook",
    icon: <FileText className="h-4 w-4 mr-2" />,
  },
  {
    id: "video",
    label: "🎥 AI-generated Video Guide",
    icon: <Video className="h-4 w-4 mr-2" />,
  },
  {
    id: "checklist",
    label: "🧳 Packing Checklist",
    icon: <Briefcase className="h-4 w-4 mr-2" />,
  },
  {
    id: "playlist",
    label: "🎶 Custom Music Playlist",
    icon: <Music className="h-4 w-4 mr-2" />,
  },
  {
    id: "culture",
    label: "🧠 Local Culture Tips",
    icon: <Brain className="h-4 w-4 mr-2" />,
  },
  {
    id: "food",
    label: "🍽️ Food Recommendations",
    icon: <Utensils className="h-4 w-4 mr-2" />,
  },
]

const formSchema = z.object({
  season: z.string({
    required_error: "Please select a season.",
  }),
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  days: z.coerce
    .number()
    .min(1, {
      message: "Trip must be at least 1 day.",
    })
    .max(90, {
      message: "Trip cannot exceed 90 days.",
    }),
  people: z.coerce
    .number()
    .min(1, {
      message: "At least 1 person is required.",
    })
    .max(20, {
      message: "Maximum 20 people allowed.",
    }),
  outputTypes: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one output type.",
  }),
})

export default function Home() {
  const router = useRouter()
  const [backgroundImage, setBackgroundImage] = useState("/placeholder.svg?height=1080&width=1920")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      season: "",
      destination: "",
      days: 7,
      people: 1,
      outputTypes: [],
    },
  })

  const { watch } = form
  const destination = watch("destination")

  useEffect(() => {
    if (destination && destination.length > 2) {
      // In a real app, you might want to debounce this or use a more sophisticated approach
      // This is just a simple example that changes the background based on the destination
      const getDestinationImage = () => {
        // For demo purposes, we're just using a placeholder with the destination as text
        setBackgroundImage(`/placeholder.svg?height=1080&width=1920&text=${encodeURIComponent(destination)}`)
      }

      const timer = setTimeout(getDestinationImage, 500)
      return () => clearTimeout(timer)
    }
  }, [destination])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <header className="w-full z-10">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <div className="text-white font-bold text-xl">TripBuddy</div>
          <div className="flex space-x-4">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
              Home
            </Button>
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
              About Us
            </Button>
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
              Contact
            </Button>
          </div>
        </nav>
      </header>

      <div className="flex flex-col items-center justify-center flex-1 w-full z-10 px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">TripBuddy</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Plan your perfect trip with our personalized travel companion
          </p>
        </div>

        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="season"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Season
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a season" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="summer">Summer</SelectItem>
                            <SelectItem value="fall">Fall</SelectItem>
                            <SelectItem value="winter">Winter</SelectItem>
                            <SelectItem value="spring">Spring</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          Destination
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Paris, Tokyo, New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="days"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Number of Days
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={90} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="people"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Number of People
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={20} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="outputTypes"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Output Types</FormLabel>
                        <FormDescription>Select what you want to receive for your trip</FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {outputTypes.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="outputTypes"
                            render={({ field }) => {
                              return (
                                <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(field.value?.filter((value) => value !== item.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal flex items-center cursor-pointer">
                                    {item.icon}
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Success! Check your email
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Plane className="mr-2 h-5 w-5" />
                      Plan My Trip
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <footer className="w-full bg-black/80 text-white py-4 z-10">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} TripBuddy. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

