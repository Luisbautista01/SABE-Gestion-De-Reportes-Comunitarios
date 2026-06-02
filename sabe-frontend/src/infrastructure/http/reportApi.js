import { api } from './apiClient'

export const reportApi = {
  categories: () => api.get('/catalogos/categorias').then((response) => response.data),
  all: () => api.get('/reportes').then((response) => response.data),
  mine: () => api.get('/reportes/mis-reportes').then((response) => response.data),
  create: (payload) => api.post('/reportes', payload).then((response) => response.data),
  changeStatus: (id, payload) => api.patch(`/reportes/${id}/estado`, payload).then((response) => response.data),
  stats: () => api.get('/admin/estadisticas').then((response) => response.data),
}
