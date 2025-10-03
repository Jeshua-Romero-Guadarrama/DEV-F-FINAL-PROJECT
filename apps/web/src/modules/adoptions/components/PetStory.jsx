const PetStory = ({ mascota }) => {
  return (
    <article className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="font-baloo text-3xl text-peach">Conoce más sobre {mascota.nombre}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-charcoal/80">
        <p>
          {mascota.descripcion
            ? mascota.descripcion
            : `${mascota.nombre} está listo para encontrar un hogar lleno de cariño. Comparte paseos, juegos y mucha compañía.`}
        </p>
        <p>
          <strong>Historia resumida:</strong> Nuestro equipo lo rescató y cuidó hasta asegurar que esté sano, vacunado y listo para convivir con su nueva familia.
        </p>
        <p>
          Si deseas conocerlo, agenda una visita y te acompañaremos durante el proceso de adopción.
        </p>
      </div>
    </article>
  )
}

export default PetStory
