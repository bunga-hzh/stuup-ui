import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RecMilitaryVO {
  id: number;
  yearName: string;
  gradeName: string;
  className: string;
  studentName: string;
  studentNo: string;
  idCard: string;
  studentId: number;
  level: number;
  excellent: Date;
  createTime: Date;
}

export const getRecMilitaryPage = async (params: Page): Promise<ApiResult<PageResult<RecMilitaryVO[]>>> => {
  return await get('/recMilitary/page', params);
};
