// src/stores/auth.js

import { defineStore } from 'pinia';
import axios from '../services/axios';
import { useToast } from 'vue-toastification';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: (() => {
      const userStr = localStorage.getItem('user');
      if (userStr && userStr !== 'undefined') {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          console.error('Error al parsear el usuario desde localStorage:', e);
          return null;
        }
      }
      return null;
    })(),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const toast = useToast();
        const response = await axios.post('/usuarios/login', { email, password });
        this.token = response.data.token;
        this.user = response.data.user || null; // Asegúrate de que el backend envíe los datos del usuario
        localStorage.setItem('token', this.token);
        if (this.user) {
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          localStorage.removeItem('user');
        }
        toast.success('Inicio de sesión exitoso');
      } catch (error) {
        const toast = useToast();
        toast.error('Credenciales inválidas. Por favor, intenta de nuevo.');
        throw error;
      }
    },
    logout() {
      const toast = useToast();
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.info('Has cerrado sesión.');
    },
  },
});
