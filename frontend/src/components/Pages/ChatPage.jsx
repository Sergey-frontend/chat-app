import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth.hook';

const MainPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  return (
    <div>
      <h1>Welcome to MainPage</h1>
    </div>
  );
};
export default MainPage;
