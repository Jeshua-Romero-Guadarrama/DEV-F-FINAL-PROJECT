import { createContext, useContext, useEffect, useMemo, useState } from "react"

const AuthContext = createContext(null)
const STORAGE_KEY = "pawmatch-auth"

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        // Restaura la sesion previa almacenada en el navegador
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error("No fue posible restaurar la sesion", error)
    }
    return { token: null, user: null }
  })

  useEffect(() => {
    // Persiste la sesion en localStorage cada vez que cambia
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const value = useMemo(() => {
    const login = (payload) => setState({ token: payload.token, user: payload.user })
    const logout = () => setState({ token: null, user: null })
    return {
      token: state.token,
      user: state.user,
      isAuthenticated: Boolean(state.token),
      login,
      logout,
    }
  }, [state])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/* eslint-disable-next-line react-refresh/only-export-components */
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return ctx
}
