const AdoptionHero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-peach to-cream p-10 text-white shadow-xl">
      <div className="max-w-xl">
        <p className="font-fredoka text-lg">Encuentra a tu nuevo mejor amigo</p>
        <h1 className="mt-4 font-baloo text-4xl leading-tight sm:text-5xl">
          Perros y gatos listos para llenar tu hogar de amor
        </h1>
        <p className="mt-6 text-sm text-white/90">
          Explora nuestro refugio virtual. Cada perfil incluye historia, personalidad y cuidados para elegir la adopción ideal.
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

export default AdoptionHero
