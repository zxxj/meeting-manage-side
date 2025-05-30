import { ConfigProvider, theme } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#ffffff', // 全局主色
          colorBorder: '#ffffff', // 普通边框颜色
          colorPrimaryHover: '#ffffff', // hover 主题色
        },

        // 2. 组合使用暗色算法与紧凑算法
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      {/* <Space>
        <Input placeholder="Please Input" />
        <Button>Submit</Button>
      </Space> */}
    </ConfigProvider>
  );
}

export default App;
