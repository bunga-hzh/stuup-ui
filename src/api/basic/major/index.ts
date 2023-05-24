import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface MajorVO {
  oid?: number;
  majorCode: string;
  majorName: string;
  facultyId: number | undefined;
  system: number | undefined;
  state: number | undefined;
  facultyName?: string;
  createTime?: Date;
}

export interface MajorDictVO {
  oid: number;
  majorCode: string;
  majorName: string;
  facultyId: number;
  facultyName: string;
  state: number;
  system: number;
}

export const getMajorList = async (): Promise<ApiResult<MajorDictVO[]>> => {
  return await get('/major/all');
};

export const getMajorPage = async (params: Page): Promise<ApiResult<PageResult<MajorVO[]>>> => {
  return await get('/major/list', params);
};

export const saveOrUpdateMajor = async (data: MajorVO): Promise<ApiResult<number>> => {
  return await post('/major/saveOrUpdate', data);
};

export const delMajor = async (ids: string) => {
  return await post('/major/delMultiMajor', { ids });
};
