import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
    return request('/sso/currentuser', {
        method: 'POST',
        data: params,
    });
  //return request('/api/currentUser');
    //currentuser
}
export async function queryNotices() {
  return request('/api/notices');
}
