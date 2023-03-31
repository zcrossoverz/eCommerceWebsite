import {
  type QueryObserverResult,
  type RefetchOptions,
  type RefetchQueryFilters,
  useMutation,
} from '@tanstack/react-query';
import { User } from 'src/types/user.type';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { type AxiosResponse } from 'axios';
import userApi from 'src/apis/user.api';
import { useTranslation } from 'react-i18next';

interface Props {
  user?: User;
  refetchAddress: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<User, any>, unknown>>;
}
function Address({ user, refetchAddress }: Props) {
  const { t } = useTranslation('address');
  const deleteAddressMutation = useMutation({
    mutationFn: (body: { idUser: number; idAddress: number }) => userApi.deleteAddress(body.idUser, body.idAddress),
  });
  const defaultAddressMutation = useMutation({
    mutationFn: (body: { idUser: number; idAddress: number }) => userApi.setDefaultAddress(body.idUser, body.idAddress),
  });
  const handleDeleteAddress = (idAddress: number) => {
    if (user?.id && idAddress) {
      deleteAddressMutation.mutate(
        { idUser: user.id, idAddress },
        {
          onSuccess: () => {
            refetchAddress();
          },
        }
      );
    }
  };
  const handleSetDefaultAdress = (idAddress: number) => {
    if (user?.id && idAddress) {
      defaultAddressMutation.mutate(
        {
          idAddress,
          idUser: user.id,
        },
        {
          onSuccess: () => {
            refetchAddress();
          },
        }
      );
    }
  };
  return (
    <div className='h-full w-full bg-white'>
      <div className='flex items-center justify-between border-b p-4'>
        <h2 className='text-xl font-semibold'>{t('address.my address')}</h2>

        <BtnAddAress user={user} refetchAddress={refetchAddress} />
      </div>
      {user?.address &&
        user?.address.length > 0 &&
        user.address.map((address) => (
          <div key={address.id} className='grid grid-cols-8 border-b p-4'>
            <div className='col-span-6 mr-2 flex flex-col items-start py-1'>
              <span>{address.address}</span>
              <div className='flex items-center'>
<<<<<<< HEAD
                <span className='mr-2 rounded border border-blue-400 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400'>
                  {t('address.receiving address')}
                </span>
                {user.default_address === address.id && (
                  <span className='mr-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'>
                    {t('address.default')}
=======
                <span className='mr-2 rounded border border-blue-400 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800'>
                  Địa chỉ nhận
                </span>
                {user.default_address === address.id && (
                  <span className='mr-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800'>
                    Mặc định
>>>>>>> f4258170ab83ebeed78136b17b68aceeb70e4745
                  </span>
                )}
              </div>
            </div>
            <div className='col-span-2 flex flex-col items-end'>
              <div className='flex items-center justify-center'>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className='py-1 text-sm text-orange-400 duration-300 hover:text-orange-500 md:px-2'
                >
                  {t('address.delete')}
                </button>
                <BtnAddAress
                  user={user}
                  refetchAddress={refetchAddress}
                  title={t('address.update') || 'Cập nhật'}
                  titleBtn={t('address.edit confirmation') || 'Xác nhận sửa'}
                  classStyle='md:px-2 px-1 whitespace-nowrap py-1 hover:underline text-sm text-blue-400 duration-300 hover:text-blue-500'
                  isUpdate={true}
                  address={address}
                />
              </div>

              <button
                onClick={() => handleSetDefaultAdress(address.id)}
                className='whitespace-nowrap rounded-sm border border-black px-2 py-1 duration-300 hover:bg-orange-200 '
              >
                <span className='hidden md:inline-block'>{t('address.default settings')}</span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
interface BtnAddAressProps extends Props {
  classStyle?: string;
  title?: string;
  isUpdate?: boolean;
  titleBtn?: string;
  address?: {
    id: number;
    address: string;
  };
}
function BtnAddAress({ refetchAddress, user, classStyle, title, isUpdate, address, titleBtn }: BtnAddAressProps) {
  const { t } = useTranslation('address');
  const addAdressMutation = useMutation({
    mutationFn: (body: { id: number; adress: string }) => userApi.addAddress(body.id, body.adress),
  });
  const updateAdressMutation = useMutation({
    mutationFn: (body: { id: number; adress: string; idAddress: number }) =>
      userApi.updateAddress(body.id, body.adress, body.idAddress),
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addressUser, setAddressUser] = useState<string>(address?.address ? address.address : '');

  function closeModal() {
    setAddressUser('');
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleAddAddress = () => {
    if (addressUser && user?.id && !isUpdate) {
      addAdressMutation.mutate(
        { id: user.id, adress: addressUser },
        {
          onSuccess: () => {
            setIsOpen(false);
            setAddressUser('');
            refetchAddress();
          },
        }
      );
    }
    if (addressUser && user?.id && isUpdate && address?.id) {
      updateAdressMutation.mutate(
        { id: user.id, adress: addressUser, idAddress: address?.id },
        {
          onSuccess: () => {
            setIsOpen(false);
            setAddressUser('');
            refetchAddress();
          },
        }
      );
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className={
          classStyle
            ? classStyle
            : 'rounded-sm bg-gradient-to-br from-pink-500 to-orange-400 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none'
        }
      >
        {title ? title : t('address.add address')}
        {/* {t('address.add address')} */}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-semibold leading-6 text-orange-400'>
                    {isUpdate ? t('address.update address') : t('address.add address')}
                  </Dialog.Title>
                  <div className='mt-2'>
                    <textarea
                      value={addressUser}
                      onChange={(e) => setAddressUser(e.target.value)}
                      rows={4}
<<<<<<< HEAD
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                      placeholder={t('address.enter your address here') || 'Nhập địa chỉ của bạn ở đây'}
=======
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                      placeholder='Điền địa chỉ của bạn vào đây'
>>>>>>> f4258170ab83ebeed78136b17b68aceeb70e4745
                    />
                  </div>

                  <div className='mt-4 flex items-center justify-end'>
                    <button
                      type='button'
                      className='mr-4 inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-black duration-200 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      {t('address.back')}
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
                      onClick={handleAddAddress}
                    >
                      {titleBtn ? titleBtn : t('address.more confirmation')}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default Address;
