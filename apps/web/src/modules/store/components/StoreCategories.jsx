const categories = [
  { label: "Alimento", image: "https://images.unsplash.com/photo-1619983081593-ec0cdb95e710?auto=format&fit=crop&w=200&q=80" },
  { label: "Premios", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=200&q=80" },
  { label: "Ropa", image: "https://images.unsplash.com/photo-1548677956-337a83b7e294?auto=format&fit=crop&w=200&q=80" },
  { label: "Juguetes", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80" },
  { label: "Accesorios", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=200&q=80" },
]

const StoreCategories = () => {
  return (
    <section className="mt-12 text-center">
      <h2 className="font-baloo text-3xl text-peach">¿Qué vas a comprar el día de hoy?</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-5">
        {categories.map((category) => (
          <article key={category.label} className="flex flex-col items-center gap-3">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-cream shadow-lg">
              <img src={category.image} alt={category.label} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <span className="font-fredoka text-sm text-charcoal/80">{category.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StoreCategories
