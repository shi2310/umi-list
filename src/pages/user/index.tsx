import React, { useEffect, FC, useState } from 'react';
import { Table, Popconfirm, message, Space, Button, Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TablePaginationConfig } from 'antd/lib/table';
import { connect, Dispatch, Loading, ModelState } from 'umi';
import { User, FormValues } from './data.d';
import { PageType } from '../../services/page.d';
import UserModal from './components/UserModal';

interface _connectprops {
  dispatch: Dispatch;
  userList: User[];
  user: User;
  pager: PageType;
  userLoading: boolean;
}

const UserListPage: FC<_connectprops> = ({
  userList,
  user,
  pager,
  userLoading,
  dispatch,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<User | undefined>(undefined);

  const getList = (pager: PageType, name: string) => {
    dispatch({
      type: 'user/getList',
      payload: {
        pager,
        name,
      },
    });
  };

  // 仅在挂载时触发
  useEffect(() => {
    getList(
      {
        limit: 0,
        offset: 10,
      },
      '测试',
    );
  }, []);

  const columns: ColumnsType<User> = [
    {
      title: '主键',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (v: number) => ['未知', '男', '女'][v],
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v: number) => ['禁用', '正常'][v],
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: User) => (
        <Space split={<Divider type="vertical" />}>
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="确定删除?"
            onConfirm={() => {
              deleteHandler(record.id);
            }}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const paginationHandler = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any,
  ) => {
    const pageSize = pagination.pageSize || 10;
    const current = pagination.current || 1;

    getList(
      {
        limit: (current - 1) * pageSize,
        offset: pageSize,
      },
      '',
    );
  };

  // 添加用户
  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined);
  };

  // 编辑用户
  const editHandler = (record: User) => {
    setModalVisible(true);
    setRecord(record);
  };

  // 删除用户
  const deleteHandler = async (id: number) => {
    const res = await dispatch({
      type: 'user/delete',
      payload: {
        id,
      },
    });
    if (res) {
      message.success('删除成功');
    } else {
      message.error('删除失败');
    }
  };

  // 关闭对话框
  const closeHandler = () => {
    setModalVisible(false);
  };

  const onFinish = async (values: FormValues) => {
    setConfirmLoading(true);
    let id = 0;
    if (record) {
      id = record.id;
    }
    let action;
    let ch = '';
    if (id) {
      action = 'user/edit';
      ch = '编辑';
    } else {
      action = 'user/add';
      ch = '添加';
    }

    const result = await dispatch({
      type: action,
      payload: { id, ...values },
    });

    if (result) {
      setModalVisible(false);
      message.success(`${ch}成功.`);
    } else {
      message.error(`${ch}失败`);
    }
    setConfirmLoading(false);
  };

  return (
    <>
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <Button type="primary" onClick={addHandler}>
          添加
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={userList}
        pagination={pager}
        loading={userLoading}
        rowKey={(record) => record.id}
        onChange={paginationHandler}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      ></UserModal>
    </>
  );
};

const mapStateToProps = ({
  user, // 必须为model的同名namespace
  loading,
}: {
  user: ModelState;
  loading: Loading;
}) => ({
  userList: user.userList,
  pager: user.pager,
  user: user.user,
  userLoading: loading.models.user,
});

export default connect(mapStateToProps)(UserListPage);
