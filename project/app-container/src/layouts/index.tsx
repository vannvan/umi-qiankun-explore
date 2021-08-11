import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from 'antd';
import { Link, history } from 'umi';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SlidersOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import './index.less';

import userStore from '@/store/user';
import { deleteUserInfo } from '@/store/user/actionCreators';

const MENU_LIST = require('./menu.js').default;

import action from '@/action';

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
    openKeys: [''],
    leftMenuList: [],
  };

  // 菜单折叠
  onOpenChange = (openKeys: React.Key[]) => {
    const latestOpenKey: React.Key | undefined = openKeys.find(
      (key: React.Key) => this.state.openKeys.indexOf(String(key)) > 0,
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

  // 菜单节点
  menuTag = function deep(menuData: Array<object>) {
    if (menuData && menuData.length > 0) {
      return menuData.map((item: any) => {
        if (item.children && item.children.length > 0) {
          return (
            <SubMenu key={item.id} title={item.name} icon={item.icon}>
              {deep(item.children)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.id} icon={item.icon}>
            <Link to={item.path} replace>
              {item.name}
            </Link>
          </Menu.Item>
        );
      });
    }
  };

  // 头部导航
  headerNav = (headerNav: Array<object>) => {
    if (headerNav && headerNav.length > 0) {
      return headerNav.map((el: any) => {
        // 过滤掉home
        if (el.name != 'home') {
          return (
            <Menu.Item
              key={el.id}
              icon={<SlidersOutlined />}
              onClick={() => this.handleChangeMicroApp(el)}
            >
              {el.name}
            </Menu.Item>
          );
        }
      });
    }
  };

  // 左侧菜单
  visibleLeftMenu = () => {
    return this.state.leftMenuList.length ? (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          selectedKeys={this.props.location.pathname}
        >
          {this.menuTag(this.state.leftMenuList)}
        </Menu>
      </Sider>
    ) : (
      ''
    );
  };

  // 切换微应用，并把页面切换至微应用第一个菜单
  handleChangeMicroApp = (appItem: IMenuType) => {
    this.setState({ leftMenuList: appItem.children });
    const microFirstMenu = appItem.children[0];
    history.push(microFirstMenu.path);

    // this.onOpenChange(microFirstMenu.id);
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

  // 一个更新全局state的方法
  handleUpdateGlobalState = () => {
    //更新token
    action.setGlobalState({
      globalLocation: {
        token: Math.random(),
      },
    });
    // 监听
    action.onGlobalStateChange((state: any, prev: any) => {
      // state: 变更后的状态; prev 变更前的状态
      console.log('父项目监听state变化', state.globalLocation, prev);
    });
  };

  render() {
    const { avatar } = userStore.getState() as any;
    return (
      <Layout className="app-container-content">
        <Header className="header">
          <div className="logo" onClick={() => history.push('/home')}>
            <img src={require('@/assets/images/logo-ww.png')} height={40} />
          </div>
          <Menu mode="horizontal" theme="dark">
            {this.headerNav(MENU_LIST)}
          </Menu>
          <Dropdown overlay={this.userOperation} trigger={['click']}>
            <span className="avatar-wrap">
              <Avatar src={avatar} />
            </span>
          </Dropdown>
        </Header>
        <Layout>
          {this.visibleLeftMenu()}
          <Layout>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
