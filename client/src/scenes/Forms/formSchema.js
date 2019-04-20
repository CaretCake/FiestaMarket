import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .lowercase()
    .required('*'),
  password: Yup.string()
    .min(2, '')
    .required('*')
});

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^.[a-zA-Z0-9_]+$/, 'Only alphanumeric & underscores allowed')
    .min(5, 'Must be > 4 characters long')
    .max(16, 'Must be < 16 characters long')
    .lowercase()
    .required('*'),
  email: Yup.string()
    .email('Invalid email')
    .lowercase()
    .required('*'),
  password: Yup.string()
    .min(6, 'Must be > 6 characters long')
    .max(200, 'Must be < 200 characters long')
    .required('*'),
  confirmPassword: Yup.string()
    .required('*')
    .oneOf([Yup.ref('password')], "Passwords do not match")
});

export const contactSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('*'),
  message: Yup.string()
    .min(2, '')
    .max(250, '250 character limit hit')
    .required('*')
});