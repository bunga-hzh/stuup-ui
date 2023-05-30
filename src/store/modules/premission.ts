import { defineStore } from 'pinia';
import { store } from '../index';
import { storeNames } from '../store-name';
import router from '@/router';
import asyncRouters from '@/router/asyncRouters';
import type { RouteRecordRaw } from 'vue-router';
const compModels = import.meta.glob('../../views/**/index.vue');
import Layout from '@/layout/index.vue';
import type { MenuVO } from '@/api/system/menu/index';

export interface PermissionState {
  layoutType: boolean;
  routers: RouteRecordRaw[];
  frontAsideRouters: MenuVO[];
  backAsideRouters: MenuVO[];
}

export const usePermissionStore = defineStore(storeNames.PERMISSION, {
  state: (): PermissionState => {
    return {
      layoutType: true,
      routers: [],
      // 前端菜单
      frontAsideRouters: [],
      // 后端菜单
      backAsideRouters: [],
    };
  },
  getters: {
    getLayoutType(): boolean {
      return this.layoutType;
    },
    getRouters(): RouteRecordRaw[] {
      return this.routers;
    },
    getFrontAsideRouters(): MenuVO[] {
      return this.frontAsideRouters;
    },
    getBackAsideRouters(): MenuVO[] {
      return this.backAsideRouters;
    },
  },
  actions: {
    setLayoutType(type: boolean): void {
      this.layoutType = type;
    },
    setRouters(routers: RouteRecordRaw[]): void {
      this.routers = routers;
    },
    setFrontAsideRouters(routers: MenuVO[]): void {
      this.frontAsideRouters = routers;
    },
    setBackAsideRouters(routers: MenuVO[]): void {
      this.backAsideRouters = routers;
    },
    /**
     * 生成路由
     */
    async generateRoutes(menus: MenuVO[]) {
      const dynamicRouter = formatRouter(menus);
      const rewriteRoutes = [...asyncRouters, ...dynamicRouter, { path: '/:path(.*)*', redirect: '/404' }];
      this.setRouters(rewriteRoutes);
      rewriteRoutes.forEach(route => router.addRoute(route));
      const frontMenus = formatAsideMenu(rewriteRoutes, 1);
      this.setFrontAsideRouters(frontMenus);
      const backMenus = formatAsideMenu(rewriteRoutes, 2);
      this.setBackAsideRouters(backMenus);
      console.log(frontMenus, backMenus);

      console.log(router.getRoutes());
    },
  },
});

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store);
};

const formatRouter = (menus: MenuVO[]): RouteRecordRaw[] => {
  const obj: Record<number, MenuVO> = {};
  menus.forEach(menu => (obj[menu.oid!] = menu));
  const routerTree: MenuVO[] = [];
  menus.forEach(menu => {
    const parentRouter = obj[menu.pid!];
    if (parentRouter) {
      // * 当前项有父节点
      const children = parentRouter.children || [];
      children.push(menu);
      parentRouter.children = children;
    } else {
      // * 当前项没有父节点 -> 顶层
      routerTree.push(menu);
    }
  });

  const findPath = (menu: MenuVO, path: string = ''): string => {
    let menuPath = menu.path;
    const parent = obj[menu.pid!];
    if (parent) {
      return findPath(parent, menuPath) + menuPath;
    }
    return menuPath;
  };

  const findRedirect = (menu: MenuVO): string => {
    if (menu.children && menu.children.length) {
      return menu.path + menu.children[0].path;
    }
    return menu.redirect || '';
  };

  const findComp = (menu: MenuVO, path: string = ''): any => {
    if (!menu.children) {
      const compPath = `../../views${path}/index.vue`;
      return compModels[compPath];
    }
    return undefined;
  };

  const onlyFirstLevelMenu = (menu: MenuVO): boolean => {
    return (menu.pid === 0 && !menu.children) || menu.children?.length === 0;
  };

  const isFirstLevelMenu = (menu: MenuVO): boolean => {
    return menu.pid === 0 && menu.children && menu.children.length > 0;
  };

  const format = (menus: MenuVO[]): RouteRecordRaw[] => {
    return menus.map(menu => {
      const path = findPath(menu);
      const name = path.split('/').filter(Boolean).join('-') || 'index';
      const compPath = findComp(menu, path);
      let children: RouteRecordRaw[] = [];
      if (menu.children && menu.children.length) {
        children = format(menu.children);
      }
      const meta = {
        title: menu.name,
        flag: menu.flag,
        hidden: menu.hidden,
      };
      if (onlyFirstLevelMenu(menu)) {
        return {
          path,
          name: `${name}Parent`,
          component: Layout,
          meta: {},
          children: [
            {
              path: '',
              name,
              component: compPath,
              meta,
            },
          ],
        };
      } else if (isFirstLevelMenu(menu)) {
        return {
          path,
          name,
          component: Layout,
          redirect: findRedirect(menu),
          children: children,
          meta,
        };
      } else {
        return {
          path,
          name,
          component: compPath,
          redirect: findRedirect(menu),
          children: children,
          meta,
        };
      }
    });
  };

  const router = format(routerTree);

  return router;
};

const formatAsideMenu = (routers: RouteRecordRaw[], flag: number): MenuVO[] => {
  const filterRouter = filterRouterFlag(showOneChild(routers), flag);
  return formatMenu(filterRouter);
};

const filterRouterFlag = (routers: RouteRecordRaw[], flag: number): RouteRecordRaw[] => {
  return routers.filter(router => {
    if (router.meta?.flag === flag) {
      if (router.children && router.children.length) {
        router.children = filterRouterFlag(router.children, flag);
      }
      return true;
    }
  });
};

const formatMenu = (router: RouteRecordRaw[]): MenuVO[] => {
  return router.map(router => {
    let child: MenuVO[] = [];
    if (router.children && router.children.length) {
      child = formatMenu(router.children);
    }
    return {
      name: router.meta?.title || '',
      path: router.path,
      icon: router.meta?.icon || '',
      children: child,
    } as MenuVO;
  });
};

const showOneChild = (routers: RouteRecordRaw[]): RouteRecordRaw[] => {
  // 只处理一级路由
  return routers.map(router => {
    if (router.children?.length === 1) {
      const child = router.children[0] as RouteRecordRaw;
      if (!child.children || child.children.length === 0) {
        child.path = router.path;
        return child;
      }
    }
    return router;
  });
};
