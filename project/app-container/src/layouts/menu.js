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
