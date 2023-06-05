import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface SchoolStuRankVO {
  id: string;
  yearName: string;
  studentName: string;
  studentNo: string;
  gradeName: string;
  className: string;
  classTeacher: string;
  facultyName: string;
  score: string;
}

export const getSchoolStuRank = async (params: Page): Promise<ApiResult<PageResult<SchoolStuRankVO[]>>> => {
  return await get('/recScore/schoolStuRank', params);
};
