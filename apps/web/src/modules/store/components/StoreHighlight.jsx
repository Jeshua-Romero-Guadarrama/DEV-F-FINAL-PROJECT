const StoreHighlight = () => {
  return (
    <section className="mt-12 flex items-center justify-between gap-6 rounded-3xl bg-peach px-10 py-8 text-white shadow-xl">
      <div>
        <h3 className="font-baloo text-3xl leading-tight">El 20% de tu compra alimenta a mascotas sin hogar</h3>
        <p className="mt-3 text-sm text-white/90">
          Tus compras solidarias garantizan alimento, atención médica y espacios seguros para perros y gatos rescatados.
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=260&q=80"
        alt="Gatito feliz"
        className="hidden h-40 object-contain md:block"
        loading="lazy"
      />
    </section>
  )
}

export default StoreHighlight
