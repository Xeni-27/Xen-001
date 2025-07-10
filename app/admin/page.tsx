import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default async function AdminPage() {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // In a real app, you'd check if the user has admin role
  // For now, we'll assume they do if they're signed in

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
    </div>
  )
}
