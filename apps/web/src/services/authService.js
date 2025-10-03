import { apiClient } from "./apiClient.js"

export const authService = {
  register(payload) {
    return apiClient.post("/auth/register", { body: payload })
  },
  login(payload) {
    return apiClient.post("/auth/login", { body: payload })
  },
  profile(token) {
    return apiClient.get("/auth/profile", { token })
  },
}
