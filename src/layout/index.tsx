import { Layout } from 'antd';

import HeaderComponents from './header';
import SideBarComponents from './sidebar';
import ContentComponents from './content';

const LayoutComponents = () => {
  return (
    <Layout style={{ backgroundColor: '#000' }}>
      <HeaderComponents />
      <Layout>
        <SideBarComponents />
        <ContentComponents />
      </Layout>
    </Layout>
  );
};

export default LayoutComponents;
