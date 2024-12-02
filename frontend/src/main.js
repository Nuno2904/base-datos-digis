// src/main.js

import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // Importar Pinia
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import api from './services/axios'; // Asegúrate de que este archivo existe y está configurado correctamente

const app = createApp(App);

// Crear e instalar Pinia
const pinia = createPinia();
app.use(pinia);

// Configuración de Vue Toastification
const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
};

app.use(Toast, toastOptions);

// Instalar Vue Router
app.use(router);

// Montar la aplicación
app.mount('#app');
