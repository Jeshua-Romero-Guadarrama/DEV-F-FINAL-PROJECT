import { body, query } from "express-validator"

export const createLeadValidations = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("apellido").trim().notEmpty().withMessage("El apellido es obligatorio"),
  body("email").isEmail().withMessage("Correo invalido"),
  body("edad").isInt({ min: 18 }).withMessage("La edad minima es 18"),
  body("lada").trim().notEmpty().withMessage("La lada es obligatoria"),
  body("telefono").trim().notEmpty().withMessage("El telefono es obligatorio"),
  body("perros").optional().isInt({ min: 0 }).withMessage("Numero de perros invalido"),
  body("gatos").optional().isInt({ min: 0 }).withMessage("Numero de gatos invalido"),
  body("aceptoTerminos")
    .isBoolean()
    .withMessage("Debe ser booleano")
    .toBoolean()
    .custom((value) => value === true)
    .withMessage("Debes aceptar los terminos"),
]

export const listLeadsValidations = [
  query("email").optional().isEmail().withMessage("Correo invalido"),
]
