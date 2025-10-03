import { Router } from "express"
import { authenticate, authorizeRoles } from "../../middlewares/auth.middleware.js"
import { validateRequest } from "../../middlewares/validation.middleware.js"
import { createLead, deleteLead, listLeads } from "./lead.controller.js"
import { createLeadValidations, listLeadsValidations } from "./lead.validators.js"

export const leadsRouter = Router()

leadsRouter.post("/", validateRequest(createLeadValidations), createLead)

leadsRouter.use(authenticate, authorizeRoles("admin"))
leadsRouter.get("/", validateRequest(listLeadsValidations), listLeads)
leadsRouter.delete("/:id", deleteLead)
