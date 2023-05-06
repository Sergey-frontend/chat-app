import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MainPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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
