import {
  initGlobalState,
  OnGlobalStateChangeCallback,
  MicroAppStateActions,
} from 'qiankun';

class Actions {
  // 默认值为空 Action
  actions: MicroAppStateActions = initGlobalState({});

  /**
   * 设置 actions
   */
  setActions(actions: any) {
    this.actions = actions;
  }

  /**
   * 映射
   */
  onGlobalStateChange(
    cb: OnGlobalStateChangeCallback,
    fireImmediately?: boolean,
  ) {
    return this.actions.onGlobalStateChange(cb, fireImmediately);
  }

  /**
   * 映射
   */
  setGlobalState(state: Record<string, any>) {
    return this.actions.setGlobalState(state);
  }
}

const actions = new Actions();
export default actions;
