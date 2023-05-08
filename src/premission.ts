import router from '@/router';
import NProgress from '@/utils/progress';
import { existToken } from '@/utils/auth';
import { usePermissionStoreWithOut } from '@/store/modules/premission';
import { data } from '@/store/modules/RoutesData';

const whiteList: string[] = ['login'];

// ↓全局后置钩子
router.beforeEach((to, form, next) => {
  NProgress.start();

  if (true) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const premissionStore = usePermissionStoreWithOut();
      if (!premissionStore.getRoutes.length) {
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
