import { Router } from "express"
import { authRouter } from "../modules/auth/auth.routes.js"
import { leadsRouter } from "../modules/leads/leads.routes.js"
import { ordersRouter } from "../modules/orders/orders.routes.js"
import { petsRouter } from "../modules/pets/pets.routes.js"
import { productsRouter } from "../modules/products/products.routes.js"
import { requestsRouter } from "../modules/requests/requests.routes.js"

export const apiRouter = Router()

apiRouter.use("/auth", authRouter)
apiRouter.use("/leads", leadsRouter)
apiRouter.use("/orders", ordersRouter)
apiRouter.use("/pets", petsRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/requests", requestsRouter)
