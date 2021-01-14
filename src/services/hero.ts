import request from '@/utils/request';

export async function getHeros() {
  return request(`/api/herolist.json`);
}
