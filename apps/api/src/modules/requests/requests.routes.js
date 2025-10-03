import { Router } from "express"
import { authenticate, authorizeRoles } from "../../middlewares/auth.middleware.js"
import { validateRequest } from "../../middlewares/validation.middleware.js"
import {
  addTimelineEntry,
  createRequest,
  getRequestById,
  listRequests,
  updateRequest,
} from "./request.controller.js"
import {
  addTimelineEntryValidations,
  createRequestValidations,
  listRequestsValidations,
  requestIdValidation,
  updateRequestValidations,
} from "./request.validators.js"

export const requestsRouter = Router()

requestsRouter.use(authenticate)

requestsRouter.get("/", validateRequest(listRequestsValidations), listRequests)
requestsRouter.post("/", validateRequest(createRequestValidations), createRequest)
requestsRouter.get("/:id", validateRequest(requestIdValidation), getRequestById)

requestsRouter.patch(
  "/:id",
  authorizeRoles("admin"),
  validateRequest(updateRequestValidations),
  updateRequest,
)

requestsRouter.post(
  "/:id/timeline",
  authorizeRoles("admin"),
  validateRequest(addTimelineEntryValidations),
  addTimelineEntry,
)
