"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Users, Clock } from "lucide-react"

const features = [
  {
    icon: CheckCircle,
    title: "Certified Quality",
    description: "Every vehicle is thoroughly inspected and certified",
    stats: "200+ Point Check",
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "Competitive pricing with transparent cost breakdown",
    stats: "30% Below Market",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Over 50,000 satisfied customers nationwide",
    stats: "50K+ Happy Customers",
  },
  {
    icon: Clock,
    title: "Quick Process",
    description: "Fast approval and delivery within 24 hours",
    stats: "24 Hour Delivery",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AutoHub?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the best car buying experience with unmatched quality and service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="text-2xl font-bold text-blue-600">{feature.stats}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
