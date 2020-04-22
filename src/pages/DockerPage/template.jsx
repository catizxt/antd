import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col,Modal, DatePicker, Divider,PopconfirmForm, Popconfirm,Table,Input, Popover, Row, Select, TimePicker } from 'antd';
import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import Link from 'umi/link';

import { useEffect } from 'react';
import {createDocker} from "./service";

const { Option } = Select;
const { RangePicker } = DatePicker;


const DockerFile = ({ location,onChange, submitting, dispatch,dockerFile:{ list = [] },loading  }) => {

    const [flag, setState] = useState(false);
    //setState({flag: {a:1}});
    //console.log(flag);


    //"/user/data/text/try.html"
    useEffect(() => {
        dispatch({
            type: 'dockerFile/fetchData',
            payload: {
                count: 8,
            },
        });
    }, []);


    const create = (key,filename) => {
        //const newData = list?.filter(item => item.key !== key);
        //这里要对filename进行处理,docker_renwuleixing
        //
        var params = {
            email : localStorage.getItem("zly_name"),
            type : "common",
        };
        var res = createDocker(params);
        res.then(function(value){
            console.log(value);

        });

        dockerCard = (<div>hello</div>);
        console.log(res);
    };




    //返回的数据最好是对应的教程文件名称，不要再写上html了！！！！！
    //教程描述
    //所以还是可以从那个地方获取
    //不用单独写！！！
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
                <Popconfirm title="是否要创建此虚拟机？" onConfirm={() => create(record.key,record.title)}>
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
            <Popconfirm title="是否要创建此虚拟机？" onConfirm={() => create(record.key,record.filename)}>
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



    return(<PageHeaderWrapper>
        <div>{cardList}</div>
        <Modal title="新增信息"
               visible={false}
               onCancel={()=>{

               }}
        >
        </Modal>

    </PageHeaderWrapper>);
};

export default connect(({ dockerFile,loading }) => ({
    dockerFile,
    loading: loading.models.dockerFile,
}))(DockerFile);
