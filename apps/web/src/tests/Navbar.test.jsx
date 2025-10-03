import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Navbar from '../components/layout/Navbar.jsx'

const authState = { isAuthenticated: false, user: null, logout: vi.fn() }
const cartState = { itemCount: 0 }

vi.mock('../context/AuthContext.jsx', () => ({
  useAuth: () => authState,
}))

vi.mock('../context/CartContext.jsx', () => ({
  useCart: () => cartState,
}))

describe('Navbar', () => {
  beforeEach(() => {
    authState.isAuthenticated = false
    authState.user = null
    cartState.itemCount = 0
  })

  it('no muestra el enlace de administración para usuarios generales', () => {
    render(<Navbar />)
    expect(screen.queryByText(/Administración/i)).toBeNull()
  })

  it('muestra el enlace de administración para administradores autenticados', () => {
    authState.isAuthenticated = true
    authState.user = { nombre: 'Admin', rol: 'admin' }

    render(<Navbar />)
    expect(screen.getByText(/Administración/i)).toBeInTheDocument()
  })
})
