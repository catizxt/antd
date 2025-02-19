import { queryFakeList } from './service';

const Model = {
  namespace: 'listSearchArticles',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
        const response = yield call(queryFakeList);
      //const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList);
      //const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },

    appendList(state, action) {
      return { ...state, list: state.list.concat(action.payload) };
    },
  },
};
export default Model;
