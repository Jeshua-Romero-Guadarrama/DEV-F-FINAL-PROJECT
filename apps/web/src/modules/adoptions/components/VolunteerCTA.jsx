const VolunteerCTA = () => {
  return (
    <section className="rounded-3xl bg-sunny/60 p-10 text-charcoal shadow-xl">
      <div className="grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
        <div>
          <h3 className="font-baloo text-3xl text-peach">¿No puedes adoptar? ¡Suma tu talento!</h3>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/80">
            Buscamos voluntariado para traslados, difusión y socialización de peluditos. Regístrate y recibe nuestras jornadas
            de entrenamiento mensual.
          </p>
          <button className="mt-6 rounded-full bg-peach px-6 py-3 font-fredoka text-white transition hover:bg-peach/90">
            Quiero ser voluntario
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=360&q=80"
          alt="Voluntaria paseando a un perro"
          className="hidden h-52 rounded-3xl object-cover md:block"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default VolunteerCTA
