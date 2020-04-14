import { message } from 'antd';
import { SubmitForm } from './service';

const Model = {
  namespace: 'formBasicForm',
  state: {},
  effects: {
    *submitRegularForm({ payload }, { call }) {

      console.log(payload);
      console.log("还是没有");
      const response = yield call(SubmitForm, payload);

      message.success('提交成功');
    },
  },
};
export default Model;
