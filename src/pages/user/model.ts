import { Reducer, Effect, Subscription } from 'umi';
import {
  getUsers,
  getUser,
  AddUser,
  EditUser,
  DeleteUser,
} from '@/services/user';
import _ from 'lodash';
import { User } from './data.d';
import { PageType } from '../../services/page';

const namespace = 'user';

export interface ModelState {
  pager: PageType;
  userList: User[];
  user: User;
}

interface ModelType {
  namespace: typeof namespace;
  state: ModelState;
  reducers: {
    save: Reducer<ModelState>;
  };
  effects: {
    getList: Effect;
    getInfo: Effect;
    add: Effect;
    edit: Effect;
    delete: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: ModelType = {
  namespace,
  state: {
    userList: [],
    pager: {
      limit: 0,
      offset: 0,
      total: 0,
    },
    user: {
      id: 0,
      name: '',
      pwd: '',
      sex: 0,
      create_time: '',
      status: true,
    },
  },
  reducers: {
    // 同步
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *getList({ payload: { pager, name } }, { put, call }) {
      const data = yield call(getUsers, { pager, name });
      if (data) {
        const userList = data.List;
        pager.total = data.TotalCount;
        yield put({
          type: 'save',
          payload: { userList, pager },
        });
        return true;
      }
      return false;
    },
    *getInfo({ payload: { id } }, { put, call }) {
      const data = yield call(getUser, id);
      if (data) {
        yield put({
          type: 'save',
          payload: { user: data },
        });
        return true;
      }
      return false;
    },
    *delete({ payload: { id } }, { put, call }) {
      const data = yield call(DeleteUser, id);
      if (data) {
        return true;
      } else {
        return false;
      }
    },
    *add({ payload }, { put, call, select }) {
      const data = yield call(AddUser, { ...payload });
      if (data) {
        return true;
      } else {
        return false;
      }
    },
    *edit({ payload }, { put, call, select }) {
      const data = yield call(EditUser, { ...payload });
      if (data) {
        // const { userList } = yield select((state: any) => state.userList);
        // _.each(userList, (o, i) => {
        //   if (o.id === data.id) {
        //     o = data;
        //     return;
        //   }
        // });
        // yield put({
        //   type: 'save',
        //   payload: { userList },
        // });
        return true;
      } else {
        return false;
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getList',
            payload: {
              page: 1,
              per_page: 5,
            },
          });
        }
      });
    },
  },
};

export default UserModel;
