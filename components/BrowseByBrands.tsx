"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

const brands = [
  { name: "Maruti Suzuki", logo: "/placeholder.svg?height=80&width=80", count: 245 },
  { name: "Hyundai", logo: "/placeholder.svg?height=80&width=80", count: 189 },
  { name: "Honda", logo: "/placeholder.svg?height=80&width=80", count: 156 },
  { name: "Toyota", logo: "/placeholder.svg?height=80&width=80", count: 134 },
  { name: "Mahindra", logo: "/placeholder.svg?height=80&width=80", count: 98 },
  { name: "Tata", logo: "/placeholder.svg?height=80&width=80", count: 87 },
  { name: "Ford", logo: "/placeholder.svg?height=80&width=80", count: 76 },
  { name: "Volkswagen", logo: "/placeholder.svg?height=80&width=80", count: 65 },
]

const categories = [
  { name: "All Brands", count: 1050 },
  { name: "Hatchback", count: 320 },
  { name: "Sedan", count: 280 },
  { name: "SUV", count: 250 },
  { name: "Luxury", count: 120 },
  { name: "Electric", count: 80 },
]

export default function BrowseByBrands() {
  const [activeCategory, setActiveCategory] = useState("All Brands")

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Brands</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your preferred brand from our extensive collection of certified pre-owned vehicles.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              onClick={() => setActiveCategory(category.name)}
              className="relative"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {brands.map((brand, index) => (
            <Link key={index} href={`/cars?brand=${encodeURIComponent(brand.name)}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      width={80}
                      height={80}
                      className="mx-auto group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{brand.name}</h3>
                  <p className="text-xs text-gray-600">{brand.count} cars</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/cars">
            <Button size="lg">View All Cars</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
