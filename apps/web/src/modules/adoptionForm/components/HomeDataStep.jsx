const HomeDataStep = ({ data, onChange }) => {
  const update = (field) => (event) => {
    onChange({ ...data, [field]: event.target.value })
  }

  const selectOptions = (options) => (
    <>
      <option value="">Selecciona una opci�n</option>
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
            {selectOptions(["Patio", "Jard�n", "�rea exterior compartida", "Sin �rea exterior"])}
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
          N�mero de personas en el hogar*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.numeroPersonas}
            onChange={update("numeroPersonas")}
            required
          >
            {selectOptions(["1", "2", "3", "4", "5 o m�s"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          �Hay ni�as o ni�os en casa?*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.ninos}
            onChange={update("ninos")}
            required
          >
            {selectOptions(["S�", "No", "Ocasionalmente"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          �Hay otras mascotas?
          <input
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="Especie, raza y edad"
            value={data.otrasMascotas}
            onChange={update("otrasMascotas")}
          />
        </label>
        <label className="md:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          �D�nde permanecer� la mascota la mayor parte del tiempo?*
          <textarea
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            rows={3}
            value={data.lugarMascota}
            onChange={update("lugarMascota")}
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          �Con qu� frecuencia estar� sola al d�a?*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.frecuenciaSola}
            onChange={update("frecuenciaSola")}
            required
          >
            {selectOptions(["Menos de 2 horas", "3-5 horas", "M�s de 6 horas"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          �Cuentas con transporte para emergencias?*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.transporte}
            onChange={update("transporte")}
            required
          >
            {selectOptions(["S�", "No", "Depende de un tercero"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          �Har�as adaptaciones si son necesarias?*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.adaptaciones}
            onChange={update("adaptaciones")}
            required
          >
            {selectOptions(["S�", "No", "En evaluaci�n"])}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          �Tendr� acceso a todos los espacios del hogar?*
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.accesos}
            onChange={update("accesos")}
            required
          >
            {selectOptions(["S�", "No", "Solo ciertas �reas"])}
          </select>
        </label>
        <label className="md:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Adjunta o describe el �rea donde vivir� la mascota*
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
