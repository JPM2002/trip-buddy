"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white drop-shadow-md">
            TripBuddy
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-primary-foreground font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-primary-foreground font-medium transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-white hover:text-primary-foreground font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white/10 backdrop-blur-md rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-primary-foreground font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-primary-foreground font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-primary-foreground font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

