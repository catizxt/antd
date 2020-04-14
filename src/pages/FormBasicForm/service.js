import request from '@/utils/request';

//要么就用Get，但是之前传到sso的又可以，所以这是怎么回事
//明天再看一下sso
//数据格式也没有不对的地方，params也不是objet，明天再看一下
export async function SubmitForm(params) {
    console.log("看看能不能输出");
    console.log(params);
   return request.get('/hdfs/upload', {
        params: {
            title: params.title,
            filename: params.filename,
            subDescription : params.subDescription,
            cover : params.cover,
            type : params.type,
        }
    });
  // return request('/hdfs/upload', {
  //   method: 'POST',
  //   data: params,
  // });
}
