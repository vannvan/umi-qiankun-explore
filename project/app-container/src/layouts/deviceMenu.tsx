/*
 * @Description:
 * @Date: 2021-08-11 16:23:58
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-11 16:44:50
 * --------
 * Copyright (c) github.com/vannvan
 */
import React from 'react';
import { InteractionOutlined } from '@ant-design/icons';
export default [
  {
    name: '设备XX',
    id: 5,
    path: '/device',
    icon: <InteractionOutlined />,
    children: [
      {
        name: '设备管理',
        path: '/device',
        id: 51,
      },
    ],
  },
  {
    name: '设备管理',
    id: 6,
    path: '/device',
    icon: <InteractionOutlined />,
    children: [
      { name: '公共模块', path: '/device', id: 61 },
      {
        name: '设备管理',
        path: '/device',
        id: 62,
      },
    ],
  },
];
