import { post } from '@/api/api';

export const queryUserAuthority = async () => {
  return post('/user/queryUserAuthority');
};
