const PetStory = ({ mascota }) => {
  return (
    <article className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="font-baloo text-3xl text-peach">Conoce m�s sobre {mascota.nombre}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-charcoal/80">
        <p>
          {mascota.descripcion
            ? mascota.descripcion
            : `${mascota.nombre} est� listo para encontrar un hogar lleno de cari�o. Comparte paseos, juegos y mucha compa��a.`}
        </p>
        <p>
          <strong>Historia resumida:</strong> Nuestro equipo lo rescat� y cuid� hasta asegurar que est� sano, vacunado y listo para convivir con su nueva familia.
        </p>
        <p>
          Si deseas conocerlo, agenda una visita y te acompa�aremos durante el proceso de adopci�n.
        </p>
      </div>
    </article>
  )
}

export default PetStory
