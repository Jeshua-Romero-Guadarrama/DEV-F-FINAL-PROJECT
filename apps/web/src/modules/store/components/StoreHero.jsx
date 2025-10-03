const StoreHero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-peach to-cream p-10 text-white shadow-xl">
      <div className="max-w-xl">
        <p className="font-fredoka text-lg text-white/90">Todo lo que tu mejor amigo necesita</p>
        <h1 className="mt-4 font-baloo text-4xl leading-tight sm:text-5xl">
          Encuentra alimento, juguetes y amor en un solo lugar
        </h1>
        <p className="mt-6 text-sm text-white/90">
          El 20% de cada compra alimenta a mascotas sin hogar. Gracias por apoyar nuestra misión solidaria.
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=720&q=80"
        alt="Perritos felices"
        className="pointer-events-none absolute -bottom-14 right-6 hidden h-60 object-cover drop-shadow-2xl md:block"
        loading="lazy"
      />
    </section>
  )
}

export default StoreHero
