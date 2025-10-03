const pasos = [
  {
    title: "Solicita una visita",
    description: "Completa el formulario y agenda un encuentro con el peludito que te enamoró.",
  },
  {
    title: "Conócelo y convive",
    description: "Nuestro equipo te acompañará para resolver dudas sobre temperamento y cuidados.",
  },
  {
    title: "Adopción responsable",
    description: "Firma el acuerdo, recibe kit de bienvenida y seguimiento durante las primeras semanas.",
  },
]

const AdoptionProcess = () => {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-xl">
      <h3 className="font-baloo text-3xl text-peach">Proceso de adopción en 3 pasos</h3>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {pasos.map((paso, index) => (
          <article key={paso.title} className="rounded-2xl border border-charcoal/5 bg-cream/40 p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-peach text-lg font-bold text-white">
              {index + 1}
            </span>
            <h4 className="mt-4 font-fredoka text-xl text-charcoal">{paso.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{paso.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AdoptionProcess
