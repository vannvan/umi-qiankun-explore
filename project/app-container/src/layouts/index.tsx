import React, { Component } from 'react';

// import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import './index.less';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from 'antd';
import { Link, history } from 'umi';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import userStore from '@/store/user';
import { deleteUserInfo } from '@/store/user/actionCreators';

const MENU_LIST = require('./menu.js').default;

interface IMenuType {
  name: string;
  path: string;
  [propName: string]: any;
}

export default class BasicLayout extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  rootSubmenuKeys = MENU_LIST.map((el: IMenuType) => el.path);

  state = {
    collapsed: false,
    openKeys: [],
  };

  onOpenChange = (openKeys: React.Key[]) => {
    const latestOpenKey: React.Key | undefined = openKeys.find(
      (key: React.Key) => this.state.openKeys.indexOf(String(key)) === -1,
    );
    console.log('latestOpenKey', latestOpenKey);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  componentDidMount() {
    this.rootSubmenuKeys.map((el: string) => {
      let { pathname } = this.props.location;
      let reg = new RegExp(el);
      if (reg.test(pathname)) {
        this.setState({
          openKeys: [el],
        });
      }
    });
  }

  componentDidUpdate() {
    let currentPathName = this.props.location.pathname;
    let routeList = this.props.route.routes;
    try {
      let matchRouteMeta = routeList.find((el: any) => {
        return el.path == currentPathName;
      }).meta;
      document.title = matchRouteMeta
        ? matchRouteMeta.title
        : 'React.js MicroApp';
    } catch (error) {
      console.warn(error);
      document.title = 'React.js MicroApp';
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleLogout = () => {
    const logoutAction = deleteUserInfo();
    userStore.dispatch(logoutAction);
    history.push('/login');
  };

  menuTag = function deep(menuData: Array<object>) {
    if (menuData && menuData.length > 0) {
      return menuData.map((item: any) => {
        if (item.children && item.children.length > 0) {
          return (
            <SubMenu key={item.path} title={item.name} icon={item.icon}>
              {deep(item.children)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.path} icon={item.icon}>
            <Link to={item.path} replace>
              {item.name}
            </Link>
          </Menu.Item>
        );
      });
    }
  };

  // 用户信息及操作
  userOperation = () => {
    const { userName } = userStore.getState() as any;
    return (
      <Menu style={{ width: 112 }}>
        <Menu.Item key="1">{userName}</Menu.Item>
        <Menu.Item key="2" onClick={this.handleLogout}>
          退出
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const { avatar } = userStore.getState() as any;
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img src={require('@/assets/images/logo.png')} height={40} />
            <span>{!this.state.collapsed ? 'React.js MicroApp' : ''}</span>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            selectedKeys={this.props.location.pathname}
          >
            {this.menuTag(MENU_LIST)}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: this.toggle,
              },
            )}
            <Breadcrumb style={{ margin: '16px' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Dropdown overlay={this.userOperation} trigger={['click']}>
              <span className="avatar-wrap">
                <Avatar src={avatar} />
              </span>
            </Dropdown>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
