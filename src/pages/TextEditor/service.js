import request from '@/utils/request';

export async function SubmitFile(params) {
  console.log(params);
    // return request.get('/hdfs/upload', {
    //     params: {
    //         title: params.title,
    //         filename: params.filename,
    //         subDescription : params.subDescription,
    //         data : params.data,
    //         type : params.type,
    //     }
    // });

    return request('/hdfs/upload', {
        method: 'POST',
        data: {
            title: params.title,
            filename: params.filename,
            subDescription : params.subDescription,
            data : params.data,
            type : params.type,
        },
    });
}
