import { Card, Button, Input, Typography, message } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { setNewPasswordValidationSchema } from '../../helpers/validationSchemas';
import { hash } from 'bcrypt-ts';
import style from './new-password-page.module.css';

const { Text } = Typography;

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const onSubmit = async (
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

    const hashedPassword = await hash(values.password, 10);

    const updatedUsers = users.map(
      (user: { email: string; password: string }) =>
        user.email === resetData.email
          ? { ...user, password: hashedPassword }
          : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('resetToken');

    message.success('Пароль успешно изменён!');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className={style.newPasswordContainer}>
      <Card
        title="Установка нового пароля"
        style={{ width: 350, textAlign: 'center' }}
      >
        <Formik
          initialValues={{ password: '' }}
          validationSchema={setNewPasswordValidationSchema}
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
                {isSubmitting ? 'Сохранение...' : 'Установить пароль'}
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
