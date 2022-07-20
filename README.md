# lerna+umi+antd+qiankun 微服务方案

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![umi](https://img.shields.io/badge/umi-3.5.17-brightgreen)](https://umijs.org/zh-CN/docs)
[![ant-design](https://img.shields.io/badge/ant--design-6.5.0-brightgreen)](https://ant.design/docs/spec/introduce-cn)
[![node](https://img.shields.io/badge/node-14.3.1-brightgreen)]()
[![npm](https://img.shields.io/badge/npm-6.14.8-brightgreen)]()

> 该技术方案主要针对 React.js 技术栈大型项目需要拆分为微服务的应用场景，融合了微服务常用配置及方法的应用，可作为实践项目的参考。

## 使用

安装子项目依赖

> yarn boots

启动所有子项目

> yarn start

## 主项目配置

app-container/config/qiankun.tsx

```js
export default {
  // 注册子应用信息
  master: {
    apps: [
      {
        name: 'app-common', // 公共服务
        entry: '//localhost:8002', // 实际端口号可能不是这个
        // 子应用通过钩子函数的参数props可以拿到这里传入的值
        props: {
          token: 'XXXXXXX',
        },
      },
      {
        name: 'app-device', // 设备服务
        entry: '//localhost:8001',// 实际端口号可能不是这个
        // 子应用通过钩子函数的参数props可以拿到这里传入的值
        props: {
          token: 'XXXXXXX',
        },
      },
    ],
    jsSandbox: true, // 是否启用 js 沙箱，默认为 false
    prefetch: true, // 是否启用 prefetch 特性，默认为 true
  },
}
```

## 子项目配置

app-common/config/config.ts

```js
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  qiankun: {
    slave: {},
  },
})
```

umi 脚手架初始化的项目需要新建 app.tsx  
app-common/src/app.tsx

```js
export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('子应用[app-device] bootstrap', props)
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('子应用[app-device] mount', props)
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('子应用[app-device] unmount', props)
  },
}
```

## 注意

1. umi 脚手架创建的项目初始化 package.json 缺少 name 和 version 配置，需要新增
2. 开发环境微服务需要明确端口，需要在原有启动脚本前加端口，如`PORT=8001 umi dev set `
