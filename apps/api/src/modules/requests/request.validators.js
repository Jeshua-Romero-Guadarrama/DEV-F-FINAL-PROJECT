import { body, param, query } from "express-validator"
import { REQUEST_STATUS } from "./request.model.js"

export const listRequestsValidations = [
  query("estado").optional().isIn(REQUEST_STATUS).withMessage("Estado invalido"),
]

export const requestIdValidation = [param("id").isMongoId().withMessage("Identificador invalido")]

export const createRequestValidations = [
  body("mascota").isMongoId().withMessage("La mascota es obligatoria"),
  body("comentarios").optional().isLength({ max: 500 }).withMessage("Los comentarios deben tener maximo 500 caracteres"),
]

export const updateRequestValidations = [
  ...requestIdValidation,
  body("estado")
    .optional()
    .isIn(REQUEST_STATUS)
    .withMessage(`Estado invalido. Valores permitidos: ${REQUEST_STATUS.join(", ")}`),
  body("comentarios").optional().isLength({ max: 500 }),
]

export const addTimelineEntryValidations = [
  ...requestIdValidation,
  body("estado")
    .optional()
    .isIn(REQUEST_STATUS)
    .withMessage(`Estado invalido. Valores permitidos: ${REQUEST_STATUS.join(", ")}`),
  body("comentario")
    .notEmpty()
    .withMessage("Debe incluir un comentario para el seguimiento"),
]
