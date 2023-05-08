import router from '@/router';
import NProgress from '@/utils/progress';
import { existToken } from '@/utils/auth';
import pinia from '@/store';
import { usePermissionStore } from '@/store/modules/premission';
import { data } from '@/store/modules/RoutesData.js';

const whiteList: string = ['login'];
const premissionStore = usePermissionStore();

// ↓全局后置钩子
router.beforeEach((to, form, next) => {
  NProgress.start();

  if (existToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (premissionStore.getRoutes.length) {
        premissionStore.generateRoutes(data);
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
});

// ↓全局后置钩子
router.afterEach(() => {
  NProgress.done();
});
