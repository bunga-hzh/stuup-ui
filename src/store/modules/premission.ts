import { defineStore } from 'pinia';
import { store } from '../index';
import { storeNames } from '../store-name';
import router, { frontRouters, backRouters } from '@/router';
import type { RouteRecordRaw } from 'vue-router';
import FrontLayout from '@/layout/front-layout.vue';
import BackLayout from '@/layout/back-layout.vue';
import { cloneDeep } from 'lodash';

export interface Menu {
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
}

export interface MenuTree extends Menu {
  children: Array<Menu> | [];
}

export interface PermissionState {
  routers: RouteRecordRaw[];
  frontAsideRouters: MenuTree[];
  backAsideRouters: MenuTree[];
}

export const usePermissionStore = defineStore(storeNames.PERMISSION, {
  state: (): PermissionState => {
    return {
      routers: [],
      // 前端菜单
      frontAsideRouters: [],
      // 后端菜单
      backAsideRouters: [],
    };
  },
  getters: {
    getRouters(): RouteRecordRaw[] {
      return this.routers;
    },
    getFrontAsideRouters(): MenuTree[] {
      return this.frontAsideRouters;
    },
    getBackAsideRouters(): MenuTree[] {
      return this.backAsideRouters;
    },
  },
  actions: {
    setRouters(routers: RouteRecordRaw[]): void {
      this.routers = routers;
    },
    setFrontAsideRouters(routers: MenuTree[]): void {
      this.frontAsideRouters = routers;
    },
    setBackAsideRouters(routers: MenuTree[]): void {
      this.backAsideRouters = routers;
    },
    /**
     * 生成路由
     */
    async generateRoutes(routes: Menu[]) {
      const cloneRoutes = cloneDeep(routes);
      const asideRouter = routes.filter(router => router.pid !== 0 || router.hidden);
      const frontRoutes = filterFrontRoute(asideRouter);
      const backRoutes = filterBackRoute(asideRouter);
      const dynamicRoutes = createRouterObj(cloneRoutes);
      const rewriteRoutes = [...dynamicRoutes, { path: '/:path(.*)*', redirect: '/404' }];
      rewriteRoutes.forEach(route => router.addRoute(route));
      this.setRouters(rewriteRoutes);
      this.setFrontAsideRouters(frontRoutes);
      this.setBackAsideRouters(backRoutes);
      console.log(frontRoutes, backRoutes);
      console.log(router.getRoutes());
    },
  },
});

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store);
};

/**
 * 转为树形
 * @param routes
 * @returns
 */
const convertTree = (routes: Menu[]): MenuTree[] => {
  const routerObj: any = {};
  routes.forEach(route => (routerObj[route.oid] = route));
  const rootRouters: MenuTree[] = [];
  routes.forEach(route => {
    const parentRouter = routerObj[route.pid];
    if (parentRouter) {
      // * 当前项有父节点
      parentRouter.children = parentRouter.children || [];
      parentRouter.children.push(route);
    } else {
      // * 当前项没有父节点 -> 顶层
      rootRouters.push(route as MenuTree);
    }
  });
  return rootRouters;
};

const filterHidden = (routers: RouteRecordRaw[]): RouteRecordRaw[] => {
  for (let i = routers.length - 1; i >= 0; i--) {
    if (routers[i].meta?.hidden) {
      routers.splice(i, 1);
    } else if (routers[i].children && routers[i].children.length > 0) {
      filterHidden(routers[i].children);
    }
  }
  return routers;
};

/**
 * 转换路由
 * @param routers
 * @returns
 */
const converToMenu = (routers: RouteRecordRaw[], flag: number): MenuTree[] => {
  return routers.map(reouter => {
    let children: MenuTree[] = [];
    if (reouter.children) {
      children = converToMenu(reouter.children, flag);
    }
    return {
      path: reouter.path,
      code: reouter.name,
      name: reouter.meta?.name,
      icon: reouter.meta?.icon,
      hidden: reouter.meta?.hidden,
      flag: flag,
      children: children,
    };
  });
};

/**
 * 处理菜单
 * @param routers
 */
const handlerMenu = (routers: MenuTree[]): MenuTree[] => {
  // 只处理一级路由
  return routers.map(router => {
    if (router.children?.length === 1) {
      const oneChildren = router.children[0] as MenuTree;
      if (!oneChildren.children || oneChildren.children.length === 0) {
        return oneChildren;
      }
    }
    return router;
  });
};

/**
 * 过滤前台路由
 * @param routes
 */
const filterFrontRoute = (routes: Menu[]): MenuTree[] => {
  const ROUTER_FLAG: number = 1;
  const cloneRoutes: Menu[] = cloneDeep(routes);
  const dynamicFrontRoutes: Menu[] = cloneRoutes.filter(route => route.flag === ROUTER_FLAG);
  const routerTree: MenuTree[] = convertTree(dynamicFrontRoutes);
  const constantRouters: MenuTree[] = converToMenu(filterHidden(frontRouters), ROUTER_FLAG);
  let mergeRouters: MenuTree[] = constantRouters.concat(routerTree);
  const asideRouter = handlerMenu(mergeRouters);
  console.log(asideRouter);
  return asideRouter;
};

/**
 * 过滤后台路由
 * @param routes
 */
const filterBackRoute = (routes: Menu[]): MenuTree[] => {
  const ROUTER_FLAG: number = 2;
  const cloneRoutes: Menu[] = cloneDeep(routes);
  const dynamicBackRoutes: Menu[] = cloneRoutes.filter(route => route.flag === ROUTER_FLAG);
  const routerTree: MenuTree[] = convertTree(dynamicBackRoutes);
  const constantRouters: MenuTree[] = converToMenu(filterHidden(backRouters), ROUTER_FLAG);
  const mergeRouters: MenuTree[] = constantRouters.concat(routerTree);
  const asideRouter = handlerMenu(mergeRouters);
  console.log(asideRouter);
  return asideRouter;
};

const findEndRoute = (routeTree: MenuTree[]): Menu[] => {
  let leaves: Menu[] = [];
  const traverse = (route: MenuTree): void => {
    if (!route.children || route.children.length === 0) {
      leaves.push(route);
      return;
    }
    route.children.forEach(child => traverse(child));
  };
  routeTree.forEach(route => traverse(route));
  return leaves;
};

const createRouterObj = (routes: Menu[]): RouteRecordRaw[] => {
  const cloneRouter: Menu[] = cloneDeep(routes);
  const routerTree: MenuTree[] = convertTree(cloneRouter);
  // 过滤出所有末尾节点
  const endRoutes = findEndRoute(routerTree);
  let obj: any = {};
  routes.forEach(route => (obj[route.oid] = route));
  let hasChildRoute: any = {};
  routes.filter(route => (hasChildRoute[route.pid] = obj[route.pid]));
  routes.filter(route => {
    const parentRoute = obj[route.pid];
    if (parentRoute) {
      routes;
    }
  });
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
