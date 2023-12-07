"use client"
import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, theme, Modal, Flex } from 'antd';
import type { MenuProps } from 'antd';
import Login from './login'
import './page.css'
import menuData from '../mock_data/menu.json'

const { Sider, Content } = Layout;
const { menu = [] } = menuData 

//  Most of the time the data here needs to be recursive 
const itemsData: MenuProps['items'] = menu

const handleLogout = () => {
  window.localStorage.setItem('login-status', 'false')
  window.location.reload()
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClickMenu: MenuProps['onClick'] = (e) => {
    const loginStatus = window.localStorage.getItem('login-status')
    const isLogged = loginStatus === 'true'
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
            items={itemsData}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Flex justify="space-between">
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <span onClick={handleLogout} className="logout-button" style={{margin: '16px 0px'}}>logout</span>
          </Flex>
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
