import { FaPaw } from 'react-icons/fa'
import { FiSearch, FiUser } from 'react-icons/fi'

const Navbar = () => {
  return (
    <header className="bg-peach text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white p-2 text-peach shadow-md">
            <FaPaw className="text-3xl" aria-hidden />
          </div>
          <span className="font-baloo text-3xl tracking-tight">PawMatch</span>
        </div>

        <nav className="flex items-center justify-center gap-6 text-lg font-fredoka">
          <a className="transition hover:text-cream" href="#adoptions">
            Adopciones
          </a>
          <a className="transition hover:text-cream" href="#store">
            Tienda
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <label className="hidden items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm text-charcoal shadow-sm sm:flex">
            <FiSearch className="text-peach" aria-hidden />
            <span className="sr-only">Buscar</span>
            <input
              className="w-32 bg-transparent font-poppins text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none"
              placeholder="Search"
              type="search"
              aria-label="Buscar"
            />
          </label>
          <button className="rounded-full bg-white/30 p-2 text-white transition hover:bg-white/40" aria-label="Perfil">
            <FiUser className="text-2xl" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
