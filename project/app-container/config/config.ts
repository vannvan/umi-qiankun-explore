/*
 * @Description:
 * @Date: 2021-08-06 15:56:01
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-09 11:40:26
 * --------
 * Copyright (c) github.com/vannvan
 */
import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app-common', // 公共服务
          entry: '//localhost:8002',
          // 子应用通过钩子函数的参数props可以拿到这里传入的值
          props: {
            token: 'XXXXXXX',
          },
        },
        {
          name: 'app-device', // 设备服务
          entry: '//localhost:8001',
          // 子应用通过钩子函数的参数props可以拿到这里传入的值
          props: {
            token: 'XXXXXXX',
          },
        },
      ],
      jsSandbox: true, // 是否启用 js 沙箱，默认为 false
      prefetch: true, // 是否启用 prefetch 特性，默认为 true
    },
  },
  // layout: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/login/login' },
    {
      path: '/',
      component: '@/layouts/index',
      wrappers: ['./PrivateRoute'],
      routes: [
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
      ],
    },
  ],
});
