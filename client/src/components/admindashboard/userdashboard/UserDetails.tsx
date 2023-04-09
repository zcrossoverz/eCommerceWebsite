import { useMutation, useQuery } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from 'src/apis/user.api';
import convertDate from 'src/utils/convertDate';

function UserDetails() {
  const params = useParams<{
    userId: string;
  }>();
  const { data: user, refetch } = useQuery({
    queryKey: ['user', { paramsUserId: params.userId }],
    queryFn: () => userApi.getUserByid(Number(params.userId)),
    enabled: Boolean(params.userId),
    staleTime: 15000,
  });
  const { mutate } = useMutation({
    mutationFn: (body: {
      id: number;
      data: {
        role: string;
      };
    }) => userApi.updateInfo(body.id, body.data),
  });
  const handleChangeRole = (e: ChangeEvent<HTMLSelectElement>) => {
    if (user?.data && user.data.id && user.data.role !== e.target.value && e.target.value !== 'notValid') {
      mutate(
        {
          id: user.data.id,
          data: {
            role: e.target.value,
          },
        },
        {
          onSuccess() {
            toast.success('Thay đổi thông tin thành công', { autoClose: 2000 });
          },
        }
      );
    }
  };
  return (
    <div className='max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>Dữ liệu của người dùng</h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>Thông tin chi tiết về người dùng.</p>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Họ tên</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {user?.data.firstName + ' ' + user?.data.lastName}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Vai trò</dt>
            <dd className='mt-1 flex items-center justify-start text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <span>{user?.data.role}</span>
              <div className='ml-2 flex items-center justify-center'>
                <select
                  onChange={handleChangeRole}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 py-1 px-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 '
                >
                  <option value='notValid' selected>
                    Thay đổi
                  </option>
                  <option value='admin'>Admin</option>
                  <option value='member'>Member</option>
                </select>
              </div>
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Địa chỉ email</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{user?.data.email}</dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Địa chỉ</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {user?.data.address.find((addr) => addr.id === user.data.default_address)?.address ||
                'Chưa cập nhật địa chỉ'}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Số điện thoại</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {user?.data.phone || 'Chưa cập nhật số điện thoại'}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Ngày tạo tài khoản</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {convertDate(user?.data.createAt || '08-26-2023')}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
export default UserDetails;
