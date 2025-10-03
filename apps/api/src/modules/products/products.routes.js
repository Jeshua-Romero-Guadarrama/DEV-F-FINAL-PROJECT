import { Router } from "express"
import { authenticate, authorizeRoles } from "../../middlewares/auth.middleware.js"
import { validateRequest } from "../../middlewares/validation.middleware.js"
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./product.controller.js"
import {
  createProductValidations,
  listProductsValidations,
  productIdValidation,
  updateProductValidations,
} from "./product.validators.js"

export const productsRouter = Router()

productsRouter.get("/", validateRequest(listProductsValidations), listProducts)
productsRouter.get("/:id", validateRequest(productIdValidation), getProductById)

productsRouter.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  validateRequest(createProductValidations),
  createProduct,
)

productsRouter.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validateRequest(updateProductValidations),
  updateProduct,
)

productsRouter.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validateRequest(productIdValidation),
  deleteProduct,
)
