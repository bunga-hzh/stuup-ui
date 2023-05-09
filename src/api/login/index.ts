import { post } from '@/api/api';

export interface LoginForm {
  loginName: string;
  password: string;
}

export const login = async (data: LoginForm) => {
  return post('/login', data);
};

export const loginOut = async (data: LoginForm) => {
  return post('/user/signOut', data);
};
