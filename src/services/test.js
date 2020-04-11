import { stringify } from 'qs'
//对服务端发起请求
export async function queryFakeList(params) {
    return request(`/api/fake_list?${stringify(params)}`)
   }
