import { get, post } from '@/api/api';

export interface RoleQueryType {
  key: string;
  current: number;
  size: number;
}

export interface RoleFormType {
  oid: number | null;
  roleName: string;
  roleDesc: string;
}

export const queryRole = async (param: RoleQueryType) => {
  return get('/role/list', param);
};

export const saveRole = async (data: RoleFormType) => {
  return post('/role/save', data);
};
