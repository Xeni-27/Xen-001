import Link from "next/link"
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">AutoHub</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for premium quality second-hand cars. We ensure transparency, quality, and the best
              prices for all our customers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/cars" className="text-gray-300 hover:text-white transition-colors">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/financing" className="text-gray-300 hover:text-white transition-colors">
                  Car Financing
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="text-gray-300 hover:text-white transition-colors">
                  Car Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Car Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Car Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/cars?type=hatchback" className="text-gray-300 hover:text-white transition-colors">
                  Hatchback Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?type=sedan" className="text-gray-300 hover:text-white transition-colors">
                  Sedan Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?type=suv" className="text-gray-300 hover:text-white transition-colors">
                  SUV Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?type=luxury" className="text-gray-300 hover:text-white transition-colors">
                  Luxury Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?fuel=electric" className="text-gray-300 hover:text-white transition-colors">
                  Electric Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?price=budget" className="text-gray-300 hover:text-white transition-colors">
                  Budget Cars
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    123 Auto Street, Car District,
                    <br />
                    Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+91-9876543210</p>
                  <p className="text-gray-300">+91-9876543211</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">info@autohub.com</p>
                  <p className="text-gray-300">support@autohub.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 AutoHub. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
