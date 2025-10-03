import { apiClient } from "./apiClient.js"

const normalizeEmail = (value) => value?.trim().toLowerCase() ?? ""
const normalizePassword = (value) => value?.trim() ?? ""

const ADMIN_EMAIL = normalizeEmail(import.meta.env.VITE_ADMIN_EMAIL ?? "admin@pawmatch.com")
const ADMIN_PASSWORD = normalizePassword(import.meta.env.VITE_ADMIN_PASSWORD ?? "PawMatch#2025")
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN ?? "master-admin-token"

const MASTER_SESSION = {
  token: ADMIN_TOKEN,
  user: {
    id: "admin-master",
    nombre: "Administrador PawMatch",
    email: import.meta.env.VITE_ADMIN_EMAIL ?? "admin@pawmatch.com",
    rol: "admin",
  },
}

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
    return normalizeEmail(email) === ADMIN_EMAIL && normalizePassword(password) === ADMIN_PASSWORD
  },
  masterSession() {
    return MASTER_SESSION
  },
}