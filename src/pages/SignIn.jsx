import { SignIn } from "@clerk/clerk-react"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn routing="path" path="/sign-in" redirectUrl="/" signUpUrl="/sign-up" />
    </div>
  )
}
