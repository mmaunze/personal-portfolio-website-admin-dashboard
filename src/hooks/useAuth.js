import { createContext, useContext, useEffect, useState } from 'react'
import { authService, apiUtils } from '@/services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar se há token salvo e carregar dados do utilizador
    const initAuth = async () => {
      try {
        if (apiUtils.isAuthenticated()) {
          const userData = apiUtils.getUser()
          if (userData) {
            setUser(userData)
            setIsAuthenticated(true)
          } else {
            // Tentar carregar perfil da API
            const profile = await authService.getProfile()
            setUser(profile.user)
            setIsAuthenticated(true)
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error)
        // Limpar dados inválidos
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    try {
      setIsLoading(true)
      const data = await authService.login(email, password)
      setUser(data.user)
      setIsAuthenticated(true)
      toast.success('Login realizado com sucesso!')
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Erro no login'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      setIsAuthenticated(false)
      toast.success('Logout realizado com sucesso!')
    } catch (error) {
      console.error('Erro no logout:', error)
      // Mesmo com erro, limpar estado local
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const updateProfile = async (data) => {
    try {
      const response = await authService.updateProfile(data)
      setUser(response.user)
      localStorage.setItem('user', JSON.stringify(response.user))
      toast.success('Perfil atualizado com sucesso!')
      return response
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao atualizar perfil'
      toast.error(message)
      throw error
    }
  }

  const hasRole = (role) => {
    return user?.role === role
  }

  const canEdit = () => {
    return user?.role === 'admin' || user?.role === 'editor'
  }

  const canDelete = () => {
    return user?.role === 'admin'
  }

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    hasRole,
    canEdit,
    canDelete
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

