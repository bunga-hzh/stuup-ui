import { defineStore } from 'pinia';
import { storeNames } from '../store-name';

interface RouterType {
  path: string;
  name: string;
}

interface AsideRoutes {
  label: string;
  path: string;
  icon?: string;
  items?: Array<AsideRoutes>;
}

export const usePermissionStore = defineStore(storeNames.PERMISSION, {
  state: () => {
    return {
      routes: [],
      asideRoutes: [
        {
          label: '首页',
          path: '/home',
        },
        {
          label: '积分明细',
          path: '/integral',
        },
        {
          label: '成长画像',
          path: '/portrait',
        },
      ],
    };
  },
  getters: {
    getRoutes(): Array<RouterType> {
      return this.routes;
    },
    getAsideRoutes(): Array<AsideRoutes> {
      return this.asideRoutes;
    },
  },
  actions: {
    setRoutes(routes: Array<RouterType>) {
      this.routes = routes;
    },
    setAsideRoutes(routes: Array<AsideRoutes>) {
      this.asideRoutes = routes;
    },
  },
});
