import { Link } from "react-router-dom"
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa"
import { FiClock, FiMail } from "react-icons/fi"
import ContactSection from "../../modules/home/components/ContactSection.jsx"

const ContactPage = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10" lang="es">
      <header className="space-y-3">
        <p className="text-sm text-peach/80">
          <Link to="/" className="underline-offset-4 hover:underline">Inicio</Link> · Contáctanos
        </p>
        <h1 className="font-baloo text-4xl text-peach">Estamos aquí para ayudarte</h1>
        <p className="max-w-2xl text-sm text-charcoal/70">
          Agenda una cita, conoce nuestro centro de adopciones o escríbenos para recibir asesoría personalizada. Nuestro equipo
          está disponible para resolver tus dudas sobre procesos de adopción, voluntariado y bienestar animal.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <article className="rounded-[32px] bg-cream p-8 text-charcoal shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="mt-1 text-peach" aria-hidden />
              <div>
                <h2 className="font-fredoka text-lg text-peach">Visítanos</h2>
                <p className="text-sm text-charcoal/80">
                  Calle de los Rescatistas 123, Col. Roma Sur,<br />
                  Cuauhtémoc, Ciudad de México, CP 06760
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiClock className="mt-1 text-peach" aria-hidden />
              <div>
                <h2 className="font-fredoka text-lg text-peach">Horarios</h2>
                <p className="text-sm text-charcoal/80">
                  Lunes a viernes: 10:00 - 18:00 hrs<br />
                  Sábados: 10:00 - 14:00 hrs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="mt-1 text-peach" aria-hidden />
              <div>
                <h2 className="font-fredoka text-lg text-peach">Teléfono</h2>
                <a className="block text-sm text-charcoal/80 underline-offset-4 hover:underline" href="tel:+522222222222">
                  222-222-2222
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiMail className="mt-1 text-peach" aria-hidden />
              <div>
                <h2 className="font-fredoka text-lg text-peach">Correo</h2>
                <a className="block text-sm text-charcoal/80 underline-offset-4 hover:underline" href="mailto:hola@pawmatch.com">
                  hola@pawmatch.com
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-white/80 p-6 text-sm text-charcoal/80 shadow-inner">
              <p className="font-fredoka text-peach">¿Cómo llegar?</p>
              <p className="mt-2">
                Estamos a 5 minutos del Metro Chilpancingo (Línea 9) y contamos con estacionamiento para visitas agendadas.
                Solicita acceso en recepción al llegar.
              </p>
            </div>
          </div>
        </article>

        <div className="overflow-hidden rounded-[32px] shadow-xl">
          <iframe
            title="Ubicación PawMatch"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.557792971954!2d-99.16556512382021!3d19.4326071418778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4070f06f63%3A0x2bf9fccff1cd58b7!2sColonia%20Roma%20Sur%2C%2006700%20Ciudad%20de%20México%2C%20CDMX!5e0!3m2!1ses!2smx!4v1696373100000!5m2!1ses!2smx"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </div>

      <ContactSection />
    </section>
  )
}

export default ContactPage
