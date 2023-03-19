import Modal from 'src/components/modal';
import { useMemo, useState } from 'react';
import { User } from 'src/types/user.type';
import { type QueryObserverResult, type RefetchOptions, type RefetchQueryFilters } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
interface Props {
  user?: User;
  refetchAddress: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<User, any>, unknown>>;
}
function File({ user, refetchAddress }: Props) {
  const userMemo = useMemo(() => {
    if (user) {
      return user;
    }
  }, [user]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleUpdateUser = () => {
    setShowModal(!showModal);
  };

  return (
    <div className='w-full p-2'>
      <div className='border-b p-2'>
        <h2 className='text-xl font-semibold'>Hồ sơ của tôi</h2>
        <p className='text-base'>quản lý thông tin hồ sơ của bạn</p>
      </div>
      <div className='mt-2 flex min-h-[200px] w-full lg:min-h-[400px]'>
        <div className='mx-auto grid w-full grid-cols-7 lg:min-w-[700px]'>
          <div className='col-span-3 grid min-h-[8rem] grid-cols-1 p-2 lg:col-span-1'>
            <span className='text-left text-lg text-slate-300 lg:text-right'>Email:</span>
            <span className='text-left text-lg text-slate-300 lg:text-right '>Họ và tên:</span>
            <span className='text-left text-lg text-slate-300 lg:text-right '>Số điện thoại:</span>
          </div>
          <div className='col-span-4 grid min-h-[8rem] grid-cols-1 p-2 lg:col-span-6'>
            <span className='text-lg'> {user?.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2')}</span>
            <span className='text-lg'>{`${user?.firstName} ${user?.lastName}`}</span>
            <div className='text-lg'>{user?.phone || <i className='text-blue-400'>Chưa cập nhật số điện thoại</i>}</div>
          </div>
          <div className='col-span-7 flex h-[5rem] items-center justify-center'>
            <button
              onClick={handleUpdateUser}
              type='button'
              className='max-h-[3rem] rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none'
            >
              Cập nhật hồ sơ
            </button>
          </div>
        </div>
      </div>

      {showModal && <Modal refetchAddress={refetchAddress} infoData={userMemo} setShowModal={setShowModal}></Modal>}
    </div>
  );
}
export default File;
