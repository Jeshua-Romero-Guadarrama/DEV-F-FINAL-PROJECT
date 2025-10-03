import { useState } from "react"
import { leadsService } from "../../services/leadsService.js"

const initialState = {
  nombre: "",
  apellido: "",
  email: "",
  edad: "",
  lada: "+52",
  telefono: "",
  perros: "0",
  gatos: "0",
  aceptoTerminos: false,
}

const CareGuidePage = () => {
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      await leadsService.createLead({
        ...form,
        edad: Number(form.edad),
        perros: Number(form.perros),
        gatos: Number(form.gatos),
      })
      setMessage("Gracias por registrarte, pronto recibirás consejos personalizados.")
      setForm(initialState)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12" lang="es">
      <div className="grid items-start gap-10 lg:grid-cols-[1.05fr,0.95fr]">
        <article className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-mint/60 via-white to-mint/40 p-10 text-charcoal shadow-xl">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-peach/20 blur-3xl" aria-hidden />
          <h1 className="font-baloo text-4xl text-peach">
            Hay orejitas, bigotes y miradas que derriten... ¡pase adelante!
          </h1>
          <p className="mt-4 font-fredoka text-xl text-charcoal">Descubre cómo cuidar de tu mascota</p>
          <p className="mt-2 max-w-xl text-sm text-charcoal/70">
            Regístrate y obtén información útil para tus peluditos: tips de salud, alimentación responsable y recordatorios de citas veterinarias.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/80 p-5 shadow-md backdrop-blur">
              <p className="font-fredoka text-sm uppercase tracking-wide text-peach">Contenido exclusivo</p>
              <p className="mt-2 text-sm text-charcoal/80">
                Recibe guías descargables, calendarios de vacunas y recomendaciones aprobadas por profesionales mexicanos.
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-5 shadow-md backdrop-blur">
              <p className="font-fredoka text-sm uppercase tracking-wide text-peach">Comunidad</p>
              <p className="mt-2 text-sm text-charcoal/80">
                Únete a las sesiones mensuales con especialistas en bienestar animal y comportamiento.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:[grid-template-columns:auto_1fr] md:items-center">
            <div className="flex gap-4">
              <figure className="overflow-hidden rounded-3xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1558944351-c3ad271cafd8?auto=format&fit=crop&w=320&q=80"
                  alt="Gato curioso asomándose"
                  className="h-32 w-28 object-cover"
                  loading="lazy"
                />
              </figure>
              <figure className="mt-6 overflow-hidden rounded-3xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=320&q=80"
                  alt="Perro contento mirando a la cámara"
                  className="h-36 w-32 object-cover"
                  loading="lazy"
                />
              </figure>
            </div>
            <blockquote className="rounded-3xl bg-white/80 p-6 text-sm text-charcoal/80 shadow-inner">
              <p>
                “Los recordatorios de PawMatch me ayudaron a organizar las vacunas de mis dos peludos. ¡La guía es facilísima de seguir!”
              </p>
              <footer className="mt-3 font-fredoka text-peach">Mariana, tutora de Bruno y Nala</footer>
            </blockquote>
          </div>
        </article>

        <form onSubmit={handleSubmit} className="rounded-[32px] bg-white p-8 text-charcoal shadow-2xl">
          <h2 className="font-baloo text-2xl text-peach">Regístrate gratis</h2>
          <p className="mt-2 text-sm text-charcoal/70">
            Déjanos tus datos y envíaremos información personalizada para el bienestar de tus mascotas.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              Nombre *
              <input
                required
                value={form.nombre}
                onChange={handleChange("nombre")}
                className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm placeholder:text-charcoal/40 focus:border-peach focus:outline-none"
                type="text"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Apellido *
              <input
                required
                value={form.apellido}
                onChange={handleChange("apellido")}
                className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm placeholder:text-charcoal/40 focus:border-peach focus:outline-none"
                type="text"
              />
            </label>
            <label className="sm:col-span-2 flex flex-col gap-2 text-sm">
              Correo electrónico *
              <input
                required
                value={form.email}
                onChange={handleChange("email")}
                className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm placeholder:text-charcoal/40 focus:border-peach focus:outline-none"
                type="email"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Edad *
              <input
                required
                min={18}
                value={form.edad}
                onChange={handleChange("edad")}
                className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm placeholder:text-charcoal/40 focus:border-peach focus:outline-none"
                type="number"
              />
            </label>
            <div className="grid grid-cols-1 gap-3 sm:[grid-template-columns:1.1fr_2fr]">
              <label className="flex flex-col gap-2 text-sm">
                Lada
                <select
                  value={form.lada}
                  onChange={handleChange("lada")}
                  className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm focus:border-peach focus:outline-none"
                >
                  <option value="+52">+52</option>
                  <option value="+57">+57</option>
                  <option value="+1">+1</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Teléfono *
                <input
                  required
                  value={form.telefono}
                  onChange={handleChange("telefono")}
                  className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm placeholder:text-charcoal/40 focus:border-peach focus:outline-none"
                  type="tel"
                />
              </label>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              ¿Cuántos perros tienes?
              <select
                value={form.perros}
                onChange={handleChange("perros")}
                className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm focus:border-peach focus:outline-none"
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={`dog-${value}`} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              ¿Cuántos gatos tienes?
              <select
                value={form.gatos}
                onChange={handleChange("gatos")}
                className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm focus:border-peach focus:outline-none"
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={`cat-${value}`} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-6 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.aceptoTerminos}
              onChange={handleChange("aceptoTerminos")}
              className="mt-1 h-4 w-4 rounded border-charcoal/40 text-peach focus:ring-peach"
            />
            <span>
              Al registrarme confirmo que soy mayor de edad y acepto los términos y condiciones así como el aviso de privacidad del sitio.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading || !form.aceptoTerminos}
            className="mt-8 w-full rounded-full bg-sunny px-8 py-3 font-fredoka text-sm text-charcoal shadow-lg transition hover:bg-sunny/80 disabled:opacity-60"
          >
            {loading ? "Registrando..." : "Registrarme"}
          </button>

          {message && <p className="mt-4 text-center text-sm text-peach">{message}</p>}
          {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </section>
  )
}

export default CareGuidePage
