import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface GradeVO {
  oid?: number;
  gradeName: string;
  year: string;
}

export interface GradeDictVO {
  oid: number;
  gradeName: string;
  year: string;
}

export const getGraderList = async (): Promise<ApiResult<GradeDictVO[]>> => {
  return await get('/grade/all');
};

export const getGraderPage = async (params: Page): Promise<ApiResult<PageResult<GradeVO[]>>> => {
  return await get('/grade/list', params);
};

export const saveOrUpdateGrade = async (data: GradeVO): Promise<ApiResult<number>> => {
  return await post('/grade/saveOrUpdate', data);
};

export const delGrade = async (ids: string) => {
  return await post('/grade/delMultiGrade', { ids });
};
