import { Card, Button, Input, Typography, message } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const validationSchema = Yup.object({
  email: Yup.string().email('Некорректный email').required('Введите email'),
});

const ResetPassword = () => {
  const navigate = useNavigate();

  const onSubmit = (
    values: { email: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { email: string }) => u.email === values.email);

    if (!user) {
      message.error('Пользователь с таким email не найден');
      setSubmitting(false);
      return;
    }

    const resetToken = Math.random().toString(36).substr(2);
    localStorage.setItem(
      'resetToken',
      JSON.stringify({ email: values.email, token: resetToken })
    );

    message.success(`Ссылка для сброса пароля создана!`);

    setTimeout(() => {
      navigate(`/set-new-password/${resetToken}`);
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
      <Card title="Сброс пароля" style={{ width: 350, textAlign: 'center' }}>
        <Formik
          initialValues={{ email: '' }}
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

              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={isSubmitting}
                style={{ marginTop: 10 }}
              >
                Сбросить пароль
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

export default ResetPassword;
