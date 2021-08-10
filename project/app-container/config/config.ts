/*
 * @Description:
 * @Date: 2021-08-06 15:56:01
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-09 15:56:28
 * --------
 * Copyright (c) github.com/vannvan
 */
import { defineConfig } from 'umi';
import routes from './routes';
import microApp from './qiankun';

export default defineConfig({
  dva: {},
  qiankun: microApp,
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
      routes: routes,
    },
  ],
});
