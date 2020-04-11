import request from '@/utils/request';

//kong对外的网关应该是/api/register
//修改这两个接口
export async function AccountPassword(params) {
  return request('/sso/forgetpassword', {
    method: 'POST',
    data: params,
  });
}

export async function getCaptcha(params) {
    return request('/sso/sendemail', {
        method: 'POST',
        data: params,
    });
}
