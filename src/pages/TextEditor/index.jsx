import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Button,Divider,Form,Input,Select} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {SubmitFile} from './service';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class TextEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = { text: '' };// You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onFinish = this.onFinish.bind(this);
    }

    handleChange(value) {
        // if (value) ReactQuill.getSelection().dangerouslyPasteHTML(value);
        //console.log(value);
        this.setState({ text: value })
    };


    handleClick(){
     console.log("ok");
    };

    //就在这个函数里面调用富文本编辑器文件上传函数
    onFinish = values => {
        const params = {
            title : values.title,
            filename : values.filename,
            subDescription: values.subDescription,
            type: values.type,
            data : this.state.text
        };

        //console.log(params);
        SubmitFile(params);
        //console.log(this.state.text);
    };
    modules={//富文本配置
        toolbar:{
            container:[
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike','blockquote'],        // toggled buttons
                ['blockquote', 'code-block'],
                // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'},{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean'],
            ],
        },
    };
    formRef = React.createRef();

    render(){
        return (
            <PageHeaderWrapper>
            <ReactQuill id="ddd"  value={this.state.text} onChange={this.handleChange}
                        theme={"snow"}  modules={this.modules} style={{height:"300px"}} />

                <Divider type="horizontal"/>
                <Divider type="horizontal"/>
                <Divider type="horizontal"/>
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item
                        name="title"
                        label="标题"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="filename"
                        label="文件名称"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="subDescription"
                        label="文件描述"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="文件类型"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={this.onGenderChange}
                            allowClear
                        >
                            <Option value="hadoop">hadoop</Option>
                            <Option value="es">es</Option>
                            <Option value="docker">docker</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('gender') === 'other' ? (
                                <Form.Item
                                    name="customizeGender"
                                    label="Customize Gender"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>


                    </Form.Item>
                </Form>


            </PageHeaderWrapper>
        );
    }
}

//https://ant.design/components/form-cn/
export default  TextEditor;
// function MyComponent() {
//     const [value, setValue] = useState('');
//
//     return (
//         <ReactQuill theme="snow" value={value} onChange={setValue}/>
//     );
// }