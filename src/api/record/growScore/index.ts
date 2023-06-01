import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RecScoreVO {
  id: number;
  yearName?: string;
  firstLevelName?: string;
  secondLevelName?: string;
  threeLevelName?: string;
  growName?: string;
  gradeName?: string;
  className?: string;
  studentName?: string;
  studentNo?: string;
  idCard?: string;
  studentId?: string;
  score?: string;
  createTime?: Date;
}

export const getRecScorePage = async (params: Page): Promise<ApiResult<PageResult<RecScoreVO[]>>> => {
  return await get('/recScore/page', params);
};
