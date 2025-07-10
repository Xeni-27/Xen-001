import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// This would typically connect to your Neon database
// For now, we'll use mock data

interface Vehicle {
  id: string
  name: string
  brand: string
  year: number
  price: number
  mileage: string
  fuelType: string
  transmission: string
  description: string
  images: string[]
  status: "available" | "sold" | "pending"
  createdAt: string
  updatedAt: string
}

const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "Honda City",
    brand: "Honda",
    year: 2020,
    price: 850000,
    mileage: "25,000 km",
    fuelType: "Petrol",
    transmission: "Manual",
    description: "Well-maintained Honda City with complete service history. Single owner, excellent condition.",
    images: ["/placeholder.svg?height=400&width=600"],
    status: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(vehicles)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const newVehicle: Vehicle = {
      ...body,
      id: Date.now().toString(),
      status: "available",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    vehicles.push(newVehicle)

    return NextResponse.json(newVehicle, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create vehicle" }, { status: 500 })
  }
}
