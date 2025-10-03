import { Link } from "react-router-dom"
import { FaHeart, FaPaw } from "react-icons/fa"

const links = [
  { label: "Contáctanos", to: "/contact" },
  { label: "Aviso de privacidad", to: "/privacy" },
  { label: "Términos y condiciones", to: "/terms" },
  { label: "Políticas de adopción", to: "/adoption-policy" },
]

const Footer = () => {
  return (
    <footer className="mt-20 bg-peach text-white" lang="es">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-full bg-white p-2 text-peach shadow-md">
              <FaPaw className="text-3xl" aria-hidden />
            </div>
            <span className="font-baloo text-3xl tracking-tight">PawMatch</span>
          </Link>
          <div className="flex flex-col gap-2">
            <span className="font-fredoka text-lg">Suscríbete</span>
            <label className="flex items-center gap-3 rounded-full bg-white px-4 py-2 text-charcoal shadow-md">
              <input
                className="w-full bg-transparent text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none"
                placeholder="Correo electrónico"
                type="email"
                aria-label="Correo electrónico"
              />
            </label>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-sm md:text-base">
          {links.map((link) => (
            <Link key={link.label} to={link.to} className="transition hover:text-cream">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/30 py-4 text-center text-sm font-poppins">
        <span>© 2025 PawMatch. Diseñado con </span>
        <FaHeart className="mx-2 inline text-white" aria-hidden />
        <span>para los amantes de los animales.</span>
      </div>
    </footer>
  )
}

export default Footer
