import { createApp } from "./app/app.js"
import { connectDatabase } from "./config/database.js"
import { config } from "./config/env.js"

const bootstrap = async () => {
  try {
    await connectDatabase()
    const app = createApp()

    app.listen(config.port, () => {
      console.log(`?? PawMatch API lista en http://localhost:${config.port}${config.apiPrefix}`)
    })
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error)
    process.exit(1)
  }
}

bootstrap()
