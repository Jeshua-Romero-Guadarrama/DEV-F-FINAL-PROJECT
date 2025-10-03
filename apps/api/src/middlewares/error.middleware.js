import { HttpError } from "../shared/httpError.js"

export const notFoundHandler = (req, res, next) => {
  next(new HttpError(404, `Ruta no encontrada: ${req.originalUrl}`))
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err instanceof HttpError ? err.statusCode : err.statusCode ?? 500
  const payload = {
    message: err.message ?? "Error interno del servidor",
  }

  if (err instanceof HttpError && err.details) {
    payload.details = err.details
  } else if (err.errors) {
    payload.details = err.errors
  }

  if (process.env.NODE_ENV !== "production") {
    payload.traceId = req.id ?? undefined
  }

  // eslint-disable-next-line no-console
  console.error("[error]", err)

  res.status(statusCode || 500).json(payload)
}
