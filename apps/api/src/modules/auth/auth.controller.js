import jwt from "jsonwebtoken"
import { config } from "../../config/env.js"
import { HttpError } from "../../shared/httpError.js"
import { sendEmail } from "../../utils/email.js"
import { User } from "../users/user.model.js"

const buildToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      rol: user.rol,
    },
    config.security.jwtSecret,
    { expiresIn: config.security.jwtExpiresIn },
  )

const sanitizeUser = (user) => ({
  id: user.id,
  nombre: user.nombre,
  email: user.email,
  rol: user.rol,
  telefono: user.telefono,
  direccion: user.direccion,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
})

export const registerUser = async (req, res, next) => {
  try {
    const { nombre, email, password, rol, telefono, direccion } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      throw new HttpError(409, "El correo ya está registrado")
    }

    const user = await User.create({ nombre, email, password, rol, telefono, direccion })

    try {
      await sendEmail({
        to: user.email,
        subject: "Bienvenido a PawMatch",
        text: `Hola ${user.nombre}, gracias por unirte a PawMatch.`,
        html: `<p>Hola <strong>${user.nombre}</strong>, gracias por unirte a PawMatch.</p>`,
      })
    } catch (emailError) {
      console.warn("[email] No se pudo enviar el correo de bienvenida:", emailError.message)
    }

    const token = buildToken(user)

    res.status(201).json({
      user: sanitizeUser(user),
      token,
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      throw new HttpError(401, "Credenciales incorrectas")
    }

    const isValid = await user.comparePassword(password)
    if (!isValid) {
      throw new HttpError(401, "Credenciales incorrectas")
    }

    const token = buildToken(user)
    res.json({ user: sanitizeUser(user), token })
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (req, res) => {
  res.json({ user: sanitizeUser(req.user) })
}
