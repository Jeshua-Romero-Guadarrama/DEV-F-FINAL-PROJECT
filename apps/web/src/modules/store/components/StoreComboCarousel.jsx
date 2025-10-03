const combos = [
  {
    title: "Kit cachorro aventurero",
    items: "Alimento premium + arnés acolchado + juguete mordedera",
    price: 950,
  },
  {
    title: "Pack gatuno relax",
    items: "Fuente de agua + catnip + cama iglú",
    price: 1140,
  },
  {
    title: "Combo bienestar senior",
    items: "Suplemento articular + snacks blandos + cepillo masaje",
    price: 1320,
  },
]

const StoreComboCarousel = () => {
  return (
    <section className="rounded-3xl bg-sunny/40 p-8 shadow-xl">
      <h3 className="font-baloo text-3xl text-peach">Combos pensados para cuidar</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {combos.map((combo) => (
          <article key={combo.title} className="rounded-2xl bg-white p-6 text-charcoal shadow-sm">
            <h4 className="font-fredoka text-xl text-peach">{combo.title}</h4>
            <p className="mt-3 text-sm text-charcoal/80">{combo.items}</p>
            <p className="mt-4 text-xl font-bold text-peach">${combo.price.toFixed(2)}</p>
            <button className="mt-4 w-full rounded-full bg-peach px-4 py-2 font-fredoka text-white transition hover:bg-peach/90">
              Agregar combo
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StoreComboCarousel
