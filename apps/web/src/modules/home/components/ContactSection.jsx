import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6"
import { FiMail, FiPhone, FiSend } from "react-icons/fi"
import { contactChannels } from "../data/contactChannels.js"

const iconMap = {
  WhatsApp: <FaWhatsapp aria-hidden />,
  Facebook: <FaFacebookF aria-hidden />,
  Instagram: <FaInstagram aria-hidden />,
  X: <FaXTwitter aria-hidden />,
}

const ContactSection = () => {
  return (
    <section className="mx-auto mt-16 w-full max-w-6xl px-6" id="contact">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl bg-cream shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"
            alt="Persona sosteniendo la pata de un perro"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute left-8 top-8 rounded-full bg-sunny px-4 py-2 font-fredoka text-peach shadow-md">
            Gracias por confiar en nosotros
          </span>
        </div>

        <div className="flex flex-col gap-6 rounded-3xl bg-sunny p-10 shadow-xl">
          <h3 className="font-baloo text-3xl text-peach">Contactanos</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-full bg-white px-6 py-3 text-charcoal shadow-md">
              <FiPhone className="text-peach" aria-hidden />
              <span className="font-fredoka">{contactChannels.phone}</span>
            </div>
            <div className="flex items-center gap-4 rounded-full bg-white px-6 py-3 text-charcoal shadow-md">
              <FiMail className="text-peach" aria-hidden />
              <span className="font-fredoka">{contactChannels.email}</span>
            </div>
            <div className="flex items-center gap-4 rounded-full bg-white px-6 py-3 text-charcoal shadow-md">
              <FiSend className="text-peach" aria-hidden />
              <span className="font-fredoka">Siguenos</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {contactChannels.social.map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-peach shadow-md transition hover:bg-cream"
                aria-label={item.label}
              >
                {iconMap[item.label]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
