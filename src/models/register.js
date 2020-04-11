import { stringify } from 'querystring';
import { router } from 'umi';
import { AccountRegister } from '@/services/register';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
const Model = {
  namespace: 'register',
  state: {
    status: undefined,
  },
  effects: {
    *register({ payload }, { call, put }) {
      console.log("payload chakan");
      console.log(payload);
      const response = yield call(AccountRegister, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
        console.log(response);
        console.log(response.status);
        //这段很复杂，要redirect到login页面
      if (parseInt(response.status) >= 1) {
        console.log('是为1');
        message.success("用户注册成功");
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/user/login';
            return;
          }
        }
        //或者直接该这句就好
        router.replace(redirect || '/user/login');
      }

      else{
          console.log('注册失败');
          message.success("用户注册失败");
          router.replace('/user/register');
      }
    },

  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
