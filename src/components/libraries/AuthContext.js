import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleAuthChange = (status, info = null) => {
    setIsAuthenticated(status);
    setUserInfo(info);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, handleAuthChange }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
