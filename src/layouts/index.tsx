import React from 'react';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
import { Link } from 'umi';
import styles from './index.less';

const menuData = [
  { route: 'user', name: '用户管理' },
  { route: 'hero', name: '英雄' },
];

function BasicLayout(props: any) {
  //从属性中取出当前的路由
  const {
    location: { pathname },
    children,
  } = props;

  return (
    <Layout>
      <Header>
        <div className={styles.logo}>Todo List</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          style={{ lineHeight: '64px' }}
        >
          {menuData.map((menu) => (
            <Menu.Item key={`/${menu.route}`}>
              <Link to={menu.route}>{menu.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 300 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>copyright arrow</Footer>
    </Layout>
  );
}

export default BasicLayout;
