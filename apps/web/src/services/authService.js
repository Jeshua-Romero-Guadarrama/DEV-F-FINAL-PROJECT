import { apiClient } from "./apiClient.js"

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? "admin@pawmatch.com"
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "PawMatch#2025"

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
  isMasterCredentials(email, password) {
    return email === ADMIN_EMAIL && password === ADMIN_PASSWORD
  },
}
