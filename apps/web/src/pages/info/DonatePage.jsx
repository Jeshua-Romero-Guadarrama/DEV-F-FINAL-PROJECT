import { Link } from "react-router-dom"
import { FaHeart, FaPaw, FaWhatsapp } from "react-icons/fa"
import { FaHandHoldingHeart } from "react-icons/fa6"
import { donateContent } from "./donateContent.js"

const DonatePage = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12" lang="es">
      <header className="grid items-center gap-10 rounded-[32px] bg-peach p-10 text-white shadow-xl md:grid-cols-[1.1fr,0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/25 px-4 py-2 font-fredoka text-sm text-white">
            <FaHandHoldingHeart aria-hidden /> Campaña permanente PawMatch
          </span>
          <h1 className="mt-4 font-baloo text-4xl">Tu donativo cambia historias</h1>
          <p className="mt-4 text-sm text-white/90">
            Cada aporte garantiza alimento, rehabilitación y acompañamiento profesional para los perros y gatos que rescatamos en la Ciudad de México.
            Gracias por sumar tu corazón a la manada.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <div className="rounded-2xl bg-white/25 px-4 py-3">
              <p className="font-fredoka text-lg">120+</p>
              <p className="text-white/80">Adopciones concretadas en 2025</p>
            </div>
            <div className="rounded-2xl bg-white/25 px-4 py-3">
              <p className="font-fredoka text-lg">90%</p>
              <p className="text-white/80">De los donativos se destinan directamente a los animales</p>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] bg-white p-8 text-charcoal shadow-2xl">
          <h2 className="font-fredoka text-2xl text-peach">¿Cómo quieres ayudar?</h2>
          <p className="mt-2 text-sm text-charcoal/80">
            Selecciona un programa sugerido o apoya con la cantidad que prefieras. Cada peso suma.
          </p>
          <ul className="mt-6 space-y-4 text-sm">
            {donateContent.donationTiers.map((tier) => (
              <li key={tier.title} className="rounded-2xl border border-charcoal/10 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-charcoal">{tier.title}</p>
                  <span className="rounded-full bg-sunny px-3 py-1 font-fredoka text-charcoal">${tier.amount}</span>
                </div>
                <p className="mt-2 text-xs text-charcoal/70">{tier.description}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-peach px-6 py-3 font-fredoka text-sm text-white transition hover:bg-peach/90"
          >
            <FaPaw aria-hidden /> Quiero donar otra cantidad
          </Link>
        </div>
      </header>

      <section className="grid gap-8 rounded-[32px] bg-white p-10 shadow-xl lg:grid-cols-2">
        <article>
          <h2 className="font-baloo text-3xl text-peach">Aportaciones económicas</h2>
          <p className="mt-3 text-sm text-charcoal/80">
            Utiliza los siguientes datos para realizar tu transferencia o depósito. Envíanos tu comprobante para darte seguimiento personalizado.
          </p>
          <div className="mt-6 space-y-4 text-sm">
            {donateContent.bankDetails.map((option) => (
              <div key={option.label} className="rounded-2xl border border-charcoal/10 p-4">
                <p className="font-fredoka text-lg text-charcoal">{option.label}</p>
                <ul className="mt-2 space-y-1 text-xs text-charcoal/70">
                  {option.info.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
        <article>
          <h2 className="font-baloo text-3xl text-peach">Donativos en especie</h2>
          <p className="mt-3 text-sm text-charcoal/80">
            Si prefieres llevar materiales o alimento, estos insumos nos ayudan a cubrir necesidades básicas del refugio.
          </p>
          <ul className="mt-6 space-y-4 text-sm">
            {donateContent.inKindDonations.map((item) => (
              <li key={item.title} className="rounded-2xl bg-mint/40 p-4">
                <p className="font-fredoka text-lg text-charcoal">{item.title}</p>
                <p className="mt-2 text-xs text-charcoal/70">{item.items}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-xs text-charcoal/80">
            Agenda tu visita con nuestro equipo al <a className="text-peach underline-offset-4 hover:underline" href="tel:+522222222222">222-222-2222</a> o por WhatsApp.
          </p>
        </article>
      </section>

      <section className="rounded-[32px] bg-mint/40 p-8 shadow-xl">
        <h2 className="font-baloo text-3xl text-peach">Transparencia y seguimiento</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 text-sm text-charcoal/80 shadow">
            <p className="font-fredoka text-lg text-peach">Reportes mensuales</p>
            <p className="mt-2 text-xs">
              Compartimos un informe con gastos, rescates atendidos y adopciones realizadas a todas las personas donadoras registradas.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 text-sm text-charcoal/80 shadow">
            <p className="font-fredoka text-lg text-peach">Visitas guiadas</p>
              <p className="mt-2 text-xs">
              El último sábado de cada mes abrimos nuestras puertas para que conozcas a los peluditos que apoyas.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 text-sm text-charcoal/80 shadow">
            <p className="font-fredoka text-lg text-peach">Comunidad PawMatch</p>
            <p className="mt-2 text-xs">
              Únete al grupo privado de WhatsApp donde compartimos avances, campañas y adopciones logradas.
            </p>
          </div>
        </div>
        <Link
          to="https://wa.me/5212222222222"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-peach px-6 py-3 font-fredoka text-sm text-white transition hover:bg-peach/90"
        >
          <FaWhatsapp aria-hidden /> Integrarme a la comunidad
        </Link>
      </section>

      <section className="rounded-[32px] bg-white p-8 shadow-xl">
        <h2 className="font-baloo text-3xl text-peach">Preguntas frecuentes</h2>
        <div className="mt-6 space-y-4 text-sm text-charcoal/80">
          {donateContent.faqs.map((faq) => (
            <details key={faq.question} className="rounded-2xl border border-charcoal/10 p-4">
              <summary className="cursor-pointer font-fredoka text-lg text-charcoal">{faq.question}</summary>
              <p className="mt-2 text-xs text-charcoal/70">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="rounded-[32px] bg-peach p-8 text-white shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-baloo text-3xl">Gracias por confiar en PawMatch</h2>
            <p className="mt-2 text-sm text-white/90">
              Cada aporte nos acerca a que más peluditos encuentren un hogar responsable y amoroso.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-fredoka text-sm text-peach transition hover:bg-cream"
          >
            <FaHeart aria-hidden /> Contactar al equipo financiero
          </Link>
        </div>
      </footer>
    </section>
  )
}

export default DonatePage
