import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface SchoolClaRankVO {
  id: string;
  yearName: string;
  gradeName: string;
  className: string;
  classTeacher: string;
  facultyName: string;
  score: string;
}

export const getSchoolClaRank = async (params: Page): Promise<ApiResult<PageResult<SchoolClaRankVO[]>>> => {
  return await get('/recScore/schoolClaRank', params);
};
