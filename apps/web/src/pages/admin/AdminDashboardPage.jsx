import { useEffect, useMemo, useState } from "react"
import { useAuth } from "../../context/AuthContext.jsx"
import { leadsService } from "../../services/leadsService.js"
import { ordersService } from "../../services/ordersService.js"

const AdminDashboardPage = () => {
  const { token, user } = useAuth()
  const [orders, setOrders] = useState([])
  const [leads, setLeads] = useState([])
  const [statusFilter, setStatusFilter] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const isAdmin = useMemo(() => user?.rol === "admin", [user?.rol])

  useEffect(() => {
    if (!token || !isAdmin) {
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
  }, [token, isAdmin, statusFilter])

  if (!token) {
    return (
      <section className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <h1 className="font-baloo text-3xl text-peach">Acceso restringido</h1>
        <p className="mt-4 text-sm text-charcoal/70">
          Inicia sesión con la cuenta maestra para visualizar el panel de administración. Contacta al equipo líder si necesitas
          credenciales.
        </p>
      </section>
    )
  }

  if (!isAdmin) {
    return (
      <section className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <h1 className="font-baloo text-3xl text-peach">Hola {user?.nombre}</h1>
        <p className="mt-4 text-sm text-charcoal/70">
          Tu cuenta no tiene permisos administrativos. Puedes consultar tus solicitudes de adopción y compras desde el
          menú principal.
        </p>
      </section>
    )
  }

  const totalRecaudado = orders.reduce((acc, order) => acc + (order.total ?? 0), 0)

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <header className="rounded-3xl bg-peach p-8 text-white shadow-xl">
        <h1 className="font-baloo text-3xl">Panel administrativo PawMatch</h1>
        <p className="mt-2 text-sm">
          Gestiona pedidos, registros de guía de cuidados y revisa la recaudación solidaria.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl bg-white/20 p-4 text-sm">
            <h2 className="font-fredoka text-lg">Pedidos registrados</h2>
            <p className="mt-2 text-2xl font-bold">{orders.length}</p>
          </article>
          <article className="rounded-2xl bg-white/20 p-4 text-sm">
            <h2 className="font-fredoka text-lg">Leads de la guía</h2>
            <p className="mt-2 text-2xl font-bold">{leads.length}</p>
          </article>
          <article className="rounded-2xl bg-white/20 p-4 text-sm">
            <h2 className="font-fredoka text-lg">Recaudado</h2>
            <p className="mt-2 text-2xl font-bold">${totalRecaudado.toFixed(2)}</p>
          </article>
        </div>
      </header>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setStatusFilter("")}
          className={`rounded-full px-4 py-2 text-sm font-fredoka ${statusFilter === "" ? "bg-peach text-white" : "bg-white shadow"}`}
        >
          Todos los pedidos
        </button>
        {["pendiente", "pagado", "enviado", "entregado", "cancelado"].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`rounded-full px-4 py-2 text-sm capitalize ${
              statusFilter === status ? "bg-peach text-white" : "bg-white shadow"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      {loading && <p className="text-center text-sm text-charcoal/70">Cargando panel...</p>}

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="font-fredoka text-2xl text-peach">Pedidos recientes</h2>
          <ul className="mt-4 space-y-4 text-sm text-charcoal/90">
            {orders.map((order) => (
              <li key={order.id} className="rounded-2xl border border-charcoal/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">#{order.id?.slice(-6) ?? "---"}</span>
                  <span className="rounded-full bg-mint/30 px-3 py-1 text-xs uppercase text-peach">{order.estado}</span>
                </div>
                <p className="mt-2 text-xs text-charcoal/70">Cliente: {order.usuario?.nombre ?? "Anónimo"}</p>
                <p className="mt-2 text-sm">Total: ${order.total?.toFixed(2) ?? "0.00"}</p>
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
          <h2 className="font-fredoka text-2xl text-peach">Registros de la guía</h2>
          <ul className="mt-4 space-y-4 text-sm text-charcoal/90">
            {leads.map((lead) => (
              <li key={lead.id} className="rounded-2xl border border-charcoal/10 p-4">
                <p className="font-semibold">
                  {lead.nombre} {lead.apellido ?? ""}
                </p>
                <p className="text-xs text-charcoal/70">{lead.email}</p>
                <p className="mt-2 text-xs text-charcoal/60">
                  Perros: {lead.perros ?? 0} | Gatos: {lead.gatos ?? 0}
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
