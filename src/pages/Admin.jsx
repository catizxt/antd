import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';
import ReactDOM from 'react-dom';
import React from 'react';
import { connect } from 'dva';

class Demo extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files', file);
        });

        this.setState({
            uploading: true,
        });

        //这里一定要支持跨域
        // You can use any AJAX library you like
        reqwest({
            url: 'http://39.96.93.7:8000/hdfs/uploadto',
            method: 'post',
            processData: false,
            data: formData,
            crossOrigin: true,
            success: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('upload successfully.');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            },
        });
    };

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div>
                <Upload {...props}>
                    <Button>
                        <UploadOutlined /> Select File
                    </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        );
    }
}

export default connect()(Demo);
