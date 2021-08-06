import { SET_USER_INFO, DELETE_USER_INFO } from './actionTypes';
import storage from '@/utils/storage';

export interface IStateType {
  userName: string;
  avatar: string;
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
