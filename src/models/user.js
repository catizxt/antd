import { queryCurrent, query as queryUsers } from '@/services/user';
import cookie from 'react-cookies';
//获取current user是直接从mock构造的数据获得的，没有post params
const UserModel = {
  namespace: 'user',
  state: {
    c: {},
  },
  effects: {
    *fetch(_, { call, put }) {
        const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      //这样的话这个东西只能在logout的时候删除，这种做法是不好的
      var param = {"msg":cookie.load('zly_name')};
      //  var param = {"msg":"a"};
      //cookie.remove('zly_name');
      //这个获取头像的又出问题了


      const response = yield call(queryCurrent,param);

      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
