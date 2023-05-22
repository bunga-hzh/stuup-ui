import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface DeptVO {
  oid?: number;
  deptName: string;
  createTime?: Date;
}

export const getDeptPage = async (params: Page): Promise<ApiResult<PageResult<DeptVO[]>>> => {
  return await get('/dept/list', params);
};

export const saveDept = async (data: DeptVO): Promise<ApiResult<number>> => {
  return await post('/dept/save', data);
};
