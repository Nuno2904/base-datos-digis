// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../Views/Landing.vue'
import Dashboard from '../Views/Dashboard.vue'
import Login from '../Views/Login.vue'
import FileUp from '../components/FileUp.vue'
//import Register from '../Views/Register.vue' // Asegúrate de crear este componente
//import ForgotPassword from '../Views/ForgotPassword.vue' // Asegúrate de crear este componente
import NotFound from '../Views/NotFound.vue'

import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/fileup',
    name: 'FileUp',
    component: FileUp,
  },


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guardia de navegación global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
