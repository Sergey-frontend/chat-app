import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const currentToken = localStorage.getItem('user');
  const [token, setToken] = useState(currentToken || null);
  const [username, setUsername] = useState(null);

  const logIn = useCallback((userToken) => {
    localStorage.setItem('user', userToken);
    setToken(userToken);
    navigate('/');
  }, [navigate]);
  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setToken(null);
    navigate('/');
  }, [navigate]);

  const authValue = useMemo(
    () => ({
      username,
      setUsername,
      token,
      setToken,
      logOut,
      logIn,
    }),
    [username, setUsername, token, setToken, logOut, logIn],
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
