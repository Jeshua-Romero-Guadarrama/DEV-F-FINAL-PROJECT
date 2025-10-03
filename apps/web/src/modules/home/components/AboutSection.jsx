import { aboutHighlights } from "../data/aboutHighlights.js"

const AboutSection = () => {
  return (
    <section id="adoptions" className="relative mx-auto mt-16 w-full bg-mint/90 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center text-white">
        <h2 className="font-baloo text-3xl leading-snug sm:text-4xl">Trabajando a favor de los animales</h2>
        <div className="mt-10 grid w-full gap-8 md:grid-cols-2">
          {aboutHighlights.map((card) => (
            <article key={card.title} className="rounded-3xl bg-white p-8 text-charcoal shadow-lg">
              <h3 className="font-fredoka text-2xl text-peach">{card.title}</h3>
              <p className="mt-3 text-left leading-relaxed text-base text-charcoal/80">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=480&q=80"
        alt="Gato curioso"
        className="pointer-events-none absolute -left-6 -bottom-4 hidden h-56 object-contain md:block"
        loading="lazy"
      />
      <img
        src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=480&q=80"
        alt="Perro feliz"
        className="pointer-events-none absolute -right-8 -top-8 hidden h-56 object-contain md:block"
        loading="lazy"
      />
    </section>
  )
}

export default AboutSection
