import { useMemo } from "react"

const FilterPanel = ({ filtros, onChange }) => {
  const categorias = useMemo(
    () => [
      { id: "todos", label: "Todas las mascotas" },
      { id: "perro", label: "Perros" },
      { id: "gato", label: "Gatos" },
      { id: "2a", label: "2da oportunidad" },
    ],
    [],
  )

  const handleTipo = (valor) => {
    onChange({ ...filtros, tipo: valor })
  }

  const handleSexo = (value) => {
    onChange({ ...filtros, sexo: value })
  }

  return (
    <aside className="rounded-3xl bg-white p-6 shadow-xl">
      <h3 className="font-fredoka text-xl text-peach">Buscar por:</h3>
      <div className="mt-4 space-y-3 text-sm text-charcoal/80">
        {categorias.map((categoria) => (
          <label key={categoria.id} className="flex items-center gap-2">
            <input
              type="radio"
              name="tipo"
              value={categoria.id}
              checked={(filtros.tipo ?? "todos") === categoria.id}
              onChange={() => handleTipo(categoria.id)}
              className="accent-peach"
            />
            <span>{categoria.label}</span>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="font-fredoka text-lg text-charcoal">Sexo</h4>
        <div className="mt-2 space-y-2 text-sm text-charcoal/80">
          {["todos", "female", "male"].map((value) => (
            <label key={value} className="flex items-center gap-2">
              <input
                type="radio"
                name="sexo"
                value={value}
                checked={(filtros.sexo ?? "todos") === value}
                onChange={() => handleSexo(value)}
                className="accent-peach"
              />
              <span className="capitalize">{value === "todos" ? "Todos" : value}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default FilterPanel
