import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RecLogVO {
  id?: number;
  yearName: string;
  firstLeveName?: string;
  secondLevelName?: string;
  threeLevelName?: string;
  growName: string;
  createTime: string;
  createUser: string;
  batchCode: number;
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

export const getRecLogPage = async (params: Page): Promise<ApiResult<PageResult<RecLogVO[]>>> => {
  return await get('/recLog/page', params);
};

export const growthRecordDetails = async (
  batchCode: number,
  params: Record<string, any>
): Promise<ApiResult<RecDefaultVO[]>> => {
  return await get('/recDefault/details/' + batchCode, params);
};
