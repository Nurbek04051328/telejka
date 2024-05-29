import { createRouter, createWebHistory } from 'vue-router'

import { adminMenu } from '@/stores/menu/admin'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      children: [

      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard-layout',
      component: () => import('@/layout/dashboard.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/home.vue')
        },
        ...adminMenu
      ]
    },
    {
      path: '/auth',
      name: 'auth-layout',
      component: () => import('@/layout/auth.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/auth/login.vue'),
          meta: {
            title: 'Авторизация'
          }
        }
      ]
    },

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: import('@/views/error.vue'),
      meta: {
        title: 'Страница не найдено',
      }
    }
  ]
})

export default router
