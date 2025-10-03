import { Link } from "react-router-dom"

const Page = () => {
  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10" lang="es">
      <header className="space-y-3">
        <p className="text-sm text-peach/80">
          <Link to="/" className="underline-offset-4 hover:underline">Inicio</Link> · Políticas de adopción
        </p>
        <h1 className="font-baloo text-4xl text-peach">Políticas de adopción</h1>
      </header>
      <article className="space-y-6 rounded-3xl bg-white p-8 text-sm leading-relaxed text-charcoal/80 shadow-xl">
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Requisitos legales</h2>
          <p>
            Nuestras adopciones se apegan a la Ley de Protección a los Animales de la Ciudad de México y a la NOM-059-ZOO-1999
            sobre bienestar animal. Toda persona solicitante debe ser mayor de edad, acreditar domicilio y firmar el contrato de
            adopción responsable avalado por la Procuraduría Ambiental y del Ordenamiento Territorial (PAOT).
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Proceso de evaluación</h2>
          <p>
            PawMatch realiza entrevista, visita domiciliaria y verificación de condiciones de resguardo antes de entregar al
            animal. Nos reservamos el derecho de posponer o rechazar la solicitud cuando detectemos riesgos, omisiones en la
            información o incumplimiento de los lineamientos de trato digno y respetuoso.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Seguimiento y obligaciones</h2>
          <p>
            Las familias adoptantes aceptan recibir visitas de seguimiento durante los primeros seis meses, aplicar esquemas de
            vacunación y esterilización de acuerdo con la NOM-033-SSA2-2011 y notificar a PawMatch cualquier eventualidad grave.
            En caso de incumplimiento podremos revocar la adopción para salvaguardar el bienestar del animal.
          </p>
        </section>
        <p className="text-xs text-charcoal/60">Última revisión: octubre 2025.</p>
      </article>
    </section>
  )
}

export default Page
