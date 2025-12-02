import api from './api';

export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  toggleUserStatus: (userId: string, isActive: boolean) => 
    api.put(`/admin/users/${userId}/status`, { isActive }),
  deleteUser: (userId: string) => api.delete(`/admin/users/${userId}`),
  getStats: () => api.get('/admin/stats')
};
