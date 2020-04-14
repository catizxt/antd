import request from '@/utils/request';

export async function queryFakeList(params) {
    return request('/hdfs/filelist', {
        method: 'POST',
        data: params,
    });
}
//sso/test