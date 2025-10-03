import nodemailer from "nodemailer"
import { config } from "../config/env.js"

let cachedTransporter

const ensureTransporter = () => {
  if (!config.smtp.user || !config.smtp.pass) {
    throw new Error("Credenciales SMTP no configuradas")
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    })
  }

  return cachedTransporter
}

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!config.smtp.user || !config.smtp.pass) {
    console.warn("[email] SMTP no configurado. Omite envío a", to)
    return null
  }

  const transporter = ensureTransporter()

  return transporter.sendMail({
    from: config.smtp.from,
    to,
    subject,
    text,
    html,
  })
}
