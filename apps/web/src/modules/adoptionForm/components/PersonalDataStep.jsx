const PersonalDataStep = ({ data, onChange }) => {
  const update = (field) => (event) => {
    onChange({ ...data, [field]: event.target.value })
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="font-baloo text-2xl text-peach">Datos personales del adoptante</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Nombre completo*
          <input
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="Nombre y apellidos"
            value={data.nombre}
            onChange={update("nombre")}
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Correo electr�nico*
          <input
            type="email"
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="correo@ejemplo.com"
            value={data.email}
            onChange={update("email")}
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          N�mero telef�nico*
          <input
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="000-000-0000"
            value={data.telefono}
            onChange={update("telefono")}
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Fecha de nacimiento*
          <input
            type="date"
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            value={data.fechaNacimiento}
            onChange={update("fechaNacimiento")}
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Ciudad*
          <input
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="Ciudad"
            value={data.ciudad}
            onChange={update("ciudad")}
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          C�digo postal*
          <input
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="00000"
            value={data.codigoPostal}
            onChange={update("codigoPostal")}
            required
          />
        </label>
        <label className="md:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Direcci�n*
          <input
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="Calle, n�mero, colonia"
            value={data.direccion}
            onChange={update("direccion")}
            required
          />
        </label>
        <label className="md:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Identificaci�n oficial (INE/ID) � agrega enlace o nota*
          <input
            className="rounded-2xl border border-charcoal/20 px-4 py-3 focus:border-peach focus:outline-none"
            placeholder="Enlace a PDF o escribe 'Entrego en persona'"
            value={data.identificacion}
            onChange={update("identificacion")}
            required
          />
        </label>
      </div>
    </div>
  )
}

export default PersonalDataStep
