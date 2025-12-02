import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data)
};

export const itemsAPI = {
  getAll: (params?: any) => api.get('/items', { params }),
  getById: (id: string) => api.get(`/items/${id}`),
  create: (data: any) => api.post('/items', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  update: (id: string, data: any) => api.put(`/items/${id}`, data),
  delete: (id: string) => api.delete(`/items/${id}`),
  claim: (id: string, answers: string[]) => api.post(`/items/${id}/claim`, { answers })
};

export default api;
