import React, { createContext, useState, useContext } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const setErrorMessage = (message) => {
    setError(message);
    setTimeout(() =>  setError(null),15000);
  };


  return (
    <ErrorContext.Provider value={{ error, setErrorMessage}}>
      {children}
    </ErrorContext.Provider>
  );
};