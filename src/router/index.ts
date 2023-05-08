import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import FrontLayout from '@/layout/front-layout.vue';
import BackLayout from '@/layout/back-layout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: FrontLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/front-desk/home/index.vue'),
      },
      // {
      //   path: 'apply',
      //   component: () => import('@/views/front-desk/apply/index.vue'),
      // },
      // {
      //   path: 'details',
      //   component: () => import('@/views/front-desk/details/index.vue'),
      // },
      // {
      //   path: 'portrait',
      //   component: () => import('@/views/front-desk/portrait/index.vue'),
      // },
    ],
  },
  // {
  //   path: '/',
  //   component: BackLayout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/back-desk/dashboard/index.vue'),
  //     },
  //   ],
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      menu: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
