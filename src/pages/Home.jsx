import Navigation from "../components/Navigation"
import HeroSection from "../components/HeroSection"
import ServicesSection from "../components/ServicesSection"
import WhyChooseUs from "../components/WhyChooseUs"
import PopularVehicles from "../components/PopularVehicles"
import BrowseByBrands from "../components/BrowseByBrands"
import TestimonialsSection from "../components/TestimonialsSection"
import FAQSection from "../components/FAQSection"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <PopularVehicles />
      <BrowseByBrands />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
