import { Card, Col, Form, List, Row, Select, Typography } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import AvatarList from './components/AvatarList';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import Link from 'umi/link';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const getKey = (id, index) => `${id}-${index}`;

const ListSearchProjects = ({ dispatch, listSearchProjects: { list = [] }, loading }) => {
  useEffect(() => {
    dispatch({
      type: 'listSearchProjects/fetch',
      payload: {
        count: 8,
      },
    });
  }, []);

  const cardList = list && (
      <List
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 24,
        xl: 4,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
      }}
      //cover是project的图片
        //考虑可以设置img的点击事件
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
                // title={
                //     <Link  to={item.href}>
                //         {item.title}
                //     </Link>
                // }

            title = {<Link to={{
                pathname: '/playVideo',
                query: {
                    href: item.filename,
            }
            }}>{item.title}</Link>}

                //title={<a href={'/playVideo/:'+item.href}>{item.title}</a>}
              description={
                <Paragraph
                  className={styles.item}
                  ellipsis={{
                    rows: 2,
                  }}
                >
                  {item.subDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>

              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onValuesChange={() => {
            // 表单项变化时请求数据
            // 模拟查询表单生效
            dispatch({
              type: 'listSearchProjects/fetch',
              payload: {
                count: 8,
              },
            });
          }}
        >
          <h2>大数据技术视频</h2>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

export default connect(({ listSearchProjects, loading }) => ({
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))(ListSearchProjects);
