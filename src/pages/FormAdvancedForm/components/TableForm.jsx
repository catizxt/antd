import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message } from 'antd';
import React, { useState } from 'react';
import styles from '../style.less';
import { useEffect } from 'react';

const TableForm = ({  dispatch,formAdvancedForm:{ list = [] },loading  }) => {
    const [clickedCancel, setClickedCancel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    const onChange = false;
    const [cacheOriginData, setCacheOriginData] = useState({});
    //const [data, setData] = useState(value);
    useEffect(() => {
        dispatch({
            type: 'formAdvancedForm/fetchData',
            payload: {
                count: 8,
            },
        });
    }, []);


    const getRowByKey = (key, newData) => newData || data?.filter(item => item.key === key)[0];


    const remove = key => {
        const newData = data?.filter(item => item.key !== key);
        setData(newData);

        if (onChange) {
            onChange(newData);
        }
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

    const cancel = (e, key) => {
        setClickedCancel(true);
        e.preventDefault();
        const newData = [...data]; // 编辑前的原始数据


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
                <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                  <a>删除</a>
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
            <a onClick={e => toggleEditable(e, record.key)}>编辑</a>
            <Divider type="vertical"/>
            <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
              <a>删除</a>
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
                dataSource={data}
                pagination={false}
                rowClassName={record => (record.editable ? styles.editable : '')}
            />

        );
        return (
            <>
                {cardList}

            </>
        );
    };
};


export default TableForm;
