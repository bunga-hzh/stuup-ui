import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RoleVO {
  oid?: number;
  roleName: string;
  roleDesc: string;
  createUserAdmin?: string;
  createTime?: Date;
}

export const getRolePage = async (params: Page): Promise<ApiResult<PageResult<RoleVO[]>>> => {
  return await get('/role/list', params);
};

export const saveRole = async (data: RoleVO): Promise<ApiResult<number>> => {
  return await post('/role/save', data);
};

export const delRole = async (roleIds: string | number) => {
  return await post('/role/del/', { ids: roleIds });
};

export const getRoleMenu = async (roleId: string | number): Promise<ApiResult<number[]>> => {
  return await get('/role/getRoleMenu/' + roleId);
};
