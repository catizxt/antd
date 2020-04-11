import request from '@/utils/request';

/*export async function queryFakeList(params) {
  return request('/sso/test', {
    params,
  });
}*/


export async function queryFakeList() {
    return request('/sso/test');
}
