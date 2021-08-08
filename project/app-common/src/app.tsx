/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-08-06 15:23:08
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-08-08 19:55:16
 */

import action from '@/action'; //引入子应用中创建的action.js

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('子应用[app-common] bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('子应用[app-common] mount', props);
    action.setActions(props);
    // props.onGlobalStateChange((state: any, prev: any) => {
    //   // state: 变更后的状态; prev 变更前的状态
    //   console.log('app-common-state变化:', state.globalLocation, prev);
    // });
    // props.setGlobalState(state);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('子应用[app-common] unmount', props);
  },
};
