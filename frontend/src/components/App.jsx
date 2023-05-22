import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import SignUpPage from './SignUpPage';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
