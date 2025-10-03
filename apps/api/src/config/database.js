import mongoose from "mongoose"
import { config } from "./env.js"

mongoose.set("strictQuery", true)

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.database.uri, { dbName: config.database.name })
    console.log(`?? Base de datos conectada (${config.database.name})`)
  } catch (error) {
    console.error("? Error conectando a MongoDB:", error.message)
    throw error
  }
}
