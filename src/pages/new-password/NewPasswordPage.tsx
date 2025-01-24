import { Card, Button, Input, Typography, message } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const { Text } = Typography;

const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .required('Введите новый пароль'),
});

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const onSubmit = (
    values: { password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const resetData = JSON.parse(localStorage.getItem('resetToken') || '{}');

    if (!resetData.token || resetData.token !== token) {
      message.error('Некорректный или устаревший токен сброса');
      setSubmitting(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(
      (user: { email: string; password: string }) =>
        user.email === resetData.email
          ? { ...user, password: values.password }
          : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('resetToken');

    message.success('Пароль успешно изменён!');

    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
      <Card
        title="Установка нового пароля"
        style={{ width: 350, textAlign: 'center' }}
      >
        <Formik
          initialValues={{ password: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ marginBottom: 10 }}>
                <label>Новый пароль</label>
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
                Установить пароль
              </Button>

              <div style={{ marginTop: 15 }}>
                <Text
                  type="secondary"
                  onClick={() => navigate('/login')}
                  style={{ cursor: 'pointer' }}
                >
                  Вернуться ко входу
                </Text>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default NewPasswordPage;
