import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { FaChartLine, FaClipboardList, FaUsers, FaWarehouse } from "react-icons/fa"
import { FiDownload, FiRefreshCcw } from "react-icons/fi"
import { useAuth } from "../../context/AuthContext.jsx"
import { leadsService } from "../../services/leadsService.js"
import { ordersService } from "../../services/ordersService.js"

const STATUS_PALETTE = {
  pendiente: "bg-sunny/40 text-charcoal",
  pagado: "bg-mint/50 text-charcoal",
  enviado: "bg-cream text-charcoal",
  entregado: "bg-mint/30 text-charcoal",
  cancelado: "bg-red-100 text-red-600",
  "sin estado": "bg-white text-charcoal",
}

const TAREAS_SUGERIDAS = [
  {
    titulo: "Actualizar inventario",
    descripcion: "Revisa los productos con menos de 5 unidades disponibles y programa reabasto.",
  },
  {
    titulo: "Contactar leads recientes",
    descripcion: "Envía seguimiento a las familias registradas esta semana para reforzar el programa de cuidados.",
  },
  {
    titulo: "Programar jornada de donativos",
    descripcion: "Define fecha y voluntariado para la próxima colecta de alimento y medicinas.",
  },
]

const AdminDashboardPage = () => {
  const { token, user } = useAuth()
  const [orders, setOrders] = useState([])
  const [leads, setLeads] = useState([])
  const [statusFilter, setStatusFilter] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [refreshTick, setRefreshTick] = useState(0)

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
        const params = statusFilter ? { estado: statusFilter } : undefined
        const [ordersResponse, leadsResponse] = await Promise.all([
          ordersService.listOrders(token, params),
          leadsService.listLeads(token),
        ])
        setOrders(Array.isArray(ordersResponse) ? ordersResponse : [])
        setLeads(Array.isArray(leadsResponse) ? leadsResponse : [])
      } catch (err) {
        const message = (err?.message ?? "No pudimos cargar el panel").toLowerCase()
        if (message.includes("no autorizado")) {
          setError("No pudimos validar tus permisos. Vuelve a iniciar sesión con una cuenta administrativa.")
        } else {
          setError(err?.message ?? "No pudimos cargar el panel")
        }
        setOrders([])
        setLeads([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token, isAdmin, statusFilter, refreshTick])

  useEffect(() => {
    if (!feedback) {
      return
    }
    const timeout = setTimeout(() => setFeedback(null), 4000)
    return () => clearTimeout(timeout)
  }, [feedback])

  const totalRecaudado = useMemo(
    () => orders.reduce((acc, order) => acc + (order.total ?? 0), 0),
    [orders],
  )

  const totalProductosVendidos = useMemo(
    () =>
      orders.reduce(
        (acc, order) => acc + (order.items?.reduce((sum, item) => sum + (item.cantidad ?? 0), 0) ?? 0),
        0,
      ),
    [orders],
  )

  const statusSummary = useMemo(() => {
    const counts = orders.reduce((acc, order) => {
      const estado = order.estado ?? "sin estado"
      acc[estado] = (acc[estado] ?? 0) + 1
      return acc
    }, {})
    const baseStatuses = ["pendiente", "pagado", "enviado", "entregado", "cancelado"]
    const extras = Object.keys(counts).filter((status) => !baseStatuses.includes(status))
    return [...baseStatuses, ...extras].map((status) => ({ status, count: counts[status] ?? 0 }))
  }, [orders])

  const leadInsights = useMemo(() => {
    if (leads.length === 0) {
      return {
        totalPerros: 0,
        totalGatos: 0,
        promedioEdad: 0,
        porcentajeMascotas: 0,
      }
    }
    const totalPerros = leads.reduce((acc, lead) => acc + Number(lead.perros ?? 0), 0)
    const totalGatos = leads.reduce((acc, lead) => acc + Number(lead.gatos ?? 0), 0)
    const edades = leads
      .map((lead) => Number(lead.edad))
      .filter((value) => !Number.isNaN(value) && value > 0)
    const promedioEdad = edades.length > 0 ? Math.round(edades.reduce((acc, value) => acc + value, 0) / edades.length) : 0
    const hogaresConMascotas = leads.filter((lead) => Number(lead.perros ?? 0) + Number(lead.gatos ?? 0) > 0).length
    return {
      totalPerros,
      totalGatos,
      promedioEdad,
      porcentajeMascotas: Math.round((hogaresConMascotas / leads.length) * 100),
    }
  }, [leads])

  const topClientes = useMemo(() => {
    const totalesPorCliente = orders.reduce((acc, order) => {
      const nombre = order.usuario?.nombre ?? "Invitado"
      acc[nombre] = (acc[nombre] ?? 0) + (order.total ?? 0)
      return acc
    }, {})
    return Object.entries(totalesPorCliente)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([nombre, total]) => ({ nombre, total }))
  }, [orders])

  const filterOptions = useMemo(
    () => statusSummary.map((item) => item.status),
    [statusSummary],
  )

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
          Tu cuenta no tiene permisos administrativos. Puedes consultar tus solicitudes de adopción y compras desde el menú principal.
        </p>
      </section>
    )
  }

  const getFilterClass = (status) => {
    const base = "rounded-full px-4 py-2 text-xs font-fredoka sm:text-sm"
    if ((status ?? "") === "") {
      return `${base} ${statusFilter === "" ? "bg-peach text-white" : "bg-white shadow"}`
    }
    return `${base} capitalize ${statusFilter === status ? "bg-peach text-white" : "bg-white shadow"}`
  }

  const badgeClass = (status) => `mt-2 inline-flex rounded-full px-3 py-1 text-[10px] uppercase ${
    STATUS_PALETTE[status] ?? "bg-white text-charcoal"
  }`

  const handleExportLeads = () => {
    if (leads.length === 0) {
      setFeedback("No hay registros de la guía para exportar todavía.")
      return
    }
    const header = ["nombre", "apellido", "email", "edad", "lada", "telefono", "perros", "gatos"]
    const rows = leads.map((lead) =>
      header
        .map((field) => {
          const value = lead[field] ?? ""
          const sanitized = String(value).replace(/"/g, '""')
          return `"${sanitized}"`
        })
        .join(","),
    )
    const csvContent = [header.join(","), ...rows].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `leads_pawmatch_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setFeedback("Exportamos un archivo CSV con los registros de la guía.")
  }

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
      <header className="rounded-3xl bg-peach p-8 text-white shadow-xl">
        <h1 className="font-baloo text-3xl">Panel administrativo PawMatch</h1>
        <p className="mt-2 text-sm">
          Gestiona pedidos, registros de guía de cuidados y revisa la recaudación solidaria.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl bg-white/20 p-4 text-sm">
            <h2 className="font-fredoka text-lg">Pedidos registrados</h2>
            <p className="mt-2 text-2xl font-bold">{orders.length}</p>
            <p className="mt-1 text-xs text-white/80">Total histórico dentro del periodo consultado.</p>
          </article>
          <article className="rounded-2xl bg-white/20 p-4 text-sm">
            <h2 className="font-fredoka text-lg">Leads de la guía</h2>
            <p className="mt-2 text-2xl font-bold">{leads.length}</p>
            <p className="mt-1 text-xs text-white/80">Registros recibidos vía landing de cuidados.</p>
          </article>
          <article className="rounded-2xl bg-white/20 p-4 text-sm">
            <h2 className="font-fredoka text-lg">Recaudado</h2>
            <p className="mt-2 text-2xl font-bold">${totalRecaudado.toFixed(2)}</p>
            <p className="mt-1 text-xs text-white/80">Incluye compras y aportaciones confirmadas.</p>
          </article>
        </div>
      </header>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setRefreshTick((prev) => prev + 1)}
          className="inline-flex items-center gap-2 rounded-full bg-mint/40 px-4 py-2 text-xs font-fredoka text-charcoal transition hover:bg-mint/60 sm:text-sm"
        >
          <FiRefreshCcw aria-hidden /> Actualizar panel
        </button>
        <button
          type="button"
          onClick={handleExportLeads}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-fredoka text-charcoal shadow transition hover:bg-cream sm:text-sm"
        >
          <FiDownload aria-hidden /> Exportar leads CSV
        </button>
        <Link
          to="/care-guide"
          className="inline-flex items-center gap-2 rounded-full bg-white/30 px-4 py-2 text-xs font-fredoka text-peach transition hover:bg-white/40 sm:text-sm"
        >
          <FaClipboardList aria-hidden /> Ver landing
        </Link>
      </div>

      {feedback && <p className="rounded-2xl bg-mint/40 px-4 py-2 text-xs text-charcoal sm:text-sm">{feedback}</p>}
      {error && <p className="rounded-2xl bg-red-100 px-4 py-2 text-xs text-red-600 sm:text-sm">{error}</p>}
      {loading && <p className="text-sm text-charcoal/70">Cargando panel...</p>}

      <section className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <article className="rounded-3xl bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-fredoka text-2xl text-peach">Resumen operativo</h2>
            <FaChartLine className="text-peach" aria-hidden />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {statusSummary.map(({ status, count }) => (
              <div key={status} className="rounded-2xl border border-charcoal/10 p-4 text-sm">
                <p className="font-semibold capitalize text-charcoal">{status}</p>
                <p className="mt-2 text-2xl font-bold text-peach">{count}</p>
                <span className={badgeClass(status)}>
                  {status === statusFilter ? "Filtro activo" : "Disponible"}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-charcoal/60">
            Productos vendidos en total: <strong>{totalProductosVendidos}</strong>
          </p>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-fredoka text-2xl text-peach">Insights de la guía</h2>
            <FaUsers className="text-peach" aria-hidden />
          </div>
          <ul className="mt-4 space-y-3 text-sm text-charcoal/80">
            <li>Promedio de edad de tutores: <strong>{leadInsights.promedioEdad || "—"} años</strong></li>
            <li>Perros registrados: <strong>{leadInsights.totalPerros}</strong></li>
            <li>Gatos registrados: <strong>{leadInsights.totalGatos}</strong></li>
            <li>Hogares con mascotas: <strong>{leadInsights.porcentajeMascotas}%</strong></li>
          </ul>
          <div className="mt-4 rounded-2xl bg-mint/40 p-4 text-xs text-charcoal/80">
            <p className="font-fredoka text-peach">Recomendación</p>
            <p className="mt-1">Planifica envíos segmentados según el tipo de mascota para personalizar los consejos.</p>
          </div>
        </article>
      </section>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => setStatusFilter("")} className={getFilterClass("")}>
          Todos los pedidos
        </button>
        {filterOptions.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status === statusFilter ? "" : status)}
            className={getFilterClass(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-fredoka text-2xl text-peach">Pedidos recientes</h2>
            <FaWarehouse className="text-peach" aria-hidden />
          </div>
          <ul className="mt-4 space-y-4 text-sm text-charcoal/90">
            {orders.map((order) => (
              <li key={order.id} className="rounded-2xl border border-charcoal/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">#{order.id?.slice(-6) ?? "---"}</span>
                  <span className="rounded-full bg-mint/40 px-3 py-1 text-xs uppercase text-peach">{order.estado}</span>
                </div>
                <p className="mt-2 text-xs text-charcoal/70">Cliente: {order.usuario?.nombre ?? "Anónimo"}</p>
                <p className="mt-2 text-sm">Total: ${order.total?.toFixed(2) ?? "0.00"}</p>
                <ul className="mt-2 space-y-1 text-xs">
                  {order.items?.map((item, index) => (
                    <li key={`${order.id}-item-${index}`}>
                      {item.producto?.nombre ?? "Producto"} ×{item.cantidad}
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
                <p className="font-semibold">{lead.nombre} {lead.apellido ?? ""}</p>
                <p className="text-xs text-charcoal/70">{lead.email}</p>
                <p className="mt-2 text-xs text-charcoal/60">Perros: {lead.perros ?? 0} | Gatos: {lead.gatos ?? 0}</p>
              </li>
            ))}
            {leads.length === 0 && <li className="text-center text-xs text-charcoal/60">No hay registros cargados.</li>}
          </ul>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="font-fredoka text-2xl text-peach">Clientes destacados</h2>
          <ul className="mt-4 space-y-3 text-sm text-charcoal/90">
            {topClientes.length > 0 ? (
              topClientes.map((cliente) => (
                <li key={cliente.nombre} className="flex items-center justify-between rounded-2xl border border-charcoal/10 px-4 py-3">
                  <span>{cliente.nombre}</span>
                  <span className="font-semibold text-peach">${cliente.total.toFixed(2)}</span>
                </li>
              ))
            ) : (
              <li className="rounded-2xl border border-dashed border-charcoal/20 px-4 py-6 text-center text-xs text-charcoal/60">
                Aún no hay clientes recurrentes identificados.
              </li>
            )}
          </ul>
        </article>
        <article className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="font-fredoka text-2xl text-peach">Checklist del día</h2>
          <ul className="mt-4 space-y-3 text-sm text-charcoal/80">
            {TAREAS_SUGERIDAS.map((tarea) => (
              <li key={tarea.titulo} className="rounded-2xl border border-charcoal/10 p-4">
                <p className="font-semibold text-charcoal">{tarea.titulo}</p>
                <p className="mt-1 text-xs text-charcoal/70">{tarea.descripcion}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  )
}

export default AdminDashboardPage
