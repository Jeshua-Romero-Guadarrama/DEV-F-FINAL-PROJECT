import { FaPaw } from "react-icons/fa"
import { FiLogIn, FiSearch, FiShoppingCart, FiUserPlus } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx"
import { useCart } from "../../context/CartContext.jsx"

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const isAdmin = user?.rol === "admin"

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="bg-peach text-white" lang="es">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-full bg-white p-2 text-peach shadow-md">
            <FaPaw className="text-3xl" aria-hidden />
          </div>
          <span className="font-baloo text-3xl tracking-tight">PawMatch</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-base font-fredoka sm:text-lg">
          <Link className="transition hover:text-cream" to="/adoptions">
            Adopciones
          </Link>
          <Link className="transition hover:text-cream" to="/adoptions/form">
            Registro de adopción
          </Link>
          <Link className="transition hover:text-cream" to="/store">
            Tienda
          </Link>
          <Link className="transition hover:text-cream" to="/care-guide">
            Guía de cuidados
          </Link>
          {isAdmin && (
            <Link className="transition hover:text-cream" to="/admin">
              Administración
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <label className="hidden items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs text-charcoal shadow-sm sm:flex">
            <FiSearch className="text-peach" aria-hidden />
            <span className="sr-only">Buscar</span>
            <input
              className="w-32 bg-transparent font-poppins text-xs text-charcoal placeholder:text-charcoal/50 focus:outline-none sm:text-sm"
              placeholder="Buscar"
              type="search"
              aria-label="Buscar"
            />
          </label>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-full bg-white/30 px-3 py-2 text-white transition hover:bg-white/40"
            aria-label="Ir al carrito"
          >
            <FiShoppingCart className="text-lg sm:text-xl" aria-hidden />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sunny text-[10px] font-semibold text-charcoal">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 rounded-full bg-white/30 px-3 py-2 text-xs sm:text-sm">
              <span className="hidden text-white sm:inline">Hola, {user?.nombre ?? "usuario"}</span>
              <button type="button" onClick={handleLogout} className="text-white/90 hover:text-white">
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Link
                to="/login"
                className="flex items-center gap-1 rounded-full bg-white/30 px-3 py-2 text-white transition hover:bg-white/40"
              >
                <FiLogIn aria-hidden />
                <span>Ingresar</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1 rounded-full bg-sunny px-3 py-2 text-charcoal transition hover:bg-sunny/90"
              >
                <FiUserPlus aria-hidden />
                <span>Registro</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
