import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../components/users/User';
import githubReducer, { GithubReducerStateType } from './githubReducer';
import { useParams } from 'react-router-dom';

type UserCtxType = {
  users: User[];
  user: User;
  repos: [];
  loading: boolean;
  searchUsers: (text: string) => void;
  gethUser: (login: string) => void;
  getUserRepos: (login: string) => void;
  clearList: () => void;
};

type UserProps = {
  children: React.ReactNode;
};

const GithubContext = createContext({} as UserCtxType);

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
//@Config Ojo, Congifurar {Authorization: token} por defecto en axios
axios.defaults.headers.common['Authorization'] = `${GITHUB_TOKEN}`;
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});



const initialState: GithubReducerStateType = {
  users: [],
  user: {} as User ,
  repos: [],
  loading: false,
}

export const GithubProvider = ({ children }: UserProps) => {
  const [{ user, users, loading, repos}, dispatch] = useReducer(
    githubReducer,
    initialState
  );

  const navigate = useNavigate();
  const params = useParams();

  //// Get search results
  const searchUsers = async (text: string) => {
    const paramsURl = new URLSearchParams({
      q: text,
    });

    setLoading();

    try {
      const { data } = await github.get(`/search/users?${paramsURl}`);
      const { items } = data;
      dispatch({ type: 'GET_USERS', payload: items });
    } catch (error) {
      console.error(error);
    }
  };

  //fetching a user
  const gethUser = async (login: string) => {
    setLoading();
    try {
      const { data } = await github.get(`/users/${login}`);
      dispatch({ type: 'GET_USER', payload: data });
    } catch (error) {
      navigate('*');
    }
  };

  //// Get search results
  const getUserRepos = async (login: string) => {
    setLoading();
    try {
      const { data } = await github.get(`/users/${login}/repos`);

      dispatch({ type: 'GET_USER_REPO', payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  //Set loading
  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  //Clear list searched
  const clearList = () => {
    dispatch({ type: 'CLEAR' });
  };

  return (
    <GithubContext.Provider
      value={{
        users,
        user,
        repos,
        loading,
        searchUsers,
        gethUser,
        getUserRepos,
        clearList,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
