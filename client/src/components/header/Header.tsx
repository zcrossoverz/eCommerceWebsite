import { useContext, useEffect, useState } from 'react';
import { BsSearch, BsTelephoneForward } from 'react-icons/bs';
import { GoDiffRenamed } from 'react-icons/go';
import classNames from 'classnames';
import { FiSettings } from 'react-icons/fi';
import { BiHelpCircle, BiLogIn, BiShoppingBag } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppContext } from 'src/contexts/app.context';
import { clearAccessToken, getAccessToken } from 'src/utils/auth';
import jwtDecode from 'jwt-decode';
import { UserInfo } from 'src/types/user.type';
import path from 'src/constants/path';
import { RiUserSettingsLine } from 'react-icons/ri';
import Cart from '../popover/CartPopover';
import useClickOutSide from 'src/hooks/useClickOutSide';
import { GrUserAdmin } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { setUserInfor } from 'src/slices/user.slice';
import logo from 'src/assets/logo.svg';

function Header() {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AppContext);
  const [showMenuUser, setShowMenuUser] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [searchProduct, setSearchProduct] = useState<string>('');
  const dispath = useDispatch();
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const user = jwtDecode<{
        firstName: string;
        lastName: string;
        user_id: number;
        iat: string;
        role: string;
      }>(token);
      const userFinal: UserInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        id: user.user_id,
      };
      setUserInfo(userFinal);
      dispath(setUserInfor(userFinal));
    } else {
      setUserInfo(undefined);
    }
  }, [isAuth, dispath]);

  const { nodeRef } = useClickOutSide(() => {
    setShowMenuUser(false);
  });
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({
      pathname: path.home,
      search: `?search=${searchProduct}`,
    });
  };
  return (
    <header className='relative top-0 left-0 right-0 z-10 bg-orange-600 text-white shadow-md dark:bg-gray-900'>
      <nav className='border-gray-200 px-2 py-2.5 sm:px-4'>
        <div className='mx-auto flex max-w-7xl items-center justify-between'>
          <Link to={path.home} className='flex items-center md:min-w-[2rem] md:p-2'>
            <img src={logo} className='mr-1 h-9' alt='Flowbite Logo' />
          </Link>
          {/* search input */}
          <form className='ml-2 flex-shrink md:min-w-[30rem]' onSubmit={handleSearch}>
            <div className='relative'>
              <input
                value={searchProduct}
                onChange={handleChangeSearch}
                type='search'
                className='block max-h-[2.5rem] w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pr-10 text-sm text-gray-900 outline-none placeholder:line-clamp-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
                placeholder='Tìm theo tên sản phẩm'
                required
              />
              <button
                type='submit'
                className='absolute right-2 top-1 bottom-1 rounded-sm bg-orange-500 px-4 py-1 text-center duration-150 hover:bg-orange-600'
              >
                <BsSearch className='text-lg text-white' />
              </button>
            </div>
          </form>
          {/* right navigate */}
          <div className='hidden items-center px-2 md:flex'>
            <BsTelephoneForward className='mr-2 text-xl' />
            <div className='flex flex-col items-start'>
              <span>Hotline hỗ trợ</span>
              <span className='text-lg font-bold'>0907588963</span>
            </div>
          </div>
          {/* cart */}
          <div className='flex items-center justify-between md:min-w-[8rem]'>
            <Cart />
            {/* user setting */}
            <div className='relative flex' ref={nodeRef}>
              <button
                onClick={() => {
                  setShowMenuUser(!showMenuUser);
                }}
                type='button'
                className='group ml-1 flex h-10 w-10 items-center justify-center rounded-[50%] duration-300 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              >
                <RiUserSettingsLine className='text-3xl text-white group-hover:text-orange-600 group-focus:text-orange-600' />
              </button>
              {/* menu user */}
              <AnimatePresence>
                {showMenuUser && (
                  <motion.div
                    className={classNames('absolute top-14 right-0 w-[300px] rounded-lg bg-slate-300 px-4 py-1 ')}
                    initial={{ opacity: 0, transform: 'scale(0)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* triangle up */}
                    <div className='absolute -top-[12px] right-2 h-0 w-0 border-l-[10px] border-b-[15px] border-r-[10px] border-l-transparent border-b-slate-300 border-r-transparent'></div>

                    {isAuth && userInfo && (
                      <div className='flex items-center border-b py-2'>
                        <GoDiffRenamed className='mr-4 text-lg text-black' />
                        <span className='text-lg font-semibold text-gray-700'>{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                      </div>
                    )}
                    <ul className='flex flex-col pb-2'>
                      <li className='nav-item mt-4'>
                        <Link to='/admin' className='flex items-center'>
                          <GrUserAdmin className='mr-4 text-lg' />
                          <span>Admin Dashboard</span>
                        </Link>
                      </li>
                      <li className='nav-item mt-4'>
                        <Link to='/profile' className='flex items-center'>
                          <FiSettings className='mr-4 text-lg' />
                          <span>My Account</span>
                        </Link>
                      </li>
                      <li className='nav-item mt-2'>
                        <Link to={path.myOrders} className='flex items-center'>
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
                        {isAuth && (
                          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                          <span
                            onClick={() => {
                              setIsAuth(false);
                              clearAccessToken();
                              dispath(setUserInfor({ firstName: '', lastName: '', role: '', id: 0 }));
                            }}
                            className='flex items-center'
                          >
                            <BiLogIn className='mr-4 text-xl' />
                            <span>Logout</span>
                          </span>
                        )}
                        {!isAuth && (
                          <Link to='/login' className='flex items-center'>
                            <BiLogIn className='mr-4 text-xl' />
                            <span>Login</span>
                          </Link>
                        )}
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
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
