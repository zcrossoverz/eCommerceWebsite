import { type RegisterOptions } from 'react-hook-form';
import * as yup from 'yup';
type Rules = {
  [key in 'email' | 'password' | 'phone' | 'firstname' | 'lastname' | 'confirmpassword']?: RegisterOptions;
};
export const rules: Rules = {
  email: {
    pattern: {
      value: /^(([\w]+)(\.*))+@((\w+)(\.)){1,}(com|net|co|vn|edu|gov|biz|org|uk)$/g,
      message: 'Email không hợp lệ!',
    },
    required: {
      value: true,
      message: 'Email là bắt buộc',
    },
  },
  password: {
    minLength: {
      value: 6,
      message: 'Password ít nhất 6 ký tự',
    },
    required: {
      value: true,
      message: 'Password là bắt buộc',
    },
  },
  confirmpassword: {
    minLength: {
      value: 6,
      message: 'Password ít nhất 6 ký tự',
    },
    required: {
      value: true,
      message: 'Password là bắt buộc',
    },
  },

  firstname: {
    minLength: {
      value: 2,
      message: 'firstname phải có ít nhất 2 ký tự',
    },
    required: {
      value: true,
      message: 'firstname là bắt buộc',
    },
    maxLength: {
      value: 10,
      message: 'firstname có tối đa 30 ký tự',
    },
  },
  lastname: {
    minLength: {
      value: 2,
      message: 'lastname phải có ít nhất 2 ký tự',
    },
    required: {
      value: true,
      message: 'lastname là bắt buộc',
    },
    maxLength: {
      value: 20,
      message: 'lastname có tối đa 30 ký tự',
    },
  },
};
export const schema = yup.object({
  email: yup.string().email('Email không hợp lệ!').required('Email bắt buộc nhập'),
  password: yup
    .string()
    .required('password bắt buộc nhập')
    .min(6, 'password có it nhất 6 ký tự')
    .max(18, 'password có tối đa 18 ký tự'),

  confirmPassword: yup
    .string()
    .required('bắt buộc nhập lại password')
    .min(6, 'password có it nhất 6 ký tự')
    .max(18, 'password có tối đa 18 ký tự')
    .oneOf([yup.ref('password')], 'password không khớp'),
  firstName: yup
    .string()
    .required('bắt buộc nhập first name')
    .min(2, 'Có ít nhất 2 ký tự')
    .max(20, 'có niều nhất 20 ký tự'),
  lastName: yup
    .string()
    .required('bắt buộc nhập last name')
    .min(2, 'Có ít nhất 2 ký tự')
    .max(20, 'có niều nhất 20 ký tự'),
});
export const loginSchema = schema.pick(['email', 'password']);
export const quantitySchema = yup.object({
  quantiTy: yup.number().min(0).max(20),
});
export type LoginSchema = yup.InferType<typeof loginSchema>;
export type Schema = yup.InferType<typeof schema>;
export type QuantitySchema = yup.InferType<typeof quantitySchema>;
