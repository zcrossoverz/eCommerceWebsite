/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import BreadCrumb from '../breadcrumb';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useState } from 'react';
import { toast } from 'react-toastify';
import couponApi from 'src/apis/coupon.api';
import HelmetSEO from 'src/components/Helmet';
import Datepicker from 'react-tailwindcss-datepicker';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const CouponModal = ({ refetch, openModal }: { refetch: any; openModal: any }) => {
  const date_now = new Date();
  const [date, setDate] = useState({
    startDate: `${date_now.getFullYear()}-${date_now.getMonth() + 1}-${date_now.getDate()}`,
    endDate: `${date_now.getFullYear()}-${date_now.getMonth() + 1}-${date_now.getDate()}`,
  });

  const [number, setNumber] = useState(0);
  const [type, setType] = useState('PERCENT');
  const [value, setValue] = useState(0);

  const create = async () => {
    const start_date = new Date(date.startDate);
    const end_date = new Date(date.endDate);
    await couponApi.createCoupon(
      number,
      value,
      type,
      `${start_date.getMonth() + 1}/${start_date.getDate()}/${start_date.getFullYear()}`,
      `${end_date.getMonth() + 1}/${end_date.getDate()}/${end_date.getFullYear()}`
    );
    toast.success('create coupon success');
    openModal(false);
    refetch();
  };
  const { t } = useTranslation('addashboard');

  return (
    <div className='z-100 fixed inset-0 top-1/2 left-1/2 -translate-x-1/3 -translate-y-3/4'>
      <div className='relative h-full w-full max-w-2xl md:h-auto'>
        <div className='relative rounded-lg bg-white shadow-xl'>
          <div className='flex items-start justify-between rounded-t border-b p-4'>
            <h3 className='text-xl font-semibold text-gray-900'>{t('coupon.crenewcoupon')}</h3>
            <button
              onClick={() => openModal(false)}
              className='ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
            >
              <svg
                aria-hidden='true'
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>

          <div className='space-y-6 p-6'>
            <p className='text-base leading-relaxed text-gray-500'>
              <p>{t('product.number')}: </p>
              <input
                className='w-full rounded-xl border border-gray-400 px-2 py-2'
                type='number'
                onChange={(e) => setNumber(Number(e.target.value))}
              />
            </p>
            <p className='text-base leading-relaxed text-gray-500'>
              <p>{t('product.type')}:</p>
              <select
                className='w-full rounded-xl border border-gray-400 px-2 py-2'
                onChange={(e) => setType(e.target.value)}
              >
                <option value='PERCENT'>{t('coupon.percent')}</option>
                <option value='AMOUNT'>{t('orders.amount')}</option>
              </select>
            </p>
            <p className='text-base leading-relaxed text-gray-500'>
              <p>{t('product.value')}:</p>
              <input
                className='w-full rounded-xl border border-gray-400 px-2 py-2'
                type='number'
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </p>
            <p className='text-base leading-relaxed text-gray-500'>
              <p>{t('coupon.expirydate')}:</p>
              <Datepicker
                value={date}
                onChange={(e) => {
                  setDate({
                    startDate: e?.startDate?.toString() ? e.startDate?.toString() : '',
                    endDate: e?.endDate?.toString() ? e.endDate?.toString() : '',
                  });
                }}
                primaryColor='teal'
              />
            </p>
          </div>

          <div className='flex items-center space-x-2 rounded-b border-t border-gray-200 p-6'>
            <button
              onClick={create}
              className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 '
            >
              {t('product.confirm')}
            </button>
            <button
              onClick={() => openModal(false)}
              className='rounded-lg border border-gray-500 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300'
            >
              {t('product.cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ManageCoupon() {
  const { t } = useTranslation('addashboard');
  const [params, setParams] = useState({
    limit: '20',
    page: '1',
    search: '',
  });

  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery(['get_all_coupons'], () => couponApi.getAllCoupon());

  return (
    <div className='mt-4'>
      <HelmetSEO title={t('maindashboard.manage coupon')}></HelmetSEO>
      <BreadCrumb path={[t('maindashboard.products'), t('maindashboard.manage coupon')]} />
      <div className='mt-4 grid grid-cols-6'>
        <div className='col-span-2 mr-4 hidden'>
          <input
            className='w-full appearance-none rounded-lg border-2 border-gray-50 bg-gray-50 py-3 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:shadow-md focus:shadow-purple-300 focus:outline-none'
            id='inline-full-name'
            type='text'
            placeholder='search'
            onChange={(e) =>
              setParams({
                ...params,
                search: e.target.value,
              })
            }
          />
        </div>
        <div className='col-span-1'>
          <select className='block hidden w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-300 focus:ring-blue-500'>
            <option className='mt-1' value='default'>
              {t('product.sort by')}
            </option>
            <option className='mt-1' value='sale'>
              {t('product.sale')}
            </option>
            <option className='mt-1' value='stock'>
              {t('product.stock')}
            </option>
          </select>
        </div>
        <div className='col-span-1 col-end-6 md:col-end-7'>
          <button
            className='rounded-xl bg-blue-900 py-3 px-8 text-gray-400 hover:bg-blue-600 hover:text-white hover:shadow-primary hover:shadow-lg'
            onClick={() => setModalOpen(true)}
          >
            {t('product.create')}
          </button>
        </div>
      </div>
      <div>
        {modalOpen && <CouponModal refetch={refetch} openModal={setModalOpen} />}
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

                {data?.data && data.data.length > 0 && (
                  <div className='overflow-x-scroll'>
                    <table className='min-w-full divide-y divide-gray-200 bg-white shadow-lg'>
                      <thead className='bg-pink-400/20'>
                        <tr>
                          <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                            ID
                          </th>
                          <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                            {t('product.code')}
                          </th>
                          <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                            {t('product.type')}
                          </th>
                          <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                            {t('product.value')}
                          </th>
                          <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                            {t('product.number')}
                          </th>
                          <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                            {t('product.start')}
                          </th>
                          <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                            {t('product.end')}
                          </th>
                          <th scope='col' className='px-6 py-3 text-center text-xs font-bold uppercase text-gray-500 '>
                            {t('product.action')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {data?.data.map(
                          (
                            e: {
                              id:
                                | string
                                | number
                                | boolean
                                | ReactElement<any, string | JSXElementConstructor<any>>
                                | ReactFragment
                                | ReactPortal
                                | null
                                | undefined;
                              code:
                                | string
                                | number
                                | boolean
                                | ReactElement<any, string | JSXElementConstructor<any>>
                                | ReactFragment
                                | ReactPortal
                                | null
                                | undefined;
                              type:
                                | string
                                | number
                                | boolean
                                | ReactElement<any, string | JSXElementConstructor<any>>
                                | ReactFragment
                                | ReactPortal
                                | null
                                | undefined;
                              value:
                                | string
                                | number
                                | boolean
                                | ReactElement<any, string | JSXElementConstructor<any>>
                                | ReactFragment
                                | ReactPortal
                                | null
                                | undefined;
                              number:
                                | string
                                | number
                                | boolean
                                | ReactElement<any, string | JSXElementConstructor<any>>
                                | ReactFragment
                                | ReactPortal
                                | null
                                | undefined;
                              start_date:
                                | string
                                | number
                                | boolean
                                | ReactElement<any, string | JSXElementConstructor<any>>
                                | ReactFragment
                                | ReactPortal
                                | null
                                | undefined;
                              end_date:
                                | string
                                | number
                                | boolean
                                | ReactElement<any, string | JSXElementConstructor<any>>
                                | ReactFragment
                                | ReactPortal
                                | null
                                | undefined;
                            },
                            i: { toString: () => Key | null | undefined }
                          ) => {
                            return (
                              <tr key={i.toString()}>
                                <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800'>
                                  {e.id}
                                </td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.code}</td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.type}</td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.value}</td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.number}</td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.start_date}</td>
                                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.end_date}</td>
                                <td className='whitespace-nowrap px-6 py-4 text-center text-sm font-medium'>
                                  <button
                                    className='text-red-500 hover:text-red-700'
                                    onClick={async () => {
                                      await couponApi.deleteCoupon(e.id ? Number(e.id) : 0);
                                      toast.success('delete success!');
                                      refetch();
                                    }}
                                  >
                                    <AiOutlineDelete className='text-2xl' />
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
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
