import request from '@/utils/request';


export async function queryFakeList() {
    return request.get('/hdfs/textlist', {
        params: {
            filetype : "text",
        }
    });
}
