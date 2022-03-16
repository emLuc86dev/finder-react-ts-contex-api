import React, { useReducer } from 'react';

type ActionType =
  | { type: 'SET_ALERT'; payload: { msg: string; typeMsg: string } }
  | { type: 'REMOVE_ALERT' };

export type AlertStateType = {
  alert: boolean;
  msg: string;
  typeMsg: string;
};

const alertReducer = (state: AlertStateType, action: ActionType) => {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        alert: true,
        msg: `${action.payload.msg}`,
        typeMsg: `${action.payload.typeMsg}`,
      };
    case 'REMOVE_ALERT':
      return {
        alert: false,
        msg: '',
        typeMsg: '',
      };
    default:
      return state;
  }
};

export default alertReducer;
