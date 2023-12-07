import React from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import './login.css'
import  userData from '../mock_data/userdata.json'

const checkUserInfo = (info) => {
  return new Promise((resolve, reject) => {  
    setTimeout(() => {  
        const { userList } = userData
        const found = userList.find(obj => obj.username === info.username && obj.password === info.password)
        if (found) {
          resolve({  
              status: 200,  
              data: {  
                  message: 'login successfully',  
                  time: new Date().toLocaleTimeString()  
              }  
          });  
        } else {
          reject({
              status: 500,  
              data: {  
                  message: 'User name or password error not found',  
                  time: new Date().toLocaleTimeString()  
              }  
          })
        }
        
    }, 100); // Delay 200 milliseconds to simulate a real network request
  });  
}



const onFinishFailed = (errorInfo: any) => {
    window.localStorage.setItem('login-status', 'false')
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

    const onFinish = (values: any) => {
        checkUserInfo(values).then(res => {
          window.localStorage.setItem('login-status', 'true')
          message.success(res?.data?.message);
          closeModel()
        }).catch(err => {
          message.warning(err?.data?.message);
          console.error(err)
        })
    };
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