import { useEffect, useMemo, useState } from "react"
import AdoptionHero from "./components/AdoptionHero.jsx"
import FilterPanel from "./components/FilterPanel.jsx"
import Pagination from "./components/Pagination.jsx"
import PetGrid from "./components/PetGrid.jsx"
import AdoptionProcess from "./components/AdoptionProcess.jsx"
import AdoptionSuccessStories from "./components/AdoptionSuccessStories.jsx"
import VolunteerCTA from "./components/VolunteerCTA.jsx"
import { petsService } from "../../services/petsService.js"

const mapMascota = (mascota) => ({
  id: mascota.id,
  nombre: mascota.nombre,
  edad: mascota.edad ? `${mascota.edad} años` : "Edad no disponible",
  sexo: mascota.sexo ?? "Sin dato",
  raza: mascota.raza ?? "Sin raza",
  descripcion: mascota.descripcion ?? "",
  foto: mascota.foto,
  galeria: [mascota.foto, ...(mascota.salud?.galeria ?? [])].filter(Boolean),
})

const AdoptionsPage = () => {
  const [mascotas, setMascotas] = useState([])
  const [filtros, setFiltros] = useState({ tipo: "todos", sexo: "todos" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMascotas = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = {}
        if (filtros.tipo === "perro") params.tipo = "perro"
        if (filtros.tipo === "gato") params.tipo = "gato"
        const response = await petsService.listarMascotas(params)
        setMascotas(response.map(mapMascota))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMascotas()
  }, [filtros.tipo])

  const filtradas = useMemo(() => {
    if (filtros.sexo === "todos") {
      return mascotas
    }
    return mascotas.filter((mascota) => (mascota.sexo ?? "").toLowerCase() === filtros.sexo)
  }, [mascotas, filtros.sexo])

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <AdoptionHero />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,3fr)]">
        <FilterPanel filtros={filtros} onChange={setFiltros} />
        <div className="flex flex-col gap-6">
          {loading && <p className="text-center text-sm text-charcoal/70">Cargando mascotas...</p>}
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          {!loading && !error && <PetGrid mascotas={filtradas} />}
          <Pagination />
        </div>
      </div>
      <AdoptionProcess />
      <AdoptionSuccessStories />
      <VolunteerCTA />
    </section>
  )
}

export default AdoptionsPage
