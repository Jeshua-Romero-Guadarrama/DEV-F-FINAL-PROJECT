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
    <section className="mx-auto flex max-w-4xl flex-col gap-8 py-10">
      <div className="text-center">
        <h1 className="font-baloo text-4xl text-peach">Hay orejitas, bigotes y miradas que derriten... ¡pase adelante!</h1>
        <p className="mt-4 font-fredoka text-lg text-charcoal">Descubre como cuidar de tu mascota</p>
        <p className="text-sm text-charcoal/70">Registrate y obtén informacion util para tus peluditos</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative rounded-[32px] bg-mint p-10 text-charcoal shadow-2xl"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            Nombre *
            <input
              required
              value={form.nombre}
              onChange={handleChange("nombre")}
              className="rounded-xl border border-white/40 bg-white px-4 py-3 placeholder:text-charcoal/50 focus:border-sunny focus:outline-none"
              type="text"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Apellido *
            <input
              required
              value={form.apellido}
              onChange={handleChange("apellido")}
              className="rounded-xl border border-white/40 bg-white px-4 py-3 placeholder:text-charcoal/50 focus:border-sunny focus:outline-none"
              type="text"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Correo electronico *
            <input
              required
              value={form.email}
              onChange={handleChange("email")}
              className="rounded-xl border border-white/40 bg-white px-4 py-3 placeholder:text-charcoal/50 focus:border-sunny focus:outline-none"
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
              className="rounded-xl border border-white/40 bg-white px-4 py-3 placeholder:text-charcoal/50 focus:border-sunny focus:outline-none"
              type="number"
            />
          </label>
          <div className="grid grid-cols-[1.2fr,2fr] gap-3 sm:col-span-2 sm:grid-cols-[1fr,2fr]">
            <label className="flex flex-col gap-2 text-sm">
              Lada
              <select
                value={form.lada}
                onChange={handleChange("lada")}
                className="rounded-xl border border-white/40 bg-white px-4 py-3 focus:border-sunny focus:outline-none"
              >
                <option value="+52">+52</option>
                <option value="+57">+57</option>
                <option value="+1">+1</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Telefono *
              <input
                required
                value={form.telefono}
                onChange={handleChange("telefono")}
                className="rounded-xl border border-white/40 bg-white px-4 py-3 placeholder:text-charcoal/50 focus:border-sunny focus:outline-none"
                type="tel"
              />
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            ¿Cuantos perros tienes?
            <select
              value={form.perros}
              onChange={handleChange("perros")}
              className="rounded-xl border border-white/40 bg-white px-4 py-3 focus:border-sunny focus:outline-none"
            >
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <option key={`dog-${value}`} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm">
            ¿Cuantos gatos tienes?
            <select
              value={form.gatos}
              onChange={handleChange("gatos")}
              className="rounded-xl border border-white/40 bg-white px-4 py-3 focus:border-sunny focus:outline-none"
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
            Al registrarme confirmo que soy mayor de edad y acepto los terminos y condiciones asi como el aviso de privacidad del sitio.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading || !form.aceptoTerminos}
          className="mt-8 w-full rounded-full bg-sunny px-8 py-3 font-fredoka text-charcoal shadow-lg transition hover:bg-sunny/80 disabled:opacity-60"
        >
          {loading ? "Registrando..." : "Registrarme"}
        </button>

        {message && <p className="mt-4 text-center text-sm text-white">{message}</p>}
        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}

        <img
          src="https://images.unsplash.com/photo-1558944351-c3ad271cafd8?auto=format&fit=crop&w=320&q=80"
          alt="Gato curioso"
          className="pointer-events-none absolute -right-6 -top-10 hidden h-40 w-40 rounded-full object-cover shadow-xl lg:block"
        />
        <img
          src="https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=320&q=80"
          alt="Perro contento"
          className="pointer-events-none absolute -left-8 bottom-24 hidden h-44 w-44 rounded-full object-cover shadow-xl lg:block"
        />
      </form>
    </section>
  )
}

export default CareGuidePage
