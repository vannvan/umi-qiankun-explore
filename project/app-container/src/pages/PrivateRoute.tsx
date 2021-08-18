/*
 * @Description:
 * @Date: 2021-08-09 09:15:29
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-17 16:06:01
 * --------
 * Copyright (c) github.com/vannvan
 */
import React from 'react';
import { Redirect } from 'umi';
import userStore from '@/store/user';

interface routeType {
  hash: string;
  pathname: string;
  query?: {};
  search?: {};
  key?: string;
}

const routeIsValid = (location: routeType) => {
  return location.key ? true : false;
};

export default function (props: any) {
  let hasKey = routeIsValid(props.location);
  if (!hasKey) {
    return <Redirect to="/exception/404" />;
  }
  const isLogin = userStore.getState();
  if (!isLogin) {
    return <Redirect to="/login" />; //没有登录时，重定向到登录页
  }
  //登录成功时，显示子路由的页面组件
  return <div>{props.children}</div>;
}
