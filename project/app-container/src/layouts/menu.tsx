/*
 * @Description:
 * @Date: 2020-10-22 21:28:00
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-12 14:15:43
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
    icon: <SlidersOutlined />,
    children: deviceMenuList,
  },
  {
    name: '数据中心',
    path: '/datum',
    id: '3',
    icon: <BarChartOutlined />,
    children: [],
  },
  {
    name: '智能监控',
    path: '/monitor',
    id: '4',
    icon: <AreaChartOutlined />,
    children: [],
  },
  {
    name: '系统设置',
    path: '/common',
    id: '5',
    icon: <SettingOutlined />,
    children: commonMenu,
  },
];
