import { get } from '@/api/api';

export interface GradeQueryType {
  currentPage: number;
  pageSize: number;
  gradeName: string;
}

export const queryGrade = async (params: GradeQueryType) => {
  console.log(params);
  return get('/term/list', params);
};
