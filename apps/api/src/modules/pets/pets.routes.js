import { Router } from "express"
import { authenticate, authorizeRoles } from "../../middlewares/auth.middleware.js"
import { validateRequest } from "../../middlewares/validation.middleware.js"
import {
  createPet,
  deletePet,
  getPetById,
  listPets,
  updatePet,
} from "./pet.controller.js"
import {
  createPetValidations,
  listPetsValidations,
  petIdValidation,
  updatePetValidations,
} from "./pet.validators.js"

export const petsRouter = Router()

petsRouter.get("/", validateRequest(listPetsValidations), listPets)
petsRouter.get("/:id", validateRequest(petIdValidation), getPetById)

petsRouter.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  validateRequest(createPetValidations),
  createPet,
)

petsRouter.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validateRequest(updatePetValidations),
  updatePet,
)

petsRouter.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validateRequest(petIdValidation),
  deletePet,
)
