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
                    href: item.href,
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
          <StandardFormRow
            title="所属类目"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="作者" name="author">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="lisa">王昭君</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="好评度" name="rate">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="good">优秀</Option>
                    <Option value="normal">普通</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
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
