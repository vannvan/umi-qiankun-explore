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
  }).$mount('#app-other')
  console.log('啊啊啊哈哈哈er', instance)
}

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange((state, prev) => {
      // state: 变更后的状态; prev 变更前的状态
      console.log(`[onGlobalStateChange - ${props.name}]:`, state, prev)
    }, true)
  setTimeout(() => {
    props.setGlobalState({ appLoading: false })
  }, 3000)
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  console.log('[vue] props from main framework啊哈哈哈哈', props)
  storeTest(props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}

// 增加 update 钩子以便主应用手动更新微应用
export async function update(props) {
  renderPatch(props)
}
