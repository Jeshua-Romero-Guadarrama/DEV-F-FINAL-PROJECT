import { Link } from "react-router-dom"

const PetProfileHeader = ({ mascota }) => {
  const galeria = mascota.galeria?.length ? mascota.galeria : [mascota.foto]
  return (
    <header className="rounded-3xl bg-white p-8 shadow-xl">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl">
            <img src={galeria[0]} alt={mascota.nombre} className="h-64 w-full object-cover" loading="lazy" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {galeria.slice(1, 4).map((foto, index) => (
              <div key={`mini-${index}`} className="overflow-hidden rounded-2xl">
                <img src={foto} alt={`${mascota.nombre} ${index}`} className="h-24 w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <aside className="flex flex-col items-start justify-between rounded-3xl bg-cream p-6 text-charcoal">
          <div>
            <h1 className="font-baloo text-4xl text-charcoal">{mascota.nombre}</h1>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
              <li>
                <strong>Edad:</strong> {mascota.edad}
              </li>
              <li>
                <strong>Sexo:</strong> {mascota.sexo}
              </li>
              <li>
                <strong>Raza:</strong> {mascota.raza}
              </li>
            </ul>
          </div>
          <Link
            to="/adoptions/form"
            className="mt-6 w-full rounded-full bg-peach px-6 py-3 text-center font-fredoka text-white transition hover:bg-peach/90"
          >
            Me gustaría adoptarlo
          </Link>
        </aside>
      </div>
    </header>
  )
}

export default PetProfileHeader
