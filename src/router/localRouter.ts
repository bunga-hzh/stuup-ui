import Layout from '@/layout/index.vue';
import type { RouteRecordRaw } from 'vue-router';

/**
 * 路由
 */
export default [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      flag: 1,
      hidden: false,
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页',
          icon: '',
          flag: 1,
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta: {
      flag: 2,
      hidden: false,
    },
    children: [
      {
        path: '/index',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '控制台',
          icon: '',
          flag: 2,
          hidden: false,
        },
      },
    ],
  },
];
