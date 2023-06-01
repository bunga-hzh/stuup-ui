import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RecHonorVO {
  id: number;
  gradeName: string;
  className: string;
  studentName: string;
  studentNo: string;
  idCard: string;
  studentId: number;
  name: string;
  level: number;
  unit: string;
  time: Date;
  createTime: Date;
}

export const getRecHonorPage = async (params: Page): Promise<ApiResult<PageResult<RecHonorVO[]>>> => {
  return await get('/recHonor/page', params);
};
