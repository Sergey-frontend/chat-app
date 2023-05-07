import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import NotFoundPage from './Pages/NotFoundPage';
import AuthProvider from '../providers/AuthProvider';

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </AuthProvider>
);

export default App;
