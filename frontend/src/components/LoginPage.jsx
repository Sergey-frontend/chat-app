import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import routes from '../utils/routes';
import useAuth from '../hooks/useAuth.hook';

const validate = Yup.object({
  username: Yup
    .string()
    .min(4, 'Логин должен быть не менее 4-х символов')
    .required('Обязательное поле'),
  password: Yup
    .string()
    .min(4, 'Логин должен быть не менее 4-х символов')
    .required('Обязательное поле'),
});

const LoginPage = () => {
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (value) => {
      const { username, password } = value;
      const userData = { username, password };
      try {
        const response = await axios.post(routes.loginPath(), userData);
        logIn(response.data);
        navigate('/');
        setAuthError(null);
      } catch (error) {
        if (!error.isAxiosError) {
          setAuthError('Неизвестная ошибка');
        }
        const { statusText } = error.response;
        const message = statusText === 'Unauthorized'
          ? 'Неверное имя пользователя или пароль'
          : 'Неизвестная ошибка';
        setAuthError(message);
      }
    },
    validationSchema: validate,
  });
  return (
    <Container className="mt-50 mt-5">
      <Row>
        <Col className=" border .mx-auto mb-5">
          <div style={{ padding: '15px' }}>
            <h1 className="text-center">Войти в чат</h1>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  name="username"
                  type="text"
                  placeholder="Ваш логин"
                />
                {formik.touched.username && formik.errors.username && (
                <Form.Text className="text-danger">
                  {formik.errors.username}
                </Form.Text>
                )}
                <Form.Text className="text-danger" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                  type="password"
                  placeholder="Ваш пароль"
                />
                <Form.Text className="text-danger">
                  {formik.touched.password && formik.errors.password}
                </Form.Text>
              </Form.Group>
              <Row>
                <div>
                  <Button className="mb-10 w-100" variant="primary" type="submit">
                    Войти
                  </Button>
                  <div className="text-danger">
                    <p>{authError}</p>
                  </div>
                </div>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
