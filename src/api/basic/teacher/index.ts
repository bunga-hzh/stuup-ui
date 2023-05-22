import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface TeacherVO {
  oid?: number;
  jobNo: string;
  name: string;
  sex: number | undefined;
  facultyId: number | undefined;
  teachGroup: number | undefined;
  phone: string;
  idCard: string;
  address: string;
  state: number | undefined;
  createTime?: Date;
}

export const getTeacherPage = async (params: Page): Promise<ApiResult<PageResult<TeacherVO[]>>> => {
  return await get('/teacher/list', params);
};

export const saveTeacher = async (data: TeacherVO): Promise<ApiResult<number>> => {
  return await post('/teacher/save', data);
};
