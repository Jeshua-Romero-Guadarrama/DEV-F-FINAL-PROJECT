import CartItemsList from "./components/CartItemsList.jsx"
import CartSummary from "../store/components/CartSummary.jsx"

const CartPage = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10" lang="es">
      <header className="rounded-3xl bg-gradient-to-r from-peach to-cream p-10 text-white shadow-xl">
        <h1 className="font-baloo text-4xl leading-tight sm:text-5xl">Revisa tu carrito solidario</h1>
        <p className="mt-4 max-w-3xl text-sm text-white/90">
          Cada compra financia alimento, rehabilitación y espacios seguros para nuestros rescatados. Ajusta cantidades, elimina
          artículos o finaliza tu pedido cuando estés listo.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.2fr)]">
        <CartItemsList />
        <CartSummary />
      </div>
    </section>
  )
}

export default CartPage