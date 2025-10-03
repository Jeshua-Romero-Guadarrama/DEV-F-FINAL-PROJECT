import { validationResult } from "express-validator"
import { HttpError } from "../shared/httpError.js"

export const validateRequest = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const result = validationResult(req)
    if (!result.isEmpty()) {
      return next(new HttpError(422, "Datos inválidos", result.array()))
    }

    return next()
  }
}
