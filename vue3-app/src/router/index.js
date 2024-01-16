/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-12 17:36:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-16 11:41:05
 * @Description :
 */
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
