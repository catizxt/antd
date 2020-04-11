import request from '@/utils/request';

export async function queryFakeList() {
  return request('/hdfs/filelist');
}
//sso/test