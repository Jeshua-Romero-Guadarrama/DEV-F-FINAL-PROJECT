import { apiClient } from "./apiClient.js"

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? "admin@pawmatch.com"
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "PawMatch#2025"
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN ?? "master-admin-token"

const buildMasterSession = () => ({
  token: ADMIN_TOKEN,
  user: {
    id: "admin-master",
    nombre: "Administrador PawMatch",
    email: ADMIN_EMAIL,
    rol: "admin",
  },
})

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
  masterSession() {
    return buildMasterSession()
  },
}