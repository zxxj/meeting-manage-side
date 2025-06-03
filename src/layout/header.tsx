import { Layout } from 'antd';
import HandleSDropdown from './components/handle-dropdown';

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
    >
      <div className="flex justify-between pl-8 pr-8">
        <div>标题</div>
        <div>
          <HandleSDropdown />
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponents;
