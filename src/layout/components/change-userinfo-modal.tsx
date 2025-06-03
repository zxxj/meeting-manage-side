import React, { useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  type FormProps,
  Image,
  message,
} from 'antd';
import { getUserInfoById } from '@/service/modules/user';
import { captcha, update } from '../../service/modules/user';

interface ChangeUserInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FieldType {
  avatar: string;
  username: string;
  nickname: string;
  email: string;
  captcha: string;
  phoneNumber: string;
}

const ChangeUserInfoModal: React.FC<ChangeUserInfoModalProps> = ({
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

    const { code, data } = await update(form.getFieldsValue());
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
    const { code, data } = await captcha();

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
        title="修改用户信息"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={visible}
        onOk={handleOk}
        onCancel={onClose}
        footer={[
          <>
            <Button>关闭</Button>
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="头像"
            name="avatar"
            rules={[{ required: true, message: '请上传头像!' }]}
          >
            <Image
              width={100}
              src={`http://localhost:3000/${form.getFieldValue('avatar')}`}
            />
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: '请输入昵称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phoneNumber"
            rules={[{ required: true, message: '请输入手机号!' }]}
          >
            <Input />
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

export default ChangeUserInfoModal;
