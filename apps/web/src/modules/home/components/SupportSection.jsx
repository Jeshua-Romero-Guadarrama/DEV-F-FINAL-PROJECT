import { FaBone, FaNewspaper, FaPaw } from "react-icons/fa"
import { FaPumpSoap } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { supportNeeds } from "../data/supportNeeds.js"

const iconMap = {
  bone: <FaBone aria-hidden />,
  newspaper: <FaNewspaper aria-hidden />,
  cleaning: <FaPumpSoap aria-hidden />,
  paw: <FaPaw aria-hidden />,
}

const SupportSection = () => {
  return (
    <section id="store" className="mx-auto mt-16 w-full max-w-6xl px-6">
      <div className="grid gap-12 md:grid-cols-[1.1fr,1.3fr]">
        <article className="relative flex flex-col rounded-3xl bg-peach p-10 text-white shadow-xl">
          <span className="inline-flex w-fit rounded-full bg-sunny px-4 py-1 font-fredoka text-sm text-charcoal">
            Necesitamos de tu apoyo
          </span>
          <h3 className="mt-4 font-baloo text-3xl leading-snug">Cada donativo mantiene a nuestros peluditos sanos y felices</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/90">
            Puedes ayudar con donativos en especie o suma económica; con ellos nos permites seguir apoyando a los perros y gatos rescatados
            en su manutención, salud, rehabilitación física, emocional y conductual.
          </p>
          <Link
            to="/donate"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 font-fredoka text-sm text-peach shadow-md transition hover:bg-cream"
          >
            <FaPaw className="text-base" aria-hidden /> Dona
          </Link>
          <img
            src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=700&q=80"
            alt="Perro rescatado"
            className="pointer-events-none absolute -bottom-8 right-4 hidden h-48 object-cover drop-shadow-xl md:block"
            loading="lazy"
          />
        </article>

        <article className="flex flex-col gap-6 rounded-3xl bg-white p-10 shadow-xl">
          <h3 className="font-baloo text-3xl text-peach">Tu apoyo hace la diferencia</h3>
          <p className="text-sm text-charcoal/80">
            Cada donativo cubre necesidades básicas de nuestros peluditos rescatados. Estos son algunos artículos que siempre recibimos con
            gusto:
          </p>
          <dl className="grid gap-6">
            {supportNeeds.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mint/40 text-peach">
                  {iconMap[item.icon]}
                </div>
                <div>
                  <dt className="font-fredoka text-xl text-charcoal">{item.title}</dt>
                  <dd className="text-sm text-charcoal/80">{item.description}</dd>
                </div>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  )
}

export default SupportSection
