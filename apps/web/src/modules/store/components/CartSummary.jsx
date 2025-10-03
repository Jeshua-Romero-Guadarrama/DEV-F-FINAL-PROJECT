import { useState } from "react"
import { useAuth } from "../../../context/AuthContext.jsx"
import { useCart } from "../../../context/CartContext.jsx"
import { ordersService } from "../../../services/ordersService.js"

const CartSummary = () => {
  const { items, subtotal, itemCount, updateQuantity, removeItem, clearCart } = useCart()
  const { token, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleCheckout = async () => {
    if (!isAuthenticated || !token) {
      setError("Debes iniciar sesión para completar tu compra")
      return
    }
    if (items.length === 0) {
      return
    }

    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      await ordersService.createOrder(token, {
        items: items.map((item) => ({
          producto: item.product.id,
          cantidad: item.quantity,
          precioUnitario: item.product.precio,
        })),
        total: subtotal,
      })
      setMessage("¡Listo! Hemos registrado tu compra solidaria.")
      clearCart()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl">
      <h3 className="font-fredoka text-2xl text-peach">Tu carrito</h3>
      <p className="text-sm text-charcoal/70">{itemCount} artículos seleccionados.</p>
      <ul className="space-y-4 text-sm">
        {items.map((item) => (
          <li key={item.product.id} className="rounded-2xl border border-charcoal/10 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-charcoal">{item.product.nombre}</p>
                <p className="text-xs text-charcoal/60">${item.product.precio?.toFixed(2)} c/u</p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.product.id)}
                className="text-xs text-peach hover:text-peach/80"
              >
                Quitar
              </button>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <label className="text-xs text-charcoal/60">Cantidad</label>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) => updateQuantity(item.product.id, Number(event.target.value))}
                className="w-16 rounded-full border border-charcoal/20 px-3 py-1 text-sm"
              />
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="text-center text-xs text-charcoal/60">Tu carrito está vacío.</li>}
      </ul>

      <div className="mt-4 flex items-center justify-between text-lg font-semibold text-charcoal">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="rounded-full bg-sunny px-6 py-3 font-fredoka text-charcoal shadow-md transition hover:bg-sunny/80 disabled:opacity-60"
      >
        {loading ? "Procesando..." : "Finalizar compra"}
      </button>
      {message && <p className="text-center text-xs text-mint">{message}</p>}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
    </aside>
  )
}

export default CartSummary
