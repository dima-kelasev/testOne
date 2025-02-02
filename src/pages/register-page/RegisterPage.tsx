import { Card, Button, Input, Typography, message } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { formValidationSchema } from '../../helpers/validationSchemas';
import { hash } from 'bcrypt-ts';
import style from './register-page.module.css';
import LocalStorageService from '../../services/local-storage-service';

const { Text } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => navigate('/login');
  const onSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (LocalStorageService.findUserByEmail(values.email)) {
      message.error('Пользователь с таким email уже зарегистрирован');
      setSubmitting(false);
      return;
    }

    const hashedPassword = await hash(values.password, 10);
    LocalStorageService.addUser(values.email, hashedPassword);

    message.success('Регистрация успешна! Теперь войдите в систему.');
    navigate('/login');
  };

  return (
    <div className={style.registerPageContainer}>
      <Card title="Регистрация" style={{ width: 350, textAlign: 'center' }}>
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
                {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
              </Button>

              <div style={{ marginTop: 15 }}>
                <Text type="secondary">Уже есть аккаунт?</Text>
              </div>

              <Button
                type="default"
                block
                onClick={goToLoginPage}
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
