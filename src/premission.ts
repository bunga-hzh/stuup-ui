import router from '@/router';
import NProgress from '@/utils/progress';
import Cookies from 'js-cookie';
import { existToken } from '@/utils/auth';
import { usePermissionStoreWithOut } from '@/store/modules/premission';
import { useUserStoreWithOut, UserInfoType } from '@/store/modules/user';
import { queryUserAuthority } from '@/api/system/user/index';

const whiteList: string[] = ['/login', '/404'];

// ↓全局后置钩子
router.beforeEach(async (to, form, next) => {
  NProgress.start();
  if (existToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const userStore = useUserStoreWithOut();
      const premissionStore = usePermissionStoreWithOut();
      if (!premissionStore.getRouters.length) {
        const userInfo = Cookies.get('user_info');
        if (userInfo) {
          userStore.setUserInfo(JSON.parse(userInfo) as UserInfoType);
        }
        const { data: res } = await queryUserAuthority();
        premissionStore.generateRoutes(res);
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
