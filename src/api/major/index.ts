import { get } from '@/api/api';

export interface MajorQueryType {
  currentPage: number;
  pageSize: number;
  majorName: string;
}

export const queryMajor = async (params: MajorQueryType) => {
  console.log(params);
  return get('/major/list', params);
};
