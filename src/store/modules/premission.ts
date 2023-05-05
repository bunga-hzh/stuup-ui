import { defineStore } from 'pinia';
import { storeNames } from '../store-name';

interface RouterType {
  path: string;
  name: string;
}

interface AsideRoutes {
  label: string;
  to: string;
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
          to: '/home',
        },
        {
          label: '学分申请',
          to: '/apply',
        },
        {
          label: '积分明细',
          to: '/integral',
        },
        {
          label: '成长画像',
          to: '/portrait',
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
