import request from '@/utils/request';
export async function queryInfo(params) {
  return request('/api/try', {
    params,
  });
}

