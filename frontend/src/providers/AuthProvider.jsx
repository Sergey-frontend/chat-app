import { useState, useMemo, useCallback } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const currentToken = localStorage.getItem('user');
  const [token, setToken] = useState(currentToken || null);
  const [username, setUsername] = useState(null);

  const logIn = useCallback((userToken) => {
    localStorage.setItem('user', userToken);
    setToken(userToken);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setToken(null);
  }, []);

  const authValue = useMemo(() => ({
    username, setUsername, token, setToken, logOut, logIn,
  }), [username, setUsername, token, setToken, logOut, logIn]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
