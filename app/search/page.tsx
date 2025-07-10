"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, Calendar, Gauge, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Vehicle {
  id: string
  name: string
  brand: string
  year: number
  price: number
  mileage: string
  fuelType: string
  transmission: string
  image: string
  featured: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock search functionality - replace with actual API call
    const mockVehicles: Vehicle[] = [
      {
        id: "1",
        name: "Honda City",
        brand: "Honda",
        year: 2020,
        price: 850000,
        mileage: "25,000 km",
        fuelType: "Petrol",
        transmission: "Manual",
        image: "/placeholder.svg?height=300&width=400",
        featured: true,
      },
      {
        id: "2",
        name: "Maruti Swift",
        brand: "Maruti",
        year: 2019,
        price: 550000,
        mileage: "35,000 km",
        fuelType: "Petrol",
        transmission: "Automatic",
        image: "/placeholder.svg?height=300&width=400",
        featured: false,
      },
    ]

    // Simple search filter
    const filteredVehicles = mockVehicles.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(query.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(query.toLowerCase()) ||
        vehicle.fuelType.toLowerCase().includes(query.toLowerCase()),
    )

    setTimeout(() => {
      setVehicles(filteredVehicles)
      setLoading(false)
    }, 500)
  }, [query])

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Search className="h-6 w-6 mr-2 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Search Results</h1>
            </div>
            <p className="text-xl text-gray-600">
              {query ? `Results for "${query}"` : "Enter a search term to find vehicles"}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""}
                </p>
              </div>

              {vehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {vehicles.map((vehicle) => (
                    <Card
                      key={vehicle.id}
                      className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={vehicle.image || "/placeholder.svg"}
                          alt={vehicle.name}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {vehicle.featured && <Badge className="absolute top-4 left-4 bg-blue-600">Featured</Badge>}
                        <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                          <span className="text-sm text-gray-500">{vehicle.year}</span>
                        </div>

                        <div className="text-2xl font-bold text-blue-600 mb-4">₹{vehicle.price.toLocaleString()}</div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Gauge className="h-4 w-4 mr-2" />
                            {vehicle.mileage}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {vehicle.fuelType} • {vehicle.transmission}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Link href={`/cars/${vehicle.id}`} className="flex-1">
                            <Button className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    {query ? `No vehicles found for "${query}"` : "Try searching for a car brand, model, or fuel type"}
                  </p>
                  <Link href="/cars">
                    <Button variant="outline">Browse All Cars</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
