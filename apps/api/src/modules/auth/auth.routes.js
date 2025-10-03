import { Router } from "express"
import { authenticate } from "../../middlewares/auth.middleware.js"
import { validateRequest } from "../../middlewares/validation.middleware.js"
import { getProfile, loginUser, registerUser } from "./auth.controller.js"
import { loginValidations, registerValidations } from "./auth.validators.js"

export const authRouter = Router()

authRouter.post("/register", validateRequest(registerValidations), registerUser)
authRouter.post("/login", validateRequest(loginValidations), loginUser)
authRouter.get("/profile", authenticate, getProfile)
