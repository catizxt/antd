import { queryFakeList } from './service';
//import { queryFakeList } from '@/services/login';

const Model = {
  namespace: 'listSearchProjects',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const payload1 = {
        count : payload.count,
        filetype : "video",
      };
      const response = yield call(queryFakeList,payload1);
      //const response = yield call(queryFakeList, payload);
        console.log(response);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
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
