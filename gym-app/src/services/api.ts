import axios from 'axios';
import { Trainer, Trainee, Session } from '../types';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const trainerService = {
  getAll: () => api.get<Trainer[]>('/trainers'),
  getById: (id: number) => api.get<Trainer>(`/trainers/${id}`),
  create: (trainer: Omit<Trainer, 'id'>) => api.post<{success: string}>('/trainers', trainer),
  update: (id: number, trainer: Partial<Trainer>) => api.patch<Trainer>(`/trainers/${id}`, trainer),
  delete: (id: number) => api.delete<{message: string}>(`/trainers/${id}`),
};

export const traineeService = {
  getAll: () => api.get<Trainee[]>('/trainees'),
  getById: (id: number) => api.get<Trainee>(`/trainees/${id}`),
  create: (trainee: Omit<Trainee, 'id'>) => api.post<{success: string}>('/trainees', trainee),
  update: (id: number, trainee: Partial<Trainee>) => api.patch<Trainee>(`/trainees/${id}`, trainee),
  delete: (id: number) => api.delete<{message: string}>(`/trainees/${id}`),
};

export const sessionService = {
  getAll: () => api.get<Session[]>('/sessions'),
  getById: (id: number) => api.get<Session>(`/sessions/${id}`),
  create: (session: Omit<Session, 'id'>) => api.post<{success: string}>('/sessions', session),
  update: (id: number, session: Partial<Session>) => api.patch<Session>(`/sessions/${id}`, session),
  delete: (id: number) => api.delete<{message: string}>(`/sessions/${id}`),
};

export default api;