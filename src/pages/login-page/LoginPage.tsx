import { Card, Button, Input } from 'antd';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { formValidationSchema } from '../../helpers/validationSchemas';
import { compare } from 'bcrypt-ts';
import style from './login-page.module.css';
import LocalStorageService from '../../services/local-storage-service';
import { useAuth } from '../../hook/use-auth';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (
    values: { email: string; password: string },
    {
      setSubmitting,
      setFieldError,
    }: FormikHelpers<{ email: string; password: string }>
  ) => {
    const user = LocalStorageService.findUserByEmail(values.email);

    if (!user) {
      setFieldError('email', 'Пользователь не найден');
      setSubmitting(false);
      return;
    }

    const isPasswordCorrect = await compare(values.password, user.password);
    if (!isPasswordCorrect) {
      setFieldError('password', 'Неверный email или пароль');
      setSubmitting(false);
      return;
    }

    const success = login(values.email, values.password);
    if (success) {
      LocalStorageService.setAuthToken('mockToken123');
      navigate('/dashboard');
    } else {
      setFieldError('password', 'Ошибка входа, попробуйте снова.');
    }

    setSubmitting(false);
  };

  return (
    <div className={style.logInContainer}>
      <Card title="Вход в систему" style={{ width: 350, textAlign: 'center' }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={formValidationSchema}
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

              <div className={style.resetBtn}>
                <span
                  className={style.resetText}
                  onClick={() => navigate('/reset-password')}
                >
                  Забыли пароль?
                </span>
              </div>

              <div style={{ marginTop: 15 }}>
                <span style={{ color: 'gray' }}>Еще не зарегистрированы?</span>
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
