import { useCart } from "../../../context/CartContext.jsx"

const CartItemsList = () => {
  const { items, updateQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
        <h2 className="font-baloo text-2xl text-peach">Tu carrito está vacío</h2>
        <p className="mt-3 text-sm text-charcoal/70">
          Visita la tienda solidaria para elegir juguetes, alimento o accesorios y ayuda a nuestros peludos rescatados.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl" aria-label="Artículos en el carrito">
      <h2 className="font-baloo text-2xl text-peach">Artículos seleccionados</h2>
      <ul className="mt-6 space-y-5">
        {items.map((item) => (
          <li key={item.product.id} className="flex flex-col gap-4 rounded-2xl border border-charcoal/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-4">
              {item.product.imagen && (
                <img
                  src={item.product.imagen}
                  alt={item.product.nombre}
                  className="h-20 w-20 rounded-2xl object-cover"
                  loading="lazy"
                />
              )}
              <div>
                <p className="font-fredoka text-lg text-charcoal">{item.product.nombre}</p>
                <p className="text-sm text-charcoal/70">${item.product.precio?.toFixed(2)} c/u</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs text-charcoal/60" htmlFor={`qty-${item.product.id}`}>
                Cantidad
              </label>
              <input
                id={`qty-${item.product.id}`}
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) => updateQuantity(item.product.id, Number(event.target.value))}
                className="w-20 rounded-full border border-charcoal/20 px-4 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => removeItem(item.product.id)}
                className="text-xs text-peach transition hover:text-peach/80"
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CartItemsList