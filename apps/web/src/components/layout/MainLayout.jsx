import Footer from "./Footer.jsx"
import Navbar from "./Navbar.jsx"

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pb-20">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
