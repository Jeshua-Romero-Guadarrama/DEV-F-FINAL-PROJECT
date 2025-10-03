import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiLogIn, FiUserPlus } from "react-icons/fi"
import { authService } from "../../services/authService.js"
import { useAuth } from "../../context/AuthContext.jsx"

const LoginPage = () => {
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
      const response = await authService.login({
        email: form.email.trim(),
        password: form.password,
      })
      login(response)
      navigate("/store")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto mt-12 max-w-md rounded-3xl bg-white p-10 shadow-xl" lang="es">
      <h1 className="font-baloo text-3xl text-peach">Iniciar sesión</h1>
      <p className="mt-2 text-sm text-charcoal/80">
        Ingresa con tu correo y contraseña para continuar con tus procesos de adopción y compras solidarias.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Correo electrónico
          <input
            required
            type="email"
            value={form.email}
            onChange={updateField("email")}
            className="rounded-xl border border-charcoal/10 px-4 py-3 text-sm focus:border-peach focus:outline-none"
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
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-peach px-6 py-3 font-fredoka text-sm text-white transition hover:bg-peach/90 disabled:opacity-60"
        >
          <FiLogIn aria-hidden />
          {loading ? "Validando..." : "Entrar"}
        </button>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </form>
      <div className="mt-6 space-y-2 text-center text-xs text-charcoal/60">
        <p>
          ¿Aún no tienes cuenta?{' '}
          <button type="button" className="inline-flex items-center gap-1 text-peach" onClick={() => navigate("/register")}>
            <FiUserPlus className="text-sm" aria-hidden />
            <span>Regístrate</span>
          </button>
        </p>
        <p>
          ¿Eres parte del equipo de PawMatch? <Link to="/admin/login" className="text-peach underline-offset-4 hover:underline">Acceso para administradores</Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage
