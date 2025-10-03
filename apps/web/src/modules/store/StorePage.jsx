import { useEffect, useState } from "react"
import StoreCategories from "./components/StoreCategories.jsx"
import StoreHero from "./components/StoreHero.jsx"
import StoreHighlight from "./components/StoreHighlight.jsx"
import StoreProductGrid from "./components/StoreProductGrid.jsx"
import StorePagination from "./components/StorePagination.jsx"
import CartSummary from "./components/CartSummary.jsx"
import StoreBenefits from "./components/StoreBenefits.jsx"
import StoreTestimonials from "./components/StoreTestimonials.jsx"
import StoreComboCarousel from "./components/StoreComboCarousel.jsx"
import { productsService } from "../../services/productsService.js"

const StorePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [authReminder, setAuthReminder] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        // Consulta al backend para obtener el catalogo vigente
        const response = await productsService.list()
        setProducts(response)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <StoreHero />
      <StoreCategories />
      <StoreHighlight />
      <StoreComboCarousel />
      <StoreBenefits />

      {authReminder && (
        <p className="rounded-2xl bg-peach/20 px-6 py-3 text-center text-sm text-peach">
          Debes iniciar sesión o crear una cuenta para agregar productos al carrito.
        </p>
      )}

      {loading && <p className="text-center text-sm text-charcoal/70">Cargando productos...</p>}
      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.2fr)]">
        <div>
          <StoreProductGrid products={products} onRequireAuth={() => setAuthReminder(true)} />
          <StorePagination />
        </div>
        <CartSummary />
      </div>

      <StoreTestimonials />
    </section>
  )
}

export default StorePage
