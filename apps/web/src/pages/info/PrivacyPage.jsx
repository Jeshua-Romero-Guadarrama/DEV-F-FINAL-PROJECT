import { Link } from "react-router-dom"

const Page = () => {
  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10" lang="es">
      <header className="space-y-3">
        <p className="text-sm text-peach/80">
          <Link to="/" className="underline-offset-4 hover:underline">Inicio</Link> · Aviso de privacidad
        </p>
        <h1 className="font-baloo text-4xl text-peach">Aviso de privacidad</h1>
      </header>
      <article className="space-y-6 rounded-3xl bg-white p-8 text-sm leading-relaxed text-charcoal/80 shadow-xl">
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Responsable del tratamiento</h2>
          <p>
            PawMatch, A.C., con domicilio en Ciudad de México, es responsable del tratamiento de tus datos personales conforme
            a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y los Lineamientos
            del Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Finalidades del tratamiento</h2>
          <p>
            Utilizamos tu información para (i) gestionar solicitudes de adopción y seguimiento post-adopción, (ii) coordinar
            visitas, evaluaciones y programas de voluntariado, y (iii) enviar comunicaciones sobre actividades solidarias y
            productos de la tienda. PawMatch no utiliza tus datos para finalidades distintas sin recabar tu consentimiento
            previo explícito.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Derechos ARCO y revocación</h2>
          <p>
            Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO), así como revocar tu
            consentimiento, escribiendo a <a className="text-peach underline-offset-4 hover:underline" href="mailto:hola@pawmatch.com">hola@pawmatch.com</a>
            o llamando al 222-222-2222. Daremos respuesta en un plazo máximo de 20 días hábiles conforme al artículo 32 de la
            LFPDPPP.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Transferencias y resguardo</h2>
          <p>
            Solo compartimos datos con autoridades y clínicas veterinarias aliadas cuando resulte indispensable para cumplir
            con la Ley General de Protección a los Animales o emergencias médicas. Implementamos controles administrativos,
            técnicos y físicos acordes con la Norma Mexicana NMX-I-27001-NYCE-2015 para prevenir accesos no autorizados.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Actualizaciones</h2>
          <p>
            Cualquier cambio al presente aviso se publicará en <a className="text-peach underline-offset-4 hover:underline" href="https://pawmatch.com/privacidad">pawmatch.com/privacidad</a>.
            La fecha de la última actualización aparece al final del documento.
          </p>
          <p className="text-xs text-charcoal/60">Última actualización: octubre 2025.</p>
        </section>
      </article>
    </section>
  )
}

export default Page

