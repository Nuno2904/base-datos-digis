// src/services/axios.js

import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import router from '../router';
import { getActivePinia } from 'pinia';

// Crear una instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Asegúrate de que esta URL sea correcta
});

// Interceptor para incluir el token en las solicitudes
api.interceptors.request.use(
  (config) => {
    const pinia = getActivePinia();
    if (pinia) {
      const authStore = useAuthStore(pinia);
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const pinia = getActivePinia();
      if (pinia) {
        const authStore = useAuthStore(pinia);
        authStore.logout();
      }
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
