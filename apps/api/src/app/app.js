import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { config } from "../config/env.js"
import { apiRouter } from "../routes/index.js"
import { notFoundHandler, errorHandler } from "../middlewares/error.middleware.js"

export const createApp = () => {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: config.cors.origins,
      credentials: true,
    }),
  )
  app.use(express.json({ limit: "1mb" }))
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan(config.isProduction ? "combined" : "dev"))

  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() })
  })

  app.use(config.apiPrefix, apiRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
