import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import routes from '../../routes';
import useAuth from '../../hooks/useAuth.hook';

const schema = Yup.object({
  username: Yup.string().min(4, 'Логин должен быть не менее 4-х символов').required(),
  password: Yup.string().min(4, 'Пароль должен быть не менее 4-х символов').required(),
});

const App = () => {
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const { logIn, setUsername } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const userData = {
        username: values.username,
        password: values.password,
      };
      try {
        // registration
        const response = await axios.post(routes.loginPath(), userData);
        logIn(response.data.token);
        setUsername(response.data.username);
        navigate('/');
      } catch (e) {
        if (!e.isAxiosError) {
          setAuthError('Unknown Error');
          return;
        }
        setAuthError(e.message);
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
                <Form.Control value={formik.values.username} onChange={formik.handleChange} name="username" type="text" placeholder="Ваш логин" />
                { formik.touched.username && formik.errors.username && (
                <Form.Text className="text-danger">
                  { formik.errors.username }
                </Form.Text>
                )}
                <Form.Text className="text-danger" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control value={formik.values.password} onChange={formik.handleChange} name="password" type="password" placeholder="Ваш пароль" />
                <Form.Text className="text-danger">
                  { formik.touched.password && formik.errors.password }
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
