const Pagination = () => {
  const paginas = [1, 2, 3, 4, 5, 6]
  return (
    <nav className="mt-8 flex justify-center gap-2 text-sm font-fredoka text-charcoal/70">
      {paginas.map((pagina, index) => (
        <button
          type="button"
          key={pagina}
          className={`h-10 w-10 rounded-full border border-peach/40 transition ${
            index === 0 ? "bg-peach text-white" : "hover:bg-peach/10"
          }`}
        >
          {pagina}
        </button>
      ))}
    </nav>
  )
}

export default Pagination
