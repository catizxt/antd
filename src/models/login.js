import { stringify } from 'querystring';
import { router } from 'umi';
import { AccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import cookie from 'react-cookies';
import { message }from 'antd';
const Model = {
    namespace: 'login',
    state: {
        status: undefined,
    },
    effects: {
        *login({ payload }, { call, put }) {
            //var payload2 = {"username":payload.username,"password":payload.password};
            //console.log(payload);
            const response = yield call(AccountLogin, payload);
            cookie.save('zly_token', response.token, { path: '/' });
            //这个东西应当使用react redux存储数据
            //cookie.save('zly_name',response.email, { path: '/' });
            localStorage.setItem("zly_token",response.token);
            console.log(localStorage.getItem("zly_token"));
            localStorage.setItem("zly_name",response.email);
            //还有admin这个不对啊
            //这个地方解决完就是后端的权限了，主要就是需要向
            //后端传入当前用户名

            yield put({
                type: 'changeLoginStatus',
                payload: response,
            }); // Login successfully



            console.log("输出权限");
            console.log(response.currentAuthority);

            if (response.status === 'ok') {

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
                        window.location.href = '/';
                        return;
                    }
                }
                //看这里是否合适
                //location.reload();
                //重定向这个地方有一点问题
                router.replace('/');
            }
            else{
                message.error("账号或密码错误，请使用邮箱号登录");
                router.replace('/user/login');
            }
        },

        logout() {
            //https://blog.csdn.net/shb2058/article/details/82253652
            //设置过期时间比较复杂
            //https://blog.csdn.net/mx18519142864/article/details/79916749/
            const { redirect } = getPageQuery(); // Note: There may be security issues, please note
            localStorage.removeItem('zly_name');
            localStorage.removeItem("zly_token");
            cookie.remove("zly_token");


            if (window.location.pathname !== '/user/login' && !redirect) {
                router.replace({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                });
            }
        },
    },
    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            //setAuthority(payload.currentAuthority);
            return { ...state, status: payload.status, type: payload.type };
        },
    },
};
export default Model;
