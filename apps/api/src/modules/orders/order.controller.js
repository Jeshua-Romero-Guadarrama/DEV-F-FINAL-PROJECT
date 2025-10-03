import { HttpError } from "../../shared/httpError.js"
import { Order } from "./order.model.js"

const buildFilters = (req) => {
  const filters = {}
  if (req.query.estado) {
    filters.estado = req.query.estado
  }
  if (req.query.usuario) {
    filters.usuario = req.query.usuario
  }
  if (req.user.rol !== "admin") {
    filters.usuario = req.user.id
  }
  return filters
}

export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create({
      usuario: req.user.id,
      ...req.body,
    })

    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
}

export const listOrders = async (req, res, next) => {
  try {
    const filters = buildFilters(req)
    const orders = await Order.find(filters)
      .populate("usuario", "nombre email")
      .populate("items.producto", "nombre precio")
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    next(error)
  }
}

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("usuario", "nombre email telefono")
      .populate("items.producto", "nombre precio")

    if (!order) {
      throw new HttpError(404, "Pedido no encontrado")
    }

    if (req.user.rol !== "admin" && String(order.usuario._id ?? order.usuario) !== String(req.user.id)) {
      throw new HttpError(403, "Acceso denegado")
    }

    res.json(order)
  } catch (error) {
    next(error)
  }
}

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      throw new HttpError(404, "Pedido no encontrado")
    }

    order.estado = req.body.estado
    if (req.body.notas) {
      order.notas = req.body.notas
    }

    await order.save()

    res.json(order)
  } catch (error) {
    next(error)
  }
}
