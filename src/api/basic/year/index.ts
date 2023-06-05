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

export interface YearDictVO {
  oid: number;
  value: string;
  display: boolean;
}

export const getYearList = async (): Promise<ApiResult<YearDictVO[]>> => {
  return await get('/year/all');
};

export const getYearPage = async (params: Page): Promise<ApiResult<PageResult<YearVO[]>>> => {
  return await get('/year/list', params);
};

export const saveOrUpdateYear = async (data: YearVO): Promise<ApiResult<number>> => {
  return await post('/year/save', data);
};

export const delYear = async (ids: string) => {
  return await post('/year/del', { ids });
};

export const setCurrentYear = async (id: number) => {
  return await post('/year/setCurr/' + id);
};
