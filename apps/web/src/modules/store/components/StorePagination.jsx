const StorePagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className="mt-10 flex justify-center gap-2 text-sm font-fredoka text-charcoal/70" aria-label="Paginación de productos">
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded-full border border-peach/30 transition ${
            currentPage === page ? 'bg-peach text-white shadow' : 'bg-white hover:bg-peach/10'
          }`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
    </nav>
  )
}

export default StorePagination
