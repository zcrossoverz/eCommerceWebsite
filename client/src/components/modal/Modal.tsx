import { createPortal } from 'react-dom';
import { User, UserInfoWhenUpdate } from 'src/types/user.type';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateUserInfoSchema, updateInfo } from 'src/utils/rulesValidateForm';
import {
  useMutation,
  type QueryObserverResult,
  type RefetchOptions,
  type RefetchQueryFilters,
} from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import userApi from 'src/apis/user.api';
import { isAxiosErr } from 'src/utils/error';
import { toast } from 'react-toastify';
interface Props {
  refetchAddress: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<User, any>, unknown>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  infoData?: User;
}

function Modal({ setShowModal, infoData, refetchAddress }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInfoSchema>({
    resolver: yupResolver(updateInfo),
    defaultValues: {
      firstName: infoData?.firstName,
      lastName: infoData?.lastName,
      phone: infoData?.phone || '',
    },
  });
  const handleBack = () => {
    setShowModal(false);
  };
  const { mutate } = useMutation({
    mutationFn: (body: { id: number; data: UserInfoWhenUpdate }) => userApi.updateInfo(body.id, body.data),
  });
  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        id: Number(infoData?.id) || 0,
        data,
      },
      {
        onSuccess: () => {
          reset();
          setShowModal(false);
          refetchAddress();
        },
        onError: (err) => {
          if (isAxiosErr<{ error: string }>(err)) {
            toast.error(err.response?.data.error, {
              autoClose: 1000,
            });
          }
        },
      }
    );
  });
  return createPortal(
    <div className='fixed inset-0 z-50 bg-black/[.3]'>
      <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md bg-white'>
        <form className='p-4' noValidate onSubmit={onSubmit}>
          <div className='grid md:grid-cols-2 md:gap-6'>
            <div className='group relative z-0 mb-6 w-full'>
              <input
                type='text'
                className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                {...register('firstName')}
              />
              {errors.firstName?.message && <p className='text-red-500'>{errors.firstName.message}</p>}
              <label
                htmlFor='floating_first_name'
                className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600'
              >
                Họ
              </label>
            </div>
            <div className='group relative z-0 mb-6 w-full'>
              <input
                type='text'
                {...register('lastName')}
                className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
                placeholder=' '
              />
              {errors.lastName?.message && <p className='text-red-500'>{errors.lastName.message}</p>}
              <label
                htmlFor='floating_last_name'
                className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 '
              >
                Tên
              </label>
            </div>
          </div>
          <div className='mb-6'>
            <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900'>
              Số điện thoại
            </label>
            <input
              type='text'
              {...register('phone')}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            />
            {errors.phone?.message && <p className='text-red-500'>{errors.phone.message}</p>}
          </div>

          <div className='text-right'>
            <button
              type='button'
              onClick={handleBack}
              className=' rounded-lg bg-slate-200 px-5 py-2.5 text-center text-sm font-medium text-black duration-200 hover:bg-orange-200 focus:outline-none focus:ring-4 focus:ring-blue-300'
            >
              Trở lại
            </button>
            <button
              type='submit'
              onClick={onSubmit}
              className='ml-4 mt-2 rounded-lg bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white duration-200 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mt-0'
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
}
export default Modal;
