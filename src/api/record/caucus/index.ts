import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RecCaucusVO {
  id: number;
  yearName: string;
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
  role: number;
  createTime: Date;
}

export const getRecCaucusPage = async (params: Page): Promise<ApiResult<PageResult<RecCaucusVO[]>>> => {
  return await get('/recCaucus/page', params);
};
