import { ApiResult, post } from '@/api/api';

export interface LoginForm {
  loginName: string;
  password: string;
}

export interface LoginUserVO {
  userId: number;
  loginName: string;
  userName: string;
  mobile: string;
  deptId: number;
  userType: number;
  roleIds: string;
  yearId: number;
}

export const login = async (data: LoginForm): Promise<ApiResult<LoginUserVO>> => {
  return post('/login', data);
};

export const loginOut = async (data: LoginForm) => {
  return post('/user/signOut', data);
};
