import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface GradeVO {
  oid?: number;
  gradeName: string;
  year: string;
}

export const getGraderPage = async (params: Page): Promise<ApiResult<PageResult<GradeVO[]>>> => {
  return await get('/grade/list', params);
};

export const saveGrade = async (data: GradeVO): Promise<ApiResult<number>> => {
  return await post('/grade/save', data);
};
