import request from '@/utils/request';

export async function queryFakeList(params) {
    console.log(params);

    return request.get('/hdfs/videolist', {
        params: {
            count: params.count,
            filetype : params.filetype,
        }
    });
}
//sso/test