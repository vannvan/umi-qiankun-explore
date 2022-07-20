/*
 * @Description:
 * @Date: 2021-08-06 12:00:47
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-09 12:01:06
 * --------
 * Copyright (c) github.com/vannvan
 */
import React, { useEffect } from 'react';
import { Button } from 'antd';

import styles from './index.less';
import action from '@/action'; //引入子应用中创建的action.js

export default function IndexPage(props: any) {
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
      <Button
        onClick={() => props.history.push('/userInfo')}
        style={{ marginLeft: 20 }}
      >
        用户信息
      </Button>

      <h2>【系统管理】菜单用于参考子应用路由配置方式</h2>
    </div>
  );
}
