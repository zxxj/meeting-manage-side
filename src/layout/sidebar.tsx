import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const SideBarComponents = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: 'user',
      icon: React.createElement(UserOutlined),
      label: '用户管理',
    },
  ];

  const handleClick = (item: any) => {
    navigate(`/${item.key}`);
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ backgroundColor: '#000', height: 'calc(100vh - 64px)' }}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        className="h-full"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{
          backgroundColor: 'rgba(34, 34, 34, 0.6)',
          color: '#fff',
          borderRight: 'none',
        }}
        onClick={handleClick}
      />
    </Sider>
  );
};

export default SideBarComponents;
