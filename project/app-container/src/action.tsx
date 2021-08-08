/*
 * @Description:
 * @Date: 2021-08-08 14:59:50
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-08 20:35:12
 * --------
 * Copyright (c) github.com/vannvan
 */
//主应用的src/action.js
import { initGlobalState } from 'qiankun';
import { isValidKey } from '@/utils';
export const initialState = {
  globalLocation: {
    token: '',
  },
};

const actions: MicroAppStateActions = initGlobalState(initialState);

// // 定义一个获取state的方法下发到子应用
actions.getGlobalState = (key: string) => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  return isValidKey(key, initialState) ? initialState[key] : initialState;
};

actions.onGlobalStateChange((newState: object, prev: any) => {
  // state: 变更后的状态; prev 变更前的状态
  // console.log('main change', JSON.stringify(newState), JSON.stringify(prev));

  for (let key in newState) {
    if (isValidKey(key, initialState)) {
      initialState[key] = newState[key];
    }
  }
});

export default actions;
