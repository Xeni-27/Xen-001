import { SignUp } from "@clerk/clerk-react"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp routing="path" path="/sign-up" redirectUrl="/" signInUrl="/sign-in" />
    </div>
  )
}
