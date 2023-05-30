import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface ClassVO {
  id?: number;
  code: string;
  name: string;
  facultyId: number | undefined;
  gradeId: number | undefined;
  majorId: number | undefined;
  teacherId: number | undefined;
  adminId: number | undefined;
  count: number;
  createTime?: Date;
}

export const getClassList = async (): Promise<ApiResult<ClassVO[]>> => {
  return await get('/class/all');
};

export const getClassPage = async (params: Page): Promise<ApiResult<PageResult<ClassVO[]>>> => {
  return await get('/class/list', params);
};

export const saveOrUpdateClass = async (data: ClassVO): Promise<ApiResult<number>> => {
  return await post('/class/saveOrUpdate', data);
};

export const delClass = async (ids: string) => {
  return await post('/class/delMultiClass', { ids });
};
