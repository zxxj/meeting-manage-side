import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Card, message } from 'antd';
import { login } from '@/service/modules/user';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const { code, data } = await login(values);
      if (code !== 200 && code !== 201) {
        return await messageApi.warning(data);
      }

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user_info', JSON.stringify(data.userInfo));
      await messageApi.success('登录成功!');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{ backgroundColor: '#141414' }}
    >
      {contextHolder} {/* ✅ 记得加 */}
      <Card className="w-1/5">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" className="w-full">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
