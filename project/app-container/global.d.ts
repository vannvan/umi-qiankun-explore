import { MicroAppStateActions } from 'qiankun';

// 给MicroAppStateActions添加方法
export interface _MicroAppStateActions extends MicroAppStateActions {
  getGlobalState?: (key: any) => any;
}
