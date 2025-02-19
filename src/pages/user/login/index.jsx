import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginFrom from './components/Login';
import styles from './style.less';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

const Login = props => {
    const { userLogin = {}, submitting } = props;
    const { status, type: loginType } = userLogin;
    const [autoLogin, setAutoLogin] = useState(true);
    const [type, setType] = useState('account');

    const handleSubmit = values => {
        const { dispatch } = props;
        dispatch({
            type: 'login/login',
            payload: { ...values, type },
        });
    };

    return (
        <div className={styles.main}>
            <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
                <Tab key="account" tab="账户密码登录">
                    {status === 'error' && loginType === 'account' && !submitting && (
                        <LoginMessage content="账户或密码错误（admin/ant.design）" />
                    )}

                    <UserName
                        name="username"
                        placeholder="用户名: admin or user"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <Password
                        name="password"
                        placeholder="密码: ant.design"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                </Tab>


                <Submit loading={submitting}>登录</Submit>


                <div className={styles.other}>


                    <Link className={styles.register} to="/user/register">
                        注册账户
                    </Link>

                    <Link className={styles.register} to="/user/forgetpassword">
                        找回密码
                    </Link>


                </div>
            </LoginFrom>
        </div>
    );
};

export default connect(({ login, loading }) => ({
    userLogin: login,
    submitting: loading.effects['login/login'],
}))(Login);
