import { Route, Routes } from "react-router-dom"
import MainLayout from "../components/layout/MainLayout.jsx"
import HomePage from "../modules/home/HomePage.jsx"
import StorePage from "../modules/store/StorePage.jsx"
import AdoptionsPage from "../modules/adoptions/AdoptionsPage.jsx"
import PetDetailPage from "../modules/adoptions/PetDetailPage.jsx"
import AdoptionFormPage from "../modules/adoptionForm/AdoptionFormPage.jsx"
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx"
import CareGuidePage from "../pages/care/CareGuidePage.jsx"
import LoginPage from "../pages/auth/LoginPage.jsx"
import RegisterPage from "../pages/auth/RegisterPage.jsx"

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adoptions" element={<AdoptionsPage />} />
        <Route path="/adoptions/:id" element={<PetDetailPage />} />
        <Route path="/adoptions/form" element={<AdoptionFormPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/care-guide" element={<CareGuidePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
