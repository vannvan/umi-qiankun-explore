/*
 * @Description:
 * @Date: 2021-08-06 12:00:47
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-14 18:04:55
 * --------
 * Copyright (c) github.com/vannvan
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/overview', component: '@/pages/index' }],
  qiankun: {
    slave: {},
  },
});
