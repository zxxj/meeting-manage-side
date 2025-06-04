import type React from 'react';
import { Button, Form, Input, Card, Table, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { list, remove } from '../../service/modules/meetingRoom';
import type { UserInfo } from '../../types/user';
import CustomModal from './custom-modal';

const MeetingRoom: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isShowCustomModal, setCustomModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [roomId, setRoomId] = useState();

  const onClose = () => {
    setCustomModal(false);
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '容量',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '设备',
      dataIndex: 'equipment',
      key: 'equipment',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '预定状态',
      dataIndex: 'isBooked',
      key: 'isBooked',
    },
    {
      title: '创建时间',
      dataIndex: 'creatTime',
      key: 'creatTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      render: (record: UserInfo) => {
        return (
          <div>
            <Button type="link" onClick={() => showModal(false, record.id)}>
              编辑
            </Button>
            <Button type="link" danger onClick={() => onDelete(record.id)}>
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  const onFinish = () => {
    getMeetingRoomList();
  };

  const getMeetingRoomList = async () => {
    const values = form.getFieldsValue();

    const res = await list({
      ...values,
      pageNum: pageNum,
      pageSize: pageSize,
    });

    setUserList(res.data.meetingRooms);
    setTotal(res.data.totalCount);
  };

  const handleReset = () => {
    form.resetFields();
    getMeetingRoomList();
  };

  const changePage = useCallback((pageNum: number, pageSize: number) => {
    setPageNum(pageNum);
    setPageSize(pageSize);
  }, []);

  const showModal = (type: boolean, roomId: any) => {
    if (!type) {
      setRoomId(roomId);
    }

    setIsAdd(type);
    setCustomModal(true);
  };

  const onDelete = async (id: number) => {
    try {
      const { code, data } = await remove(id);
      if (code === 200 || code === 201) {
        messageApi.success(data);
      } else {
        messageApi.warning(data);
      }
    } catch (error) {
      console.log(error);
    }

    getMeetingRoomList();
  };

  useEffect(() => {
    getMeetingRoomList();
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
          <Form.Item label="名称" name="name">
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="容量" name="capacity">
            <Input placeholder="请输入容量" />
          </Form.Item>
          <Form.Item label="位置" name="location">
            <Input placeholder="请输入位置" />
          </Form.Item>
          <Form.Item label="设备" name="equipment">
            <Input placeholder="请输入设备" />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input placeholder="请输入描述" />
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
        <div className="mb-4 flex justify-end">
          <Button type="primary" onClick={() => showModal(true, null)}>
            新增会议室
          </Button>
        </div>
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

      <CustomModal
        visible={isShowCustomModal}
        onClose={onClose}
        onAddSuccess={getMeetingRoomList}
        isAdd={isAdd}
        roomId={roomId}
      />
    </>
  );
};

export default MeetingRoom;
