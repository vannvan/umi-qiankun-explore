import React, { Component } from 'react';

import { Badge, Dropdown, Menu } from 'antd';

import './todolist.less';
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">完成</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">延后</a>
    </Menu.Item>
    <Menu.Divider />
  </Menu>
);

const todoListData = [
  { name: '吃饭饭', time: '2020-10-15 15:22:23', status: 1 },
  { name: '吃觉觉', time: '2020-10-15 15:22:23', status: 1 },
  { name: '打豆豆', time: '2020-10-15 15:22:23', status: 1 },
];

export default class todoList extends Component {
  render() {
    return (
      <div className="todo-list-wrap">
        <div className="title">
          <span>待办事项</span>
          <Badge count={5} style={{ marginLeft: '15px' }} />
        </div>
        <div className="list-wrap">
          {todoListData.map((el: any, index: Number) => {
            return (
              <div className="item" key={'a' + index}>
                <div className="left-info">
                  <p className="todo-name">{el.name}</p>
                  <p className="time">提交时间:{el.time}</p>
                </div>
                <div className="right-action">
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a
                      className="ant-dropdown-link"
                      onClick={e => e.preventDefault()}
                    >
                      操作
                    </a>
                  </Dropdown>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
