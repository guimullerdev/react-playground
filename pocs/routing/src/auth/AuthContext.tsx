import { createContext, useContext, useState, type ReactNode } from 'react'

export interface User {
  username: string
  token: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const TOKEN_KEY = 'auth_token'
const USERNAME_KEY = 'auth_username'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    const username = localStorage.getItem(USERNAME_KEY)
    return token && username ? { token, username } : null
  })

  async function login(username: string, _password: string) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const token = btoa(`${username}:${Date.now()}`)
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USERNAME_KEY, username)
    setUser({ username, token })
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USERNAME_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
