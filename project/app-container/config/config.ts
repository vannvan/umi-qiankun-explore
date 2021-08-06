import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app-common', // 唯一 id
          entry: '//localhost:8002', // html entry
          // 子应用通过钩子函数的参数props可以拿到这里传入的值
          props: {
            token: 'XXXXXXX',
          },
        },
        {
          name: 'child2', // 唯一 id
          entry: '//localhost:8001', // html entry
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
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/home',
          component: '@/pages/home/index',
          meta: { title: '首页' },
          Routes: ['./route/praviteRoute.tsx'],
        },
        {
          name: 'app-common',
          icon: 'smile',
          path: '/app-common',
          microApp: 'app-common',
        },
      ],
    },
  ],
});
