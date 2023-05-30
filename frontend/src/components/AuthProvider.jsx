import { useState, useCallback } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser || null);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const getAuthHeaders = useCallback(() => ({
    headers: { Authorization: `Bearer ${user.token}` },
  }), [user]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const authValue = {
    user,
    logIn,
    logOut,
    getAuthHeaders,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
