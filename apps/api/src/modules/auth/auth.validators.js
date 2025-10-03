import { body } from "express-validator"
import { USER_ROLES } from "../users/user.model.js"

export const registerValidations = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("Correo inv�lido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contrase�a debe tener al menos 6 caracteres"),
  body("telefono")
    .optional()
    .isLength({ min: 7 })
    .withMessage("El tel�fono debe tener al menos 7 d�gitos"),
  body("rol")
    .optional()
    .isIn(USER_ROLES)
    .withMessage(`Rol inv�lido. Valores permitidos: ${USER_ROLES.join(", ")}`),
]

export const loginValidations = [
  body("email").isEmail().withMessage("Correo inv�lido"),
  body("password").notEmpty().withMessage("La contrase�a es obligatoria"),
]
