import { useState } from 'react';
import { BsCart, BsSearch } from 'react-icons/bs';
import classNames from 'classnames';
import { FiSettings } from 'react-icons/fi';
import { BiHelpCircle, BiLogIn, BiShoppingBag } from 'react-icons/bi';
import { Link } from 'react-router-dom';
function Header() {
  const [showMenuUser, setShowMenuUser] = useState<boolean>(false);
  return (
    <header className='relative top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900'>
      <nav className='border-gray-200 px-2 py-2.5 sm:px-4'>
        <div className='container mx-auto flex items-center justify-between'>
          <a href='https' className='flex items-center'>
            <img src='https://flowbite.com/docs/images/logo.svg' className='mr-1 h-9' alt='Flowbite Logo' />
            <span className='hidden self-center whitespace-nowrap font-semibold dark:text-white md:block md:text-xl'>
              Fstore
            </span>
          </a>
          {/* search input */}
          <form className='ml-2 flex-shrink'>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <BsSearch className='text-lg text-gray-400' />
              </div>
              <input
                type='search'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                placeholder='Search smart phone by brand, name,...'
                required
              />
            </div>
          </form>
          {/* right navigate */}
          <div className='flex items-center'>
            <button className='ml-1 block h-10 w-10 rounded-[50%] p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
              <BsCart className='h-6 w-6' />
            </button>
            <div className='relative flex'>
              <button
                onClick={() => {
                  setShowMenuUser(!showMenuUser);
                }}
                type='button'
                className='ml-1 flex h-10 w-10 items-center rounded-[50%] p-1 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              >
                <img
                  className='h-full w-full rounded-[50%] object-cover'
                  src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
                  alt=''
                />
              </button>
              {/* menu user */}
              <div
                className={classNames('absolute top-14 right-0 w-[300px] rounded-lg bg-slate-100 px-4 py-1 ', {
                  block: showMenuUser,
                  hidden: !showMenuUser,
                })}
              >
                <div className='flex items-center border-b py-2'>
                  <div>
                    <img
                      className='mr-2 h-8 w-8 rounded-[50%] object-cover md:mr-4'
                      src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
                      alt=''
                    />
                  </div>
                  <span className='text-base'>Your Name</span>
                </div>
                <ul className='flex flex-col pb-2'>
                  <li className='nav-item mt-4'>
                    <Link to='/user' className='flex items-center'>
                      <FiSettings className='mr-4 text-lg' />
                      <span>My Account</span>
                    </Link>
                  </li>
                  <li className='nav-item mt-2'>
                    <Link to='/user' className='flex items-center'>
                      <BiShoppingBag className='mr-4 text-xl' />
                      <span>My Order</span>
                    </Link>
                  </li>
                  <li className='nav-item mt-2'>
                    <Link to='/user' className='flex items-center'>
                      <BiHelpCircle className='mr-4 text-xl' />
                      <span>Help</span>
                    </Link>
                  </li>

                  <li className='nav-item mt-2'>
                    <Link to='/login' className='flex items-center'>
                      <BiLogIn className='mr-4 text-xl' />
                      <span>Login</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* show menu btn */}
          {/* <button
            type='button'
            onClick={() => setShowMenu(!showMenu)}
            className='ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden'
          >
            <FiMenu className='text-xl' />
          </button> */}
          {/* menu item */}
          {/* <div className={`${showMenu ? 'absolute inset-x-0 top-14 block' : 'hidden'} z-10 w-full md:w-auto lg:block`}>
            <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900'>
              <li className='nav-item'>
                <span>Home</span>
              </li>

              <li className='nav-item'>
                <Link to='/login' className='flex items-center'>
                  <BiLogIn className='mr-1 text-xl' />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </header>
  );
}
export default Header;
