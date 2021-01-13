import React, { useEffect, FC } from 'react';
import { Modal, Radio, Form, Input, message, DatePicker, Switch } from 'antd';
import { User, FormValues } from '../data.d';
import moment from 'moment';

interface UserModalProps {
  visible: boolean;
  record: User | undefined;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const UserModal: FC<UserModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, record, closeHandler, onFinish, confirmLoading } = props;

  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        ...record,
        sex: String(record.sex),
        create_time: moment(record.create_time),
        status: Boolean(record.status),
      });
    }
  }, [visible]);

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  return (
    <div>
      <Modal
        title={record ? 'Edit ID: ' + record.id : 'Add'}
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            status: true,
          }}
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="sex" label="性别">
            <Radio.Group>
              <Radio value="0">未知</Radio>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="创建时间" name="create_time">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch checkedChildren="正常" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
