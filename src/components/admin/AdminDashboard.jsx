"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Badge } from "../ui/badge"
import { Car, Plus, Edit, Trash2, Upload, BarChart3, Users, DollarSign } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { vehicleService } from "../../services/api"

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState([])
  const [isAddingVehicle, setIsAddingVehicle] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: "",
    fuelType: "Petrol",
    transmission: "Manual",
    description: "",
    images: [],
  })

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const data = await vehicleService.getVehicles()
      setVehicles(data)
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingVehicle) {
        // Update existing vehicle
        const updatedVehicle = await vehicleService.updateVehicle(editingVehicle.id, formData)
        setVehicles(vehicles.map((v) => (v.id === editingVehicle.id ? updatedVehicle : v)))
        toast({
          title: "Vehicle Updated",
          description: "Vehicle details have been updated successfully.",
        })
      } else {
        // Add new vehicle
        const newVehicle = await vehicleService.createVehicle(formData)
        setVehicles([...vehicles, newVehicle])
        toast({
          title: "Vehicle Added",
          description: "New vehicle has been added successfully.",
        })
      }

      // Reset form
      setFormData({
        name: "",
        brand: "",
        year: new Date().getFullYear(),
        price: 0,
        mileage: "",
        fuelType: "Petrol",
        transmission: "Manual",
        description: "",
        images: [],
      })
      setIsAddingVehicle(false)
      setEditingVehicle(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle)
    setFormData({
      name: vehicle.name,
      brand: vehicle.brand,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage,
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      description: vehicle.description,
      images: vehicle.images,
    })
    setIsAddingVehicle(true)
  }

  const handleDelete = async (id) => {
    try {
      await vehicleService.deleteVehicle(id)
      setVehicles(vehicles.filter((v) => v.id !== id))
      toast({
        title: "Vehicle Deleted",
        description: "Vehicle has been removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete vehicle.",
        variant: "destructive",
      })
    }
  }

  const stats = {
    totalVehicles: vehicles.length,
    availableVehicles: vehicles.filter((v) => v.status === "available").length,
    soldVehicles: vehicles.filter((v) => v.status === "sold").length,
    totalValue: vehicles.reduce((sum, v) => sum + v.price, 0),
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your vehicle inventory and track performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalVehicles}</p>
              </div>
              <Car className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-3xl font-bold text-green-600">{stats.availableVehicles}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sold</p>
                <p className="text-3xl font-bold text-red-600">{stats.soldVehicles}</p>
              </div>
              <Users className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-purple-600">₹{(stats.totalValue / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Vehicle Button */}
      <div className="mb-6">
        <Button onClick={() => setIsAddingVehicle(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Vehicle
        </Button>
      </div>

      {/* Add/Edit Vehicle Form */}
      {isAddingVehicle && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Vehicle Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    placeholder="e.g., 25,000 km"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select
                    value={formData.fuelType}
                    onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="CNG">CNG</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    value={formData.transmission}
                    onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="CVT">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  placeholder="Enter vehicle description, features, condition, etc."
                />
              </div>

              <div>
                <Label>Vehicle Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload vehicle images</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  <Button type="button" variant="outline" className="mt-4 bg-transparent">
                    Choose Files
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingVehicle(false)
                    setEditingVehicle(null)
                    setFormData({
                      name: "",
                      brand: "",
                      year: new Date().getFullYear(),
                      price: 0,
                      mileage: "",
                      fuelType: "Petrol",
                      transmission: "Manual",
                      description: "",
                      images: [],
                    })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Vehicle List */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicles.length === 0 ? (
            <div className="text-center py-8">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No vehicles added yet</p>
              <p className="text-sm text-gray-500">Add your first vehicle to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Car className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                        <p className="text-gray-600">
                          {vehicle.brand} • {vehicle.year}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">{vehicle.mileage}</span>
                          <span className="text-sm text-gray-500">{vehicle.fuelType}</span>
                          <span className="text-sm text-gray-500">{vehicle.transmission}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">₹{vehicle.price.toLocaleString()}</p>
                      <Badge
                        variant={
                          vehicle.status === "available"
                            ? "default"
                            : vehicle.status === "sold"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {vehicle.status}
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(vehicle)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(vehicle.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
