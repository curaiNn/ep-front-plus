import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH), // createWebHashHistory URL带#，createWebHistory URL不带#
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/Index.vue'),
    },
  ]
})

export default router
