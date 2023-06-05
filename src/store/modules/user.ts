import { defineStore } from 'pinia';
import { store } from '../index';
import { storeNames } from '../store-name';

export interface UserInfoType {
  userId: number | undefined;
  loginName: string;
  userName: string;
  mobile: string;
  deptId: number | undefined;
  userType: number | undefined;
  roleIds: string;
  yearId: number | undefined;
}

export const useUserStore = defineStore(storeNames.USER, {
  state: (): UserInfoType => {
    return {
      userId: void 0,
      loginName: '',
      userName: '',
      mobile: '',
      deptId: void 0,
      userType: void 0,
      roleIds: '',
      yearId: void 0,
    };
  },
  getters: {
    getUserId(): number | undefined {
      return this.userId;
    },
    getLoginName(): string {
      return this.loginName;
    },
    getUserName(): string {
      return this.userName;
    },
    getMobile(): string {
      return this.mobile;
    },
    getDeptId(): number | undefined {
      return this.deptId;
    },
    getUserType(): number | undefined {
      return this.userType;
    },
    getRoleId(): string {
      return this.roleIds;
    },
    getYearId(): number | undefined {
      return this.yearId;
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfoType): void {
      this.userId = userInfo.userId;
      this.loginName = userInfo.loginName;
      this.userName = userInfo.userName;
      this.mobile = userInfo.mobile;
      this.deptId = userInfo.deptId;
      this.userType = userInfo.userType;
      this.roleIds = userInfo.roleIds;
      this.yearId = userInfo.yearId;
    },
  },
});

export const useUserStoreWithOut = () => {
  return useUserStore(store);
};
