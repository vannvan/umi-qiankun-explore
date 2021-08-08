import { initGlobalState, MicroAppStateActions } from 'qiankun';
import { useState } from 'react';

console.log('[主应用]');
// const state = {
//   token: null,
// };

// // 初始化 state
// const actions: MicroAppStateActions = initGlobalState(state);

// setTimeout(() => {
//   actions.setGlobalState({ token: '224582b1-7874-4568-9ab3-f955daf05785' });
// }, 3000);

// actions.onGlobalStateChange((state, prev) => {
//   // state: 变更后的状态; prev 变更前的状态
//   console.log(state, prev);
// });
