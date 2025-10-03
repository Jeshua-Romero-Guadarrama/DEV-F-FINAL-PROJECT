const testimonials = [
  {
    name: "Ana y Bruno",
    avatar: "https://images.unsplash.com/photo-1601758124027-27f25b911aa5?auto=format&fit=crop&w=160&q=80",
    message:
      "Adoptamos a Nala y la tienda fue clave para equiparnos con todo lo necesario. ¡Nos encanta el concentrado natural!",
  },
  {
    name: "Carlos",
    avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=160&q=80",
    message:
      "Recibí mi pedido en 24 horas y con un mensaje personalizado. Saber que apoyo a otros peluditos me hace repetir.",
  },
  {
    name: "Lupita",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&q=80",
    message:
      "Los artículos de higiene me ayudaron a rehabilitar a mi gatita rescatada. La calidad y el servicio valen la pena.",
  },
]

const StoreTestimonials = () => {
  return (
    <section className="rounded-3xl bg-peach/10 p-10 text-charcoal shadow-xl">
      <h3 className="font-baloo text-3xl text-peach">Testimonios solidarios</h3>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.name} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full object-cover"
                loading="lazy"
              />
              <span className="font-fredoka text-peach">{testimonial.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-charcoal/80">“{testimonial.message}”</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StoreTestimonials
