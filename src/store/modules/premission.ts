import { defineStore } from 'pinia';
import { store } from '../index';
import { storeNames } from '../store-name';
import router from '@/router';
import type { RouteRecordRaw } from 'vue-router';
import FrontLayout from '@/layout/front-layout.vue';
import BackLayout from '@/layout/back-layout.vue';
const modules = import.meta.glob('../../views/**/*.{vue,tsx}');

export type AsideRoutes = {
  path: string;
  children?: AsideRoutes[] | [];
  meta: {
    name: string;
    icon?: string;
    hidden?: boolean;
  };
};

type routes = {
  id: number;
  pid: number;
  name: string;
  path: string;
  flag: number;
  icon?: string;
  children?: routes | [];
};

export const usePermissionStore = defineStore(storeNames.PERMISSION, {
  state: () => {
    return {
      routes: [],
      // 前端菜单
      frontAsideRoutes: [
        {
          path: '/home',
          meta: {
            name: '首页',
            icon: 'House',
          },
        },
        {
          path: '/apply',
          meta: {
            name: '水滴申请',
          },
        },
        {
          path: '/details',
          meta: {
            name: '水滴明细',
          },
        },
        {
          path: '/portrait',
          meta: {
            name: '成长画像',
          },
        },
        {
          path: '/index',
          meta: {
            name: '后台管理',
          },
        },
      ],
      // 后端菜单
      backAsideRoutes: [
        {
          path: '/index',
          meta: {
            name: '控制台',
            icon: 'House',
          },
        },
      ],
    };
  },
  getters: {
    getRoutes(): RouteRecordRaw[] {
      return this.routes;
    },
    getFrontAsideRoutes(): AsideRoutes[] {
      return this.frontAsideRoutes;
    },
    getBackAsideRoutes(): AsideRoutes[] {
      return this.backAsideRoutes;
    },
  },
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = routes;
    },
    setFrontAsideRoutes(routes: AsideRoutes[]) {
      this.frontAsideRoutes = routes;
    },
    setBackAsideRoutes(routes: AsideRoutes[]) {
      this.backAsideRoutes = routes;
    },
    /**
     * 生成路由
     */
    generateRoutes(routes: routes[]) {
      const frontRoutes = this.filterRoutes(routes, 1);
      const backRoutes = this.filterRoutes(routes, 2);
      const frontAsideRoute = this.routeArrayToTree(frontRoutes);
      const backAideRoute = this.routeArrayToTree(backRoutes);
      const asyncRouter = this.convertRoutes(this.routeArrayToTree(routes));
      console.log(asyncRouter);
      const rewriteRoutes = [...asyncRouter, { path: '/:carchAll(.*)', redirect: '/404' }];
      this.setRoutes(rewriteRoutes);
      rewriteRoutes.forEach(route =>
        router.addRoute({
          path: route.path,
          component: route.component,
        })
      );
      console.log(router.getRoutes());
      console.log(rewriteRoutes);
    },
    /**
     * 过滤路由
     * @param routes
     * @param flag    1.前端路由 2.后端路由
     */
    filterRoutes(routes: routes[], flag: number): routes[] {
      return routes.filter(route => route.flag === flag);
    },
    // 转换路由为路由组件对象
    convertRoutes(routes: routes[]) {
      return routes.filter(route => {
        debugger;
        if (route.children && route.children.length) {
          if (route.flag === 1) {
            route.component = FrontLayout;
          }
          if (route.flag === 2) {
            route.component = BackLayout;
          }
          route.children = this.convertRoutes(route.children);
        } else {
          route.component = this.loadComponents(route.path, route.flag);
        }
        return true;
      });
    },
    /**
     * 路由数组转树形
     * @param routes
     * @returns
     */
    routeArrayToTree(routes: routes[]) {
      // * 先生成parent建立父子关系
      const obj: any = {};
      routes.forEach(route => (obj[route.id] = route));
      const parentList: routes[] = [];
      routes.forEach(route => {
        const parent = obj[route.pid];
        if (parent) {
          // * 当前项有父节点
          parent.children = parent.children || [];
          parent.children.push(route);
        } else {
          // * 当前项没有父节点 -> 顶层
          parentList.push(route);
        }
      });
      return parentList;
    },

    loadComponents(path: string, type: number) {
      console.log(path);
      if (type === 1) {
        return () => modules['../../views/front-desk' + path + '/index.vue'];
      }
      if (type === 2) {
        return () => modules['../../views/back-desk' + path + '/index.vue'];
      }
      return () => modules['../../views' + path + '/index.vue'];
    },
  },
});

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store);
};
