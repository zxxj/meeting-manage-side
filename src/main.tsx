import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@/styles/index.css';
import { router } from './router';
import { ConfigProvider, theme } from 'antd';
import { App } from 'antd';

createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: '#ffffff',
        colorText: '#ffffff',
        colorBgBase: '#000000',
        colorBorder: '#ffffff',
        colorPrimaryHover: '#ffffff',
        colorTextPlaceholder: '#888888',
        colorTextDisabled: '#555555',
      },
      components: {
        Button: {
          colorBgBase: '#000000', // 默认按钮背景色（普通按钮）
          colorText: '#ffffff', // 按钮文本颜色
          colorPrimary: '#000000', // 主要按钮（type="primary"）背景色
          colorPrimaryHover: '#222222', // 悬停时的颜色
          colorBorder: '#ffffff', // 边框颜色（适用于 ghost/outline 类型按钮）
        },
        Input: {
          colorBgContainer: '#000000',
          colorText: '#ffffff',
          colorBorder: '#ffffff',
          colorTextPlaceholder: '#888888',
        },
        Menu: {
          itemSelectedBg: '#222222',
          itemSelectedColor: '#ffffff', // 可选：选中时文字颜色
        },
      },
    }}
  >
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ConfigProvider>,
);
