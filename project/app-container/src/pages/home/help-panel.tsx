import React from 'react';
import './help-panel.less';
import { List, Typography } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

export default class helpPanel extends React.Component {
  render() {
    return (
      <div className="help-panel-wrap">
        <p className="title">
          <span>使用帮助</span>
        </p>
        <div className="list-wrap">
          <List
            footer={<div>Footer</div>}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
