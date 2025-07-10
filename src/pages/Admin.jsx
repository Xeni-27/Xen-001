"use client"

import { useUser } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"
import AdminDashboard from "../components/admin/AdminDashboard"

export default function Admin() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />
  }

  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === "admin"

  if (!isAdmin) {
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
    </div>
  )
}
