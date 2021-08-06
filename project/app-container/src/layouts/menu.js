import {
  HomeOutlined,
  DashboardOutlined,
  ExclamationCircleOutlined,
  TagsOutlined,
  InteractionOutlined,
} from '@ant-design/icons';
export default [
  { name: 'home', path: '/home', id: 1, icon: <HomeOutlined /> },
  {
    name: '常用组件',
    id: 2,
    path: '/comp',
    icon: <DashboardOutlined />,
    children: [
      { name: 'table', path: '/comp/table', id: 21 },
      { name: 'form', path: '/comp/form', id: 22 },
      { name: 'tree', path: '/comp/tree', id: 23 },
      { name: 'modal', path: '/comp/modal', id: 24 },
      { name: 'hooks', path: '/comp/hooks', id: 25 },
      { name: '路由方法', path: '/comp/route', id: 26 },
      { name: 'redux', path: '/comp/redux', id: 27 },
      { name: '杂项示例', path: '/comp/example', id: 28 },
    ],
  },
  {
    name: '异常',
    id: 3,
    path: '/exception',
    icon: <ExclamationCircleOutlined />,
    children: [{ name: '404', path: '/exception/404', id: 31 }],
  },
  {
    name: '其他',
    id: 4,
    path: '/other',
    icon: <TagsOutlined />,
    children: [{ name: 'result', path: '/other/result', id: 41 }],
  },
  {
    name: '子应用',
    id: 5,
    path: '/navone',
    icon: <InteractionOutlined />,
    children: [
      { name: '公共模块', path: '/common', id: 51 },
      {
        name: '设备管理',
        path: '/device',
        id: 52,
      },
    ],
  },
];
