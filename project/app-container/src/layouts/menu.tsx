/*
 * @Description:
 * @Date: 2020-10-22 21:28:00
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-17 17:30:12
 * --------
 * Copyright (c) github.com/vannvan
 */
import {
  HomeOutlined,
  SlidersOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import deviceMenuList from './deviceMenu';
import commonMenu from './commonMenu';
import React from 'react';
export default [
  { name: 'home', path: '/home', id: '1', icon: <HomeOutlined /> },
  {
    name: '设备管理',
    path: '/device',
    id: '2',
    appName: 'app-device',
    icon: <SlidersOutlined />,
    children: deviceMenuList,
  },
  {
    name: '数据中心',
    path: '/datum',
    id: '3',
    appName: 'app-datum',
    icon: <BarChartOutlined />,
    children: [],
  },
  {
    name: '智能监控',
    path: '/monitor',
    id: '4',
    appName: 'app-monitor',
    icon: <AreaChartOutlined />,
    children: [],
  },
  {
    name: '系统设置',
    path: '/common',
    id: '5',
    appName: 'app-common',
    icon: <SettingOutlined />,
    children: commonMenu,
  },
];
