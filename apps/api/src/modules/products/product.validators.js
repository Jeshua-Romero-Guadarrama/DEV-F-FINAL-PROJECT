import { body, param, query } from "express-validator"

export const listProductsValidations = [
  query("categoria").optional().isString().withMessage("Categoria invalida"),
  query("activo")
    .optional()
    .isBoolean()
    .withMessage("El parametro activo debe ser booleano")
    .toBoolean(),
]

const baseProductValidations = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("precio").isFloat({ min: 0 }).withMessage("El precio debe ser positivo"),
  body("stock").optional().isInt({ min: 0 }).withMessage("El stock debe ser positivo"),
  body("activo").optional().isBoolean().withMessage("Activo debe ser booleano").toBoolean(),
]

export const createProductValidations = baseProductValidations

export const updateProductValidations = [param("id").isMongoId().withMessage("Identificador invalido"), ...baseProductValidations]

export const productIdValidation = [param("id").isMongoId().withMessage("Identificador invalido")]
