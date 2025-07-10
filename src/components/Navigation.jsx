"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Search, Menu, X, Car } from "lucide-react"
import { useUser, UserButton } from "@clerk/clerk-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const { isSignedIn, user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const isAdmin = user?.publicMetadata?.role === "admin"

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">AutoHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/cars" className="text-gray-700 hover:text-blue-600 transition-colors">
              Browse Cars
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </form>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex space-x-2">
                <Link to="/sign-in">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </form>

              <Link to="/" className="block px-3 py-2 text-gray-700">
                Home
              </Link>
              <Link to="/cars" className="block px-3 py-2 text-gray-700">
                Browse Cars
              </Link>
              <Link to="/services" className="block px-3 py-2 text-gray-700">
                Services
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700">
                About
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700">
                Contact
              </Link>
              {isAdmin && (
                <Link to="/admin" className="block px-3 py-2 text-gray-700">
                  Admin Dashboard
                </Link>
              )}

              <div className="pt-4 border-t">
                {isSignedIn ? (
                  <div className="px-3 py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <div className="flex space-x-2 px-3">
                    <Link to="/sign-in" className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/sign-up" className="flex-1">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
