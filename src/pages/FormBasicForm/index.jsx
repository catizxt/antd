import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';
import {connect} from 'dva';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';
import Demo from '../Admin';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const FormBasicForm = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'formBasicForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = changedValues => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageHeaderWrapper content={<FormattedMessage id="formbasicform.basic.description" />}>
      <Demo/>
        <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formbasicform.title.label" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'formbasicform.title.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'formbasicform.title.placeholder',
              })}
            />


          </FormItem>
            <FormItem
                {...formItemLayout}
                label={
                    <span>
                <FormattedMessage id="formbasicform.invites.label" />

              </span>
                }
                name="filename"
            >
                <Input
                    placeholder={formatMessage({
                        id: 'formbasicform.invites.placeholder',
                    })}
                />
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={
                    <span>
                <FormattedMessage id="formbasicform.standard.required" />

              </span>
                }
                name="type"
            >
                <Input
                    placeholder={formatMessage({
                        id: 'formbasicform.standard.placeholder',
                    })}
                />
            </FormItem>



          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formbasicform.goal.label" />}
            name="subDescription"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'formbasicform.goal.required',
                }),
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder={formatMessage({
                id: 'formbasicform.goal.placeholder',
              })}
              rows={4}
            />
          </FormItem>


          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="formbasicform.client.label" />
                <em className={styles.optional}>


                </em>
              </span>
            }
            name="cover"
          >
            <Input
              placeholder={formatMessage({
                id: 'formbasicform.client.placeholder',
              })}
            />
          </FormItem>

          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >

              <Button type="primary" htmlType="submit" loading={submitting}>
                  <FormattedMessage id="formbasicform.form.submit" />
              </Button>

          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formBasicForm/submitRegularForm'],
}))(FormBasicForm);
