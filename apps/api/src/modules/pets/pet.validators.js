import { body, param, query } from "express-validator"
import { PET_GENDERS, PET_SIZES, PET_STATUSES, PET_TYPES } from "./pet.model.js"

export const listPetsValidations = [
  query("estado").optional().isIn(PET_STATUSES).withMessage("Estado invalido"),
  query("tipo").optional().isIn(PET_TYPES).withMessage("Tipo invalido"),
]

const basePetValidations = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("tipo").optional().isIn(PET_TYPES).withMessage("Tipo invalido"),
  body("estado").optional().isIn(PET_STATUSES).withMessage("Estado invalido"),
  body("tamano").optional().isIn(PET_SIZES).withMessage("Tamano invalido"),
  body("sexo").optional().isIn(PET_GENDERS).withMessage("Sexo invalido"),
  body("edad").optional().isInt({ min: 0 }).withMessage("La edad debe ser positiva"),
]

export const createPetValidations = basePetValidations

export const updatePetValidations = [param("id").isMongoId().withMessage("Identificador invalido"), ...basePetValidations]

export const petIdValidation = [param("id").isMongoId().withMessage("Identificador invalido")]
