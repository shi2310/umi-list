import { Effect, Reducer, Subscription, request } from 'umi';
import { getHeros } from '@/services/hero';

const namespace = 'hero';

interface HeroProps {
  ename: number;
  cname: string;
  title: string;
  new_type: number;
  hero_type: number;
  skin_name: string;
}

export interface HeroModelState {
  heros: HeroProps[];
  filterKey: number;
}

export interface HeroModelType {
  namespace: string;
  state: HeroModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<HeroModelState>;
  };
  subscriptions: { setup: Subscription };
}

const HeroModel: HeroModelType = {
  namespace,
  state: {
    heros: [],
    filterKey: 0,
  },
  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      const data = yield call(getHeros);
      yield put({
        type: 'save',
        payload: {
          heros: data,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hero') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default HeroModel;
