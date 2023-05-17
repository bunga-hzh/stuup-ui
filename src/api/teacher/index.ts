import { get } from '@/api/api';

export interface TeacherQueryType {
  currentPage: number;
  pageSize: number;
  name: string;
  facultyId: number | null;
}

export const queryTeacher = async (params: TeacherQueryType) => {
  console.log(params);
  return get('/teacher/list', params);
};
