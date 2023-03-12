import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineMail, AiOutlineGoogle, AiOutlineLock, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, Schema } from 'src/utils/rulesValidateForm';
import classNames from 'classnames';
import { useMutation } from '@tanstack/react-query';
import { omit } from 'lodash';
import { toast } from 'react-toastify';
import path from 'src/constants/path';
import authApi from 'src/apis/auth.api';
import { isAxiosErr } from 'src/utils/error';
type FormDataRegister = Schema;
function Register() {
  const navigate = useNavigate();
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormDataRegister, 'confirmPassword'>) => authApi.registerAccount(body),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataRegister>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirmPassword']);
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Tạo tài khoản thành công');
        reset();
        navigate(path.login);
      },
      onError: (err) => {
        if (
          isAxiosErr<{
            error: string;
          }>(err)
        ) {
          toast.error(err.response?.data.error);
        }
      },
    });
  });
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div className='flex w-full flex-col items-center justify-center bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 px-6 py-4 text-center text-white md:py-10 md:px-20'>
      <div className='grid w-full grid-cols-1 grid-rows-3 rounded-2xl border-t border-l border-[rgba(255,255,255,.3)] bg-white bg-opacity-10 shadow-form backdrop-blur-[10px] md:grid-cols-3 md:grid-rows-1 lg:w-2/3 '>
        {/* login section */}
        <div className='row-span-2 p-4 md:col-span-2'>
          <div className='text-left font-bold'>
            <span className='text-sm text-form'>Fstore</span>
          </div>
          <div className='py-10'>
            <h2 className='mb-2 text-3xl font-bold text-form'>Đăng ký tài khoản</h2>
            <div className='border-primary mb-2 inline-block w-10 border-2'></div>
            <div className='mb-2 flex items-center justify-center'>
              <a href='#a' className='mx-1 rounded-full border-2 p-3 duration-300 hover:bg-form hover:text-white'>
                <FaFacebookF className='text-xl' />
              </a>
              <a href='#a' className='mx-1 rounded-full border-2 p-3 duration-300 hover:bg-form hover:text-white'>
                <FaLinkedinIn className='text-xl' />
              </a>
              <a href='#a' className='mx-1 rounded-full border-2 p-3 duration-300 hover:bg-form hover:text-white'>
                <AiOutlineGoogle className='text-xl' />
              </a>
            </div>
            <p className='text- my-3 '>Hoặc đăng ký bằng email</p>
            <form className='flex flex-col items-center' noValidate onSubmit={onSubmit}>
              <div
                className={classNames('relative mb-6 flex w-60 flex-row-reverse items-center rounded-md border-2 p-2', {
                  'border-red-500': errors.email?.message,
                })}
              >
                <input
                  type='email'
                  {...register('email')}
                  className='peer/email ml-2 w-full flex-1 bg-transparent outline-none'
                  placeholder='email'
                />
                <AiOutlineMail className='peer-focus/email:text-form' />
                <div className='absolute -bottom-5 -left-0 -mt-4 text-left text-xs text-err'>
                  {errors.email && errors.email.message && <span>{errors.email.message}</span>}
                </div>
              </div>
              {/* password */}
              <div
                className={classNames('relative mb-6 flex w-60 flex-row-reverse items-center rounded-md border-2 p-2', {
                  'border-red-500': errors.password?.message,
                })}
              >
                <div>
                  <AiFillEyeInvisible
                    onClick={() => setShowPass(!showPass)}
                    className={classNames({
                      'inline-block': !showPass,
                      hidden: showPass,
                    })}
                  />
                  <AiFillEye
                    onClick={() => setShowPass(!showPass)}
                    className={classNames({
                      'inline-block': showPass,
                      hidden: !showPass,
                    })}
                  />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  {...register('password')}
                  placeholder='password'
                  className='peer/password ml-2 w-full bg-transparent outline-none'
                />
                <AiOutlineLock className='text-xl peer-focus/password:text-form' />
                <div className='absolute -bottom-5 -left-0 -mt-4 text-left text-xs text-err'>
                  {errors.password && errors.password.message && <span>{errors.password.message}</span>}
                </div>
              </div>
              {/* confirm password */}
              <div
                className={classNames('relative mb-6 flex w-60 flex-row-reverse items-center rounded-md border-2 p-2', {
                  'border-red-500': errors.confirmPassword?.message,
                })}
              >
                <div>
                  <AiFillEyeInvisible
                    onClick={() => setShowPass(!showPass)}
                    className={classNames({
                      'inline-block': !showPass,
                      hidden: showPass,
                    })}
                  />
                  <AiFillEye
                    onClick={() => setShowPass(!showPass)}
                    className={classNames({
                      'inline-block': showPass,
                      hidden: !showPass,
                    })}
                  />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  placeholder='confirm password'
                  className={classNames('peer/confirmPassword ml-2 w-full flex-1 bg-transparent outline-none', {
                    'text-red-700 placeholder-red-500': errors.confirmPassword?.message,
                  })}
                />
                <AiOutlineLock className='text-lg peer-focus/confirmPassword:text-form' />
                <div className='absolute -bottom-5 -left-0 -mt-4 text-left text-xs text-err'>
                  {errors.confirmPassword && errors.confirmPassword.message && (
                    <span>{errors.confirmPassword.message}</span>
                  )}
                </div>
              </div>
              {/* first name */}
              <div
                className={classNames('relative mb-6 flex w-60 items-center rounded-md border-2 p-2', {
                  'border-red-500': errors.firstName?.message,
                })}
              >
                <input
                  type='text'
                  {...register('firstName')}
                  placeholder='first name'
                  className='ml-2 w-full bg-transparent outline-none'
                />
                <div className='absolute -bottom-5 -left-0 -mt-4 text-left text-xs text-err'>
                  {errors.firstName && errors.firstName.message && <span>{errors.firstName.message}</span>}
                </div>
              </div>
              {/* lastName */}
              <div
                className={classNames('relative mb-6 flex w-60 items-center rounded-md border-2 p-2', {
                  'border-red-500': errors.lastName?.message,
                })}
              >
                <input
                  type='text'
                  {...register('lastName')}
                  placeholder='last name'
                  className='ml-2 w-full bg-transparent outline-none'
                />
                <div className='absolute -bottom-5 -left-0 -mt-4 text-left text-xs text-err'>
                  {errors.lastName && errors.lastName.message && <span>{errors.lastName.message}</span>}
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className={classNames(
                    'inline-block rounded-full border-2 border-white px-12 py-2 duration-300 hover:bg-form hover:text-white',
                    {
                      'cursor-not-allowed': registerAccountMutation.isLoading,
                    }
                  )}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* signup section */}
        <div className='bg-primary row-span-1 w-full rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-t p-4 md:col-span-1 md:py-36 md:px-12'>
          <h2 className='mb-2 text-center text-3xl font-bold'>Bạn đã có tài khoản?</h2>
          <div className='mb-2 inline-block w-10 border-2 border-white'></div>
          <p className='font mb-8 font-semibold'>Đăng nhập vào để tiếp tục với chúng tôi!</p>
          <Link
            to='/login'
            className='inline-block rounded-full border-2 border-white px-6 py-2 duration-300 hover:bg-form hover:text-black '
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
