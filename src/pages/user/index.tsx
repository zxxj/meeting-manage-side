import type React from 'react';
import { Button, Form, Input, Card, Table, Image, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { freezeUser, list } from '../../service/modules/user';
import type { UserInfo } from '../../types/user';

const User: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (value: string) => {
        return value ? (
          <Image width={50} src={`http://localhost:3000/${value}`} />
        ) : (
          ''
        );
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '注册时间',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '操作',
      render: (record: UserInfo) => (
        <Button type="link" onClick={() => freeze(record.id)}>
          {record.isFrozen ? '解冻' : '冻结'}
        </Button>
      ),
    },
  ];

  const onFinish = () => {
    getUserList();
  };

  const getUserList = async () => {
    const values = form.getFieldsValue();

    const res = await list({
      ...values,
      pageNum: pageNum,
      pageSize: pageSize,
    });

    setUserList(res.data.users);
    setTotal(res.data.totalCount);
  };

  const handleReset = () => {
    form.resetFields();
    getUserList();
  };

  const changePage = useCallback((pageNum: number, pageSize: number) => {
    setPageNum(pageNum);
    setPageSize(pageSize);
  }, []);

  const freeze = async (id: number) => {
    const { code } = await freezeUser(id);

    if (code === 201 || code === 200) {
      getUserList();
      await messageApi.success('冻结成功');
    } else {
      await messageApi.error('系统繁忙，请稍后再试');
    }
  };

  useEffect(() => {
    getUserList();
  }, [pageNum, pageSize]);

  return (
    <>
      {contextHolder}
      <Card>
        <Form
          layout="inline"
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 7, offset: 0 }}
        >
          <Form.Item label="用户名" name="username">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={handleReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card style={{ marginTop: '30px' }}>
        <Table
          dataSource={userList}
          columns={columns}
          style={{ maxHeight: '500px', overflowY: 'auto' }}
          pagination={{
            position: ['bottomCenter'],
            pageSize: pageSize,
            current: pageNum,
            onChange: changePage,
            total: total,
          }}
        />
      </Card>
    </>
  );
};

export default User;
