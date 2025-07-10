"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Link } from "react-router-dom"

const heroSlides = [
  {
    id: 1,
    title: "Find Your Perfect Car",
    subtitle: "Premium Quality Second-Hand Vehicles",
    description: "Discover thousands of certified pre-owned cars with complete transparency and best prices.",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Browse Cars",
  },
  {
    id: 2,
    title: "Certified & Inspected",
    subtitle: "200+ Point Quality Check",
    description: "Every vehicle undergoes rigorous inspection to ensure quality and reliability.",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Learn More",
  },
  {
    id: 3,
    title: "Best Price Guaranteed",
    subtitle: "Transparent Pricing",
    description: "No hidden costs, fair pricing, and flexible financing options available.",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Get Quote",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-lg md:text-xl font-medium mb-4 text-blue-300">{heroSlides[currentSlide].subtitle}</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cars">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  {heroSlides[currentSlide].cta}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Video
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  )
}
