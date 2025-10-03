import { HttpError } from "../../shared/httpError.js"
import { Lead } from "./lead.model.js"

export const createLead = async (req, res, next) => {
  try {
    // Se evita registrar multiples veces el mismo correo en un periodo corto
    const existing = await Lead.findOne({ email: req.body.email }).sort({ createdAt: -1 })
    if (existing && existing.createdAt && Date.now() - existing.createdAt.getTime() < 1000 * 60 * 60 * 24) {
      throw new HttpError(409, "Ya registramos tus datos recientemente")
    }

    const lead = await Lead.create(req.body)

    res.status(201).json(lead)
  } catch (error) {
    next(error)
  }
}

export const listLeads = async (req, res, next) => {
  try {
    const filters = {}
    if (req.query.email) {
      filters.email = req.query.email
    }

    const leads = await Lead.find(filters).sort({ createdAt: -1 })
    res.json(leads)
  } catch (error) {
    next(error)
  }
}

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id)
    if (!lead) {
      throw new HttpError(404, "Registro no encontrado")
    }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
