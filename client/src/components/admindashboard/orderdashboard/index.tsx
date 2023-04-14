/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import BreadCrumb from '../breadcrumb';
import { Key, useEffect, useState } from 'react';
import orderApi from 'src/apis/order.api';
import Pagination from 'src/components/paginate';
import useQueryParams from 'src/hooks/useQueryParams';
import { AiOutlineDelete, AiOutlineFileSearch } from 'react-icons/ai';
import HelmetSale from 'src/components/Helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function OrderDashboard() {
  const query = useQueryParams();
  const [orderBy, setOrderBy] = useState('newest');
  const [filterSearch, setFilterSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState(-1);
  const [filterMethodPayment, setMethodPayment] = useState(-1);
  const [filterPaymentIsPaid, setPaymentIsPaid] = useState(-1);
  const [params, setParams] = useState({
    page: '1',
    limit: '9',
    order: '',
    status: -1,
    method: -1,
    paid: -1,
    search: '',
  });
  useEffect(() => {
    setParams({
      ...params,
      page: query.page !== undefined ? `${query.page}` : '1',
    });
  }, [query.page]);
  useEffect(() => {
    setParams({
      ...params,
      order: orderBy,
    });
  }, [orderBy]);
  useEffect(() => {
    setParams({
      ...params,
      status: filterStatus,
    });
  }, [filterStatus]);

  useEffect(() => {
    setParams({
      ...params,
      method: filterMethodPayment,
    });
  }, [filterMethodPayment]);

  useEffect(() => {
    setParams({
      ...params,
      paid: filterPaymentIsPaid,
    });
  }, [filterPaymentIsPaid]);

  useEffect(() => {
    setParams({
      ...params,
      search: filterSearch,
    });
  }, [filterSearch]);

  const { data, isLoading, refetch } = useQuery(['get_all_orders', params], () => orderApi.getAll(params), {
    retry: false,
  });

  const navigate = useNavigate();

  return (
    <div className='mt-4'>
      <HelmetSale title='Quản lý đơn hàng'></HelmetSale>
      <BreadCrumb path={['Product', 'Order Dashboard']} />
      <div className='mt-4 grid grid-cols-6 gap-4'>
        <div className='col-span-2 mr-4'>
          <input
            className='w-full appearance-none rounded-lg border-2 border-gray-50 bg-gray-50 py-3 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:shadow-md focus:shadow-purple-300 focus:outline-none'
            id='inline-full-name'
            type='number'
            placeholder='enter id of order'
            onChange={(e) => setFilterSearch(e.target.value)}
          />
        </div>
        <div className='col-span-1'>
          <select
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-300 focus:ring-blue-500'
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option className='mt-1' value='newest' defaultChecked={true}>
              Newest
            </option>
            <option className='mt-1' value='oldest'>
              Oldest
            </option>
          </select>
        </div>
        <div className='col-span-1'>
          <select
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-300 focus:ring-blue-500'
            onChange={(e) => setFilterStatus(Number(e.target.value))}
          >
            <option className='mt-1' value='-1'>
              All Status
            </option>
            <option className='mt-1' value='0'>
              Status: PENDING
            </option>
            <option className='mt-1' value='1'>
              Status: PROCESSING
            </option>
            <option className='mt-1' value='2'>
              Status: SHIPPED
            </option>
            <option className='mt-1' value='3'>
              Status: COMPLETED
            </option>
            <option className='mt-1' value='4'>
              Status: CANCELLED
            </option>
            <option className='mt-1' value='5'>
              Status: RETURNED
            </option>
            <option className='mt-1' value='6'>
              Status: RETURN_COMPLETED
            </option>
          </select>
        </div>
        <div className='col-span-1'>
          <select
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-300 focus:ring-blue-500'
            onChange={(e) => setMethodPayment(Number(e.target.value))}
          >
            <option className='mt-1' value='-1'>
              All Payment
            </option>
            <option className='mt-1' value='3'>
              Method: NOT_SET
            </option>
            <option className='mt-1' value='1'>
              Method: CASH_ON_DELIVERY
            </option>
            <option className='mt-1' value='2'>
              Method: PAYPAL
            </option>
            <option className='mt-1' value='4'>
              Method: RETURNED
            </option>
          </select>
        </div>
        <div className='col-span-1'>
          <select
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-300 focus:ring-blue-500'
            onChange={(e) => setPaymentIsPaid(Number(e.target.value))}
          >
            <option className='mt-1' value='-1'>
              All
            </option>
            <option className='mt-1' value='1'>
              Paid: YES
            </option>
            <option className='mt-1' value='0'>
              Paid: NO
            </option>
          </select>
        </div>
      </div>
      <div>
        <div className='mt-4 flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='inline-block w-full align-middle'>
              <div className='overflow-hidden rounded-xl border'>
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
                {data?.data && data.data.data.length > 0 && (
                  <div>
                    <div className='overflow-x-scroll'>
                      <table className='min-w-full divide-y divide-gray-200 bg-white'>
                        <thead className='bg-pink-400/20'>
                          <tr>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                              ID
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                              STATUS
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                              CUSTOMER
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                              METHOD
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                              AMOUNT
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                              PAID
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                              TIME
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-center text-xs font-bold uppercase text-gray-500 '
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                          {data?.data.data.map((e, i: { toString: () => Key | null | undefined }) => {
                            const date = new Date(e.create_at);
                            const hours = date.getUTCHours();
                            const minutes = date.getUTCMinutes();
                            const seconds = date.getUTCSeconds();
                            const day = date.getUTCDate();
                            const month = date.getUTCMonth() + 1;
                            const year = date.getUTCFullYear();

                            return (
                              <tr key={i.toString()}>
                                <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800'>
                                  {e.order_id}
                                </td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.status}</td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{`${e.user.firstName} ${e.user.lastName}`}</td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
                                  {e.payment.method}
                                </td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
                                  {e.payment.amount}
                                </td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
                                  {e.payment.is_paid ? 'YES' : 'NO'}
                                </td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{`${('0' + day).slice(
                                  -2
                                )}/${('0' + month).slice(-2)}/${year} ${hours}:${minutes}:${seconds}`}</td>
                                <td className='flex whitespace-nowrap px-6 py-4 text-center text-sm font-medium'>
                                  <button className='px-1 text-blue-500 hover:text-blue-700'>
                                    <AiOutlineFileSearch
                                      className='text-2xl'
                                      onClick={() => navigate(`./detail/${e.order_id}`)}
                                    />
                                  </button>
                                  <button className='px-1 text-red-400 hover:text-red-600'>
                                    <AiOutlineDelete
                                      className='text-2xl'
                                      onClick={async () => {
                                        await orderApi.deleteOrder(e.order_id);
                                        toast.success('delete success!');
                                        refetch();
                                      }}
                                    />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className='flex justify-end'>
                      <Pagination
                        pageSize={Math.ceil(data.data.total / data.data.data_per_page)}
                        queryConfig={{ page: params.page, limit: params.limit, path: '/admin/order/' }}
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
