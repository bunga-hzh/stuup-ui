import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface DeptVO {
  oid?: number;
  deptName: string;
  createTime?: Date;
}

export interface DeptDictVO {
  oid: number;
  value: string;
  disabled: boolean;
}

export const getDeptList = async (): Promise<ApiResult<DeptDictVO[]>> => {
  return await get('/dept/all');
};

export const getDeptPage = async (params: Page): Promise<ApiResult<PageResult<DeptVO[]>>> => {
  return await get('/dept/list', params);
};

export const saveOrUpdateDept = async (data: DeptVO): Promise<ApiResult<number>> => {
  return await post('/dept/save', data);
};

export const delDept = async (ids: string) => {
  return await post('/dept/del', { ids });
};
