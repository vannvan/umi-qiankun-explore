/*
 * @Description:
 * @Date: 2021-08-11 16:23:58
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-14 18:06:17
 * --------
 * Copyright (c) github.com/vannvan
 */
import React from 'react';
import { InteractionOutlined, SlidersOutlined } from '@ant-design/icons';
export default [
  {
    name: '设备总览',
    id: '20',
    path: '/device/overview',
    icon: <SlidersOutlined />,
  },
  {
    name: '摄像头 ',
    id: '21',
    path: '/device',
    icon: <InteractionOutlined />,
    children: [
      {
        name: '设备管理',
        path: '/device/camara',
        id: '211',
      },
    ],
  },
  {
    name: '云盒',
    id: '22',
    path: '/device',
    icon: <InteractionOutlined />,
    children: [
      {
        name: '云盒列表',
        path: '/device/cloudBox',
        id: '221',
      },
    ],
  },
];
