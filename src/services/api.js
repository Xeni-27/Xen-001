import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("clerk-token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const vehicleService = {
  getVehicles: async () => {
    try {
      const response = await api.get("/vehicles")
      return response.data
    } catch (error) {
      // Return mock data if API fails
      return [
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
          status: "available",
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
          status: "available",
        },
      ]
    }
  },

  getVehicle: async (id) => {
    const response = await api.get(`/vehicles/${id}`)
    return response.data
  },

  createVehicle: async (vehicleData) => {
    const response = await api.post("/vehicles", vehicleData)
    return response.data
  },

  updateVehicle: async (id, vehicleData) => {
    const response = await api.put(`/vehicles/${id}`, vehicleData)
    return response.data
  },

  deleteVehicle: async (id) => {
    const response = await api.delete(`/vehicles/${id}`)
    return response.data
  },

  searchVehicles: async (query) => {
    const response = await api.get(`/vehicles/search?q=${encodeURIComponent(query)}`)
    return response.data
  },
}

export default api
