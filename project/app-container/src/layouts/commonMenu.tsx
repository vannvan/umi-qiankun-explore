/*
 * @Description:
 * @Date: 2021-08-11 16:45:52
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-11 16:46:47
 * --------
 * Copyright (c) github.com/vannvan
 */
import React from 'react';
import { InteractionOutlined } from '@ant-design/icons';
export default [
  {
    name: '系统管理',
    id: 1,
    path: '/common',
    icon: <InteractionOutlined />,
    children: [
      {
        name: '用户中心',
        path: '/common',
        id: 11,
      },
    ],
  },
];
