"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Mumbai",
    rating: 5,
    comment:
      "Excellent service! Found my dream car at an amazing price. The entire process was smooth and transparent.",
    image: "/placeholder.svg?height=80&width=80",
    car: "Honda City 2020",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    comment:
      "AutoHub made car buying so easy. Great quality check and the delivery was right on time. Highly recommended!",
    image: "/placeholder.svg?height=80&width=80",
    car: "Maruti Swift 2019",
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Bangalore",
    rating: 4,
    comment:
      "Professional team and genuine pricing. The car was exactly as described. Very satisfied with my purchase.",
    image: "/placeholder.svg?height=80&width=80",
    car: "Hyundai Creta 2021",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    location: "Hyderabad",
    rating: 5,
    comment: "Outstanding experience! The quality inspection report gave me confidence. Best decision I made.",
    image: "/placeholder.svg?height=80&width=80",
    car: "Toyota Innova 2018",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center">
                  <Quote className="h-12 w-12 text-blue-600 mx-auto mb-6" />

                  <div className="flex justify-center mb-6">{renderStars(testimonials[currentIndex].rating)}</div>

                  <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                    "{testimonials[currentIndex].comment}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <Image
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div className="text-left">
                      <h4 className="text-lg font-semibold text-gray-900">{testimonials[currentIndex].name}</h4>
                      <p className="text-gray-600">{testimonials[currentIndex].location}</p>
                      <p className="text-sm text-blue-600">Purchased: {testimonials[currentIndex].car}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}
