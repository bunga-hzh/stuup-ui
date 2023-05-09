import router from '@/router';
import NProgress from '@/utils/progress';
import { existToken } from '@/utils/auth';
import { usePermissionStoreWithOut, Menu } from '@/store/modules/premission';
import { queryUserAuthority } from '@/api/user/index';

const whiteList: string[] = ['/login', '/404'];

// ↓全局后置钩子
router.beforeEach(async (to, form, next) => {
  NProgress.start();
  if (existToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const premissionStore = usePermissionStoreWithOut();
      if (!premissionStore.getRoutes.length) {
        const res = await queryUserAuthority();
        premissionStore.generateRoutes(res.data);
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
