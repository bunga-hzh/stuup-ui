import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RecSocietyVO {
  id: number;
  gradeName: string;
  className: string;
  studentName: string;
  studentNo: string;
  idCard: string;
  studentId: number;
  name: string;
  level: number;
  startTime: Date;
  endTime: Date;
  roleId: number;
  createTime: Date;
}

export const getRecSocietyPage = async (params: Page): Promise<ApiResult<PageResult<RecSocietyVO[]>>> => {
  return await get('/recSociety/page', params);
};
