import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form, Button, Container, Row, Col, FormText,
} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import routes from '../utils/routes';
import useAuth from '../hooks/useAuth.hook';

const validate = Yup.object({
  username: Yup
    .string()
    .min(3, 'Минимальная длинна не должна быть меньше 3 симоволов')
    .max(20, 'Максимальная длинна не должна быть больше 20 симоволов')
    .required('Обязательное поле'),
  password: Yup
    .string()
    .min(6, 'Минимальная длинна не должна быть меньше 6 симоволов')
    .required('Обязательное поле'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
    .required('Обязательное поле'),
});

const SignUpPage = () => {
  const [regError, setRegError] = useState();
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const userData = {
        username,
        password,
      };
      try {
        const response = await axios.post(routes.signupPath(), userData);
        console.log(response);
        logIn({ ...response.data });
        navigate('/');
      } catch (error) {
        if (!error.isAxiosError) {
          setRegError('Неизвестная ошибка');
        }
        const { status } = error.response;
        const message = status === 409
          ? 'Пользователь с данным именем уже зарегистрирован'
          : 'Неизвестная ошибка';
        setRegError(message);
      }
    },
    validationSchema: validate,
  });
  return (
    <Container>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <a href="/" className="navbar-brand">HexletChat</a>
        </Container>
      </nav>
      <Row>
        <Col className="col-9 m-auto mt-5">
          <h1 className="text-center">Регистрация</h1>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3 form-floating">
              <Form.Control
                value={formik.values.username}
                onChange={formik.handleChange}
                type="text"
                id="floatingLogin"
                name="username"
                autoComplete="off"
                disabled={formik.isSubmitting}
                placeholder="Введите имя пользователя"
                isInvalid={formik.errors.username && formik.touched.username}
              />
              <Form.Label htmlFor="floatingLogin">Имя пользователя</Form.Label>
              {
                formik.errors.username
                && formik.touched.username
                && <FormText className="feedback text-danger mt-3">{formik.errors.username}</FormText>
              }
            </Form.Group>
            <Form.Group className="mb-3 form-floating">
              <Form.Control
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                id="floatingPassword"
                name="password"
                autoComplete="off"
                disabled={formik.isSubmitting}
                placeholder="Введите пароль"
                isInvalid={formik.errors.password && formik.touched.password}
              />
              <Form.Label htmlFor="floatingPassword">Пароль</Form.Label>
              <Form.Text className="text-danger">
                {
                  formik.errors.password
                  && formik.touched.password
                  && <FormText className="feedback text-danger mt-3">{formik.errors.password}</FormText>
                }
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 form-floating">
              <Form.Control
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                type="password"
                id="floatingConfirmPassword"
                name="confirmPassword"
                autoComplete="off"
                disabled={formik.isSubmitting}
                placeholder="Подтверждение"
                isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
              />
              <Form.Label htmlFor="floatingConfirmPassword">Подтвердите пароль</Form.Label>
              {
                  (formik.errors.confirmPassword
                    && formik.touched.confirmPassword
                    && <FormText className="feedback text-danger mt-3">{formik.errors.confirmPassword}</FormText>)
                    || <FormText className="feedback text-danger mt-3">{regError}</FormText>
                }
            </Form.Group>
            <Button
              disabled={formik.isSubmitting}
              className="mb-10 w-100"
              variant="primary"
              type="submit"
            >
              Зарегистрироваться
            </Button>
          </Form>
          <p className="mt-3 text-center">
            Уже зарегестрированы?
            <Link style={{ marginLeft: 5 }} to="/login">Авторизуйтесь</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
