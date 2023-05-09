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
import { addChannels } from '../../store/slices/channelsSlice';
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
        logIn(responseLogin.data);
        const responseData = await axios.get(routes.usersPath(), {
          headers: {
            Authorization: `Bearer ${responseLogin.data.token}`,
          },
        });
        const data = await responseData.data;
        console.log(data);
        dispatch(addChannels(data.channels));
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
                <div className="row align-items-center">
                  <Button className="col-sm-3" variant="primary" type="submit">
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
