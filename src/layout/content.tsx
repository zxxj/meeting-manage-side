import { Layout, theme } from 'antd';

const { Content } = Layout;
import { Outlet } from 'react-router-dom';

const ContentComponents = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      style={{
        margin: '24px 16px 0',
        overflowY: 'hidden',
        height: 'calc(100vh - 130px)',
      }}
    >
      <div
        style={{
          padding: 24,
          minHeight: 800,
          background: 'rgba(34, 34, 34, 0.6)',
          color: '#fff',
          borderRadius: borderRadiusLG,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <Outlet />
      </div>
    </Content>
  );
};

export default ContentComponents;
