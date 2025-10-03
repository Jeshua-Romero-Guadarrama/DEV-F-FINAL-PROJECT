import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PetProfileHeader from "./components/PetProfileHeader.jsx"
import PetStory from "./components/PetStory.jsx"
import { petsService } from "../../services/petsService.js"

const fallbackMascota = {
  id: "seed-toby",
  nombre: "Toby",
  edad: "2 años",
  sexo: "macho",
  raza: "Border Collie",
  descripcion:
    "Con su mirada tierna y energía inagotable, Toby sueña con un hogar donde pueda correr libre, jugar y compartir cada día con una familia que lo quiera tanto como él sabrá quererla.",
  foto: "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?auto=format&fit=crop&w=640&q=80",
  galeria: [
    "https://images.unsplash.com/photo-1437957146754-f6377debe171?auto=format&fit=crop&w=320&q=80",
    "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=320&q=80",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=320&q=80",
  ],
}

const mapMascota = (mascota) => ({
  id: mascota.id,
  nombre: mascota.nombre,
  edad: mascota.edad ? `${mascota.edad}` : "Edad no disponible",
  sexo: mascota.sexo ?? "Sin dato",
  raza: mascota.raza ?? "Sin raza",
  descripcion: mascota.descripcion ?? fallbackMascota.descripcion,
  foto: mascota.foto ?? fallbackMascota.foto,
  galeria: mascota.galeria && mascota.galeria.length > 0 ? mascota.galeria : fallbackMascota.galeria,
})

const PetDetailPage = () => {
  const { id } = useParams()
  const [mascota, setMascota] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMascota = async () => {
      setLoading(true)
      try {
        if (id === fallbackMascota.id) {
          setMascota(fallbackMascota)
        } else {
          const response = await petsService.detalleMascota(id)
          setMascota(mapMascota(response))
        }
      } catch (error) {
        console.warn("No se encontró la mascota, usando fallback", error)
        setMascota(fallbackMascota)
      } finally {
        setLoading(false)
      }
    }

    fetchMascota()
  }, [id])

  if (loading) {
    return <p className="text-center text-sm text-charcoal/70">Cargando perfil...</p>
  }

  if (!mascota) {
    return <p className="text-center text-sm text-red-500">No pudimos cargar la información de la mascota.</p>
  }

  const vistaMascota = mapMascota(mascota)

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <PetProfileHeader mascota={vistaMascota} />
      <PetStory mascota={vistaMascota} />
    </section>
  )
}

export default PetDetailPage
