import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineFileText } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { NavLink, type PathMatch, Route, Routes, useMatch } from 'react-router-dom';
import userApi from 'src/apis/user.api';
import BreadCrumb from 'src/components/admindashboard/breadcrumb';
import HelmetSale from 'src/components/Helmet';
import Adress from 'src/components/user/adress';
import File from 'src/components/user/file';
import Password from 'src/components/user/password';
import Security from 'src/components/user/security';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';

function ProfileUser() {
  const { t } = useTranslation('profileUser');
  const [breadcrumbs, setBreadcrums] = useState<string>('');
  const { id: userId } = useSelector((state: RootState) => state.userReducer.userInfo);
  const { data: user, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUserByid(userId as number),
    enabled: userId !== undefined,
    staleTime: 15000,
  });
  const matchFile: PathMatch<string> | null = useMatch('/profile/file');
  const matchAddress: PathMatch<string> | null = useMatch('/profile/address');
  const matchPass: PathMatch<string> | null = useMatch('/profile/password');
  const match: string | null = matchFile?.pathname || matchAddress?.pathname || matchPass?.pathname || null;
  const matchBreadCrums = useRef('');
  useEffect(() => {
    if (match) {
      matchBreadCrums.current = '';
      for (let i = match.length; i > 0; i--) {
        if (match[i - 1] === '/') {
          break;
        } else {
          matchBreadCrums.current = match[i - 1] + matchBreadCrums.current;
        }
      }
      if (matchBreadCrums.current === 'file') {
        matchBreadCrums.current = t('profileUser.profile');
      }
      if (matchBreadCrums.current === 'address') {
        matchBreadCrums.current = t('profileUser.address');
      }
      if (matchBreadCrums.current === 'password') {
        matchBreadCrums.current = t('profileUser.change password');
      }
      setBreadcrums(matchBreadCrums.current);
    }
  }, [match, t]);

  return (
    <>
      {breadcrumbs && (
        <div className='mx-auto my-2 max-w-7xl'>
          <BreadCrumb path={['Fstore', `${t('profileUser.my account')}`, breadcrumbs]} />
        </div>
      )}
      {!breadcrumbs && (
        <div className='mx-auto my-2 max-w-7xl'>
          <BreadCrumb path={['Fstore', t('profileUser.my account')]} />
        </div>
      )}
      <div className='mx-auto my-2 grid max-w-7xl grid-cols-12 overflow-hidden rounded-md bg-blue-100 lg:min-h-[300px] lg:bg-transparent'>
        <HelmetSale title='Tài khoản của bạn'></HelmetSale>
        <div className='col-span-12 lg:col-span-3'>
          <div className='hidden border-b lg:block'>
            <div className='flex items-center p-4'>
              <button
                type='button'
                className='mr-2 inline-flex items-center rounded-lg bg-blue-700 p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <svg
                  aria-hidden='true'
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='sr-only'>Icon description</span>
              </button>
              <span>{`${user?.data.firstName} ${user?.data.lastName}`}</span>
            </div>
          </div>
          <div className='p-1 md:p-4 '>
            <ul className='flex items-center justify-between md:block'>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'flex items-center py-2 text-orange-500' : 'flex items-center py-2 hover:text-orange-500'
                  }
                  to='/profile/file'
                >
                  <AiOutlineFileText className='mr-2 text-xl' />
                  <span>{t('profileUser.profile')}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'flex items-center py-2 text-orange-500' : 'flex items-center py-2 hover:text-orange-500'
                  }
                  to='/profile/address'
                >
                  <HiOutlineLocationMarker className='mr-2 text-xl' />
                  <span>{t('profileUser.address')}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'flex items-center py-2 text-orange-500' : 'flex items-center py-2 hover:text-orange-500'
                  }
                  to='/profile/password'
                >
                  <RiLockPasswordLine className='mr-2 text-xl' />
                  <span>{t('profileUser.change password')}</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className='col-span-12 flex items-center justify-center bg-white shadow-md lg:col-span-9'>
          <Routes>
            <Route index path='/' element={<Security />}></Route>
            <Route path='/file' element={<File refetchAddress={refetch} user={user?.data} />}></Route>
            <Route path='/address' element={<Adress refetchAddress={refetch} user={user?.data} />}></Route>
            <Route path='/password' element={<Password />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}
export default ProfileUser;
