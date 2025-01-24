import { Card, Button, Input, Typography, message } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { resetPasswordValidationSchema } from '../../helpers/validationSchemas';
import { getResetToken } from '../../helpers/get-reset-token';
import style from './reset-password.module.css';

const { Text } = Typography;

const ResetPassword = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => navigate('/login');

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

    const resetToken = getResetToken();

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
    <div className={style.resetPasswordContainer}>
      <Card title="Сброс пароля" style={{ width: 350, textAlign: 'center' }}>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={resetPasswordValidationSchema}
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
                  onClick={goToLoginPage}
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
