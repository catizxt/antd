import { message } from 'antd';
import { createDocker ,fetchData,} from './service';

//这个地方用state应该也不好吧，因为是从后端获取刷新
//https://blog.csdn.net/gtLBTNq9mr3/article/details/93547670
//和ListTableList中的usestate函数
const Model = {
  namespace: 'dockerFile',
  state: {
    list : false,
      urls : false,
  },
  effects: {

      *fetchData ({ payload }, { call , put }) {
          const response = yield call(fetchData, payload);
          //message.success('提交成功');
          //返回的是一个链接的数组，返回的，在java中是List<String>
          yield put({
              type: 'queryList',
              payload: Array.isArray(response) ? response : [],
          });
      },

      *createDocker({ payload }, { call , put }){
          const response = yield call(createDocker, payload);
          //message.success('提交成功');
          //返回的是一个链接的数组，返回的，在java中是List<String>
           yield put({
               type: 'dockerList',
               payload: Array.isArray(response) ? response : [],
           });
      },

      *cleanUrls({  }, {  put }){
          //const response = yield call(createDocker, payload);
          //message.s uccess('提交成功');
          //返回的是一个链接的数组，返回的，在java中是List<String>
          yield put({
              type: 'cleanUrls',
          });
      }
  },
    reducers: {
        queryList(state, action) {
            return { ...state, list: action.payload };
        },

        dockerList(state, action) {
            return { ...state, urls: action.payload };
        },
        cleanUrls(state){
            return { ...state,urls:false};
        },
    },
};
export default Model;
