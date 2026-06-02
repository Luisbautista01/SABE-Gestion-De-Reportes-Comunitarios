import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api'

export const api = axios.create({ baseURL: API_URL })

api.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem('sabe-session') || 'null')
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`
  }
  return config
})
