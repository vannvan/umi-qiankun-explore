import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, GET_LIST } from './actionTypes';
export interface IStateType {
  inputValue: string;
  list: Array<object>;
}

export interface IActionType {
  type: string;
  inputValue?: string;
  value?: {
    title: string;
    time: number;
  };
  index?: number;
  data?: Array<object>;
}
const defaultState: IStateType = {
  inputValue: 'Write something',
  list: [],
};
export default (state = defaultState, action: IActionType) => {
  console.log('action:', action);
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case CHANGE_INPUT:
      newState.inputValue = action.inputValue;
      return newState;
      break;
    case ADD_ITEM:
      newState.list.push(action.value);
      return newState;
      break;
    case DELETE_ITEM:
      newState.list.splice(action.index, 1);
      return newState;
      break;
    case GET_LIST:
      newState.list = typeof action.data == 'object' ? action.data.list : [];
      return newState;
      break;
  }
  return state;
};
