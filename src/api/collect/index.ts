import { ApiResult, get } from '@/api/api';
import { PageResult } from '@/types/global';

export interface GrowRecordVO {
  id?: number;
  firstLeveName?: string;
  secondLevelName?: string;
  threeLevelName?: string;
  growName: string;
  createTime: string;
  createUser: string;
}

export const growthRecordPage = async (): Promise<ApiResult<PageResult<GrowRecordVO>>> => {
  return await get('/recDefault/page');
};
