import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/hdfs/filelist', {
    method: 'POST',
    data: params,
  });
}

export async function fetchData(params) {
    return request('/hdfs/filelist', {
        method: 'POST',
        data: params,
    });
}

export async function deleteData(params) {
    console.log("看看能不能输出");
    console.log(params);
    return request.get('/hdfs/delete', {
        params: {
            title: params,
        }
    });
}

export async function downloadData(params) {
    return request.get('/hdfs/download', {
        params: {
            title: params.title,
        },
        responseType : 'blob',
    });
}
