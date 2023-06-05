import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RecNationVO {
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
  org: string;
  hour: number;
  createTime: Date;
}

export const getRecNationPage = async (params: Page): Promise<ApiResult<PageResult<RecNationVO[]>>> => {
  return await get('/recNation/page', params);
};
