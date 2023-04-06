import { useContext, useEffect, useState } from 'react';
import { BsSearch, BsTelephoneForward } from 'react-icons/bs';
import { GoDiffRenamed } from 'react-icons/go';
import classNames from 'classnames';
import { FiSettings } from 'react-icons/fi';
import { BiHelpCircle, BiLogIn, BiShoppingBag } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppContext } from 'src/contexts/app.context';
import { clearAccessToken } from 'src/utils/auth';
import userApi from 'src/apis/user.api';
import path from 'src/constants/path';
import { RiUserSettingsLine } from 'react-icons/ri';
import Cart from '../popover/CartPopover';
import useClickOutSide from 'src/hooks/useClickOutSide';
import { GrUserAdmin } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import logo from 'src/assets/logo.svg';
import Language from '../language/Language';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import notiApi from 'src/apis/noti.api';
import { ResNoti } from 'src/types/noti.type';
import { RootState } from 'src/store';
import { logoutCart } from 'src/slices/cart.slice';

function Header() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AppContext);
  const [showMenuUser, setShowMenuUser] = useState<boolean>(false);
  const [showNotify, setShowNotify] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  const [searchProduct, setSearchProduct] = useState<string>('');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [noti, setNoti] = useState<ResNoti>();
  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: ['user'],
    queryFn: () => userApi.getUserByid(userInfo.id as number),
    enabled: isAuth,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const { refetch } = useQuery({
    queryKey: ['noti'],
    queryFn: () => notiApi.getUnreadNoti(userInfo?.id || 0),
    onSuccess: (data) => {
      setNoti(data.data);
      refetchUser();
    },
    retry: 1,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { nodeRef } = useClickOutSide(() => {
    setShowMenuUser(false);
  });
  const { nodeRef: notiRef } = useClickOutSide(() => {
    setShowNotify(false);
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
  const handleLogout = () => {
    setIsAuth(false);
    clearAccessToken();
    dispatch(logoutCart([]));
    queryClient.removeQueries();
  };
  return (
    <AnimatePresence>
      <motion.header
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transform: 'scale(0)' }}
        transition={{
          layout: {
            duration: 0.3,
          },
        }}
        className={classNames('top-0 left-0 right-0 z-10 bg-orange-600 text-white shadow-md', {
          fixed: scrolled,
          relative: !scrolled,
        })}
      >
        <nav className='border-gray-200 px-2 py-2.5 sm:px-4'>
          <div className='mx-auto flex max-w-7xl items-center justify-between'>
            <Link to={path.home} className='mx-0 flex flex-shrink-0 items-center md:min-w-[2rem] md:p-2'>
              <img src={logo} className='mr-1 h-6 md:h-9' alt='fstore Logo' />
            </Link>
            <div className='hidden items-center px-2 lg:flex'>
              <BsTelephoneForward className='mr-2 text-lg' />
              <div className='flex flex-col items-start'>
                <span className='text-sm'>{t('aside filter.support hotline')}</span>
                <span className='text-sm font-bold'>0907588963</span>
              </div>
            </div>
            {/* search input */}
            <form className='ml-2 flex-shrink md:min-w-[30rem]' onSubmit={handleSearch}>
              <div className='relative'>
                <input
                  value={searchProduct}
                  onChange={handleChangeSearch}
                  type='search'
                  className='block max-h-[2.5rem] w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pr-10 text-sm text-gray-900 outline-none placeholder:line-clamp-1'
                  placeholder={t('header.search by product name') || ''}
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

            <div className='hidden items-center lg:flex '>
              <MdLanguage className='mr-1 mt-0.5 text-lg text-gray-700 lg:text-white' />
              <Language />
            </div>
            <div className='flex items-center justify-between lg:min-w-[8rem]'>
              {/* notify */}
              <div className='relative' ref={notiRef}>
                <button
                  className='flex h-10 w-10 items-center justify-center rounded-[50%] duration-300 focus:outline-none'
                  onClick={() => {
                    setShowNotify(!showNotify);
                    refetch();
                  }}
                >
                  {user?.data && user.data.unread_message > 0 && (
                    <span className='absolute top-0 right-0.5 flex items-center justify-center rounded-md bg-white px-1.5 text-xs text-orange-600'>
                      {user.data.unread_message}
                    </span>
                  )}
                  <IoMdNotificationsOutline className='text-2xl text-white' />
                </button>
                {showNotify && (
                  <motion.div
                    className={classNames(
                      'fixed top-14 right-0.5 w-[full] rounded-lg bg-white px-4 py-1 shadow-md md:absolute md:w-[360px]'
                    )}
                    initial={{ opacity: 0, transform: 'scale(0)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* triangle up */}
                    <div className='absolute -top-[12px] right-2 hidden h-0 w-0 border-l-[10px] border-b-[15px] border-r-[10px] border-l-transparent border-b-white border-r-transparent md:block'></div>
                    <ul className='flex max-h-[340px] flex-col overflow-auto pb-2'>
                      {!noti?.data.length && (
                        <div className='flex h-full w-full flex-col items-center justify-center'>
                          <img
                            className='h-24'
                            alt='img'
                            src='https://cdn.dribbble.com/users/1373705/screenshots/6457914/no_notification_yiran.png?compress=1&resize=400x300&vertical=top'
                          />
                          <span className='text-black'>Không có thông báo mới nào!</span>
                        </div>
                      )}
                      {noti?.data.length &&
                        noti?.data.map((notiItem) => (
                          <li key={notiItem.id} className='nav-item mt-4 border-b pb-2'>
                            <p className='text-justify text-xs text-gray-400 md:text-sm'>{notiItem.content}</p>
                          </li>
                        ))}
                    </ul>
                  </motion.div>
                )}
              </div>
              {/* cart */}
              <Cart />
              {/* user setting */}
              <div className='relative flex' ref={nodeRef}>
                <button
                  onClick={() => {
                    setShowMenuUser(!showMenuUser);
                  }}
                  type='button'
                  className='group flex h-10 w-10 items-center justify-center rounded-[50%] duration-300 focus:outline-none'
                >
                  <RiUserSettingsLine className='mt-0.5 text-2xl text-white' />
                </button>

                {/* menu user */}
                {showMenuUser && (
                  <motion.div
                    className={classNames('absolute top-14 right-0 w-[300px] rounded-lg bg-white px-4 py-1 shadow-md ')}
                    initial={{ opacity: 0, transform: 'scale(0)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* triangle up */}
                    <div className='absolute -top-[12px] right-2 h-0 w-0 border-l-[10px] border-b-[15px] border-r-[10px] border-l-transparent border-b-white border-r-transparent'></div>

                    {isAuth && userInfo && (
                      <div className='flex items-center border-b py-2'>
                        <GoDiffRenamed className='mr-4 text-lg text-black' />
                        <span className='text-lg font-semibold text-gray-700'>{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                      </div>
                    )}
                    <ul className='flex flex-col pb-2'>
                      {userInfo?.role === 'admin' && (
                        <li className='nav-item mt-4'>
                          <Link to='/admin' className='flex items-center'>
                            <GrUserAdmin className='mr-4 text-lg' />
                            <span>Admin Dashboard</span>
                          </Link>
                        </li>
                      )}
                      <li className='nav-item mt-4'>
                        <Link to='/profile' className='flex items-center'>
                          <FiSettings className='mr-4 text-lg' />
                          <span>{t('header.my account')}</span>
                        </Link>
                      </li>
                      <li className='nav-item mt-2'>
                        <Link to={path.myOrders} className='flex items-center'>
                          <BiShoppingBag className='mr-4 text-xl' />
                          <span>{t('header.my order')}</span>
                        </Link>
                      </li>
                      <li className='nav-item mt-2'>
                        <Link to='/user' className='flex items-center'>
                          <BiHelpCircle className='mr-4 text-xl' />
                          <span>{t('header.help')}</span>
                        </Link>
                      </li>
                      <li className='nav-item mt-2 block lg:hidden'>
                        <div className='flex items-center'>
                          <MdLanguage className='mr-4 text-xl text-gray-700' />
                          <Language />
                        </div>
                      </li>

                      <li className='nav-item mt-2'>
                        {isAuth && (
                          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                          <button
                            onClick={() => {
                              handleLogout();
                            }}
                            className='flex items-center'
                          >
                            <BiLogIn className='mr-4 text-xl' />
                            <span>{t('header.logout')}</span>
                          </button>
                        )}
                        {!isAuth && (
                          <Link to='/login' className='flex items-center'>
                            <BiLogIn className='mr-4 text-xl' />
                            <span>{t('header.login')}</span>
                          </Link>
                        )}
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </motion.header>
    </AnimatePresence>
  );
}
export default Header;
