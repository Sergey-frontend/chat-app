import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import SignUpPage from './SignUpPage';
import routes from '../utils/routes';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={routes.home} element={<ChatPage />} />
        </Route>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.error} element={<NotFoundPage />} />
        <Route path={routes.signip} element={<SignUpPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
