import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Divider,PopconfirmForm, Popconfirm,Table,Input, Popover, Row, Select, TimePicker } from 'antd';
import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
//import TableForm from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';
import styles from './style.less';
import { useEffect } from 'react';
import { deleteData,downloadData} from './service';

const { Option } = Select;
const { RangePicker } = DatePicker;

const FormAdvancedForm = ({ onChange, submitting, dispatch,formAdvancedForm:{ list = [] },loading  }) => {
    useEffect(() => {
        dispatch({
            type: 'formAdvancedForm/fetchData',
            payload: {
                count: 8,
            },
        });
    }, []);


    const getRowByKey = (key, newData) => newData || list?.filter(item => item.key === key)[0];


    const remove = (key,title) => {

        const newData = list?.filter(item => item.key !== key);
        deleteData(title);
        location.reload();
        //onChange(newData);

    };

    const handleDownloadClick = (key,title,fileName) => {
        //e.preventDefault();
        //const { dispatch } = this.props;

        dispatch({
            type: 'formAdvancedForm/download',
            payload: {title:title}, // 根据实际情况填写参数
            callback: blob => {
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName);
                } else {
                    const link = document.createElement('a');
                    const evt = document.createEvent('MouseEvents');
                    link.style.display = 'none';
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    document.body.appendChild(link); // 此写法兼容可火狐浏览器
                    evt.initEvent('click', false, false);
                    link.dispatchEvent(evt);
                    document.body.removeChild(link);
                }
            }
        });
    };

    const download = (key,title) => {
        downloadData(title);
        //onChange(newData);

    };

    const handleFieldChange = (e, fieldName, key) => {
        const newData = [...data];
        const target = getRowByKey(key, newData);

        if (target) {
            target[fieldName] = e.target.value;
            setData(newData);
        }
    };

    const saveRow = (e, key) => {
        e.persist();
        setLoading(true);
        setTimeout(() => {
            if (clickedCancel) {
                setClickedCancel(false);
                return;
            }

            const target = getRowByKey(key) || {};

            if (!target.workId || !target.name || !target.department) {
                message.error('请填写完整成员信息。');
                e.target.focus();
                setLoading(false);
                return;
            }

            delete target.isNew;
            toggleEditable(e, key);

            if (onChange) {
                onChange(data);
            }

            setLoading(false);
        }, 500);
    };

    const handleKeyPress = (e, key) => {
        if (e.key === 'Enter') {
            saveRow(e, key);
        }
    };

    const columns = [
        {
            title: '文件名称',
            dataIndex: 'filename',
            key: 'filename',
            width: '15%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            autoFocus
                            onChange={e => handleFieldChange(e, 'filename', record.key)}
                            onKeyPress={e => handleKeyPress(e, record.key)}
                            placeholder="成员姓名"
                        />
                    );
                }

                return text;
            },
        },
        {
            title: '文件标题',
            dataIndex: 'title',
            key: 'title',
            width: '20%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={e => handleFieldChange(e, 'title', record.key)}
                            onKeyPress={e => handleKeyPress(e, record.key)}
                            placeholder="工号"
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '文件类别',
            dataIndex: 'type',
            key: 'type',
            width: '10%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={e => handleFieldChange(e, 'type', record.key)}
                            onKeyPress={e => handleKeyPress(e, record.key)}
                            placeholder="所属部门"
                        />
                    );
                }

                return text;
            },
        },
        {
            title: '文件描述',
            dataIndex: 'subDescription',
            key: 'subDescription',
            width: '20%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={e => handleFieldChange(e, 'subDescription', record.key)}
                            onKeyPress={e => handleKeyPress(e, record.key)}
                            placeholder="文章标题"
                        />
                    );
                }

                return text;
            },
        },
        {
            title: '上传时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '20%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={e => handleFieldChange(e, 'createdAt', record.key)}
                            onKeyPress={e => handleKeyPress(e, record.key)}
                            placeholder="文章描述"
                        />
                    );
                }

                return text;
            },
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                if (!!record.editable && loading) {
                    return null;
                }
                if (record.editable) {
                    if (record.isNew) {
                        return (
                            <span>
                <a onClick={e => saveRow(e, record.key)}>添加</a>
                <Divider type="vertical"/>
                <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key,record.title)}>
                  <a>删除</a>
                </Popconfirm>
                                 <Popconfirm title="是否要下载此文件？" onConfirm={() => download(record.key,record.title,record.filename)}>
                  <a>下载</a>
                </Popconfirm>
              </span>
                        );
                    }

                    return (
                        <span>
              <a onClick={e => saveRow(e, record.key)}>保存</a>
              <Divider type="vertical"/>
              <a onClick={e => cancel(e, record.key)}>取消</a>
            </span>
                    );
                }

                return (
                    <span>

            <Divider type="vertical"/>
            <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key,record.title)}>
              <a>删除</a>
            </Popconfirm>
                        <Divider type="vertical" />
                        <Popconfirm title="是否要下载此文件？" onConfirm={() => handleDownloadClick(record.key,record.title,record.filename)}>
                  <a>下载</a>
                </Popconfirm>
          </span>
                );
            },
        },
    ];

    const cardList = list && (
        <Table
            loading={loading}
            columns={columns}
            dataSource={list}
            pagination={false}
            rowClassName={record => (record.editable ? styles.editable : '')}
        />
    );

  return <div>{cardList}</div>
};

export default connect(({ formAdvancedForm,loading }) => ({
    formAdvancedForm,
    loading: loading.models. formAdvancedForm,
    submitting: loading.effects['formAdvancedForm/submitAdvancedForm'],
}))(FormAdvancedForm);
