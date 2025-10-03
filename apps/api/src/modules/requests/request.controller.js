import { HttpError } from "../../shared/httpError.js"
import { sendEmail } from "../../utils/email.js"
import { Pet } from "../pets/pet.model.js"
import { User } from "../users/user.model.js"
import { Request } from "./request.model.js"

export const createRequest = async (req, res, next) => {
  try {
    const { mascota, comentarios } = req.body

    const pet = await Pet.findById(mascota)
    if (!pet) {
      throw new HttpError(404, "Mascota no encontrada")
    }

    const request = await Request.create({
      usuario: req.user.id,
      mascota,
      comentarios,
      seguimiento: [
        {
          estado: "pendiente",
          comentario: "Solicitud creada",
        },
      ],
    })

    try {
      await sendEmail({
        to: req.user.email,
        subject: "Hemos recibido tu solicitud de adopcion",
        text: `Gracias por solicitar la adopcion de ${pet.nombre}. Nos pondremos en contacto contigo pronto.`,
        html: `<p>Gracias por solicitar la adopcion de <strong>${pet.nombre}</strong>. Nos pondremos en contacto contigo pronto.</p>`,
      })
    } catch (emailError) {
      console.warn("[email] No se pudo enviar el correo de confirmacion:", emailError.message)
    }

    res.status(201).json(request)
  } catch (error) {
    next(error)
  }
}

export const listRequests = async (req, res, next) => {
  try {
    const filters = {}
    if (req.query.estado) filters.estado = req.query.estado

    if (req.user.rol !== "admin") {
      filters.usuario = req.user.id
    }

    const requests = await Request.find(filters)
      .populate("usuario", "nombre email")
      .populate("mascota", "nombre tipo estado")
      .sort({ createdAt: -1 })

    res.json(requests)
  } catch (error) {
    next(error)
  }
}

export const getRequestById = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("usuario", "nombre email telefono")
      .populate("mascota", "nombre tipo estado")

    if (!request) {
      throw new HttpError(404, "Solicitud no encontrada")
    }

    if (req.user.rol !== "admin" && String(request.usuario._id ?? request.usuario) !== String(req.user.id)) {
      throw new HttpError(403, "Acceso denegado")
    }

    res.json(request)
  } catch (error) {
    next(error)
  }
}

export const updateRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id)
    if (!request) {
      throw new HttpError(404, "Solicitud no encontrada")
    }

    if (req.user.rol !== "admin" && String(request.usuario) !== String(req.user.id)) {
      throw new HttpError(403, "Acceso denegado")
    }

    Object.assign(request, req.body)
    await request.save()

    res.json(request)
  } catch (error) {
    next(error)
  }
}

export const addTimelineEntry = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id)
    if (!request) {
      throw new HttpError(404, "Solicitud no encontrada")
    }

    if (req.body.estado) {
      request.estado = req.body.estado
    }

    request.seguimiento.push({
      estado: req.body.estado ?? request.estado,
      comentario: req.body.comentario,
    })

    await request.save()

    try {
      const user = await User.findById(request.usuario)
      if (user) {
        await sendEmail({
          to: user.email,
          subject: "Actualizacion de tu solicitud de adopcion",
          text: `Tu solicitud se actualizo al estado: ${request.estado}.`,
          html: `<p>Tu solicitud se actualizo al estado <strong>${request.estado}</strong>.</p><p>${req.body.comentario ?? ""}</p>`,
        })
      }
    } catch (emailError) {
      console.warn("[email] No se pudo enviar el correo de seguimiento:", emailError.message)
    }

    res.json(request)
  } catch (error) {
    next(error)
  }
}
