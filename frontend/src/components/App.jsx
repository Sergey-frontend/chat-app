import { Route, Routes } from 'react-router-dom';
import ChatPage from './Pages/ChatPage';
import LoginPage from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import AuthProvider from '../providers/AuthProvider';

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </AuthProvider>
);

export default App;
