import { stringify } from 'querystring';
import { router } from 'umi';
import { AccountPassword } from '@/services/forgetpassword';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
const Model = {
  namespace: 'forgetpassword',
  state: {
    status: undefined,
  },
  effects: {
    *forgetpassword({ payload }, { call, put }) {
      console.log("payload chakan");
      console.log(payload);
      //需要的是email、password、此处是update
      const response = yield call(AccountPassword, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
        console.log(response);
        console.log(response.status);
        //这段很复杂，要redirect到login页面
      if (parseInt(response.status) === 1) {
        console.log('是为1');
        message.success("密码修改成功");
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
