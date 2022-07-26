---
marp: true
theme: dark
---


# qiankun应用指南 

--- 

## 由需求开始讲起

故事1.有一天产品经理突然说：我们要做一个 A 页面，我看到隔壁组已经做过这个 A 页面了，你把它放到我们项目里吧......

故事2.有一天公司某一个产品需要应用在各个业务线了，此时需要适配不同业务线的布局风格、功能权限，UI大同小异.....

故事3.有一天公司的产品功能板块增多到几十上百个，迭代了成百上千次、面临性能瓶颈、构建时间长、技术栈限制、项目可能因为种种原因变成了一个巨大的💩山......


为了省时省力、为了更愉快的进行后期的开发、为了不让项目大到让新来的同事入职一天就提桶跑路......

我们考虑把一个大型项目拆一下👇🏻

---

## "微前端"实际价值

- 子系统间的开发、发布从空间上完成隔离
- 子系统可以使用不同的技术体系
- 更好的代码复用，基础库复用
- 项目的监控可以细化到到子系统
- 研发效率提升，多业务线并行开发，团队自治，独立迭代
- 运维风险降低，变更范围缩小
- 重构风险降低，低风险局部替换，渐进地完成大规模重构
- ...

---

## "微前端"工具对比

###  iframe

iframe 就相当于页面里再开个窗口加载别的页面。

优点

- 技术栈无关，子应用独立构建部署
- 实现简单，子应用之间自带沙箱，天然隔离，互不影响

--- 

缺点

- 每次进来都要加载，状态不能保留
- DOM结构不能共享，比如子应用里有一个 Modal，显示的时候只能在那一小块地方展示，不能全屏展示
- 无法跟随浏览器的前进后退
- 天生硬隔离，应用间无法友好的进行资源共享
- 会大幅增加内存和计算资源
- 无法预加载缓存 iframe 内容
--- 

###  qiankun

将多个单页面应用聚合为一个整体应用的微前端框架。

优点

- 在同一页面上使用多个前端框架，而不用刷新页面
- 不限技术栈，React/Vue/Angular/JQuery均可接入
- 支持独立部署每一个单页面应用
- 新功能使用新框架，旧的单页应用不用重写可以共存
- 有效改善初始加载时间，延迟加载代码
- 对于已有项目改造成本低
--- 
缺点

- 坑比较多，不接近于实际场景的“完美”要求
- 开发体验略差(热更新触发时机不全面)
--- 


![](https://tva1.sinaimg.cn/large/e6c9d24egy1h4jbr5omn5j21740n6jwv.jpg)

--- 
### 怎样确定”基座“？

- 具备公共功能的主应用，如包含(菜单栏、用户信息、登录...)不包含任何业务层面的逻辑
- 一个含业务代码的成型应用，所有新功能作为子应用引入
---

### 项目结构

```bash
├── app-common     //公共模块
├── app-container // 基座
├── app-device  // 子应用
└── sub-datum // 子应用
```
--- 

### 应用加载方式

- 手动模式:通过将微应用关联到一些 url 规则的方式，实现当浏览器 url 发生变化时，自动加载相应的微应用的功能。
- 自动模式:如果微应用不是直接跟路由关联的时候，可以选择手动加载微应用的方式会更加灵活。
--- 
#### 自动模式

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
--- 
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
--- 
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
---
#### 手动模式

step1  确保有一个挂载子应用的节点

```js
<div id="ManualNode"></div>
```
---
step2 使用loadMicroApp加载子应用

```js
const subApp = loadMicroApp({
  name: 'app1',
  entry: '//localhost:1234',
  container: "#ManualNode",
  props: { xxxxx: '/' }, // 下发给子应用的数据
});
```
---


 当需要更新时

```js
subApp.update({ name: 'xxxx' });
```
---
### 子应用调整(主要环节)

[不同微应用的具体改造方式](https://qiankun.umijs.org/zh/guide/tutorial#%E5%BE%AE%E5%BA%94%E7%94%A8)  

--- 
**React.js**

```tsx
function render(props) {
  const { container } = props;
  ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
```
--- 
**Vue.js@2**

```js
// ... 省略了部分代码
let router = null;
let instance = null;

// 主要区分是在单独跑还是在微应用里跑，会将Vue实例挂载在不同的节点上
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
    mode: 'history',
    routes,
  });
	

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app'); 
  // 官方文档的方法，实际有问题  
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
  // 此段可用
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
```
---
## qiankun解决的问题

微前端的本质还是将B项目前端资源在A项目中加载(引入)，让用户在同一个页面(局部)使用本不属于父级业务板块的功能。

--- 
用户体验层面

- 可以做到应用的无感知加载/切换(快、过渡可控)
- 可以更好的做到应用间UI/布局风格的适配
--- 
技术层面(主要是single-spa没有做的)

- 其基于`single-spa`(JS Entry )和`import-html-entry`，解决了`single-spa`存在的问题，又能将加载方式像iframe一样简单 -- `window.fetch`
--- 
- 应用隔离 -- 沙箱

  - 样式隔离

    qiankun的css沙箱的原理是重写 `HTMLHeadElement.prototype.appendChild` 事件，记录子项目运行时新增的 `style/link` 标签，卸载子项目时移除这些标签。
---
  - JS隔离 -- `window.Proxy`

    在支持proxy中有一个代理对象，子应用优先访问到了代理对象，如果代理对象没有的值再从window中获取。如果不支持proxy，那么通过快照，缓存，复原的形式解决污染问题。

    ![](https://tva1.sinaimg.cn/large/e6c9d24egy1h4kiarx0ybj21d60lutd7.jpg)
--- 
- 资源预加载
- 应用间通信
--- 
## 基本原理

- 框架其实是通过`window.fetch`去获取子应用的js代码。

- 拿到了子应用的js代码字符串之后，把它进行包装处理。把代码包裹在了一个立即执行函数中，通过参数的形式改变了它的window环境，变成了沙箱环境。

  ```js
  function(window, self) {
      //子应用js代码
  }(window,proxy, window.proxy)
  ```

- 最后通过`eval()`去执行立即执行函数，正式去执行我们的子应用的js代码，去渲染出整个子应用。
--- 
## 常见问题

- 热更新慢、css触发不了热更新等

`mfsu`是一个很鸡肋很鸡肋的配置(副作用一大堆)，尽量找合适的方案在开发环节让子应用独立运行，减少被嵌套在主应用中编译流程和降低编译的复杂度。

- qiankun只能解决子项目之间的样式相互污染，不能解决子项目的样式污染主项目的样式

采用`postcss`增加命名空间；对于不经过编译工具的老项目(jquery),采用`BEM`风格约束选择器；`CSS Modules`,在打包时会自动将类名转换为hash值等

- [从0实现一个single-spa的前端微服务](https://juejin.cn/post/6844904085200601102#heading-9)
- [官方faq](https://qiankun.umijs.org/zh/faq)

---

## 推荐工具

### lerna

一个用于管理带有多个包的 JavaScript 项目的工具。

痛点：开发阶段多服务同时启动，子项目不用放在同一个 git 项目中,企业中部分 npm 私服包可以更便捷的更新到各个子项目等，将部分公共依赖安装在`lerna`根目录可以节省一部分存储空间。

---

> lerna init --independent //安装在全局  
> npx lerna init --independent //安装在局部

主要方法,既可以给某个项目单独安装依赖，也可以给所有子项目安装公共依赖，具体支持的参数见[lerna bootstrap](http://www.febeacon.com/lerna-docs-zh-cn/routes/commands/bootstrap.html)

> lerna bootstrap <--options>

---

初始化后的 lerna 项目目录如下

```bash
umi-qiankun-explore/
|--packages //这里是存放微服务各模块等目录，后面已更改为project，对应需要调整的配置见下方lerna.json▼
|--package.json
|--lerna.json
```

umi-qiankun-explore/lerna.json

```json
{
  "packages": ["project/*"],
  "workspaces": ["project/*"],
  "version": "0.0.0"
}
```
--- 
umi-qiankun-explore/package.json

```json
{
  "name": "root",
  "private": true,
  "scripts": {
    "clone:all": "bash ./cli/clone-all.sh", // 这里用来可以根据设备写一个clone所有子项目的脚本
    "boots": "lerna bootstrap --hoist", // 安装子项目所有公共的依赖
    "start": "lerna run --parallel  start" //启动所有子项目
  },
  "devDependencies": {}
}
```
--- 
### npm-run-all 

功能如其名。

--- 


**qiankun不是一个完整的微前端解决方案！**

**不要为了微前端而搞微前端！**

**用新技术，更多的不是因为先进，而是适合！**


--- 

## 参考文章

- [万字长文-落地微前端 qiankun 理论与实践指北](https://juejin.cn/post/7069566144750813197#heading-5)
- [EMP技术方案](https://zhuanlan.zhihu.com/p/378593330)
- [微前端qiankun原理学习](https://www.cnblogs.com/synY/p/13969785.html)
- [lerna 中文文档](http://www.febeacon.com/lerna-docs-zh-cn/)





