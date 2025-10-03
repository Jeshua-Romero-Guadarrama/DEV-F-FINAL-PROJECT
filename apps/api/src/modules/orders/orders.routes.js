import { Router } from "express"
import { authenticate, authorizeRoles } from "../../middlewares/auth.middleware.js"
import { validateRequest } from "../../middlewares/validation.middleware.js"
import { createOrder, getOrderById, listOrders, updateOrderStatus } from "./order.controller.js"
import {
  createOrderValidations,
  listOrdersValidations,
  orderIdValidation,
  updateOrderStatusValidations,
} from "./order.validators.js"

export const ordersRouter = Router()

ordersRouter.use(authenticate)

ordersRouter.post("/", validateRequest(createOrderValidations), createOrder)
ordersRouter.get("/", authorizeRoles("admin"), validateRequest(listOrdersValidations), listOrders)
ordersRouter.get("/:id", validateRequest(orderIdValidation), getOrderById)
ordersRouter.patch(
  "/:id",
  authorizeRoles("admin"),
  validateRequest(updateOrderStatusValidations),
  updateOrderStatus,
)
