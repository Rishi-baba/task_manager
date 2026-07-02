import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const taskAPI = {
  getAll: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
  create: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },
  update: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;
