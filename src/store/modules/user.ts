import { defineStore } from 'pinia';
import { store } from '../index';
import { storeNames } from '../store-name';
import { LoginForm, login, loginOut } from '@/api/login/index';
import { setToken } from '@/utils/auth';

export interface UserInfoType {
  userId: number | null;
  loginName: string;
  userName: string;
  mobile: string;
  deptId: number | null;
  userType: number | null;
  roleIds: string;
}

export const useUserStore = defineStore(storeNames.USER, {
  state: (): UserInfoType => {
    return {
      userId: null,
      loginName: '',
      userName: '',
      mobile: '',
      deptId: null,
      userType: null,
      roleIds: '',
    };
  },
  getters: {
    getUserId(): number | null {
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
    getDeptId(): number | null {
      return this.deptId;
    },
    getUserType(): number | null {
      return this.userType;
    },
    getRoleId(): string {
      return this.roleIds;
    },
  },
  actions: {
    setUserId(userId: number | null): void {
      this.userId = userId;
    },
    setLoginName(loginName: string): void {
      this.loginName = loginName;
    },
    setUserName(userName: string): void {
      this.userName = userName;
    },
    setMobile(mobile: string): void {
      this.mobile = mobile;
    },
    setDeptId(deptId: number | null): void {
      this.deptId = deptId;
    },
    setUserType(userType: number | null): void {
      this.userType = userType;
    },
    setRoleId(roleIds: string): void {
      this.roleIds = roleIds;
    },
  },
});
