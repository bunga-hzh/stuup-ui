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

export const getMajorPage = async (params: Page): Promise<ApiResult<PageResult<MajorVO[]>>> => {
  return await get('/major/list', params);
};

export const saveMajor = async (data: MajorVO): Promise<ApiResult<number>> => {
  return await post('/major/save', data);
};
