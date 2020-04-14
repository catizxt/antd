import request from '@/utils/request';
export async function AccountLogin(params) {
    return request('/sso/token', {
        method: 'POST',
        data: params,
    });
}
export async function getFakeCaptcha(mobile) {
    return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function SubmitForm(params) {
    console.log(params);
    console.log("输出params看一下");
    return request('/hdfs/upload', {
        method: 'POST',
        data: params,
    });
}
