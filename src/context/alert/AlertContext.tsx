import React, { createContext, useReducer } from 'react';
import alertRedcuer, { AlertStateType } from './alertReducer';

type AlertContextType = {
  alert: boolean;
  msg: string;
  typeMsg: string;
  setAlert: (msg: string, type: string) => void;
};

type AlertProviderProps = {
  children: React.ReactNode;
};

const AlertContext = createContext({} as AlertContextType);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const initialState: AlertStateType = {
    alert: false,
    msg: '',
    typeMsg: '',
  };

  const [{ alert, msg, typeMsg }, dispatch] = useReducer(
    alertRedcuer,
    initialState
  );

  const setAlert = (msg: string, typeMsg: string) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, typeMsg },
    });

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
        msg,
        typeMsg,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
