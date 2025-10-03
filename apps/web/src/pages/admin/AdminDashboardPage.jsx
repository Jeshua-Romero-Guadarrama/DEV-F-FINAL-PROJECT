import { useEffect, useState } from "react"
import { leadsService } from "../../services/leadsService.js"
import { ordersService } from "../../services/ordersService.js"

const AdminDashboardPage = () => {
  const [token, setToken] = useState("")
  const [orders, setOrders] = useState([])
  const [leads, setLeads] = useState([])
  const [statusFilter, setStatusFilter] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      setOrders([])
      setLeads([])
      return
    }
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [ordersResponse, leadsResponse] = await Promise.all([
          ordersService.listOrders(token, statusFilter ? { estado: statusFilter } : undefined),
          leadsService.listLeads(token),
        ])
        setOrders(ordersResponse)
        setLeads(leadsResponse)
      } catch (err) {
        setError(err.message)
        setOrders([])
        setLeads([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token, statusFilter])

  return (
    <section className="mx-auto mt-10 flex max-w-6xl flex-col gap-8">
      <header className="rounded-3xl bg-peach p-8 text-white shadow-xl">
        <h1 className="font-baloo text-3xl">Panel administrativo</h1>
        <p className="mt-2 text-sm">
          Ingresa un token valido de usuario administrador para consultar pedidos y registros de la guia de cuidados.
        </p>
        <label className="mt-6 block text-sm">
          Token de sesion
          <textarea
            value={token}
            onChange={(event) => setToken(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-xs text-white placeholder:text-white/60 focus:border-sunny focus:outline-none"
            rows={3}
            placeholder="Pega aqui el token despues de iniciar sesion como administrador"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <button
            type="button"
            onClick={() => setStatusFilter("")}
            className={`rounded-full px-4 py-2 ${statusFilter === "" ? "bg-white text-peach" : "bg-white/20"}`}
          >
            Todos
          </button>
          {["pendiente", "pagado", "enviado", "entregado", "cancelado"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-full px-4 py-2 capitalize ${
                statusFilter === status ? "bg-white text-peach" : "bg-white/20"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </header>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      {loading && <p className="text-center text-sm text-charcoal/70">Cargando datos...</p>}

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="font-fredoka text-2xl text-peach">Pedidos recientes</h2>
          <ul className="mt-4 space-y-4 text-sm text-charcoal/90">
            {orders.map((order) => (
              <li key={order.id} className="rounded-2xl border border-charcoal/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">#{order.id.slice(-6)}</span>
                  <span className="rounded-full bg-mint/30 px-3 py-1 text-xs uppercase text-peach">{order.estado}</span>
                </div>
                <p className="mt-2 text-xs text-charcoal/70">Cliente: {order.usuario?.nombre ?? "Anonimo"}</p>
                <p className="mt-2 text-sm">Total: ${order.total?.toFixed(2)}</p>
                <ul className="mt-2 space-y-1 text-xs">
                  {order.items?.map((item, index) => (
                    <li key={`${order.id}-item-${index}`}>
                      {item.producto?.nombre ?? "Producto"} x{item.cantidad}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            {orders.length === 0 && <li className="text-center text-xs text-charcoal/60">No hay pedidos disponibles.</li>}
          </ul>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="font-fredoka text-2xl text-peach">Registros de guia</h2>
          <ul className="mt-4 space-y-4 text-sm text-charcoal/90">
            {leads.map((lead) => (
              <li key={lead.id} className="rounded-2xl border border-charcoal/10 p-4">
                <p className="font-semibold">
                  {lead.nombre} {lead.apellido}
                </p>
                <p className="text-xs text-charcoal/70">{lead.email}</p>
                <p className="mt-2 text-xs text-charcoal/60">
                  Perros: {lead.perros} | Gatos: {lead.gatos}
                </p>
              </li>
            ))}
            {leads.length === 0 && <li className="text-center text-xs text-charcoal/60">No hay registros cargados.</li>}
          </ul>
        </article>
      </section>
    </section>
  )
}

export default AdminDashboardPage
