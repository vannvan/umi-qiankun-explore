import React, { useState, useEffect, Key, useRef } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from 'antd';
import { Link, history, MicroApp } from 'umi';
import storage from '@/utils/storage';
import { loadMicroApp } from 'qiankun';
import { deleteUserInfo } from '@/store/user/actionCreators';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import userStore from '@/store/user';

import MENU_LIST from './menu';
import action from '@/action';
import './index.less';

interface IMenuType {
  name: string;
  path: string;
  appName: string;
  entry: string;
  id: string;
  manual: boolean;
  [propName: string]: any;
}

export default function BasicLayout(props: any) {
  //头部选中
  const [headerSelected, setHeaderSelected] = useState<IMenuType>();

  //左侧菜单展开项
  const [openKeys, setOpenKeys] = useState<Key[]>([]);

  //左侧菜单选中项
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  //左侧菜单列表
  const [leftMenuList, setLeftMenuList] = useState<Array<IMenuType>>([]);

  //当前微应用
  const [currentMicroApp, setCurrentMicroApp] = useState<string>('');

  const containerRef = useRef();

  useEffect(() => {
    const storageMenu = storage.session.get('leftMenuList') as any;

    if (storageMenu && storageMenu.length) {
      setLeftMenuList(storageMenu);
    }

    setOpenKeys(storage.session.get('openKeys') as any);
    setSelectedKeys(storage.session.get('selectedKeys') as any);
  }, []);

  // 左侧菜单折叠
  const onOpenChange = (openKeys: Key[]) => {
    setOpenKeys(openKeys);
    storage.session.set('openKeys', openKeys);
  };

  // 左侧菜单选中
  const handleSelectChange = ({ item, selectedKeys }: any) => {
    setSelectedKeys(selectedKeys);
    storage.session.set('selectedKeys', selectedKeys);
  };

  // 左侧菜单节点
  const menuTag = function deep(menuData: Array<object>) {
    if (menuData && menuData.length > 0) {
      return menuData.map((item: any) => {
        if (item.children && item.children.length > 0) {
          return (
            <SubMenu key={String(item.id)} title={item.name}>
              {deep(item.children)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={String(item.id)}>
            <Link to={item.path} replace>
              {item.name}
            </Link>
          </Menu.Item>
        );
      });
    }
  };

  // 左侧菜单
  const visibleLeftMenu = () => {
    return leftMenuList.length ? (
      <Sider trigger={null} collapsible>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={selectedKeys as string[]}
          openKeys={openKeys as string[]}
          onOpenChange={onOpenChange}
          onSelect={handleSelectChange}
        >
          {menuTag(leftMenuList)}
        </Menu>
      </Sider>
    ) : (
      ''
    );
  };

  // 头部导航
  const headerNav = (headerNav: Array<object>) => {
    if (headerNav && headerNav.length > 0) {
      return headerNav.map((el: any) => {
        // 过滤掉home
        if (el.name != 'home') {
          return (
            <Menu.Item key={el.id} icon={el.icon}>
              {el.name}
            </Menu.Item>
          );
        }
      });
    }
  };

  // 切换微应用，并把页面切换至微应用第一个菜单
  const handleChangeMicroApp = ({ key }: any) => {
    // 更新头部选中项
    const microApp = MENU_LIST.find((item) => item.id == key) as IMenuType;
    if (microApp.manual) {
      const { appName, entry } = microApp;
      loadMicroApp({
        name: appName,
        entry: entry,
        container: '#ManualNode',
      });
    } else {
      setCurrentMicroApp(microApp.appName);
    }
    // 头部
    setHeaderSelected(microApp);
    // 左侧
    setLeftMenuList(microApp?.children);
    // 找到当前目标应用第一项菜单
    const microFirstMenu = microApp ? microApp.children[0] : {};
    microFirstMenu && history.push(microFirstMenu.path);
    // 选中第一项菜单
    setSelectedKeys(microFirstMenu?.id);
    setOpenKeys([]);
    storage.session.set('leftMenuList', microApp.children);
  };

  // 用户信息及操作
  const userOperation = () => {
    const { userName } = userStore.getState() as any;
    return (
      <Menu style={{ width: 112 }}>
        <Menu.Item key="1" onClick={() => history.push('/common/user')}>
          {userName}
        </Menu.Item>
        <Menu.Item key="2" onClick={handleLogout}>
          退出
        </Menu.Item>
      </Menu>
    );
  };

  // 退出操作
  const handleLogout = () => {
    const logoutAction = deleteUserInfo();
    userStore.dispatch(logoutAction);
    history.push('/login');
    sessionStorage.clear();
  };

  // 回到首页
  const handleGoHome = () => {
    history.push('/home');
    //清除左侧菜单
    setLeftMenuList([]);
    setHeaderSelected(undefined);
    // 清除微应用
    setCurrentMicroApp('');
  };

  // 加载微应用
  const shouldLoadMicroApp = () => {
    return currentMicroApp ? (
      <MicroApp
        name={currentMicroApp}
        // autoSetLoading={true}
        // 微应用容器 class
        className="micro-app-wrapper"
        // wrapper class，仅开启 loading 动画时生效
        wrapperClassName="micro-wrapper-loadding"
      />
    ) : (
      ''
    );
  };

  // 一个更新全局state的方法
  const handleUpdateGlobalState = () => {
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

  const { avatar } = userStore.getState() as any;
  return (
    <Layout className="app-container-content">
      <Header className="header">
        <div className="logo" onClick={handleGoHome}>
          <img src={require('@/assets/images/logo-ww.png')} height={40} />
        </div>
        <Menu
          mode="horizontal"
          theme="dark"
          style={{ width: '80%' }}
          onSelect={handleChangeMicroApp}
          selectedKeys={[headerSelected?.id] as unknown as string[]}
        >
          {headerNav(MENU_LIST)}
        </Menu>
        <Dropdown overlay={userOperation} trigger={['click']}>
          <span className="avatar-wrap">
            <Avatar src={avatar} />
          </span>
        </Dropdown>
      </Header>
      <Layout>
        {visibleLeftMenu()}
        <Layout>
          <Content className="site-layout-background">
            {!headerSelected?.manual && (
              <>
                {shouldLoadMicroApp()}
                {props.children}
              </>
            )}
            <div id="ManualNode"></div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
