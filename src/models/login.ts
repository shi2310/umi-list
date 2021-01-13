import { Effect, Reducer, Subscription, history } from 'umi';
import { message } from 'antd';
import { login, logout } from '@/services/login';

const namespace = 'login';
export const namespace_login = namespace;

interface ModelState {
  userInfo: object;
}

interface ModelsType {
  namespace: typeof namespace;
  state: ModelState;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    save: Reducer<ModelState>;
  };
  subscriptions: { setup: Subscription };
}

const LoginModel: ModelsType = {
  namespace,
  state: {
    userInfo: {},
  },
  effects: {
    // 异步
    *login({ payload }, { call, put }) {
      const response = yield call(login, { ...payload });
      if (response.status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            userInfo: response.data,
          },
        });
        message.success('登录成功！');
        history.replace('/');
      } else {
        message.error('登录失败！');
      }
    },
    *logout(_, { call }) {
      const response = yield call(logout);
      if (response.status === 'ok') {
        history.replace({
          pathname: '/login',
          search: `timestamp=${new Date().getTime()}`,
        });
      }
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
  subscriptions: {
    // 监听路由变化，鼠标，键盘变化，服务器连接变化，状态变化等
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          console.log(111);
        }
      });
    },
  },
};

export default LoginModel;
