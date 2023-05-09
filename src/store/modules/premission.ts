import { defineStore } from 'pinia';
import { store } from '../index';
import { storeNames } from '../store-name';
import router, { frontRoutes, backRoutes } from '@/router';
import type { RouteRecordRaw } from 'vue-router';
import FrontLayout from '@/layout/front-layout.vue';
import BackLayout from '@/layout/back-layout.vue';
import { setToken } from '@/utils/auth';
import { cloneDeep } from 'lodash';

export type Menu = {
  oid: number;
  pid: number;
  name: string;
  code: string;
  path: string;
  flag: number;
  icon?: string;
  hidden?: boolean;
  components: any;
  componentPath: string;
  children?: Array<Menu> | [];
};

export const usePermissionStore = defineStore(storeNames.PERMISSION, {
  state: () => {
    return {
      routes: [],
      // 前端菜单
      frontAsideRoutes: [],
      // 后端菜单
      backAsideRoutes: [],
    };
  },
  getters: {
    getRoutes(): RouteRecordRaw[] {
      return this.routes;
    },
    getFrontAsideRoutes(): RouteRecordRaw[] {
      return this.frontAsideRoutes;
    },
    getBackAsideRoutes(): RouteRecordRaw[] {
      return this.backAsideRoutes;
    },
  },
  actions: {
    setRoutes(routes: RouteRecordRaw[]): void {
      this.routes = routes;
    },
    setFrontAsideRoutes(routes: RouteRecordRaw[]): void {
      this.frontAsideRoutes = frontRoutes.concat(routes);
    },
    setBackAsideRoutes(routes: RouteRecordRaw[]): void {
      this.backAsideRoutes = backRoutes.concat(routes);
    },
    /**
     * 生成路由
     */
    async generateRoutes(routes: Menu[]) {
      const cloneRoutes = cloneDeep(routes);
      const frontRoutes = filterRouter(routes, 1);
      const backRoutes = filterRouter(routes, 2);
      const frontAsideRoute = routeArrayToTree(frontRoutes);
      const backAideRoute = routeArrayToTree(backRoutes);
      const dynamicRoutes = createRouterObj(cloneRoutes);
      const rewriteRoutes = [...dynamicRoutes, { path: '/:carchAll(.*)', redirect: '/404' }];
      rewriteRoutes.forEach(route => router.addRoute(route));
      this.setRoutes(rewriteRoutes);
      this.setFrontAsideRoutes(convertRoutes(frontAsideRoute));
      this.setBackAsideRoutes(convertRoutes(backAideRoute));
      console.log(router.getRoutes());
    },
  },
});

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store);
};

const filterRouter = (routes: Menu[], type: number) => {
  // 去掉根节点
  return routes.filter(route => route.flag === type && route.pid !== 0);
};

const createRouterObj = (routes: Menu[]): RouteRecordRaw[] => {
  // 过滤出所有末尾节点
  const endRoutes = routes.filter(route => !route.children || route.children?.length === 0);
  let obj: any = {};
  routes.forEach(route => (obj[route.oid] = route));
  // 找出所有末尾节点的父节点
  let parentMenuIds: number[] = [];
  let parentMenus: Menu[] = [];
  endRoutes.forEach(route => {
    if (!parentMenuIds.includes(route.pid)) {
      const parentMenu = obj[route.pid];
      if (parentMenu) {
        parentMenuIds.push(route.pid);
        parentMenus.push(parentMenu);
      }
    }
  });
  return parentMenus.map(route => {
    let component = null;
    if (route.flag === 1) {
      component = FrontLayout;
    }
    if (route.flag === 2) {
      component = BackLayout;
    }

    let chiledRoute = endRoutes.filter(childRoute => childRoute.pid === route.oid);
    const children = chiledRoute.map(childRoute => {
      let childComponent = null;
      if (childRoute.flag === 1) {
        childComponent = () => import(/* @vite-ignore */ '../../views/front-desk' + childRoute.componentPath);
      } else if (childRoute.flag === 2) {
        childComponent = () => import(/* @vite-ignore */ '../../views/back-desk' + childRoute.componentPath);
      } else {
        childComponent = () => import(/* @vite-ignore */ '../../views$' + childRoute.componentPath);
      }
      return {
        path: childRoute.path,
        name: childRoute.code,
        component: childComponent,
      };
    });

    return {
      path: route.path,
      name: route.code,
      component: component,
      children: children,
    };
  });
};

/**
 * 路由数组转树形
 * @param routes
 * @returns
 */
const routeArrayToTree = (routes: Menu[]) => {
  // * 先生成parent建立父子关系
  const obj: any = {};
  routes.forEach(route => (obj[route.oid] = route));
  const parents: Menu[] = [];
  routes.forEach(route => {
    const parent = obj[route.pid];
    if (parent) {
      // * 当前项有父节点
      parent.children = parent.children || [];
      parent.children.push(route);
    } else {
      // * 当前项没有父节点 -> 顶层
      parents.push(route);
    }
  });
  return parents;
};

/**
 * 转换为路由对象
 * @param routes
 * @returns
 */
const convertRoutes = routes => {
  return routes.map(route => {
    let children = [];
    if (route.children && route.children.length) {
      children = convertRoutes(route.children);
    }
    return {
      path: route.path,
      name: route.code,
      component: loadRouteComponents(route),
      children: children,
      meta: {
        name: route.name,
        icon: route.icon,
        flag: route.flag,
        hidden: route.hidden,
      },
    };
  });
};

const loadRouteComponents = route => {
  if (route.children && route.pid === 0) {
    if (route.flag === 1) {
      return FrontLayout;
    }
    if (route.flag === 2) {
      return BackLayout;
    }
  } else {
    if (route.flag === 1) {
      return () => import(/* @vite-ignore */ '../../views/front-desk' + route.componentPath);
    } else if (route.flag === 2) {
      return () => import(/* @vite-ignore */ '../../views/back-desk' + route.componentPath);
    } else {
      return () => import(/* @vite-ignore */ '../../views$' + route.componentPath);
    }
  }
};
