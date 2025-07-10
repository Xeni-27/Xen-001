"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How do you ensure the quality of used cars?",
    answer:
      "Every vehicle undergoes a comprehensive 200+ point inspection covering engine, transmission, brakes, electrical systems, and more. We provide detailed inspection reports and only sell cars that meet our strict quality standards.",
  },
  {
    question: "Do you provide warranty on used cars?",
    answer:
      "Yes, we provide warranty coverage on all our certified pre-owned vehicles. The warranty period varies based on the car's age and condition, typically ranging from 6 months to 2 years.",
  },
  {
    question: "Can I get financing for my car purchase?",
    answer:
      "We have partnerships with leading banks and financial institutions to offer competitive loan rates. Our finance team will help you find the best financing option based on your requirements.",
  },
  {
    question: "Is there a return policy?",
    answer:
      "We offer a 7-day return policy if you're not completely satisfied with your purchase. The car must be returned in the same condition with original documents.",
  },
  {
    question: "Do you accept car exchange?",
    answer:
      "Yes, we accept your old car as part exchange. Our experts will evaluate your vehicle and offer a fair market price that can be adjusted against your new car purchase.",
  },
  {
    question: "How long does the buying process take?",
    answer:
      "Once you've selected your car and completed the documentation, the entire process typically takes 2-3 hours. We can also arrange home delivery within 24 hours.",
  },
  {
    question: "Are the prices negotiable?",
    answer:
      "Our prices are already competitive and based on market research. However, we do consider reasonable offers and can discuss pricing based on the specific vehicle and your requirements.",
  },
  {
    question: "What documents do I need to buy a car?",
    answer:
      "You'll need a valid driving license, PAN card, Aadhaar card, address proof, and income proof (for financing). Our team will guide you through the complete documentation process.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers. Find everything you need to know about buying a car with AutoHub.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+91-9876543210"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Call Us: +91-9876543210
            </a>
            <a
              href="mailto:support@autohub.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Email: support@autohub.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
