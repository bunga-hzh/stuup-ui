import { ApiResult, get, post } from '@/api/api';
import type { Page, PageResult } from '@/types/global';
import type { MenuVO } from '@/api/system/menu/index';

export interface UserVO {
  oid?: number;
  loginName: string;
  userName: string;
  sex: number | undefined;
  mobile: string;
  degree: string;
  teacherType: number | undefined;
  userType: number | undefined;
  deptId: number | undefined;
  idCard: string;
  birthday: Date | undefined;
  state: number | undefined;
  roles: number[];
  createTime?: Date;
}

export interface UserDictVO {
  oid: number;
  value: string;
  disabled: boolean;
}

export const getUserList = async (): Promise<ApiResult<UserDictVO[]>> => {
  return await get('/user/all');
};

export const getUserPage = async (params: Page): Promise<ApiResult<PageResult<UserVO[]>>> => {
  return await get('/user/list', params);
};

export const saveOrUpdateUser = async (data: UserVO): Promise<ApiResult<number>> => {
  return await post('/user/save', data);
};

export const delUser = async (ids: string) => {
  return await post('/user/del', { ids });
};

export const queryUserAuthority = async (): Promise<ApiResult<MenuVO[]>> => {
  return post('/user/queryUserAuthority');
};
