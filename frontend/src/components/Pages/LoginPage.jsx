import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  username: Yup.string().min(4, 'Логин должен быть не менее 4-х').required(),
  password: Yup.string().min(4, 'Пароль должен быть не менее 4-х').required(),
});

const App = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
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
