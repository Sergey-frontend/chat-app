import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.hook';

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
