const historias = [
  {
    nombre: "Toby",
    familia: "Familia Ramírez",
    resumen:
      "Llegó tímido pero en pocas semanas se volvió el compañero ideal de las caminatas matutinas. Ahora disfruta de una terraza llena de juguetes.",
    foto: "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?auto=format&fit=crop&w=320&q=80",
  },
  {
    nombre: "Luna",
    familia: "Laura y Nico",
    resumen:
      "Fue rescatada con desnutrición, pero hoy es la reina del departamento. Su ronroneo es la alarma natural de la casa.",
    foto: "https://images.unsplash.com/photo-1488036106564-87ecb155bb15?auto=format&fit=crop&w=320&q=80",
  },
]

const AdoptionSuccessStories = () => {
  return (
    <section className="rounded-3xl bg-peach/10 p-10 text-charcoal shadow-xl">
      <h3 className="font-baloo text-3xl text-peach">Historias que nos inspiran</h3>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {historias.map((historia) => (
          <article key={historia.nombre} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={historia.foto}
                alt={historia.nombre}
                className="h-16 w-16 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-fredoka text-lg text-peach">{historia.nombre}</p>
                <span className="text-xs text-charcoal/60">Con {historia.familia}</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-charcoal/80">{historia.resumen}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AdoptionSuccessStories
