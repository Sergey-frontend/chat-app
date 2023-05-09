import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth.hook';

const ChatPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return (
    <>
      <h1>ChatPage</h1>
      <h1>ChatPage</h1>
      <h1>ChatPage</h1>
    </>
  );
};
export default ChatPage;
