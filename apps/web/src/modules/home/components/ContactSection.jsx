import { useState } from "react"
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6"
import { FiMail, FiPhone, FiSend } from "react-icons/fi"

const CONTACT_EMAIL = "hola@pawmatch.com"

const ContactSection = () => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" })
  const [feedback, setFeedback] = useState(null)

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const mailBody = `Nombre: ${form.nombre}\nCorreo: ${form.email}\n\n${form.mensaje}`
    const subject = encodeURIComponent("Interés en PawMatch")
    const body = encodeURIComponent(mailBody)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setFeedback("Abrimos tu cliente de correo para enviar el mensaje. ¡Gracias por escribirnos!")
    setForm({ nombre: "", email: "", mensaje: "" })
  }

  return (
    <section className="mx-auto mt-16 w-full max-w-6xl px-6" id="contact" lang="es">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl bg-cream shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"
            alt="Persona sosteniendo la pata de un perro"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute left-8 top-8 rounded-full bg-sunny px-4 py-2 font-fredoka text-peach shadow-md">
            ¡Gracias por confiar en nosotros!
          </span>
        </div>

        <div className="flex flex-col gap-6 rounded-3xl bg-sunny p-10 shadow-xl">
          <h3 className="font-baloo text-3xl text-peach">Contáctanos</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-full bg-white px-6 py-3 text-charcoal shadow-md">
              <FiPhone className="text-peach" aria-hidden />
              <span className="font-fredoka">222-222-2222</span>
            </div>
            <div className="flex items-center gap-4 rounded-full bg-white px-6 py-3 text-charcoal shadow-md">
              <FiMail className="text-peach" aria-hidden />
              <span className="font-fredoka">{CONTACT_EMAIL}</span>
            </div>
            <div className="flex items-center gap-4 rounded-full bg-white px-6 py-3 text-charcoal shadow-md">
              <FiSend className="text-peach" aria-hidden />
              <span className="font-fredoka">Síguenos</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {[
              { icon: <FaWhatsapp aria-hidden />, label: "WhatsApp" },
              { icon: <FaFacebookF aria-hidden />, label: "Facebook" },
              { icon: <FaInstagram aria-hidden />, label: "Instagram" },
              { icon: <FaXTwitter aria-hidden />, label: "X" },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-peach shadow-md transition hover:bg-cream"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-charcoal/70" htmlFor="contact-name">
                Nombre completo
              </label>
              <input
                id="contact-name"
                value={form.nombre}
                onChange={updateField("nombre")}
                className="rounded-2xl border border-white/40 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/50 focus:border-peach focus:outline-none"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-charcoal/70" htmlFor="contact-email">
                Correo electrónico
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={updateField("email")}
                className="rounded-2xl border border-white/40 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/50 focus:border-peach focus:outline-none"
                placeholder="tu@correo.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-charcoal/70" htmlFor="contact-message">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={form.mensaje}
                onChange={updateField("mensaje")}
                className="rounded-2xl border border-white/40 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/50 focus:border-peach focus:outline-none"
                placeholder="Cuéntanos cómo podemos ayudarte"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-peach px-6 py-3 font-fredoka text-white transition hover:bg-peach/90"
            >
              Enviar correo
            </button>
          </form>
          {feedback && <p className="text-xs text-charcoal/70">{feedback}</p>}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
