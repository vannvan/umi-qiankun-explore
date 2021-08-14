/*
 * @Description:
 * @Date: 2021-08-11 16:45:52
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-14 17:56:01
 * --------
 * Copyright (c) github.com/vannvan
 */
import React from 'react';
import { InteractionOutlined, UserOutlined } from '@ant-design/icons';
export default [
  {
    name: '个人资料',
    id: '20',
    path: '/common/user',
    icon: <UserOutlined />,
  },
  {
    name: '系统管理',
    id: '21',
    path: '/common/',
    icon: <InteractionOutlined />,
    children: [
      {
        name: '员工管理',
        id: '211',
        path: '/common/member',
      },
      {
        name: '权限管理',
        id: '212',
        path: '/common/roles',
      },
    ],
  },
];
