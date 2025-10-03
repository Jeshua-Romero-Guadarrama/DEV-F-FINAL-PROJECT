const benefits = [
  {
    title: "Compra con causa",
    description:
      "El 20% de cada compra se destina a alimentos, medicamentos y esterilizaciones para los peluditos rescatados.",
  },
  {
    title: "Productos seleccionados",
    description:
      "Trabajamos con proveedores locales y responsables que garantizan insumos frescos y accesorios seguros.",
  },
  {
    title: "Envíos solidarios",
    description:
      "Recibe tus pedidos en menos de 72 horas en la ciudad. Si apoyas con donación, el envío es gratuito.",
  },
]

const StoreBenefits = () => {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-xl">
      <h3 className="font-baloo text-3xl text-peach">¿Por qué comprar en PawMatch?</h3>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="rounded-2xl border border-charcoal/5 bg-cream/50 p-6 text-charcoal">
            <h4 className="font-fredoka text-xl text-peach">{benefit.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StoreBenefits
