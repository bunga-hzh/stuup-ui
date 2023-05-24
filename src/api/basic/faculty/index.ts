import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface FacultyVO {
  oid?: number;
  facultyCode: string;
  facultyName: string;
  facultyAdmin?: number;
}

export interface FacultyDictVO {
  oid: number;
  facultyCode: string;
  facultyName: string;
  adminName: string;
  facultyAdmin: number;
  createTime: Date;
}

export const getFacultyList = async (): Promise<ApiResult<FacultyDictVO[]>> => {
  return await get('/faculty/all');
};

export const getFacultyPage = async (params: Page): Promise<ApiResult<PageResult<FacultyVO[]>>> => {
  return await get('/faculty/list', params);
};

export const saveOrUpdateFaculty = async (data: FacultyVO): Promise<ApiResult<number>> => {
  return await post('/faculty/saveOrUpdate', data);
};

export const delFaculty = async (ids: string) => {
  return await post('/faculty/del', { ids });
};
