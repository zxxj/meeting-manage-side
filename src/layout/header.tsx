import { Layout } from 'antd';

const { Header } = Layout;

const HeaderComponents = () => {
  return (
    <Header
      style={{
        padding: 0,
        background: 'rgba(34, 34, 34, 0.6)',
        color: '#fff',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    ></Header>
  );
};

export default HeaderComponents;
