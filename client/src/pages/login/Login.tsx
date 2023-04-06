import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AiOutlineMail, AiOutlineGoogle, AiOutlineLock, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginSchema, loginSchema } from 'src/utils/rulesValidateForm';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import authApi from 'src/apis/auth.api';
import { toast } from 'react-toastify';
import { AppContext } from 'src/contexts/app.context';
import { isAxiosErr } from 'src/utils/error';
import { useDispatch } from 'react-redux';
import { getCart } from 'src/slices/cart.slice';
import { useTranslation } from 'react-i18next';
import { reset } from 'src/slices/user.slice';
type FormDataLogin = LoginSchema;
function Login() {
  const { t } = useTranslation('login');
  const { setIsAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: yupResolver(loginSchema),
  });
  const loginMutation = useMutation({
    mutationFn: (body: FormDataLogin) => authApi.loginAccount(body),
  });
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        dispatch(reset());
        if (data.data.token && data.data.message) {
          setIsAuth(true);
          if (location.state) {
            navigate(location.state.from);
          } else {
            dispatch(getCart());
            navigate('/');
          }
        }
      },
      onError: (err) => {
        if (isAxiosErr<{ error: string }>(err)) {
          toast.error(err.response?.data.error);
        }
      },
    });
  });
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div className='to-white-200 flex w-full flex-col items-center justify-center bg-gradient-to-r from-gray-200 via-gray-300 px-6 py-4 text-center text-white md:py-10 md:px-20'>
      <div className='grid w-full grid-cols-1 grid-rows-3 rounded-2xl border-t border-l border-[rgba(255,255,255,.3)] bg-white  shadow-form backdrop-blur-[10px] md:grid-cols-3 md:grid-rows-1 lg:w-2/3 '>
        {/* login section */}
        <div className='row-span-2 p-4 md:col-span-2'>
          <div className='text-left font-bold'>
            <span className='text-sm text-form'>Fstore</span>
          </div>
          <div className='py-10'>
            <h2 className='mb-2 text-3xl font-bold text-form'>{t('login.login account')}</h2>
            <div className='border-primary mb-2 inline-block w-10 border-2 border-orange-400'></div>
            <div className='mb-2 flex items-center justify-center'>
              <span className='group/fb mx-1 rounded-full border-2 border-blue-500 p-3 duration-300 hover:bg-form hover:text-white'>
                <FaFacebookF className='text-xl text-blue-500 group-hover/fb:text-white' />
              </span>
              <span className='mx-1 rounded-full border-2 bg-[#0a66c2] p-3 duration-300 hover:bg-form hover:text-white'>
                <FaLinkedinIn className='text-xl text-white' />
              </span>
              <span className='group/gg mx-1 rounded-full border-2 border-red-500 p-3 duration-300 hover:bg-red-500 hover:text-white'>
                <AiOutlineGoogle className='text-xl text-red-500 group-hover/gg:text-white' />
              </span>
            </div>
            <p className='my-3 text-black '>{t('login.login email')}</p>
            <form onSubmit={onSubmit} className='flex flex-col items-center' noValidate>
              <div
                className={classNames(
                  'relative mb-6 flex w-60 flex-row-reverse items-center rounded-md border-2 border-orange-400 p-2',
                  {
                    'border-red-500': errors.email?.message,
                  }
                )}
              >
                <input
                  type='email'
                  {...register('email')}
                  className={classNames('peer/email ml-2 w-full flex-1 bg-transparent text-gray-500 outline-none', {
                    'text-red-700 placeholder-red-500': errors.email?.message,
                  })}
                  placeholder='email'
                />
                <AiOutlineMail
                  className={classNames('text-xl text-black', {
                    'text-red-500': errors.email?.message,
                    'peer-focus/email:text-form': !errors.email?.message,
                  })}
                />
                <div className='absolute -bottom-5 -left-0 -mt-4 text-left text-xs text-err'>
                  {errors.email && errors.email.message && <span>{errors.email.message}</span>}
                </div>
              </div>
              {/* password */}
              <div
                className={classNames(
                  'relative mb-6 flex w-60 flex-row-reverse items-center rounded-md border-2 border-orange-400 p-2 text-gray-500',
                  {
                    'border-red-500': errors.password?.message,
                  }
                )}
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
                  placeholder={t('login.password') || 'mật khẩu'}
                  className={classNames('peer/password ml-2 w-full flex-1 bg-transparent outline-none', {
                    'text-red-700 placeholder-red-500': errors.password?.message,
                  })}
                />
                <AiOutlineLock
                  className={classNames('text-xl text-black', {
                    'text-red-500': errors.password?.message,
                    'peer-focus/password:text-form': !errors.password?.message,
                  })}
                />
                <div className='absolute -bottom-5 -left-0 -mt-4 text-left text-xs text-err'>
                  {errors.password && errors.password.message && <span>{errors.password.message}</span>}
                </div>
              </div>

              <div className='mb-4 w-60 text-right'>
                <a href='a' className='inline-block text-gray-500 hover:text-form'>
                  {t('login.forgot password')}
                </a>
              </div>
              <div>
                <button
                  type='submit'
                  className={classNames(
                    'bg-opacity-85 inline-block rounded-full border-2 border-orange-400 px-12 py-2 text-black duration-300 hover:bg-orange-200',
                    {
                      'cursor-not-allowed': loginMutation.isLoading,
                    }
                  )}
                  disabled={loginMutation.isLoading}
                >
                  {t('login.log in')}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* signup section */}
        <div className='bg-primary row-span-1 w-full rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-t p-4 md:col-span-1 md:py-36 md:px-12'>
          <h2 className='mb-2 text-center text-3xl font-bold text-form'>{t('login.do not account')}</h2>
          <div className='mb-2 inline-block w-10 border-2 border-orange-400'></div>
          <p className='font mb-8 font-semibold text-gray-600'>{t('login.fill in')}</p>
          <Link
            to='/register'
            className='inline-block rounded-full border-2 border-orange-400 px-6 py-2 text-black duration-300 hover:bg-orange-200 '
          >
            {t('login.register')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
