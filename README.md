
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

## 子项目配置(主要环节)

### React.js

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


### Vue.js

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

let instance = null

function render(props = {}) {
  const { container } = props
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount('#app')
}

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}

```

## 应用加载方式
- 手动模式 通过将微应用关联到一些 url 规则的方式，实现当浏览器 url 发生变化时，自动加载相应的微应用的功  能。
- 自动模式 如果微应用不是直接跟路由关联的时候，可以选择手动加载微应用的方式会更加灵活。
### 自动模式

step1 应用配置
```js
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
        name: 'app-datum', 
        entry: '//localhost:6008', // 数据中心，
      },
    ],
  }

```
step2 路由

```js
{
    name: 'app-datum',
    path: '/datum',
    microApp: 'app-datum',
    microAppProps: {
      autoSetLoading: false,
      className: 'micro-app-wrapper',
      wrapperClassName: 'micro-wrapper-loadding',
    },
  }
```

step3 加载应用

```js
 <MicroApp
    name={currentMicroApp} // 应用名称，与上面配置的保持一致
    // autoSetLoading={true}
    // 微应用容器 class
    className="micro-app-wrapper"
    // wrapper class，仅开启 loading 动画时生效
    wrapperClassName="micro-wrapper-loadding"
  />
```

### 手动模式

step1  确保有一个挂载子应用的节点
```js
<div id="ManualNode"></div>
```

step2 使用loadMicroApp加载子应用
```js

const subApp = loadMicroApp({
  name: 'app1',
  entry: '//localhost:1234',
  container: "#ManualNode",
  props: { xxxxx: '/' }, // 下发给子应用的数据
});
```


 当需要更新时
```js
subApp.update({ name: 'xxxx' });
```
## 最佳实践
### 两种场景
1. 模块间无强关联性
最佳实践更建议采用多个项目采用不同git仓库管理的方式，本地开发可考虑这种结构，因为当各模块之间无强依赖关系时，比如某同学只负责A模块，他就只需要拉基座应用和A模块的代码，而无需拉其它模块的代码，因此多仓库管理是比较合适的  
2. 模块间有强关联性
采用本仓库风格一致或类似的管理方式会比较方便

## 注意

1. umi 脚手架创建的项目初始化 package.json 缺少 name 和 version 配置，需要新增
2. 开发环境微服务需要明确端口，需要在原有启动脚本前加端口，如`PORT=8001 umi dev set `
