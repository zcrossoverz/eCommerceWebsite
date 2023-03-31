import Modal from 'src/components/modal';
import { useMemo, useState } from 'react';
import { User } from 'src/types/user.type';
import { type QueryObserverResult, type RefetchOptions, type RefetchQueryFilters } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

interface Props {
  user?: User;
  refetchAddress: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<User, any>, unknown>>;
}
function File({ user, refetchAddress }: Props) {
  const { t } = useTranslation('file');
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
        <h2 className='text-xl font-semibold'>{t('file.my profile')}</h2>
        <p className='text-base'>{t('file.manage your profile information')}</p>
      </div>
      <div className='mt-2 flex min-h-[200px] w-full lg:min-h-[200px]'>
        <div className='mx-auto grid w-full grid-cols-7 lg:min-w-[700px]'>
          <div className='col-span-3 grid min-h-[8rem] grid-cols-1 p-2 lg:col-span-1'>
            <span className='text-left text-lg text-slate-300 lg:text-right'>Email:</span>
            <span className='text-left text-lg text-slate-300 lg:text-right '>{t('file.first and last name')}:</span>
            <span className='text-left text-lg text-slate-300 lg:text-right '>{t('file.phone number')}:</span>
          </div>
          <div className='col-span-4 grid min-h-[8rem] grid-cols-1 p-2 lg:col-span-6'>
            <span className='text-lg'> {user?.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2')}</span>
            <span className='text-lg'>{`${user?.firstName} ${user?.lastName}`}</span>
            <div className='text-lg'>
              {user?.phone || <i className='text-blue-400'>{t('file.the phone number has not been updated')}</i>}
            </div>
          </div>
          <div className='col-span-7 flex h-[5rem] items-center justify-center'>
            <button
              onClick={handleUpdateUser}
              type='button'
              className='max-h-[3rem] rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none'
            >
              {t('file.update profile')}
            </button>
          </div>
        </div>
      </div>

      {showModal && <Modal refetchAddress={refetchAddress} infoData={userMemo} setShowModal={setShowModal}></Modal>}
    </div>
  );
}
export default File;
