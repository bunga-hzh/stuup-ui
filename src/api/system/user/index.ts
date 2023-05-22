import { ApiResult, get, post } from '@/api/api';
import type { Page, PageResult } from '@/types/global';
import type { MenuVO } from '@/api/system/menu/index';

export interface UserVO {
  oid?: number;
  loginName: string;
  userName: string;
  sex: number | undefined;
  mobile: string;
  degree: number | undefined;
  teacherType: number | undefined;
  userType: number | undefined;
  deptId: number | undefined;
  idCard: string;
  birthday: Date | undefined;
  state: number | undefined;
  createTime?: Date;
}

export const getUserPage = async (params: Page): Promise<ApiResult<PageResult<UserVO[]>>> => {
  return await get('/user/list', params);
};

export const saveUser = async (data: UserVO): Promise<ApiResult<number>> => {
  return await post('/user/save', data);
};

export const queryUserAuthority = async (): Promise<ApiResult<MenuVO[]>> => {
  return post('/user/queryUserAuthority');
};
