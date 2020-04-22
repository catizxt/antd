import React from 'react';
import { connect } from 'dva';


import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Spin,Col,Modal, DatePicker, Divider,PopconfirmForm, Popconfirm,Table,Input, Popover, Row, Select, TimePicker } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import Link from 'umi/link';
import {createDocker} from "./service";

@connect(({ dockerFile, loading }) => ({
    dockerFile,
    loading: loading.models.dockerFile,
}))


export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            flag: false,
        };

        const create = (key,filename) => {
            //const newData = list?.filter(item => item.key !== key);
            //这里要对filename进行处理,docker_renwuleixing
            //
            let index = filename.indexOf("-");
            var type = filename.substring(index+1,filename.indexOf("."));
            console.log(type);

            var params = {
                email : localStorage.getItem("zly_name"),
                type : type,
            };
            this.props.dispatch({
                type: 'dockerFile/createDocker',
                payload:params
            });

            this.setState({
                flag: true
            });

        };
        const onCancle = () => {

            // this.props.dispatch({
            //     type: 'dockerFile/cleanUrls',
            // });

            this.setState(
                {
                    flag: false
                }
            );
            //通过刷新来解除缓存，只是需要再调用一次后端
            //性能上就是对前端不熟悉，需要刷新一次界面消除缓存和从数据库中重新读取值
            location.reload();
        };
        this.onCancle = onCancle;
        this.create = create;
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'dockerFile/fetchData',
            payload: {
                count: 8,
            },
        });
        console.log("点击");
    }

    componentDidUpdate() {
        // this.props.dispatch({
        //     type: 'dockerFile/fetchData',
        //     payload: {
        //         count: 8,
        //     },
        // });
        console.log("更新");

    }


    render() {
        const {list,loading,urls} = this.props.dockerFile;
        //const {loading} = this.props.;
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
                <Popconfirm title="是否要创建此虚拟机？" onConfirm={() => this.create(record.key,record.title)}>
                  <a>点击创建</a>
                </Popconfirm>
                         <Link to={{
                             pathname: '/textreader',
                             query: {
                                 href: record.filename,
                             }
                         }}>进入教程</Link>
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
            <Popconfirm title="是否要创建此虚拟机？" onConfirm={() => this.create(record.key,record.filename)}>
                  <a>点击创建</a>
                </Popconfirm>
                        <Divider type="vertical"/>
               <Link to={{
                   pathname: '/textreader',
                   query: {
                       href: record.filename,
                   }
               }}>进入教程</Link>
          </span>
                    );
                },
            },
        ];

        const  cardList = list && (
            <Table
                loading={loading}
                columns={columns}
                dataSource={list}
                pagination={false}
                rowClassName={record => (record.editable ? styles.editable : '')}
            />
        );

        return (
            <PageHeaderWrapper>
                <div>{cardList}</div>
                <Modal title="虚拟机地址"
                       visible={this.state.flag}
                       onCancel={this.onCancle}
                       onOk={this.onCancle}
                >

                    {
                        urls?null:(
                            <Spin tip="创建中..."
                            >

                            </Spin>
                        )
                    }
                    <a>{urls}</a>
                    <p>复制链接到浏览器，一个浏览器只能运行一个虚拟机！
                    如果是创建hadoop,因创建时间过长，创建中...可能会提前停止，所以请耐心等待</p>
                </Modal>



            </PageHeaderWrapper>
        );
    }
}
