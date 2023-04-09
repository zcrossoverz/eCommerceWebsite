import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { toast } from 'react-toastify';
import userApi from 'src/apis/user.api';
import Pagination from 'src/components/paginate';
import useQueryParams from 'src/hooks/useQueryParams';
import { ProductListConfig } from 'src/types/product.type';
import { isAxiosErr } from 'src/utils/error';
import 'moment/src/locale/vi';
import convertDate from 'src/utils/convertDate';
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { GrOverview } from 'react-icons/gr';
import { Link } from 'react-router-dom';
export default function UserDashboard() {
  moment.updateLocale('vi', {});
  const query = useQueryParams();
  const queryParams: ProductListConfig = {
    page: query.page ? query.page : '1',
    limit: query.limit ? query.limit : '10',
  };
  const { data } = useQuery({
    queryKey: ['getAllUsers', queryParams],
    queryFn: () => userApi.getAllUser(queryParams),
    onError: (err) => {
      if (
        isAxiosErr<{
          error: string;
        }>(err)
      ) {
        toast.error(err.response?.data.error, { autoClose: 2000 });
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
  return (
    <div className=''>
      <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-md'>
        <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
          <thead className='bg-teal-400'>
            <tr>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Họ tên
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Ngày tạo
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Vai trò
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Số điện thoại
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
            {data?.data &&
              data.data.data &&
              data.data.data.map((user) => (
                <tr key={user.id} className='hover:bg-gray-50'>
                  <th className='flex gap-3 px-6 py-4 font-normal text-gray-900'>
                    <div className='text-sm'>
                      <div className='font-medium text-gray-700'>{user.firstName + ' ' + user.lastName}</div>
                      <div className='text-gray-400'>{user.email}</div>
                    </div>
                  </th>
                  <td className='px-6 py-4'>
                    <span>{convertDate(user.createAt)}</span>
                  </td>
                  <td className='px-6 py-4'>{user.role}</td>
                  <td className='px-6 py-4'>
                    <span>{user.phone ? user.phone : 'Chưa có số điện thoại'}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex gap-4'>
                      <span>
                        <AiOutlineDelete size={30} />
                      </span>
                      <Link to={`details/${user.id}`}>
                        <AiOutlineInfoCircle size={30} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col justify-end'>
        <Pagination queryConfig={{ ...queryParams, path: '/admin/user' }} pageSize={data?.data.last_page || 1} />
      </div>
    </div>
  );
}
