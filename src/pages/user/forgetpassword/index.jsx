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
      type: 'forgetpassword/forgetpassword',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="找回密码">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="账户或密码错误（admin/ant.design）" />
          )}

          <Mobile
                name="mobile"
                placeholder="邮箱号"
                rules={[
                    {
                        required: true,
                        message: '请输入邮箱号！',
                    },
                    {
                        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        message: '邮箱格式错误！',
                    },
                ]}
            />

         <Captcha
            name="captcha"
            placeholder="前往邮箱获取验证码"
            countDown={300}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
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
            <Password
                name="password2"
                placeholder="再次确认密码"
                rules={[
                    {
                        required: true,
                        message: '请确认密码！',
                    },
                ]}
            />
        </Tab>
        
        <Submit loading={submitting}>修改密码</Submit>
        <div className={styles.other}>
          
          <Link className={styles.register} to="/user/login">
            直接登录
          </Link>
        </div>
      </LoginFrom>
    </div>
  );
};

export default connect(({ forgetpassword, loading }) => ({
  userLogin: forgetpassword,
  submitting: loading.effects['forgetpassword/forgetpassword'],
}))(Login);
