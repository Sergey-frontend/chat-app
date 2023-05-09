import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import routes from '../../routes';
import useAuth from '../../hooks/useAuth.hook';
import { setChannels } from '../../store/slices/channelsSlice';
import { addMessages } from '../../store/slices/messagesSlice';

const schema = Yup.object({
  username: Yup.string()
    .min(4, 'Логин должен быть не менее 4-х символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Пароль должен быть не менее 4-х символов')
    .required('Обязательное поле'),
});

const App = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');
  const dispatch = useDispatch();
  const { logIn } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (defaultValue) => {
      const userData = {
        username: defaultValue.username,
        password: defaultValue.password,
      };
      try {
        const responseLogin = await axios.post(routes.loginPath(), userData);
        const responseData = await axios.get(routes.usersPath(), {
          headers: {
            // Authorization: `Bearer ${responseLogin.data.token}`,
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MzY2MDk2M30.8hdWPbw0HxpVroKoAvVHd6UPC19eQ3bofDk1Y6Yehtg',
          },
        });
        const user = await responseLogin.data;
        logIn(user);
        const data = await responseData.data;
        dispatch(setChannels(data.channels));
        dispatch(addMessages(data.messages));
        navigate('/');
      } catch (e) {
        if (!e.isAxiosError) {
          console.log(e);
          return;
        }
        const { statusText } = e.response;
        setAuthError(statusText);
        throw e;
      }
    },
    validationSchema: schema,
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

export default App;
