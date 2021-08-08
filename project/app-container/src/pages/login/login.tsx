import React from 'react';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';

const key = 'updatable';

import store from '@/store/user';
import { setUserInfo } from '@/store/user/actionCreators';
import './login.less';

const avatarImageUrl = require('@/assets/images/avatar.png');

const NormalLoginForm = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const userInfo = {
      userName: values.username,
      avatar: avatarImageUrl,
    };
    const setInfoAction = setUserInfo(userInfo);
    store.dispatch(setInfoAction);
    message.loading({ content: '验证身份中...', key });

    setTimeout(() => {
      message.success({ content: '验证通过~', key, duration: 2 });
    }, 800);
    setTimeout(() => {
      history.push('/home');
    }, 1500);
  };

  return (
    <div className="login-wrap">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1>登录</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default class Login extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <NormalLoginForm />;
  }
}
