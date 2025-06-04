import React from 'react';
import { Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    localStorage.clear();
    navigate('/login');
    messageApi.success('已退出登录~');
  };
  return (
    <>
      <Modal
        destroyOnHidden
        title="注销"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={visible}
        onOk={handleOk}
        onCancel={onClose}
        footer={[
          <>
            <Button>关闭</Button>
            <Button type="primary" onClick={handleOk}>
              确定
            </Button>
          </>,
        ]}
      >
        确定要退出登录吗?
      </Modal>
    </>
  );
};

export default LogoutModal;
