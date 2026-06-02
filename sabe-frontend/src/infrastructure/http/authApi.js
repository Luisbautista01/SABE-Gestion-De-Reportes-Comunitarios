import { api } from './apiClient'

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials).then((response) => response.data),
  register: (payload) => api.post('/auth/register', payload).then((response) => response.data),
  recover: (email) => api.post('/auth/recover', { email }).then((response) => response.data),
  createUser: (payload) => api.post('/auth/users', payload).then((response) => response.data),
}
