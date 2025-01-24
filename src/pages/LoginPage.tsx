import { Card, Button, Input, Typography } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const validationSchema = Yup.object({
  email: Yup.string().email('Некорректный email').required('Введите email'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .required('Введите пароль'),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const success = login(values.email, values.password);

    if (!success) {
      setSubmitting(false);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Card title="Вход в систему" style={{ width: 350, textAlign: 'center' }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ marginBottom: 10 }}>
                <label>Email</label>
                <Field as={Input} name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div style={{ marginBottom: 10 }}>
                <label>Пароль</label>
                <Field as={Input.Password} name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={isSubmitting}
                style={{ marginTop: 10 }}
              >
                Войти
              </Button>

              <div style={{ marginTop: 15 }}>
                <Text type="secondary">Еще не зарегистрированы?</Text>
              </div>

              <Button
                type="default"
                block
                onClick={() => navigate('/register')}
                style={{ marginTop: 5 }}
              >
                Зарегистрироваться
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default LoginPage;
