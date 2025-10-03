import { Link } from "react-router-dom"

const Page = () => {
  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10" lang="es">
      <header className="space-y-3">
        <p className="text-sm text-peach/80">
          <Link to="/" className="underline-offset-4 hover:underline">Inicio</Link> · Términos y condiciones
        </p>
        <h1 className="font-baloo text-4xl text-peach">Términos y condiciones</h1>
      </header>
      <article className="space-y-6 rounded-3xl bg-white p-8 text-sm leading-relaxed text-charcoal/80 shadow-xl">
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Uso de la plataforma</h2>
          <p>
            El acceso y uso de PawMatch se rige por la Ley Federal de Protección al Consumidor y el Código Civil Federal.
            Al crear una cuenta aceptas proporcionar información veraz, resguardar tus credenciales y utilizar los servicios
            con respeto hacia el personal, voluntariado y animales en resguardo.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Procesos de adopción</h2>
          <p>
            Las adopciones siguen los lineamientos de la Ley de Protección a los Animales de la Ciudad de México y las
            recomendaciones de la Agencia de Atención Animal (AGATAN). PawMatch puede solicitar visitas domiciliarias,
            referencias y documentación de identificación para garantizar entornos seguros.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Pagos y comprobantes</h2>
          <p>
            Las aportaciones efectuadas en la tienda en línea generan comprobantes digitales conforme a la Resolución Miscelánea
            Fiscal vigente. El cargo se procesa a través de proveedores certificados PCI DSS y podrás solicitar facturación en
            un plazo máximo de 30 días naturales.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-fredoka text-lg text-peach">Modificaciones y jurisdicción</h2>
          <p>
            PawMatch puede actualizar estos términos notificando los cambios en el sitio web. Cualquier controversia se
            interpretará conforme a las leyes mexicanas y se someterá a los tribunales competentes de la Ciudad de México.
          </p>
        </section>
        <p className="text-xs text-charcoal/60">Vigente desde octubre 2025.</p>
      </article>
    </section>
  )
}

export default Page
