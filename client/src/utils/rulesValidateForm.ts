import { type RegisterOptions } from 'react-hook-form';
type Rules = {
  [key in 'email' | 'password' | 'phone' | 'firstname' | 'lastname']?: RegisterOptions;
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
  phone: {
    pattern: {
      value: /^0[0-9]{9}$/g,
      message: 'Số điện thoại không hợp lệ',
    },
    required: {
      value: true,
      message: 'Số điện thoại là bắt buộc',
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
