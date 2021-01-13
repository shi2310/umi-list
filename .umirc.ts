import { defineConfig } from 'umi';

export default defineConfig({
  // 设置 node_modules 目录下依赖文件的编译方式
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'Umi TodoList',
  hash: true,
  antd: {},
  dva: {
    // immer: true,
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
});
