"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Heart, Eye, Calendar, Gauge } from "lucide-react"
import { Link } from "react-router-dom"
import { vehicleService } from "../services/api"

export default function PopularVehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getVehicles()
        setVehicles(data.slice(0, 4)) // Show only first 4 vehicles
      } catch (error) {
        console.error("Error fetching vehicles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Vehicles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Vehicles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most sought-after pre-owned vehicles, carefully selected for quality and value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={vehicle.image || "/placeholder.svg?height=300&width=400"}
                  alt={vehicle.name}
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
                  <Link to={`/cars/${vehicle.id}`} className="flex-1">
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

        <div className="text-center mt-12">
          <Link to="/cars">
            <Button size="lg" variant="outline">
              View All Vehicles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
