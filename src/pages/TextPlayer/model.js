import { message } from 'antd';
import { fakeSubmitForm ,fetchData,deleteData,downloadData} from './service';

//这个地方用state应该也不好吧，因为是从后端获取刷新
//https://blog.csdn.net/gtLBTNq9mr3/article/details/93547670
//和ListTableList中的usestate函数
const Model = {
  namespace: 'textplayer',
  state: {},
  effects: {

      *fetchData ({ payload }, { call , put }) {
          const response = yield call(fetchData, payload);
          //message.success('提交成功');
          yield put({
              type: 'queryList',
              payload: response ? response : [],
          });
      },

  },
    reducers: {
        queryList(state, action) {
            return { ...state, list: action.payload };
        },
    },
};
export default Model;
