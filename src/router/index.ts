import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: 'apply',
        name: 'Apply',
        component: () => import('@/views/apply/index.vue'),
      },
      {
        path: 'integral',
        name: 'Integral',
        component: () => import('@/views/integral/index.vue'),
      },
      {
        path: 'portrait',
        name: 'Portrait',
        component: () => import('@/views/portrait/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
