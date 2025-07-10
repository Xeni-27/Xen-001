"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, Calendar, Gauge, Filter, SlidersHorizontal } from "lucide-react"
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

export default function CarsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    brand: "",
    priceRange: "",
    fuelType: "",
    transmission: "",
    yearRange: "",
    sortBy: "price-low",
  })

  // Mock data - replace with actual API call
  useEffect(() => {
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
      {
        id: "3",
        name: "Hyundai Creta",
        brand: "Hyundai",
        year: 2021,
        price: 1200000,
        mileage: "15,000 km",
        fuelType: "Diesel",
        transmission: "Automatic",
        image: "/placeholder.svg?height=300&width=400",
        featured: true,
      },
      {
        id: "4",
        name: "Toyota Innova",
        brand: "Toyota",
        year: 2018,
        price: 1500000,
        mileage: "45,000 km",
        fuelType: "Diesel",
        transmission: "Manual",
        image: "/placeholder.svg?height=300&width=400",
        featured: false,
      },
      {
        id: "5",
        name: "Tata Nexon",
        brand: "Tata",
        year: 2020,
        price: 750000,
        mileage: "30,000 km",
        fuelType: "Electric",
        transmission: "Automatic",
        image: "/placeholder.svg?height=300&width=400",
        featured: true,
      },
      {
        id: "6",
        name: "Mahindra XUV500",
        brand: "Mahindra",
        year: 2019,
        price: 1100000,
        mileage: "40,000 km",
        fuelType: "Diesel",
        transmission: "Manual",
        image: "/placeholder.svg?height=300&width=400",
        featured: false,
      },
    ]

    setTimeout(() => {
      setVehicles(mockVehicles)
      setFilteredVehicles(mockVehicles)
      setLoading(false)
    }, 1000)
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = [...vehicles]

    if (filters.brand) {
      filtered = filtered.filter((v) => v.brand === filters.brand)
    }

    if (filters.fuelType) {
      filtered = filtered.filter((v) => v.fuelType === filters.fuelType)
    }

    if (filters.transmission) {
      filtered = filtered.filter((v) => v.transmission === filters.transmission)
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filtered = filtered.filter((v) => v.price >= min && v.price <= max)
    }

    if (filters.yearRange) {
      const [minYear, maxYear] = filters.yearRange.split("-").map(Number)
      filtered = filtered.filter((v) => v.year >= minYear && v.year <= maxYear)
    }

    // Sort
    if (filters.sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === "year-new") {
      filtered.sort((a, b) => b.year - a.year)
    } else if (filters.sortBy === "year-old") {
      filtered.sort((a, b) => a.year - b.year)
    }

    setFilteredVehicles(filtered)
  }, [filters, vehicles])

  const brands = [...new Set(vehicles.map((v) => v.brand))]
  const fuelTypes = [...new Set(vehicles.map((v) => v.fuelType))]

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Cars</h1>
            <p className="text-xl text-gray-600">Find your perfect pre-owned vehicle from our extensive collection</p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                <h3 className="text-lg font-semibold">Filters</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <Select value={filters.brand} onValueChange={(value) => setFilters({ ...filters, brand: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-500000">Under ₹5L</SelectItem>
                    <SelectItem value="500000-1000000">₹5L - ₹10L</SelectItem>
                    <SelectItem value="1000000-1500000">₹10L - ₹15L</SelectItem>
                    <SelectItem value="1500000-9999999">Above ₹15L</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.fuelType} onValueChange={(value) => setFilters({ ...filters, fuelType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Fuel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fuel Types</SelectItem>
                    {fuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.transmission}
                  onValueChange={(value) => setFilters({ ...filters, transmission: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transmissions</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.yearRange}
                  onValueChange={(value) => setFilters({ ...filters, yearRange: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2020-2024">2020-2024</SelectItem>
                    <SelectItem value="2015-2019">2015-2019</SelectItem>
                    <SelectItem value="2010-2014">2010-2014</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="year-new">Year: Newest First</SelectItem>
                    <SelectItem value="year-old">Year: Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </p>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
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

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    brand: "",
                    priceRange: "",
                    fuelType: "",
                    transmission: "",
                    yearRange: "",
                    sortBy: "price-low",
                  })
                }
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
