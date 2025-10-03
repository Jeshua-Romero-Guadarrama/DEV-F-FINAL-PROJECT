import { useEffect, useMemo, useState } from "react"
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
import { fallbackProducts } from "./data/fallbackProducts.js"

const ITEMS_PER_PAGE = 8

const StorePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [authReminder, setAuthReminder] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [categoryFilter])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = {}
        if (categoryFilter) {
          params.categoria = categoryFilter
        }
        let data = await productsService.list(params)
        if (!Array.isArray(data) || data.length === 0) {
          data = fallbackProducts
        }
        if (categoryFilter) {
          data = data.filter((product) => (product.categoria ?? "") === categoryFilter)
        }
        setProducts(data)
      } catch (err) {
        setError(err.message)
        let data = fallbackProducts
        if (categoryFilter) {
          data = data.filter((product) => (product.categoria ?? "") === categoryFilter)
        }
        setProducts(data)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryFilter])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE)), [products])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return products.slice(start, start + ITEMS_PER_PAGE)
  }, [products, currentPage])

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10" lang="es">
      <StoreHero />
      <StoreCategories activeCategory={categoryFilter} onSelect={setCategoryFilter} />

      {authReminder && (
        <p className="rounded-2xl bg-peach/20 px-6 py-3 text-center text-sm text-peach">
          Debes iniciar sesión o crear una cuenta para agregar productos al carrito.
        </p>
      )}
      {loading && <p className="text-center text-sm text-charcoal/70">Cargando productos...</p>}
      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.2fr)]">
        <div>
          <StoreProductGrid products={paginatedProducts} onRequireAuth={() => setAuthReminder(true)} />
          <StorePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        <CartSummary />
      </div>

      <StoreHighlight />
      <StoreComboCarousel />
      <StoreBenefits />
      <StoreTestimonials />
    </section>
  )
}

export default StorePage
