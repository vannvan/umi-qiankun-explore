/*
 * @Description:
 * @Date: 2021-08-06 12:00:47
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-09 11:55:59
 * --------
 * Copyright (c) github.com/vannvan
 */
import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  qiankun: {
    slave: {},
  },
});
