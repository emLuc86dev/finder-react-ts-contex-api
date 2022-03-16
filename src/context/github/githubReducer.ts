import { type } from 'os';
import { useReducer } from 'react';
import { User } from '../../components/users/User';

export type GithubReducerStateType = {
  users: User[];
  user: User;
  repos: [];
  loading: boolean;
};
type GithubReducerActionType =
  | { type: 'GET_USERS'; payload: User[] }
  | { type: 'SET_LOADING' }
  | { type: 'CLEAR' }
  | { type: 'GET_USER'; payload: User }
  | { type: 'GET_USER_REPO'; payload: [] };

const githubReducer = (
  state: GithubReducerStateType,
  action: GithubReducerActionType
) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'GET_USER_REPO':
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'CLEAR':
      return {
        ...state,
        users: [],
        user: {} as User,
        // loading: false
      };
    
    default:
      return state;
  }
  return state;
};

export default githubReducer;
