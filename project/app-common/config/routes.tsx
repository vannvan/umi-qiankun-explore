/*
 * @Description:
 * @Date: 2021-08-09 11:49:21
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-14 17:55:18
 * --------
 * Copyright (c) github.com/vannvan
 */
export default [
  { path: '/user', component: './index' },
  {
    path: '/userInfo',
    component: './user/userInfo',
    meta: { title: '用户信息' },
  },
  {
    path: '/member',
    component: './member',
    meta: { title: '员工管理' },
  },
  {
    path: '/roles',
    component: './roles',
    meta: { title: '权限管理' },
  },
];
