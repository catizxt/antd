import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Divider,PopconfirmForm, Popconfirm,Table,Input, Popover, Row, Select, TimePicker } from 'antd';
import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

import { useEffect } from 'react';


const { Option } = Select;
const { RangePicker } = DatePicker;


//https://www.cnblogs.com/tian874540961/p/10496743.html
//Textplayer后面的传参是通过pros获取的
//const { dispatch } = this.props;
const Textplayer = ({ location,onChange, submitting, dispatch,textplayer:{ list = [] },loading  }) => {

    const params = {
        href: location
    };
    console.log(params);
    //"/user/data/text/try.html"
    useEffect(() => {
        dispatch({
            type: 'textplayer/fetchData',
            payload: {
                href: params.href.query.href,
            },
        });
    }, []);


    const cardList = list && (
        <p dangerouslySetInnerHTML={{ __html: list }}></p>
    );

  return <div>{cardList}</div>
};

export default connect(({ textplayer,loading }) => ({
    textplayer,
    loading: loading.models.textplayer,
   }))(Textplayer);
