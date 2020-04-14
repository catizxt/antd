import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */

const a = queryRule();
console.log(a);

const handleAdd = async fields => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};


const TableList = () => {
  const [sorter, setSorter] = useState('');
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
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
              return (
                    <span>
            <a onClick={e => toggleEditable(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
              <a href={'http://39.96.93.7:8000/hdfs/delete?title='+record.title}>删除</a>
            </Popconfirm>
          </span>
                );
            },
        },
    ];
  return (
    <PageHeaderWrapper>

      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter;

          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={queryRule()}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async value => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);

            if (success) {
              handleModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
