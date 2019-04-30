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
    .email('Invalid email'),
  message: Yup.string()
    .min(2, '')
    .max(250, '250 character limit hit')
    .required('*')
});

export const buyOrderSchema = Yup.object().shape({
  server: Yup.mixed()
    .oneOf(['Isya', 'Pagel', 'Jenira', 'Enid']),
  gemPriceMin: Yup.number()
    .min(0, '*')
    .integer('Price must be an integer value')
    .required('*')
    .test('nonzero',
      'Min price must be > than 0',
      function(gemPriceMin) {
        return (gemPriceMin + this.parent.goldPriceMin) > 0;
      }),
  goldPriceMin: Yup.number()
    .min(0, '*')
    .integer('Price must be an integer value')
    .required('*')
    .max(100, 'Gold price must be < 100'),
  gemPriceMax: Yup.number()
    .min(0, '*')
    .integer('Price must be an integer value')
    .required('*')
    .test('nonzero',
      'Max price must be > than 0',
      function(gemPriceMax) {
        return (gemPriceMax + this.parent.goldPriceMax) > 0;
      })
    .test('validPriceRange',
      'Price range invalid',
      function(gemPriceMax) {
        return parseFloat(this.parent.gemPriceMin + '.' + this.parent.goldPriceMin) < parseFloat(gemPriceMax + '.' + this.parent.goldPriceMax);
      }),
  goldPriceMax: Yup.number()
    .min(0, '*')
    .integer('Price must be an integer value')
    .required('*')
    .max(100, 'Gold price must be < 100'),
  enhancement: Yup.number()
    .min(0, 'Enhancement must be >= 0')
    .max(20, 'Enhancement can be <= 20')
    .integer('Enhancement must be an integer value')
    .required('*'),
  end: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  dex: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  int: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  str: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  spr: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  hp: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  sp: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  dmg: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  mdmg: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  def: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  mdef: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  aim: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
  eva: Yup.mixed()
    .oneOf(['N/A', 'godly', 'medium', 'high']),
});

export const sellOrderSchema = Yup.object().shape({
  server: Yup.mixed()
    .oneOf(['Isya', 'Pagel', 'Jenira', 'Enid']),
  gemPrice: Yup.number()
    .min(0, '*')
    .integer('Price must be an integer value')
    .required('*')
    .test('nonzero',
      'Price must be > than 0',
      function(gemPrice) {
        return (gemPrice + this.parent.goldPrice) > 0;
    }),
  goldPrice: Yup.number()
    .min(0, '*')
    .integer('Price must be an integer value')
    .required('*')
    .max(100, 'Gold price must be < 100'),
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
    .min(0, 'Stat value must be > 0')
});

export const aliasSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^.[a-zA-Z0-9_#]+$/, 'Only alphanumeric, #, & underscores allowed')
});