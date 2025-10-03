import { apiClient } from "./apiClient.js"

export const productsService = {
  list(params) {
    return apiClient.get("/products", { params })
  },
}
