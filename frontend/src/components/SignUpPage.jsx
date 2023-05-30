import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Form, Button, Container, Row, Col, FormText,
} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import routes from '../utils/routes';
import useAuth from '../hooks/useAuth.hook';

const SignUpPage = () => {
  const [regError, setRegError] = useState();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const { t } = useTranslation();

  const validate = Yup.object({
    username: Yup
      .string()
      .min(3, t('signUpPage.validation.minMaxUsername'))
      .max(20, t('signUpPage.validation.minMaxUsername'))
      .required(t('signUpPage.validation.required')),
    password: Yup
      .string()
      .min(6, t('signUpPage.validation.minPassword'))
      .required(t('signUpPage.validation.required')),
    confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password'), null], t('signUpPage.validation.confirmPassword'))
      .required(t('signUpPage.validation.required')),
  });

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
        navigate(routes.home);
      } catch (error) {
        if (!error.isAxiosError) {
          setRegError(t('signUpPage.validation.unknown'));
        }
        const { status } = error.response;
        const message = status === 409
          ? t('signUpPage.validation.alreadyReg')
          : t('signUpPage.validation.unknown');
        setRegError(message);
      }
    },
    validationSchema: validate,
  });
  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <a href={routes.home} className="navbar-brand">{t('loginPage.header')}</a>
        </Container>
      </nav>
      <Container className="mt-5 container d-flex align-items-center justify-content-center">
        <Row className="w-50">
          <Col className=" border rounded .mx-auto mb-5 shadow">
            <h1 className="text-center p-3">{t('signUpPage.title')}</h1>
            <Form onSubmit={formik.handleSubmit} className="px-4">
              <Form.Group className="mb-3 form-floating">
                <Form.Control
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  type="text"
                  id="floatingLogin"
                  name="username"
                  autoComplete="off"
                  disabled={formik.isSubmitting}
                  placeholder={t('signUpPage.placeholderName')}
                  isInvalid={formik.errors.username && formik.touched.username}
                />
                <Form.Label htmlFor="floatingLogin">{t('signUpPage.placeholderName')}</Form.Label>
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
                  placeholder={t('signUpPage.placeholderPassword')}
                  isInvalid={formik.errors.password && formik.touched.password}
                />
                <Form.Label htmlFor="floatingPassword">{t('signUpPage.placeholderPassword')}</Form.Label>
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
                  placeholder={t('signUpPage.placeholderConfirmPassord')}
                  isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
                />
                <Form.Label htmlFor="floatingConfirmPassword">{t('signUpPage.placeholderConfirmPassord')}</Form.Label>
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
                {t('signUpPage.submit')}
              </Button>
            </Form>
            <p className="mt-3 text-center">
              {t('signUpPage.alreadyRegistered')}
              <Link style={{ marginLeft: 5 }} to={routes.home}>
                {t('signUpPage.link')}
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUpPage;
