import axios from 'axios';
import { Job, JobInput, API_CONFIG } from '../lib/constants';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobService = {
  getAll: async () => {
    const response = await api.get<Job[]>('/jobs');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<Job>(`/jobs/${id}`);
    return response.data;
  },
  create: async (data: JobInput) => {
    const response = await api.post<Job>('/jobs', data);
    return response.data;
  },
  update: async (id: string, data: JobInput) => {
    const response = await api.put<Job>(`/jobs/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete<{ message: string }>(`/jobs/${id}`);
    return response.data;
  },
};

export default api;