import { useQuery } from '@tanstack/react-query';
import { AiOutlineFileText } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import userApi from 'src/apis/user.api';
import Adress from 'src/components/user/adress';
import File from 'src/components/user/file';
import Password from 'src/components/user/password';
import { RootState } from 'src/store';

function ProfileUser() {
  const { id: userId } = useSelector((state: RootState) => state.userReducer.userInfo);
  const { data: user, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUserByid(userId as number),
    enabled: userId !== undefined,
    staleTime: 15000,
    onSuccess(data) {
      console.log(data.data.address.length);
    },
  });
  return (
    <div className='mx-auto my-2 grid max-w-7xl grid-cols-12 lg:min-h-[300px]'>
      <div className='col-span-3 bg-white'>
        <div className='border-b'>
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
        <div className='p-4'>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'flex items-center py-2 text-orange-500' : 'flex items-center py-2 hover:text-orange-500'
                }
                to='/profile/file'
              >
                <AiOutlineFileText className='mr-2 text-xl' />
                <span>Hồ sơ</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'flex items-center py-2 text-orange-500' : 'flex items-center py-2 hover:text-orange-500'
                }
                to='/profile/adress'
              >
                <HiOutlineLocationMarker className='mr-2 text-xl' />
                <span>Địa chỉ</span>
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
                <span>Đổi mật khẩu</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className='col-span-9 bg-white shadow-md'>
        <Routes>
          <Route index path='file' element={<File refetchAddress={refetch} user={user?.data} />}></Route>
          <Route path='adress' element={<Adress refetchAddress={refetch} user={user?.data} />}></Route>
          <Route path='password' element={<Password />}></Route>
        </Routes>
      </div>
    </div>
  );
}
export default ProfileUser;
