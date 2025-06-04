import React, { useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  type FormProps,
  // Image,
  message,
} from 'antd';
import {
  getUserInfoById,
  captchaPassword,
  updatePassword,
} from '@/service/modules/user';

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FieldType {
  username: string;
  password: string;
  repassword: string;
  email: string;
  captcha: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  visible,
  onClose,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  // 初始化表单实例
  const [form] = Form.useForm();

  const handleOk = () => {
    // 触发表单提交
    form.submit();
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);

    if (values.password !== values.repassword) {
      return messageApi.warning('两次密码输入不一致!');
    }

    const { code, data } = await updatePassword(values);
    if (code === 201 || code === 200) {
      messageApi.success(data);
      onClose();
    } else {
      messageApi.success(data);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const getUserInfo = async () => {
    const res = await getUserInfoById();
    form.setFieldsValue({ ...res.data });
  };

  const sendCapcha = async () => {
    const { code, data } = await captchaPassword();

    if (code === 201 || code === 200) {
      messageApi.success(data);
    } else {
      messageApi.success(data);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [visible]);
  return (
    <>
      {contextHolder}
      <Modal
        destroyOnHidden
        title="修改密码"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={visible}
        onOk={handleOk}
        onCancel={onClose}
        footer={[
          <>
            <Button onClick={onClose}>关闭</Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              form="userInfoForm"
            >
              确定
            </Button>
          </>,
        ]}
      >
        <Form
          id="userInfoForm"
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password"
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="repassword"
            rules={[{ required: true, message: '请再次输入密码!' }]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="captcha"
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <div className="flex">
              <Input />
              <Button className="ml-3" onClick={sendCapcha}>
                发送验证码
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
