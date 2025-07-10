"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Wrench, CreditCard, Truck, FileText, Headphones } from "lucide-react"

const services = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "200+ point inspection ensures every vehicle meets our quality standards",
    color: "bg-blue-500",
  },
  {
    icon: Wrench,
    title: "Service & Maintenance",
    description: "Complete service history and ongoing maintenance support",
    color: "bg-green-500",
  },
  {
    icon: CreditCard,
    title: "Easy Financing",
    description: "Flexible loan options with competitive interest rates",
    color: "bg-purple-500",
  },
  {
    icon: Truck,
    title: "Home Delivery",
    description: "Free doorstep delivery within city limits",
    color: "bg-orange-500",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Complete paperwork assistance and legal compliance",
    color: "bg-red-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your queries",
    color: "bg-indigo-500",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide end-to-end solutions for all your automotive needs, ensuring a seamless car buying experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
