import { ApiResult, get, post } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface StudentVO {
  oid?: number;
  studentNo: string;
  name: string;
  sex: number | undefined;
  classId: number | undefined;
  gradeId: number | undefined;
  majorId: number | undefined;
  idCard: string;
  nation: number | undefined;
  phone: string;
  statue: number | undefined;
  createTime?: Date;
}

export const getStudentPage = async (params: Page): Promise<ApiResult<PageResult<StudentVO[]>>> => {
  return await get('/student/list', params);
};

export const saveStudent = async (data: StudentVO): Promise<ApiResult<number>> => {
  return await post('/student/save', data);
};
