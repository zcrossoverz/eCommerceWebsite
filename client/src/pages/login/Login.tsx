import { useState } from 'react';
import { AiOutlineMail, AiOutlineGoogle, AiOutlineLock, AiFillEyeInvisible } from 'react-icons/ai';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Login() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [isSignIn, setisSignIn] = useState(false);
  // const handleSubmit = (e:) => {
  //   e.preventDefault();
  //   console.log(email, password);
  // };
  return (
    <div className='flex w-full flex-col items-center justify-center bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 px-6 py-4 text-center text-white md:py-10 md:px-20'>
      <div className='grid w-full grid-cols-1 grid-rows-3 rounded-2xl border-t border-l border-[rgba(255,255,255,.3)] bg-white bg-opacity-10 shadow-form backdrop-blur-[10px] md:grid-cols-3 md:grid-rows-1 lg:w-2/3 '>
        {/* login section */}
        <div className='row-span-2 p-4 md:col-span-2'>
          <div className='text-left font-bold'>
            <span className='text-sm text-form'>Fstore</span>
          </div>
          <div className='py-10'>
            <h2 className='mb-2 text-3xl font-bold text-form'>Đăng nhập vào tài khoản</h2>
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
            <p className='text- my-3 '>Hoặc đăng nhập bằng email</p>
            <div className='flex flex-col items-center'>
              <div className='mb-4 flex w-60 items-center rounded-md border-2 p-2'>
                <AiOutlineMail />
                <input type='email' className='ml-2 flex-1 bg-transparent outline-none' placeholder='email' />
              </div>
              <div className='relative mb-2 flex w-60 items-center rounded-md border-2 p-2'>
                <AiOutlineLock />
                <input type='password' placeholder='password' className='ml-2 bg-transparent outline-none' />
                <AiFillEyeInvisible className='absolute right-2 text-gray-400 ' />
              </div>
              <div className='mb-4 w-60 text-right'>
                <a href='a' className='inline-block text-gray-500 hover:text-form'>
                  Quên mật khẩu?
                </a>
              </div>
              <div>
                <a
                  href='#a'
                  className='inline-block rounded-full border-2 border-white px-12 py-2 duration-300 hover:bg-form hover:text-white'
                >
                  Đăng nhập
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* signup section */}
        <div className='bg-primary row-span-1 w-full rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-t p-4 md:col-span-1 md:py-36 md:px-12'>
          <h2 className='mb-2 text-center text-3xl font-bold'>Bạn chưa có tài khoản?</h2>
          <div className='mb-2 inline-block w-10 border-2 border-white'></div>
          <p className='font mb-8 font-semibold'>Điền thông tin cá nhân của bạn để bắt đầu ngay với chúng tôi.</p>
          <Link
            to='/register'
            className='inline-block rounded-full border-2 border-white px-6 py-2 duration-300 hover:bg-form hover:text-black '
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
