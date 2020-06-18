import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
    <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const img1 = "http://39.96.93.7:8000/images?image=welcome.jpg";
const img2 = "http://39.96.93.7:8000/images?image=hadoop.jpg";

//来到welcome先刷新一下页面
//登录之后先刷新一下页面
export default () => (
    <PageHeaderWrapper>
        <img alt={img1} src={img1}></img>

    </PageHeaderWrapper>
);
