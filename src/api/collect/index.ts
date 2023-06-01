import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface GrowRecordVO {
  id?: number;
  firstLeveName?: string;
  secondLevelName?: string;
  threeLevelName?: string;
  growName: string;
  createTime: string;
  createUser: string;
}

export interface RecDefaultVO {
  id: number;
  grawName: string;
  className: string;
  studentName: string;
  studentNo: string;
  idCard: string;
  growName: string;
  createTime: Date;
  remark: string;
}

export const growthRecordPage = async (params: Page): Promise<ApiResult<PageResult<GrowRecordVO[]>>> => {
  return await get('/recDefault/page', params);
};

export const growthRecordDetails = async (
  batchCode: number,
  params: Record<string, any>
): Promise<ApiResult<RecDefaultVO[]>> => {
  return await get('/recDefault/details/' + batchCode, params);
};
