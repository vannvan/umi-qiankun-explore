import React, { useEffect } from 'react';
import { Button } from 'antd';

import styles from './index.less';
import action from '@/action'; //引入子应用中创建的action.js

export default function IndexPage() {
  useEffect(() => {
    action.onGlobalStateChange((state: any, prev: any) => {
      // state: 变更后的状态; prev 变更前的状态
      console.log('子项目子组件state变化', state.globalLocation, prev);
    });
  }, []);

  const updateGlobalState = () => {
    action.setGlobalState({
      globalLocation: { token: '子组件token' + Math.random() },
    });
  };

  return (
    <div>
      <h1 className={styles.title}>公共服务模块</h1>
      <Button type="primary" onClick={updateGlobalState}>
        更新全局state
      </Button>
    </div>
  );
}
