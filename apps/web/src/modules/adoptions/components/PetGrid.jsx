import PetCard from "./PetCard.jsx"

const PetGrid = ({ mascotas }) => {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mascotas.map((mascota) => (
        <PetCard key={mascota.id} mascota={mascota} />
      ))}
      {mascotas.length === 0 && (
        <p className="col-span-full text-center text-sm text-charcoal/60">
          No encontramos peluditos con esos filtros. Prueba cambiar la búsqueda.
        </p>
      )}
    </section>
  )
}

export default PetGrid
