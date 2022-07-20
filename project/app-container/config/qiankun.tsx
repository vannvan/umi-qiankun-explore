/*
 * @Description:
 * @Date: 2021-08-09 15:52:02
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-17 17:29:00
 * --------
 * Copyright (c) github.com/vannvan
 */
export default {
  // 注册子应用信息
  master: {
    apps: [
      {
        name: 'app-common', // 公共服务
        entry: '//localhost:6002',
        // 子应用通过钩子函数的参数props可以拿到这里传入的值
        props: {
          token: 'XXXXXXX',
        },
      },
      {
        name: 'app-device', // 设备服务
        entry: '//localhost:6004',
        // 子应用通过钩子函数的参数props可以拿到这里传入的值
        props: {
          token: 'XXXXXXX',
        },
      },
      {
        name: 'app-monitor',
        entry: '//localhost:8005', // 数据中心，
      },
    ],
    jsSandbox: true, // 是否启用 js 沙箱，默认为 false
    prefetch: true, // 是否启用 prefetch 特性，默认为 true
  },
};
