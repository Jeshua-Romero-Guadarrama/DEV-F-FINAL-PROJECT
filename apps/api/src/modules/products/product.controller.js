import { HttpError } from "../../shared/httpError.js"
import { Product } from "./product.model.js"

export const listProducts = async (req, res, next) => {
  try {
    const filters = {}
    if (req.query.categoria) filters.categoria = req.query.categoria
    if (req.query.activo !== undefined) {
      filters.activo = req.query.activo === true
    } else {
      filters.activo = true
    }

    const products = await Product.find(filters).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      throw new HttpError(404, "Producto no encontrado")
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) {
      throw new HttpError(404, "Producto no encontrado")
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      throw new HttpError(404, "Producto no encontrado")
    }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
