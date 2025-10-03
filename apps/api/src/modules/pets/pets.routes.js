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

petsRouter.get("/seeds", (_req, res) => {
  res.json([
    {
      id: "seed-toby",
      nombre: "Toby",
      tipo: "perro",
      raza: "Border Collie",
      edad: "2 años",
      sexo: "male",
      descripcion:
        "Con su mirada tierna y energía inagotable, Toby sueña con un hogar donde pueda correr libre, jugar y compartir cada día con una familia que lo quiera tanto como él sabrá quererla.",
      foto: "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?auto=format&fit=crop&w=640&q=80",
      galeria: [
        "https://images.unsplash.com/photo-1437957146754-f6377debe171?auto=format&fit=crop&w=320&q=80",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=320&q=80",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=320&q=80",
      ],
    },
  ])
})

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
