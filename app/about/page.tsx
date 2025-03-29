import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center pt-20 pb-10 px-4"
      style={{
        backgroundImage: "url(/backgrounds/about.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-6">About TripBuddy</h1>

          <div className="space-y-6">
            <p>
              TripBuddy was born from a simple idea: travel planning should be exciting, not exhausting. We believe that
              the journey begins long before you pack your bags, and we're here to make that journey as enjoyable as the
              destination itself.
            </p>

            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p>
              Our mission is to transform travel planning into a personalized, seamless experience. We combine
              cutting-edge technology with a deep passion for exploration to create custom travel resources that enhance
              your adventure, whether you're a seasoned globetrotter or a first-time traveler.
            </p>

            <h2 className="text-2xl font-semibold">What Makes Us Different</h2>
            <p>
              Unlike traditional travel planning tools, TripBuddy adapts to your unique preferences and needs. We don't
              just provide generic information – we craft personalized guides, playlists, and recommendations that
              reflect your destination, travel style, and interests.
            </p>

            <h2 className="text-2xl font-semibold">Our Team</h2>
            <p>
              Behind TripBuddy is a diverse team of travel enthusiasts, tech innovators, and creative minds. We've
              explored corners of the world from bustling metropolises to remote wilderness, and we channel that
              collective experience into every aspect of TripBuddy.
            </p>

            <h2 className="text-2xl font-semibold">Join Us on the Journey</h2>
            <p>
              TripBuddy is constantly evolving, just like the world of travel itself. We're committed to enhancing your
              travel experience through innovation, inspiration, and a deep understanding of what makes each journey
              special.
            </p>

            <div className="flex justify-center mt-8">
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Planning Your Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

