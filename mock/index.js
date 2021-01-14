import mockjs, { Random } from 'mockjs';
import _ from 'lodash';
import herolist from './herolist.json';

const user = {
  id: '@natural',
  name: '@word',
  pwd: '@word',
  sex: '@integer(0, 2)',
  create_time: '@datetime',
  status: '@integer(0, 1)',
};

export default {
  'GET /api/users': (req, res) => {
    const { name, page, size } = req.query;
    console.log('mock', name, page, size);
    const List = [];
    for (let i = 0; i < size; i++) {
      List.push(mockjs.mock(user));
    }
    const data = {
      List,
      TotalCount: 45,
    };
    setTimeout(() => {
      res.send(data);
    }, 1000);
  },
  'GET /api/user': (req, res) => {
    const { id } = req.query;
    if (id) {
      res.send(mockjs.mock(user));
    } else {
      res.status(400).send('id is missing!');
    }
  },
  'PUT /api/user': (req, res) => {
    const { id, name, sex, create_time, status } = req.body;
    console.log('修改', id, name);
    if (id && name) {
      res.send({ id, name, sex, create_time, status });
    } else {
      res.status(400).send('id is missing!');
    }
  },
  'POST /api/user': (req, res) => {
    const { id, name, sex, create_time, status } = req.body;
    console.log('添加', id, name);
    if (name) {
      res.send({ id, name, sex, create_time, status });
    } else {
      res.status(400).send('id is missing!');
    }
  },
  'DELETE /api/user': (req, res) => {
    const { id } = req.query;
    console.log('删除', id);
    if (id) {
      res.send(true);
    } else {
      res.status(400).send('id is missing!');
    }
  },

  '/api/herolist.json': herolist,
};
