import request from '@/utils/request';
import { PageType } from './page.d';

// User列表查询入参
export interface UserQuery {
  pager: PageType;
  name?: string;
}

export async function getUsers(params: UserQuery) {
  return request(
    `/api/users?name=${params.name}&page=${params.pager.limit}&size=${params.pager.offset}`,
  );
}

export async function getUser(userId: number) {
  return request(`/api/user?id=${userId}`, { method: 'GET' });
}

export async function DeleteUser(userId: number) {
  return request(`/api/user?id=${userId}`, { method: 'DELETE' });
}

// User入参
export interface UserModel {
  id?: number;
  name: string;
  pwd: string;
  sex: number;
}

export async function AddUser(user: UserModel) {
  return request('/api/user', {
    method: 'POST',
    data: user,
  });
}

export async function EditUser(user: UserModel) {
  return request('/api/user', {
    method: 'PUT',
    data: user,
  });
}
