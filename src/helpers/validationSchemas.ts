import * as Yup from 'yup';

export const formValidationSchema = Yup.object({
  email: Yup.string().email('Некорректный email').required('Введите email'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .matches(/[0-9]/, 'Должен содержать хотя бы одну цифру')
    .required('Введите пароль'),
});

export const resetPasswordValidationSchema = Yup.object({
  email: Yup.string().email('Некорректный email').required('Введите email'),
});

export const setNewPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .required('Введите новый пароль'),
});
