"use client"

import { useUser } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"

export function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />
  }

  return children
}
