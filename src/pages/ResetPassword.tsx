import { Card, Button, Input } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Некорректный email').required('Введите email'),
});

const ResetPassword = () => {
  const navigate = useNavigate();

  const onSubmit = (values: { email: string }) => {
    alert(`Ссылка для сброса пароля отправлена на ${values.email}`);
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card title="Сброс пароля" style={{ width: 300 }}>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
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
                style={{ marginTop: 20 }}
              >
                Сбросить пароль
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ResetPassword;
