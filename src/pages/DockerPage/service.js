import request from '@/utils/request';


export async function fetchData(params) {
    //这个是docker中获取教程信息的页面
    return request('/hdfs/coursefile', {
        params: params
    });
}

export async function createDocker(params) {
    //这个是docker中获取教程信息的页面
    return request('/experiment/create', {
        method: 'POST',
        data: params,
    });
}

