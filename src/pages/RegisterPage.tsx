import { Card, Button, Input, Typography, message } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const validationSchema = Yup.object({
  email: Yup.string().email('Некорректный email').required('Введите email'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .required('Введите пароль'),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  const onSubmit = (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: { email: string }) => u.email === values.email)) {
      message.error('Пользователь с таким email уже зарегистрирован');
      setSubmitting(false);
      return;
    }

    users.push(values);
    localStorage.setItem('users', JSON.stringify(users));

    message.success('Регистрация успешна! Теперь войдите в систему.');
    navigate('/login');
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
      <Card title="Регистрация" style={{ width: 350, textAlign: 'center' }}>
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
                Зарегистрироваться
              </Button>

              <div style={{ marginTop: 15 }}>
                <Text type="secondary">Уже есть аккаунт?</Text>
              </div>

              <Button
                type="default"
                block
                onClick={() => navigate('/login')}
                style={{ marginTop: 5 }}
              >
                Войти
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default RegisterPage;
