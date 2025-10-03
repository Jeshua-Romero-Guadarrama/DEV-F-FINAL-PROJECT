import { Link } from "react-router-dom"

const AdoptionHero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-peach to-cream p-10 text-white shadow-xl">
      <div className="grid gap-6 md:grid-cols-[1.5fr,1fr] md:items-center">
        <div>
          <p className="font-fredoka text-lg">Encuentra a tu nuevo mejor amigo</p>
          <h1 className="mt-4 font-baloo text-4xl leading-tight sm:text-5xl">
            Perros y gatos listos para llenar tu hogar de amor
          </h1>
          <p className="mt-6 text-sm text-white/90">
            Explora nuestro refugio virtual. Cada perfil incluye historia, personalidad y cuidados para elegir la adopción ideal.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/adoptions/form"
              className="rounded-full bg-white px-6 py-3 font-fredoka text-peach shadow-md transition hover:bg-cream"
            >
              Completar registro de adopción
            </Link>
            <a
              href="#listado-adopciones"
              className="rounded-full border border-white/80 px-6 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Ver mascotas disponibles
            </a>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=480&q=80"
          alt="Perrito adoptable"
          className="hidden h-60 w-full rounded-3xl object-cover drop-shadow-2xl md:block"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default AdoptionHero
