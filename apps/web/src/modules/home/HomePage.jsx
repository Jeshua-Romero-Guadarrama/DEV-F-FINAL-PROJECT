import AboutSection from "./components/AboutSection.jsx"
import ContactSection from "./components/ContactSection.jsx"
import HeroCarousel from "./components/HeroCarousel.jsx"
import SupportSection from "./components/SupportSection.jsx"
import ThankYouBanner from "./components/ThankYouBanner.jsx"

const HomePage = () => {
  return (
    <>
      <HeroCarousel />
      <AboutSection />
      <SupportSection />
      <ThankYouBanner />
      <ContactSection />
    </>
  )
}

export default HomePage
