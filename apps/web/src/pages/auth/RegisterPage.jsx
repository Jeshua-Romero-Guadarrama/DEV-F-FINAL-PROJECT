import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authService } from "../../services/authService.js"

const initialForm = {
  nombre: "",
  email: "",
  password: "",
  telefono: "",
}

const RegisterPage = () => {
  const [form, setForm] = useState(initialForm)
  const [rol, setRol] = useState("adoptante")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await authService.register({ ...form, rol })
      setMessage("Registro exitoso. Ahora puedes iniciar sesion.")
      setForm(initialForm)
      setRol("adoptante")
      setTimeout(() => navigate("/login"), 800)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto mt-10 max-w-2xl rounded-3xl bg-cream p-10 shadow-xl">
      <h1 className="font-baloo text-3xl text-peach">Crear cuenta PawMatch</h1>
      <p className="mt-2 text-sm text-charcoal/80">
        Registra tu cuenta para gestionar solicitudes, compras y seguir el bienestar de tus peluditos.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Nombre completo
          <input
            required
            type="text"
            value={form.nombre}
            onChange={updateField("nombre")}
            className="rounded-xl border border-charcoal/10 px-4 py-3 focus:border-peach focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Correo electronico
          <input
            required
            type="email"
            value={form.email}
            onChange={updateField("email")}
            className="rounded-xl border border-charcoal/10 px-4 py-3 focus:border-peach focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Telefono
          <input
            required
            type="tel"
            value={form.telefono}
            onChange={updateField("telefono")}
            className="rounded-xl border border-charcoal/10 px-4 py-3 focus:border-peach focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Password
          <input
            required
            minLength={6}
            type="password"
            value={form.password}
            onChange={updateField("password")}
            className="rounded-xl border border-charcoal/10 px-4 py-3 focus:border-peach focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Rol
          <select
            value={rol}
            onChange={(event) => setRol(event.target.value)}
            className="rounded-xl border border-charcoal/10 px-4 py-3 focus:border-peach focus:outline-none"
          >
            <option value="adoptante">Adoptante</option>
            <option value="voluntario">Voluntario</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-full bg-peach px-6 py-3 font-fredoka text-white transition hover:bg-peach/90 disabled:opacity-60"
        >
          {loading ? "Registrando..." : "Registrarme"}
        </button>
        {message && <p className="text-center text-sm text-mint">{message}</p>}
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </form>
    </section>
  )
}

export default RegisterPage
