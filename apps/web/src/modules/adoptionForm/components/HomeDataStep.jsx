const HomeDataStep = ({ data, onChange }) => {
  const update = (field) => (event) => {
    onChange({ ...data, [field]: event.target.value })
  }

  const selectOptions = (options) => (
    <>
      <option value="">Selecciona una opción</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </>
  )

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="font-baloo text-2xl text-peach">Datos de vivienda</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Tipo de vivienda*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.tipoVivienda}
            onChange={update("tipoVivienda")}
            required
          >
            {selectOptions(["Casa", "Departamento", "Otro"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          La vivienda cuenta con*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.espacios}
            onChange={update("espacios")}
            required
          >
            {selectOptions(["Patio", "Jardín", "Área exterior compartida", "Sin área exterior"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Tipo de zona*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.tipoZona}
            onChange={update("tipoZona")}
            required
          >
            {selectOptions(["Urbana", "Suburbana", "Rural"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Número de personas en el hogar*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.numeroPersonas}
            onChange={update("numeroPersonas")}
            required
          >
            {selectOptions(["1", "2", "3", "4", "5 o más"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          ¿Hay niñas o niños en casa?*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.ninos}
            onChange={update("ninos")}
            required
          >
            {selectOptions(["Sí", "No", "Ocasionalmente"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          ¿Hay otras mascotas?
          <input
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="Especie, raza y edad"
            value={data.otrasMascotas}
            onChange={update("otrasMascotas")}
          />
        </label>
        <label className="md:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          ¿Dónde permanecerá la mascota la mayor parte del tiempo?*
          <textarea
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            rows={3}
            value={data.lugarMascota}
            onChange={update("lugarMascota")}
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          ¿Con qué frecuencia estará sola al día?*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.frecuenciaSola}
            onChange={update("frecuenciaSola")}
            required
          >
            {selectOptions(["Menos de 2 horas", "3-5 horas", "Más de 6 horas"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          ¿Cuentas con transporte para emergencias?*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.transporte}
            onChange={update("transporte")}
            required
          >
            {selectOptions(["Sí", "No", "Depende de un tercero"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          ¿Harías adaptaciones si son necesarias?*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.adaptaciones}
            onChange={update("adaptaciones")}
            required
          >
            {selectOptions(["Sí", "No", "En evaluación"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          ¿Tendrá acceso a todos los espacios del hogar?*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.accesos}
            onChange={update("accesos")}
            required
          >
            {selectOptions(["Sí", "No", "Solo ciertas áreas"])}
          </select>
        </label>
        <label className="md:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Adjunta o describe el área donde vivirá la mascota*
          <textarea
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="Incluye enlace a foto o describe brevemente"
            rows={3}
            value={data.descripcionArea}
            onChange={update("descripcionArea")}
            required
          />
        </label>
      </div>
    </div>
  )
}

export default HomeDataStep
