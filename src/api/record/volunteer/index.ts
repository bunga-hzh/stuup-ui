import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface RecVolunteerVO {
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
  child: string;
  post: string;
  studyTime: number;
  serviceTime: Date;
  reason: string;
  createTime: Date;
}

export const getVolunteerPage = async (params: Page): Promise<ApiResult<PageResult<RecVolunteerVO[]>>> => {
  return await get('/recVolunteer/page', params);
};
