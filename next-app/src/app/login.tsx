import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import './login.css'

const onFinish = (values: any) => {
    console.log('Success:', values);
    // const loginStatus = window.localStorage.getItem('login-status')
    window.localStorage.setItem('login-status', 'true')
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    username?: string;
    password?: string;
};

interface LoginProps {
    closeModel: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
    const { closeModel } = props

    return (
        <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="login-form"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="submit-box" wrapperCol={{ offset: 8, span: 16,  }}>
            <Space>
                <Button type="primary" onClick={closeModel}>
                    Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Space>
        </Form.Item>
      </Form>
    )
}

export default Login