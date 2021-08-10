/*
 * @Description:
 * @Date: 2021-08-09 15:50:34
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-09 15:51:08
 * --------
 * Copyright (c) github.com/vannvan
 */
export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: '@/pages/home/index',
    meta: { title: '首页' },
  },
  // 公共服务模块
  {
    name: 'app-common',
    path: '/common',
    microApp: 'app-common',
  },
  // 设备服务模块
  {
    name: 'app-device',
    path: '/device',
    microApp: 'app-device',
  },
  {
    path: '/exception',
    routes: [
      {
        path: '/exception/404',
        component: '@/pages/exception/404',
        meta: { title: '404' },
      },
    ],
  },
];
