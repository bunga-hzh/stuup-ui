import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import FrontLayout from '@/layout/front-layout.vue';
import BackLayout from '@/layout/back-layout.vue';

/**
 * 前台路由
 */
export const frontRouters: RouteRecordRaw[] = [
  {
    path: '/',
    component: FrontLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/front-desk/home/index.vue'),
        meta: {
          name: '首页',
          icon: '',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/test',
    component: () => import('@/views/front-desk/home/test_index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true,
    },
  },
];

/**
 * 后台路由
 */
export const backRouters: RouteRecordRaw[] = [
  {
    path: '/',
    component: BackLayout,
    meta: {
      hidden: false,
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/back-desk/dashboard/index.vue'),
        meta: {
          name: '控制台',
          icon: '',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...frontRouters, ...backRouters],
});

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};

export default router;
