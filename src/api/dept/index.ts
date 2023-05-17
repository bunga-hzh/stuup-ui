import { get } from '@/api/api';

export interface DeptQueryType {
  currentPage: number;
  pageSize: number;
  deptName: string;
}

export const queryDept = async (params: DeptQueryType) => {
  console.log(params);
  return get('/faculty/list', params);
};
