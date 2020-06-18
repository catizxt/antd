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
        //这个地方还有
      var param = {"msg":cookie.load("zly_token")};
      console.log(cookie.load("zly_token"));
      //  var param = {"msg":"a"};
      //cookie.remove('zly_name');
      //这个获取头像的又出问题了

      //这个地方用户的名称应该从那个localstorage中获取一下
      const response = yield call(queryCurrent,param);

      //只要没给response中需要的参数赋值，就行
      //response.name = "zly";
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
