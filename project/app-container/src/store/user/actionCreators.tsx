import { SET_USER_INFO, GET_USER_INFO, DELETE_USER_INFO } from './actionTypes';
import { IStateType } from './reducer';

export const setUserInfo = (value: IStateType) => {
  return {
    type: SET_USER_INFO,
    value,
  };
};

export const deleteUserInfo = () => {
  return {
    type: DELETE_USER_INFO,
    value: {
      userName: '',
      avatar: '',
    },
  };
};
