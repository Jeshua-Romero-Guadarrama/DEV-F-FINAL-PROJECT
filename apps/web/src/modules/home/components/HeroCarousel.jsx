import { useCallback, useEffect, useMemo, useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { heroSlides } from "../data/heroSlides.js"

const SLIDE_INTERVAL = 7000

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0)
  const slideCount = heroSlides.length

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slideCount)
  }, [slideCount])

  const previous = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount)
  }, [slideCount])

  useEffect(() => {
    const timer = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [next])

  const currentSlide = useMemo(() => heroSlides[current], [current])

  return (
    <section className="relative mx-auto mt-8 flex w-full max-w-6xl flex-col items-center gap-4 px-6" aria-label="Historias destacadas">
      <div className="relative w-full overflow-hidden rounded-3xl bg-cream shadow-xl">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="h-[320px] w-full object-cover sm:h-[380px]"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col justify-center gap-4 bg-gradient-to-r from-peach/90 via-peach/70 to-transparent p-8 text-white sm:max-w-md">
          <p className="font-baloo text-4xl leading-tight sm:text-5xl">{currentSlide.title}</p>
          <p className="text-sm leading-relaxed sm:text-base">{currentSlide.description}</p>
          <button className="w-fit rounded-full bg-sunny px-6 py-2 font-fredoka text-charcoal shadow-md transition hover:bg-sunny/90">
            {currentSlide.cta}
          </button>
        </div>
        <button
          onClick={previous}
          aria-label="Slide anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-3 text-peach transition hover:bg-white"
          type="button"
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={next}
          aria-label="Siguiente slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-3 text-peach transition hover:bg-white"
          type="button"
        >
          <FiChevronRight className="text-2xl" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            aria-label={`Ver slide ${index + 1}`}
            className={`h-2 rounded-full transition ${current === index ? "w-6 bg-peach" : "w-2 bg-peach/40 hover:bg-peach/70"}`}
            type="button"
          />
        ))}
      </div>
    </section>
  )
}

export default HeroCarousel
