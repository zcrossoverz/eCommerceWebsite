import { useQuery } from '@tanstack/react-query';
import BreadCrumb from '../breadcrumb';
import productsApi from 'src/apis/product.api';
import Pagination from 'src/components/paginate';
import useQueryParams from 'src/hooks/useQueryParams';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineFileSearch } from 'react-icons/ai';
import HelmetSEO from 'src/components/Helmet';

export default function ManageProduct() {
  const [search, setSearch] = useState('');
  const query = useQueryParams();
  const [filterOrder, setFilterOrder] = useState('newest');
  const [params, setParams] = useState({
    page: '1',
    limit: '9',
    search: '',
    order: 'newest',
  });
  useEffect(() => {
    setParams({
      limit: '9',
      page: '1',
      search,
      order: 'newest',
    });
  }, [search]);
  useEffect(() => {
    setParams({
      ...params,
      order: filterOrder,
    });
  }, [filterOrder]);
  useEffect(() => {
    setParams({
      ...params,
      page: `${query.page}`,
    });
  }, [query.page]);

  const { data, isLoading, refetch } = useQuery(
    ['products', params],
    () =>
      productsApi.getProductsList({
        ...params,
        page: params.page !== undefined ? params.page : '1',
      }),
    {
      retry: false,
    }
  );
  const navigate = useNavigate();

  return (
    <div className='mt-4'>
      <HelmetSEO title='Quản lý sản phẩm'></HelmetSEO>
      <BreadCrumb path={['Product', 'Manage Product']} />
      <div className='mt-4 grid grid-cols-6'>
        <div className='col-span-2 mr-4'>
          <input
            className='w-full appearance-none rounded-lg border-2 border-gray-50 bg-gray-50 py-3 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:shadow-md focus:shadow-purple-300 focus:outline-none'
            id='inline-full-name'
            type='text'
            placeholder='search'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='col-span-1'>
          <select
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-300 focus:ring-blue-500'
            onChange={(e) => setFilterOrder(e.target.value)}
          >
            <option className='mt-1' value='newest' defaultChecked={true}>
              Newest
            </option>
            <option className='mt-1' value='oldest'>
              Oldest
            </option>
          </select>
        </div>
        <div className='col-span-1 col-end-7'>
          <button
            className='rounded-xl bg-blue-900 py-3 px-8 text-gray-400 hover:bg-blue-600 hover:text-white hover:shadow-primary hover:shadow-lg'
            onClick={() =>
              navigate('./form', {
                state: {
                  type: 'create',
                },
              })
            }
          >
            CREATE
          </button>
        </div>
      </div>
      <div>
        <div className='mt-4 flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='inline-block w-full align-middle'>
              <div className='h-full overflow-hidden rounded-xl border'>
                {isLoading && (
                  <div className='grid h-80 place-items-center'>
                    <svg
                      aria-hidden='true'
                      className='mr-2 inline h-8 w-8 animate-spin fill-purple-600 text-gray-500'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                  </div>
                )}
                {data?.data && (
                  <div>
                    <table className='min-w-full divide-y divide-gray-200 bg-white'>
                      <thead className='bg-pink-400/20'>
                        <tr>
                          <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                            ID
                          </th>
                          <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                            Name
                          </th>
                          <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                            Brand
                          </th>
                          <th scope='col' className='px-6 py-3 text-right text-xs font-bold uppercase text-gray-500 '>
                            <p className='mr-4'>Actions</p>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {data?.data.data.map((e, i) => {
                          return (
                            <tr key={i.toString()}>
                              <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800'>{e.id}</td>
                              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.name}</td>
                              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.brand}</td>
                              <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                                <button className='px-1 text-blue-500 hover:text-blue-700'>
                                  <AiOutlineFileSearch
                                    className='text-2xl'
                                    onClick={() => navigate(`./detail/${e.id}`)}
                                  />
                                </button>
                                <button className='px-1 text-green-400 hover:text-green-600'>
                                  <AiOutlineEdit
                                    className='text-2xl'
                                    onClick={() => {
                                      navigate('./form', {
                                        state: {
                                          type: 'edit',
                                          id: e.id,
                                        },
                                      });
                                    }}
                                  />
                                </button>
                                <button
                                  onClick={async () => {
                                    await productsApi.deleteProduct(e.id);
                                    toast.success('delete success!');
                                    refetch();
                                  }}
                                  className='text-red-500 hover:text-red-700'
                                >
                                  <AiOutlineDelete className='text-2xl' />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className='flex justify-end'>
                      <Pagination
                        pageSize={Math.ceil(data.data.total / data.data.data_per_page)}
                        queryConfig={{ limit: '9', path: '/admin/product/' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
