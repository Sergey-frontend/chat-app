import { useState, useCallback, useMemo } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser || null);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const getAuthHeaders = useCallback(() => ({
    headers: { Authorization: `Bearer ${user.token}` },
  }), [user]);

  const authValue = useMemo(() => ({
    user, logIn, getAuthHeaders,
  }), [user, logIn, getAuthHeaders]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
