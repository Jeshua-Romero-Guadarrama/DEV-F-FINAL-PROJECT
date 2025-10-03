import { apiClient } from "./apiClient.js"

const normalizeEmail = (value) => value?.trim().toLowerCase() ?? ""
const normalizePassword = (value) => value?.trim() ?? ""

const ADMIN_EMAIL = normalizeEmail(import.meta.env.VITE_ADMIN_EMAIL ?? "equipo.admin@pawmatch.mx")
const ADMIN_PASSWORD = normalizePassword(import.meta.env.VITE_ADMIN_PASSWORD ?? "PM@dm1n!2025Secure")
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN ?? "pm_admin_session_2025"

const MASTER_SESSION = {
  token: ADMIN_TOKEN,
  user: {
    id: "admin-master",
    nombre: "Administrador PawMatch",
    email: import.meta.env.VITE_ADMIN_EMAIL ?? "equipo.admin@pawmatch.mx",
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
