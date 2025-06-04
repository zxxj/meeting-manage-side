import { Form, Modal, type FormProps, Input, Button, message } from 'antd';
import type React from 'react';
import { create } from '@/service/modules/meetingRoom';
import { useEffect } from 'react';
import { findRoomById, update } from '../../service/modules/meetingRoom';

interface CustomModalProps {
  visible: boolean;
  isAdd: boolean;
  roomId: number;
  onClose: () => void;
  onAddSuccess: () => void;
}

interface FieldType {
  id?: number;
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  isAdd,
  roomId,
  onClose,
  onAddSuccess,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (isAdd) {
      try {
        const { code, data } = await create(values);

        if (code === 200 || code === 201) {
          messageApi.success(data);
          onAddSuccess();
          onClose();
        } else {
          messageApi.warning(data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        values.id = roomId as number;
        const { code, data } = await update(values);

        if (code === 200 || code === 201) {
          messageApi.success(data);
          onAddSuccess();
          onClose();
        } else {
          messageApi.warning(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const findById = async () => {
    try {
      const { data } = await findRoomById(roomId);
      form.setFieldsValue({ ...data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.resetFields();
    if (!isAdd) {
      console.log(roomId);
      findById();
    }
  }, [isAdd, visible]);

  return (
    <>
      {contextHolder}
      <Modal
        destroyOnHidden
        open={visible}
        onCancel={onClose}
        footer={[
          <>
            <Button onClick={onClose}>关闭</Button>
            <Button key="submit" type="primary" htmlType="submit" form="form">
              确定
            </Button>
          </>,
        ]}
      >
        <Form
          id="form"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="会议室名称"
            name="name"
            rules={[{ required: true, message: '请输入会议室名称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="会议室容量"
            name="capacity"
            rules={[{ required: true, message: '请输入会议室容量!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="会议室位置"
            name="location"
            rules={[{ required: true, message: '请输入会议室位置!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="会议室设备"
            name="equipment"
            rules={[{ required: true, message: '请输入会议室设备!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="会议室描述"
            name="description"
            rules={[{ required: true, message: '请输入会议室描述!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomModal;
