const FormHero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-peach to-cream p-10 text-charcoal shadow-xl">
      <div className="grid gap-6 md:grid-cols-[1.5fr,1fr] md:items-center">
        <div>
          <p className="font-fredoka text-lg text-white/90">PawMatch  Adopta</p>
          <h1 className="mt-2 font-baloo text-4xl leading-tight text-white sm:text-5xl">
            Su nueva vida contigo está a un formulario de distancia
          </h1>
          <p className="mt-4 text-sm text-white/90">
            Completa los datos, confirma que tu hogar es seguro y genera el contrato de adopción para formalizar el proceso.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=480&q=80"
          alt="Perrito adoptable sonriendo"
          className="hidden h-60 w-full rounded-3xl object-cover drop-shadow-2xl md:block"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default FormHero
