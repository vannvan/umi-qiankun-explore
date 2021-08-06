import React, { Component } from 'react';
import './count-view.less';

const opts = [
  { name: '今日注册', value: 1545, color: '#F6C523' },
  { name: '今日发帖', value: 122, color: '#20716A' },
  { name: '当前PV', value: 54545, color: '#F4A9C7' },
  { name: '今日问答', value: 245, color: '#DB3951' },
];
export default class countView extends Component {
  render() {
    return (
      <>
        <div className="count-view-wrap">
          {opts.map((el: any, index: Number) => {
            return (
              <div key={'a' + index}>
                <p className="name" style={{ color: el.color }}>
                  {el.name}
                </p>
                <p className="value">{el.value}</p>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
