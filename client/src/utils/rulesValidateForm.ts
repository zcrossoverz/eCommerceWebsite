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
export const filterPriceSchema = yup.object({
  minPrice: yup.string().min(6, 'Ít nhất 6 chữ số').max(8, 'Nhiều nhất 8 chữ số'),
  // .lessThan(yup.ref('maxPrice'), 'Giá min không lớn hơn giá max'),
  maxPrice: yup.string().min(6, 'Ít nhất 6 chữ số').max(8, 'Nhiều nhất 8 chữ số'),
  // .moreThan(yup.ref('minPrice'), 'Giá max không nhỏ hơn giá min'),
});
export const updateInfo = yup.object({
  email: yup.string().email('Email không hợp lệ!').required('Email bắt buộc nhập'),
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
  phone: yup
    .string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ')
    .required(),
});
export const changePassSchema = yup.object({
  oldPassword: yup
    .string()
    .required('password bắt buộc nhập')
    .min(6, 'password có it nhất 6 ký tự')
    .max(18, 'password có tối đa 18 ký tự'),
  newPassword: yup
    .string()
    .required('password bắt buộc nhập')
    .min(6, 'password có it nhất 6 ký tự')
    .max(18, 'password có tối đa 18 ký tự'),

  confirmNewPassword: yup
    .string()
    .required('bắt buộc nhập lại password')
    .min(6, 'password có it nhất 6 ký tự')
    .max(18, 'password có tối đa 18 ký tự')
    .oneOf([yup.ref('newPassword')], 'password không khớp'),
});
export type ChangePass = yup.InferType<typeof changePassSchema>;
export type LoginSchema = yup.InferType<typeof loginSchema>;
export type Schema = yup.InferType<typeof schema>;
export type FilterPriceSchema = yup.InferType<typeof filterPriceSchema>;
export type UpdateUserInfoSchema = yup.InferType<typeof updateInfo>;
