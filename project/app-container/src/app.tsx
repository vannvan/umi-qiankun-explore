/*
 * @Description:
 * @Date: 2021-08-06 15:16:27
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-08 20:34:38
 * --------
 * Copyright (c) github.com/vannvan
 */
import {
  initGlobalState,
  MicroAppStateActions,
  addGlobalUncaughtErrorHandler,
} from 'qiankun';

console.log('[主应用]');
const state = {
  token: null,
};

// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state);

setTimeout(() => {
  actions.setGlobalState({ token: '224582b1-7874-4568-9ab3-f955daf05785' });
}, 3000);

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('主应用监听state变化：', state, prev);
});

addGlobalUncaughtErrorHandler((event) => {
  console.log('全局错误----------', event);
});
