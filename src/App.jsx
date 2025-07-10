import { Routes, Route } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"
import Home from "./pages/Home"
import Cars from "./pages/Cars"
import CarDetail from "./pages/CarDetail"
import Search from "./pages/Search"
import Admin from "./pages/Admin"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
