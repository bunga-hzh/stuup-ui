import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface YearVO {
  oid?: number;
  yearName: string;
  yearRange: string[];
  yearStart: string;
  yearEnd: string;
  lastSemester: string;
  nextSemester: string;
  curr?: number;
  createUser?: string;
  createTime?: Date;
}

export const getYearPage = async (params: Page): Promise<ApiResult<PageResult<YearVO[]>>> => {
  return await get('/year/list', params);
};

export const saveYear = async (data: YearVO): Promise<ApiResult<number>> => {
  return await post('/year/save', data);
};
