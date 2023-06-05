import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RecLaborTimeVO {
  id: number;
  yearName: string;
  gradeName: string;
  className: string;
  studentName: string;
  studentNo: string;
  idCard: string;
  studentId: number;
  hours: number;
  createTime: Date;
}

export const getRecLaborTimePage = async (params: Page): Promise<ApiResult<PageResult<RecLaborTimeVO[]>>> => {
  return await get('/recLaborTime/page', params);
};
