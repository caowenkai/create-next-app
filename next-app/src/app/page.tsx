"use client"
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, theme, Modal, Form } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Login from './login'

const { Header, Sider, Content } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loginStatus = window.localStorage.getItem('login-status')
      setIsLogged(loginStatus === 'true')
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClickMenu: MenuProps['onClick'] = (e) => {
    console.log(e, '123123')
    if (isLogged) {
      console.log('到某个页面去111')
    } else {
      showModal()
    }
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Layout style={{ height: 'calc(100% - 46px)'}}>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            onClick={onClickMenu}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
      <Modal centered title="Login" open={isModalOpen} onCancel={handleCancel} footer={null}>
          <Login closeModel={handleCancel}></Login>
      </Modal>
    </Layout>
  )
}
