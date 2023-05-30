import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.hook';
import routes from '../utils/routes';

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={routes.login} />;
};

export default PrivateRoute;
