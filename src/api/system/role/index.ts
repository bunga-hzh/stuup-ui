import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RoleVO {
  oid?: number;
  roleName: string;
  roleDesc: string;
  createUserAdmin?: string;
  createTime?: Date;
}

export interface RoleMenuVO {
  roleId: number;
  menuIds: number[];
}

export interface RoleDictVO {
  oid: number;
  value: string;
  disabled: boolean;
}

export const getRoleList = async (): Promise<ApiResult<RoleDictVO[]>> => {
  return await get('/role/all');
};
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

export const setRoleMenu = async (roleId: number, menuIds: number[]) => {
  return await post('/role/setRoleMenu', {
    roleId,
    menuIds,
  });
};
