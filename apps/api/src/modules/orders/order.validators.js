import { body, param, query } from "express-validator"
import { ORDER_STATUS } from "./order.model.js"

export const createOrderValidations = [
  body("items").isArray({ min: 1 }).withMessage("Debes incluir al menos un producto"),
  body("items.*.producto").isMongoId().withMessage("Producto invalido"),
  body("items.*.cantidad").isInt({ min: 1 }).withMessage("Cantidad invalida"),
  body("items.*.precioUnitario").isFloat({ min: 0 }).withMessage("Precio invalido"),
  body("total").isFloat({ min: 0 }).withMessage("Total invalido"),
  body("direccionEnvio.calle").optional().isString(),
  body("direccionEnvio.ciudad").optional().isString(),
  body("direccionEnvio.estado").optional().isString(),
  body("direccionEnvio.codigoPostal").optional().isString(),
  body("notas").optional().isLength({ max: 500 }),
]

export const updateOrderStatusValidations = [
  param("id").isMongoId().withMessage("Identificador invalido"),
  body("estado").isIn(ORDER_STATUS).withMessage("Estado de pedido invalido"),
  body("notas").optional().isLength({ max: 500 }),
]

export const orderIdValidation = [param("id").isMongoId().withMessage("Identificador invalido")]

export const listOrdersValidations = [
  query("estado").optional().isIn(ORDER_STATUS).withMessage("Estado invalido"),
  query("usuario").optional().isMongoId().withMessage("Usuario invalido"),
]
