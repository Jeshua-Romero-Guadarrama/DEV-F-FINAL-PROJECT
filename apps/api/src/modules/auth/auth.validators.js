import { body } from "express-validator"
import { USER_ROLES } from "../users/user.model.js"

export const registerValidations = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("Correo inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("telefono")
    .optional()
    .isLength({ min: 7 })
    .withMessage("El teléfono debe tener al menos 7 dígitos"),
  body("rol")
    .optional()
    .isIn(USER_ROLES)
    .withMessage(`Rol inválido. Valores permitidos: ${USER_ROLES.join(", ")}`),
]

export const loginValidations = [
  body("email").isEmail().withMessage("Correo inválido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
]
