import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
      const response = await authService.login(form)
      login(response)
      navigate("/store")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto mt-10 max-w-md rounded-3xl bg-white p-10 shadow-xl">
      <h1 className="font-baloo text-3xl text-peach">Iniciar sesion</h1>
      <p className="mt-2 text-sm text-charcoal/80">
        Ingresa con tus credenciales registradas para continuar con tus adopciones y compras.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
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
          Password
          <input
            required
            type="password"
            value={form.password}
            onChange={updateField("password")}
            className="rounded-xl border border-charcoal/10 px-4 py-3 focus:border-peach focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-full bg-peach px-6 py-3 font-fredoka text-white transition hover:bg-peach/90 disabled:opacity-60"
        >
          {loading ? "Validando..." : "Entrar"}
        </button>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </form>
      <p className="mt-6 text-center text-xs text-charcoal/60">
        ¿Aun no tienes cuenta? <button type="button" className="text-peach" onClick={() => navigate("/register")}>Registrate</button>
      </p>
    </section>
  )
}

export default LoginPage
