/*
 * @Description:
 * @Date: 2021-08-02 15:40:21
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-09 09:43:48
 * --------
 * Copyright (c) github.com/vannvan
 */
import { SET_USER_INFO, DELETE_USER_INFO } from './actionTypes';
import storage from '@/utils/storage';

export interface IStateType {
  userName: string;
  avatar: string;
  [propName: string]: any;
}

export interface IActionType {
  type: string;
  value: IStateType;
}

const defaultState: IStateType = {
  userName: '',
  avatar: '',
};

const userInfo = storage.session.get('user')
  ? storage.session.get('user')
  : defaultState;

export default (state = userInfo, action: IActionType) => {
  switch (action.type) {
    case SET_USER_INFO:
      state = action.value;
      storage.session.set('user', action.value);
      break;
    case DELETE_USER_INFO:
      storage.session.set('user', '');
      break;
    default:
      return state;
      break;
  }
  return state;
};
