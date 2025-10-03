import { Link } from "react-router-dom"

const categories = [
  {
    label: "Todos",
    value: "",
    image: "https://images.unsplash.com/photo-1516728778615-2d590ea18538?auto=format&fit=crop&w=200&q=80",
  },
  {
    label: "Alimento",
    value: "alimento",
    image: "https://images.unsplash.com/photo-1619983081593-ec0cdb95e710?auto=format&fit=crop&w=200&q=80",
  },
  {
    label: "Premios",
    value: "premios",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=200&q=80",
  },
  {
    label: "Ropa",
    value: "ropa",
    image: "https://images.unsplash.com/photo-1548677956-337a83b7e294?auto=format&fit=crop&w=200&q=80",
  },
  {
    label: "Juguetes",
    value: "juguetes",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80",
  },
  {
    label: "Accesorios",
    value: "accesorios",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=200&q=80",
  },
]

const StoreCategories = ({ activeCategory, onSelect }) => {
  return (
    <section className="mt-12 text-center" aria-label="Categorías de la tienda">
      <h2 className="font-baloo text-3xl text-peach">¿Qué vas a comprar el día de hoy?</h2>
      <div className="mt-4 flex justify-center">
        <Link
          to="/cart"
          className="inline-flex items-center justify-center rounded-full bg-peach px-6 py-2 font-fredoka text-white transition hover:bg-peach/90"
        >
          Finalizar compra
        </Link>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-6">
        {categories.map((category) => {
          const isActive = activeCategory === category.value
          return (
            <button
              key={category.value}
              type="button"
              onClick={() => onSelect(category.value)}
              className={`flex flex-col items-center gap-3 rounded-3xl border-2 transition ${
                isActive ? "border-peach bg-white shadow-lg" : "border-transparent bg-white/70 hover:border-peach/40"
              }`}
            >
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-cream shadow-lg">
                <img src={category.image} alt={category.label} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <span className="font-fredoka text-sm text-charcoal/80">{category.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default StoreCategories
