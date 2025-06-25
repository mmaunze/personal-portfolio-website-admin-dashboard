import axios from 'axios'

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para lidar com respostas de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Serviços de Autenticação
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const { tokens, user } = response.data
    
    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
    localStorage.setItem('user', JSON.stringify(user))
    
    return response.data
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Erro no logout:', error)
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    }
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },

  updateProfile: async (data) => {
    const response = await api.put('/auth/profile', data)
    return response.data
  }
}

// Serviços de Posts
export const postsService = {
  getAll: async (params = {}) => {
    const response = await api.get('/posts', { params })
    return response.data
  },

  getBySlug: async (slug) => {
    const response = await api.get(`/posts/${slug}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/posts', data)
    return response.data
  },

  update: async (slug, data) => {
    const response = await api.put(`/posts/${slug}`, data)
    return response.data
  },

  delete: async (slug) => {
    const response = await api.delete(`/posts/${slug}`)
    return response.data
  },

  getCategories: async () => {
    const response = await api.get('/posts/categories')
    return response.data
  },

  getTags: async () => {
    const response = await api.get('/posts/tags')
    return response.data
  }
}

// Serviços de Uploads/Downloads
export const uploadsService = {
  getAll: async (params = {}) => {
    const response = await api.get('/downloads', { params })
    return response.data
  },

  getBySlug: async (slug) => {
    const response = await api.get(`/downloads/${slug}`)
    return response.data
  },

  create: async (formData) => {
    const response = await api.post('/downloads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  update: async (slug, formData) => {
    const response = await api.put(`/downloads/${slug}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  delete: async (slug) => {
    const response = await api.delete(`/downloads/${slug}`)
    return response.data
  },

  download: async (slug) => {
    const response = await api.get(`/downloads/${slug}/download`, {
      responseType: 'blob',
    })
    return response.data
  },

  getCategories: async () => {
    const response = await api.get('/downloads/categories')
    return response.data
  },

  getTags: async () => {
    const response = await api.get('/downloads/tags')
    return response.data
  }
}

// Serviços de Utilizadores
export const usersService = {
  getAll: async (params = {}) => {
    const response = await api.get('/users', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/users', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`/users/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },

  getStats: async (id) => {
    const response = await api.get(`/users/${id}/stats`)
    return response.data
  }
}

// Serviços de Contactos
export const contactsService = {
  getAll: async (params = {}) => {
    const response = await api.get('/contacts', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/contacts/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/contacts', data)
    return response.data
  },

  updateStatus: async (id, status) => {
    const response = await api.put(`/contacts/${id}/status`, { status })
    return response.data
  },

  markAsSpam: async (id) => {
    const response = await api.put(`/contacts/${id}/spam`)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/contacts/${id}`)
    return response.data
  },

  getStats: async () => {
    const response = await api.get('/contacts/stats')
    return response.data
  }
}

// Utilitários
export const apiUtils = {
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken')
  },

  getUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  hasRole: (role) => {
    const user = apiUtils.getUser()
    return user?.role === role
  },

  canEdit: () => {
    const user = apiUtils.getUser()
    return user?.role === 'admin' || user?.role === 'editor'
  },

  canDelete: () => {
    const user = apiUtils.getUser()
    return user?.role === 'admin'
  }
}

export default api

