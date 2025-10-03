import { Link } from "react-router-dom"
import { FaHeart, FaPaw } from "react-icons/fa"

const links = [
  { label: "Aviso de privacidad", to: "/" },
  { label: "Terminos y condiciones", to: "/" },
  { label: "Politicas de adopcion", to: "/#adoptions" },
  { label: "Guia de cuidados", to: "/care-guide" },
]

const Footer = () => {
  return (
    <footer className="mt-20 bg-peach text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-full bg-white p-2 text-peach shadow-md">
              <FaPaw className="text-3xl" aria-hidden />
            </div>
            <span className="font-baloo text-3xl tracking-tight">PawMatch</span>
          </Link>
          <div className="flex flex-col gap-2">
            <span className="font-fredoka text-lg">Suscribete</span>
            <label className="flex items-center gap-3 rounded-full bg-white px-4 py-2 text-charcoal shadow-md">
              <input
                className="w-full bg-transparent text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none"
                placeholder="Correo electronico"
                type="email"
                aria-label="Correo electronico"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 text-right font-poppins text-sm md:text-base">
          {links.map((link) => (
            <Link key={link.label} to={link.to} className="transition hover:text-cream">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-white/30 py-4 text-center text-sm font-poppins">
        <span>Copyright 2025 PawMatch. Disenado con </span>
        <FaHeart className="mx-2 inline text-white" aria-hidden />
        <span>para los amantes de los animales.</span>
      </div>
    </footer>
  )
}

export default Footer
