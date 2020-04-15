import request from '@/utils/request';


export async function fetchData(params) {
    console.log(params);
    return request.get('/hdfs/textplayer', {
        params: {
            href : params.href
        }
    });
}
