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

export const buyOrderSchema = Yup.object().shape({

});

export const sellOrderSchema = Yup.object().shape({
  gemPrice: Yup.number()
    .min(1, 'Price must be at least 1')
    .positive('Price must be > 0')
    .integer('Price must be an integer value')
    .required('*'),
  goldPrice: Yup.number()
    .min(1, 'Price must be at least 1')
    .positive('Price must be > 0')
    .integer('Price must be an integer value')
    .required('*'),
  enhancement: Yup.number()
    .min(0, 'Enhancement must be > 0')
    .max(20, 'Enhancement can be <= 20')
    .integer('Enhancement must be an integer value')
    .required('*'),
  end: Yup.number()
    .min(0, 'Stat value must be at least 0'),
  dex: Yup.number()
    .min(0, 'Stat value must be > 0'),
  int: Yup.number()
    .min(0, 'Stat value must be > 0'),
  str: Yup.number()
    .min(0, 'Stat value must be > 0'),
  spr: Yup.number()
    .min(0, 'Stat value must be > 0'),
  hp: Yup.number()
    .min(0, 'Stat value must be > 0'),
  sp: Yup.number()
    .min(0, 'Stat value must be > 0'),
  dmg: Yup.number()
    .min(0, 'Stat value must be > 0'),
  mdmg: Yup.number()
    .min(0, 'Stat value must be > 0'),
  def: Yup.number()
    .min(0, 'Stat value must be > 0'),
  mdef: Yup.number()
    .min(0, 'Stat value must be > 0'),
  aim: Yup.number()
    .min(0, 'Stat value must be > 0'),
  eva: Yup.number()
    .min(0, 'Stat value must be > 0'),
});