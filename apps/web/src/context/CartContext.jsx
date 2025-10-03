import { createContext, useContext, useMemo, useState } from "react"

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const addItem = (product) => {
    // Si el producto ya esta en el carrito se incrementa su cantidad
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      // Se agrega un nuevo producto con cantidad inicial 1
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const clearCart = () => setItems([])

  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.product.precio * item.quantity, 0)
    return {
      itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
      subtotal,
    }
  }, [items])

  const value = useMemo(
    () => ({ items, addItem, updateQuantity, removeItem, clearCart, ...totals }),
    [items, totals],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/* eslint-disable-next-line react-refresh/only-export-components */
export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de CartProvider")
  }
  return ctx
}
