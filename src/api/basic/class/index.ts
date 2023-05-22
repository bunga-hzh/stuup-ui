import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface ClassVO {
  oid?: number;
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

export const getClassPage = async (params: Page): Promise<ApiResult<PageResult<ClassVO[]>>> => {
  return await get('/class/list', params);
};

export const saveClass = async (data: ClassVO): Promise<ApiResult<number>> => {
  return await post('/class/save', data);
};
