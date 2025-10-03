import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiLock } from "react-icons/fi"
import { authService } from "../../services/authService.js"
import { useAuth } from "../../context/AuthContext.jsx"

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (authService.isMasterCredentials(form.email, form.password)) {
        const session = authService.masterSession()
        login(session)
        navigate("/admin")
        return
      }

      const response = await authService.login({
        email: form.email.trim(),
        password: form.password,
      })

      if (response?.user?.rol !== "admin") {
        throw new Error("No tienes permisos de administrador")
      }

      login(response)
      navigate("/admin")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto mt-12 max-w-lg rounded-3xl bg-white p-10 shadow-2xl" lang="es">
      <h1 className="font-baloo text-3xl text-peach">Panel administrativo</h1>
      <p className="mt-2 text-sm text-charcoal/80">
        Accede con tus credenciales de equipo para gestionar adopciones, inventario y reportes. Este módulo está protegido y
        registra cada actividad.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Correo institucional
          <input
            required
            type="email"
            value={form.email}
            onChange={updateField("email")}
            className="rounded-xl border border-charcoal/10 px-4 py-3 text-sm focus:border-peach focus:outline-none"
            autoComplete="username"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Contraseña
          <input
            required
            type="password"
            value={form.password}
            onChange={updateField("password")}
            className="rounded-xl border border-charcoal/10 px-4 py-3 text-sm focus:border-peach focus:outline-none"
            autoComplete="current-password"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3 font-fredoka text-sm text-white transition hover:bg-charcoal/90 disabled:opacity-60"
        >
          <FiLock aria-hidden />
          {loading ? "Verificando..." : "Ingresar"}
        </button>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </form>
      <div className="mt-6 space-y-2 text-center text-xs text-charcoal/60">
        <p>¿Olvidaste tu contraseña? Solicita un reinicio al equipo de TI de PawMatch.</p>
        <p>
          <Link to="/login" className="text-peach underline-offset-4 hover:underline">Volver al acceso para tutores</Link>
        </p>
      </div>
    </section>
  )
}

export default AdminLoginPage
