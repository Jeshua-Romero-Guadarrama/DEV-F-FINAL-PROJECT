import { useMemo } from "react"
import { useAuth } from "../../../context/AuthContext.jsx"
import { useCart } from "../../../context/CartContext.jsx"

const StoreProductGrid = ({ products, onRequireAuth }) => {
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()

  const formattedProducts = useMemo(() => products ?? [], [products])

  const handleAdd = (product) => {
    if (!isAuthenticated) {
      // Se avisa a la pagina que el usuario debe autenticarse primero
      onRequireAuth()
      return
    }
    addItem(product)
  }

  return (
    <section className="mt-10">
      <h3 className="font-baloo text-3xl text-peach">Productos destacados</h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {formattedProducts.map((product) => (
          <article key={product.id} className="flex flex-col rounded-3xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <div className="aspect-square overflow-hidden rounded-2xl bg-cream">
              {product.imagen ? (
                <img src={product.imagen} alt={product.nombre} className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-charcoal/50">Sin imagen</div>
              )}
            </div>
            <h4 className="mt-4 font-fredoka text-lg text-charcoal">{product.nombre}</h4>
            <p className="mt-2 text-sm text-charcoal/70">{product.descripcion ?? ""}</p>
            <p className="mt-4 text-xl font-bold text-peach">${product.precio?.toFixed(2)}</p>
            <button
              type="button"
              onClick={() => handleAdd(product)}
              className="mt-4 rounded-full bg-peach px-4 py-2 font-fredoka text-white transition hover:bg-peach/90"
            >
              Agregar al carrito
            </button>
          </article>
        ))}
      </div>
      {formattedProducts.length === 0 && (
        <p className="mt-6 text-center text-sm text-charcoal/60">No hay productos disponibles en este momento.</p>
      )}
    </section>
  )
}

export default StoreProductGrid
