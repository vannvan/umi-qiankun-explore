/*
 * @Description:
 * @Date: 2021-08-09 11:34:45
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-09 11:34:45
 * --------
 * Copyright (c) github.com/vannvan
 */
import React from 'react';
import { Result, Button } from 'antd';
export default (props: any) => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => props.history.push('/home')}>
          Back Home
        </Button>
      }
    ></Result>
  );
};
