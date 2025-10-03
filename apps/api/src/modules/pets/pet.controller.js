import { HttpError } from "../../shared/httpError.js"
import { Pet } from "./pet.model.js"

export const listPets = async (req, res, next) => {
  try {
    const filters = {}
    if (req.query.estado) filters.estado = req.query.estado
    if (req.query.tipo) filters.tipo = req.query.tipo

    const pets = await Pet.find(filters).sort({ createdAt: -1 })
    res.json(pets)
  } catch (error) {
    next(error)
  }
}

export const getPetById = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id)
    if (!pet) {
      throw new HttpError(404, "Mascota no encontrada")
    }
    res.json(pet)
  } catch (error) {
    next(error)
  }
}

export const createPet = async (req, res, next) => {
  try {
    const pet = await Pet.create(req.body)
    res.status(201).json(pet)
  } catch (error) {
    next(error)
  }
}

export const updatePet = async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!pet) {
      throw new HttpError(404, "Mascota no encontrada")
    }
    res.json(pet)
  } catch (error) {
    next(error)
  }
}

export const deletePet = async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id)
    if (!pet) {
      throw new HttpError(404, "Mascota no encontrada")
    }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
