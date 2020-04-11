import React from 'react';
import { Form, Icon, Input, Button, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

/**
 * [带数据绑定的input（还没加上数据格式验证）]
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 * state: {
        username: {
            value: ''
        }
    }
 *  <CustomizedInput
        {...this.props.login.username}
        dispatch={this.props.dispatch}
        name="username"
        iconType="lock"
        inputType="password"
        placeholder="请输入邮箱"
        onChange={this.handleFormChange}
    />
 */
export const CustomizedInput = Form.create({
    onFieldsChange(props, changedFields) {
        //name 用来区分更新state的值（想不到好的方法了= =。
        //changedFields变更的值
        props.onChange &&
            props.onChange(changedFields, props.dispatch, props.name);
    },
    onValuesChange(_, values) {}
})(props => {
    const { getFieldDecorator } = props.form;

    return getFieldDecorator(props.name, { initialValue: props.defaultValue })(
        <Input
            prefix={
                props.iconType ? (
                    <Icon type={props.iconType} style={{ fontSize: 13 }} />
                ) : null
            }
            placeholder={props.placeholder}
            type={props.inputType}
            className={props.className}
            style={props.style}
            disabled={props.disabled}
            onPressEnter={props.onPressEnter}
        />
    );
});

export const CustomizedSelect = Form.create({
    onFieldsChange(props, changedFields) {
        //name 用来区分更新state的值（想不到好的方法了= =。
        //changedFields变更的值
        props.onChange &&
            props.onChange(changedFields, props.dispatch, props.name);
    },
    onValuesChange(_, values) {}
})(props => {
    const { getFieldDecorator } = props.form;
    const { options, defaultValue, disabled } = props;
    return getFieldDecorator(props.name, { initialValue: defaultValue + '' })(
        <Select disabled={disabled} className={props.className}>
            {options.map((opt, i) => {
                return (
                    <Option key={opt.id + '_' + i} value={opt.id + ''}>
                        {opt.name}
                    </Option>
                );
            })}
        </Select>
    );
});
