import { Link } from "react-router-dom"

const PetCard = ({ mascota }) => {
  return (
    <Link
      to={`/adoptions/${mascota.id}`}
      className="flex flex-col rounded-3xl border border-transparent bg-white p-4 shadow-md transition hover:-translate-y-1 hover:border-peach/40"
    >
      <div className="aspect-square overflow-hidden rounded-2xl">
        <img src={mascota.foto ?? "https://placekitten.com/400/400"} alt={mascota.nombre} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <h4 className="mt-4 font-fredoka text-xl text-charcoal">{mascota.nombre}</h4>
      <p className="text-sm text-charcoal/70">
        {mascota.edad ?? "Sin edad"} · {mascota.sexo ?? "Sin sexo"}
      </p>
    </Link>
  )
}

export default PetCard
