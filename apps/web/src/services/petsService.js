import { apiClient } from "./apiClient.js"

export const petsService = {
  listarMascotas(params) {
    return apiClient.get("/pets", { params })
  },
  detalleMascota(id) {
    return apiClient.get(`/pets/${id}`)
  },
  semillas() {
    return apiClient.get("/pets/seeds")
  },
}
