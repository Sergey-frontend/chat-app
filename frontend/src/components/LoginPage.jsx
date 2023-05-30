import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import routes from '../utils/routes';
import useAuth from '../hooks/useAuth.hook';

const LoginPage = () => {
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const { t } = useTranslation();

  const validate = Yup.object({
    username: Yup
      .string()
      .required(t('loginPage.validation.required')),
    password: Yup
      .string()
      .required(t('loginPage.validation.required')),
  });

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
        navigate(routes.home);
        setAuthError(null);
      } catch (error) {
        if (!error.isAxiosError) {
          setAuthError(t('loginPage.validation.unknown'));
        }
        const { statusText } = error.response;
        const message = statusText === 'Unauthorized'
          ? t('loginPage.validation.wrongData')
          : t('loginPage.validation.unknown');
        setAuthError(message);
      }
    },
    validationSchema: validate,
  });

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <a href="/" className="navbar-brand">{t('loginPage.header')}</a>
        </Container>
      </nav>
      <Container className="mt-5 container d-flex align-items-center justify-content-center">
        <Row className="w-50">
          <Col className=" border rounded .mx-auto mb-5 shadow">
            <div style={{ padding: '15px' }}>
              <h1 className="text-center">{t('loginPage.formHeader')}</h1>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Floating className="mb-3">
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      className={`form-control ${formik.touched.username && (authError || formik.errors.username) ? 'is-invalid' : ''}`}
                      placeholder={t('loginPage.placeholderLogin')}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    <Form.Label htmlFor="username">{t('loginPage.placeholderLogin')}</Form.Label>
                    {formik.touched.username && formik.errors.username && (
                    <Form.Text className="invalid-tooltip">
                      {formik.errors.username}
                    </Form.Text>
                    )}
                  </Form.Floating>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Floating className="mb-3">
                    <Form.Control
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      name="password"
                      type="password"
                      className={`form-control ${formik.touched.password && (authError || formik.errors.password) ? 'is-invalid' : ''}`}
                      placeholder={t('loginPage.placeholderPassword')}
                    />
                    <Form.Label htmlFor="password">{t('loginPage.placeholderPassword')}</Form.Label>
                    {
                  formik.errors.password
                  && formik.touched.password
                  && <div className="invalid-tooltip">{t(formik.errors.password)}</div>
                }
                    <div className="invalid-tooltip">{authError}</div>
                  </Form.Floating>
                </Form.Group>
                <Row>
                  <div>
                    <Button
                      className="mb-10 w-100"
                      variant="primary"
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      {t('loginPage.submit')}
                    </Button>
                  </div>
                </Row>
              </Form>

            </div>
            <div className="card-footer mb-1">
              <div className="text-center">
                <span>
                  {t('loginPage.haveNotAccount')}
                  {' '}
                </span>
                <a href={routes.signip}>
                  {t('loginPage.link')}
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
