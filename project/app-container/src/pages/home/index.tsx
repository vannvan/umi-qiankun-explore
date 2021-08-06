import React from 'react';
import './index.less';
import { Row, Col } from 'antd';
import CountView from './count-view';
import TodoList from './todo-list';
import HelpPanel from './help-panel';

const PrimaryContent = {
  marginTop: '15px',
};

const spaceRight = {
  marginRight: '1%',
  flex: '0 0 74%',
};

export default () => {
  return (
    <>
      <div className="welcome">
        <h1>Hi!欢迎使用ww-react-cli</h1>
        <p>轻松搭建react@umi项目模板，快速成型，提升研发效率</p>
      </div>
      <Row style={PrimaryContent}>
        <Col span={18} style={spaceRight}>
          <CountView />
          <TodoList />
        </Col>
        <Col span={6}>
          <HelpPanel />
        </Col>
      </Row>
    </>
  );
};
