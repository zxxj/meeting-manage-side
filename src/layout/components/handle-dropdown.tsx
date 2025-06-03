import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, type MenuProps } from 'antd';
import type React from 'react';
import { useState } from 'react';
import ChangeUserInfoModal from './change-userinfo-modal';
import ChangePasswordModal from './change-password-modal';

const HandleSelect: React.FC = () => {
  const [isShowUserInfoModal, setIsShowUserInfoModal] = useState(false);
  const [isShowPasswordMidal, setIsShowPasswordMidal] = useState(false);

  const onClose = () => {
    setIsShowUserInfoModal(false);
    setIsShowPasswordMidal(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '修改资料',
    },
    {
      key: '2',
      label: '修改密码',
      icon: <SmileOutlined />,
    },
    {
      key: '3',
      danger: true,
      label: '退出登录',
    },
  ];

  const onOpenChange: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') setIsShowUserInfoModal(true);
    if (key === '2') setIsShowPasswordMidal(true);
  };

  return (
    <>
      <Dropdown menu={{ items, onClick: onOpenChange }}>
        <a onClick={(e) => e.preventDefault()} style={{ color: '#fff' }}>
          Hover me
          <DownOutlined />
        </a>
      </Dropdown>

      <ChangeUserInfoModal visible={isShowUserInfoModal} onClose={onClose} />
      <ChangePasswordModal visible={isShowPasswordMidal} onClose={onClose} />
    </>
  );
};

export default HandleSelect;
