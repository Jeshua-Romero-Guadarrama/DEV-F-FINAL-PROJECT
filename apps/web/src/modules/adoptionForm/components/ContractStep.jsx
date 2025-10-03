const ContractStep = ({ data, onChange, onSaveSignature, onClearSignature }) => {
  const update = (field) => (event) => {
    onChange({ ...data, [field]: event.target.value })
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="font-baloo text-2xl text-peach">Generador de contrato</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Tipo de contrato
          <select
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.tipoContrato}
            onChange={update("tipoContrato")}
          >
            <option value="Adopción">Adopción</option>
            <option value="Hogar temporal">Hogar temporal</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Fecha
          <input
            type="date"
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.fecha}
            onChange={update("fecha")}
          />
        </label>
        <label className="md:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Número de contrato
          <input
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="Ej: 0001"
            value={data.numero}
            onChange={update("numero")}
          />
        </label>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="space-y-3">
          <h3 className="font-fredoka text-lg text-peach">Datos del adoptante</h3>
          <label className="flex flex-col gap-2 text-sm text-charcoal">
            Nombre completo
            <input
              className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
              value={data.adoptanteNombre}
              onChange={update("adoptanteNombre")}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-charcoal">
            Identificación (INE/ID)
            <input
              className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
              value={data.adoptanteId}
              onChange={update("adoptanteId")}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-charcoal">
            Teléfono
            <input
              className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
              value={data.adoptanteTelefono}
              onChange={update("adoptanteTelefono")}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-charcoal">
            Dirección
            <input
              className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
              value={data.adoptanteDireccion}
              onChange={update("adoptanteDireccion")}
            />
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-charcoal">
              Email
              <input
                type="email"
                className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
                value={data.adoptanteEmail}
                onChange={update("adoptanteEmail")}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-charcoal">
              Redes sociales (opcional)
              <input
                className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
                value={data.adoptanteRedes}
                onChange={update("adoptanteRedes")}
              />
            </label>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-fredoka text-lg text-peach">Datos de la mascota</h3>
          <label className="flex flex-col gap-2 text-sm text-charcoal">
            Nombre
            <input
              className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
              value={data.mascotaNombre}
              onChange={update("mascotaNombre")}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-charcoal">
            Especie / Raza
            <input
              className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
              value={data.mascotaRaza}
              onChange={update("mascotaRaza")}
            />
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-charcoal">
              Sexo
              <input
                className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
                value={data.mascotaSexo}
                onChange={update("mascotaSexo")}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-charcoal">
              Edad
              <input
                className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
                value={data.mascotaEdad}
                onChange={update("mascotaEdad")}
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm text-charcoal">
            Tamaño y peso
            <input
              className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
              value={data.mascotaTamano}
              onChange={update("mascotaTamano")}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-charcoal">
            Estado de salud y cuidados
            <textarea
              className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
              rows={4}
              value={data.mascotaSalud}
              onChange={update("mascotaSalud")}
            />
          </label>
        </section>
      </div>

      <section className="mt-8 space-y-4">
        <h3 className="font-fredoka text-lg text-peach">Firma del adoptante</h3>
        <div className="rounded-3xl border-2 border-dashed border-peach bg-cream/60 p-6 text-sm text-charcoal/60">
          Este espacio puede utilizarse para subir una imagen de la firma una vez descargado el contrato.
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full bg-white px-4 py-2 text-sm text-charcoal shadow-sm transition hover:bg-cream"
            onClick={onClearSignature}
          >
            Limpiar firma
          </button>
          <button
            type="button"
            className="rounded-full bg-peach px-4 py-2 text-sm font-fredoka text-white shadow-sm transition hover:bg-peach/90"
            onClick={onSaveSignature}
          >
            Guardar firma
          </button>
        </div>
      </section>
    </div>
  )
}

export default ContractStep
