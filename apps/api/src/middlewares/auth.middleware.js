import jwt from "jsonwebtoken"
import { config } from "../config/env.js"
import { HttpError } from "../shared/httpError.js"
import { User } from "../modules/users/user.model.js"

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization ?? ""
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

  if (!token) {
    return next(new HttpError(401, "No autorizado, token faltante"))
  }

  try {
    const decoded = jwt.verify(token, config.security.jwtSecret)
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return next(new HttpError(401, "Token inválido"))
    }

    req.user = user
    return next()
  } catch (error) {
    return next(new HttpError(401, "No autorizado"))
  }
}

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.rol)) {
    return next(new HttpError(403, "Acceso denegado"))
  }
  return next()
}
