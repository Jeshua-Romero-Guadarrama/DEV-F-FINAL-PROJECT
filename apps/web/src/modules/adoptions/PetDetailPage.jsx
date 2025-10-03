import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PetProfileHeader from "./components/PetProfileHeader.jsx"
import PetStory from "./components/PetStory.jsx"
import { petsService } from "../../services/petsService.js"

const mapMascota = (mascota) => ({
  id: mascota.id,
  nombre: mascota.nombre,
  edad: mascota.edad ? `${mascota.edad} años` : "Edad no disponible",
  sexo: mascota.sexo ?? "Sin dato",
  raza: mascota.raza ?? "Sin raza",
  descripcion: mascota.descripcion ?? "",
  foto: mascota.foto ?? "https://placekitten.com/600/360",
  galeria: [mascota.foto, ...(mascota.salud?.galeria ?? [])].filter(Boolean),
})

const PetDetailPage = () => {
  const { id } = useParams()
  const [mascota, setMascota] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMascota = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await petsService.detalleMascota(id)
        setMascota(mapMascota(response))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMascota()
  }, [id])

  if (loading) {
    return <p className="text-center text-sm text-charcoal/70">Cargando perfil...</p>
  }

  if (error) {
    return <p className="text-center text-sm text-red-500">{error}</p>
  }

  if (!mascota) {
    return null
  }

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <PetProfileHeader mascota={mascota} />
      <PetStory mascota={mascota} />
    </section>
  )
}

export default PetDetailPage
