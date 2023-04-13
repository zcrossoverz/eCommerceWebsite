import { useQuery } from '@tanstack/react-query';
import { LineChart } from '../maindashboard/chart/LineChart';
import analysisApi from 'src/apis/analysis.api';
import { ProductListConfig } from 'src/types/product.type';
import useQueryParams from 'src/hooks/useQueryParams';
import Pagination from 'src/components/paginate';
import { useEffect, useState } from 'react';
import { isAxiosErr } from 'src/utils/error';
import { toast } from 'react-toastify';
import { createSearchParams, useNavigate } from 'react-router-dom';
import convertDate from 'src/utils/convertDate';
import { AiOutlineDelete, AiOutlineFileSearch } from 'react-icons/ai';
import inboundNoteApi from 'src/apis/inboundnote.api';
import http from 'src/utils/http';
import BreadCrumb from '../breadcrumb';
import HelmetSEO from 'src/components/Helmet';
import { useTranslation } from 'react-i18next';
enum Mode {
  'queryProduct',
  'queryInboundNote',
}
export default function InventoryDashboard() {
  const { t } = useTranslation('addashboard');
  const searchParams = useQueryParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>();
  const [queryParams, setQueryParams] = useState<ProductListConfig & { mode?: string }>({
    page: searchParams.page ? searchParams.page : '1',
    limit: searchParams.limit ? searchParams.limit : '10',
    query: searchParams.query ? searchParams.query : '',
    mode: Mode[0],
  });
  const [queryParamsInbound, setQueryParamsInbound] = useState<ProductListConfig & { mode?: string }>({
    page: searchParams.page ? searchParams.page : '1',
    limit: searchParams.limit ? searchParams.limit : '10',
    query: searchParams.query ? searchParams.query : '',
    mode: Mode[1],
  });
  useEffect(() => {
    if (searchParams.mode === Mode[0]) {
      setQueryParams({
        page: searchParams.page || '1',
        limit: searchParams.limit || '10',
        query: searchParams.query || '',
        mode: searchParams.mode || Mode[0],
      });
    }
    if (searchParams.mode === Mode[1]) {
      setQueryParamsInbound({
        page: searchParams.page || '1',
        limit: searchParams.limit || '10',
        query: searchParams.query || '',
        mode: searchParams.mode || Mode[1],
      });
    }
  }, [searchParams.page, searchParams.limit, searchParams.query, searchParams.mode]);
  const { data } = useQuery({
    queryKey: ['AnalysProductOpt', queryParams],
    queryFn: () => analysisApi.getProducts(queryParams),
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess() {
      setSearch('');
    },
    onError: (err) => {
      if (
        isAxiosErr<{
          error: string;
        }>(err)
      ) {
        if (err.response?.data.error === 'not found product') {
          navigate({ search: createSearchParams({ page: '1', limit: '10', query: search ? search : '' }).toString() });
        }
      }
    },
  });
  const { data: inboundNote, refetch } = useQuery({
    queryKey: ['getInboundNote', queryParamsInbound],
    queryFn: () => inboundNoteApi.getAllInboundNote(queryParamsInbound),
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess() {
      setSearch('');
    },
    onError: (err) => {
      if (
        isAxiosErr<{
          error: string;
        }>(err)
      ) {
        if (err.response?.data.error === 'inbound note empty') {
          navigate({ search: createSearchParams({ page: '1', limit: '10' }).toString() });
        }
      }
    },
  });
  const handleDeleteInboundNote = async (id: number) => {
    const res = await http.delete<{
      msg: string;
    }>(`/inventory/inbound_note/${id}`);
    if (res.data.msg && res.data.msg === 'success') {
      await refetch();
      toast.success(t('inventory.successfuldeleted'), { autoClose: 2000 });
    } else {
      toast.error(t('inventory.failed'), { autoClose: 2000 });
    }
  };
  return (
    <div className='px-2'>
      <BreadCrumb path={['Fstore', t('maindashboard.admin'), t('maindashboard.inventory')]} />
      <HelmetSEO title={t('inventory.manageinven')} />
      <div className='mt-4'>
        <div className='relative'>
          <form
            className='max-w-full md:max-w-[14rem]'
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ search: createSearchParams({ ...queryParams, query: search ? search : '' }).toString() });
            }}
          >
            <label htmlFor='default-search' className='sr-only mb-2 text-sm font-medium text-gray-900 '>
              {t('inventory.search')}
            </label>
            <div className='relative mb-2'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <svg
                  aria-hidden='true'
                  className='h-5 w-5 text-cyan-500 '
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                className='block w-full rounded-lg border border-cyan-600 bg-gray-50 p-2 pl-10 text-sm text-gray-900 '
                placeholder={t('inventory.search')}
                value={search || ''}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type='submit'
                className='absolute bottom-1.5 right-2 rounded-md bg-cyan-600 px-2 py-1 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none'
              >
                {t('inventory.search')}
              </button>
            </div>
          </form>
          <span className='relative z-10 inline-block rounded-lg bg-cyan-500 px-2 py-4 text-sm font-semibold uppercase text-white shadow-sm md:absolute md:left-1/2 md:-top-1 md:-translate-x-1/2 md:text-xl'>
            {t('inventory.totalinventory')}: {data?.data.total}
          </span>
          <div className='relative mt-1 overflow-auto rounded-lg border border-gray-200 shadow-md'>
            <table className='w-full text-left text-sm text-gray-500 '>
              <thead className='bg-cyan-400 text-xs uppercase text-gray-700'>
                <tr>
                  <th scope='col' className='px-6 py-6'>
                    {t('product.name')}
                  </th>
                  <th scope='col' className='px-6 py-6'>
                    {t('detailproduct.color')}
                  </th>
                  <th scope='col' className='px-6 py-6'>
                    RAM
                  </th>
                  <th scope='col' className='px-6 py-6'>
                    ROM
                  </th>
                  <th scope='col' className='px-6 py-6'>
                    {t('orders.quantity')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data.data.data &&
                  data.data.data.map((product) => (
                    <tr key={product.product_option_id} className='border-b bg-white'>
                      <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
                        {product.name}
                      </th>
                      <td className='px-6 py-4'>{product.color}</td>
                      <td className='px-6 py-4'>{product.ram}</td>
                      <td className='px-6 py-4'>{product.rom}</td>
                      <td className='px-6 py-4'>{product.quantity}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          pageSize={data?.data.last_page ? data.data.last_page : 1}
          queryConfig={{ ...queryParams, path: '/admin/inventory' }}
        />
      </div>
      {/* manage inbound note */}
      <section className='relative mt-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-semibold text-emerald-500 lg:text-lg'>{t('inventory.manageinvoiceinven')}</h2>
          <button
            type='button'
            onClick={() => {
              navigate('inboundNote/create', {
                state: {
                  products: data?.data.data ? data.data.data : [],
                },
              });
            }}
            className='mr-2 mb-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none'
          >
            {t('inventory.addinvoice')}
          </button>
        </div>

        <div className='relative mt-1 overflow-x-auto rounded-lg border border-gray-200 shadow-md'>
          <table className='w-full text-left text-sm text-gray-500 '>
            <thead className='bg-emerald-500 text-sm uppercase text-white lg:text-base'>
              <tr>
                <th scope='col' className='px-6 py-6'>
                  {t('inventory.invoicename')}
                </th>
                <th scope='col' className='px-6 py-6'>
                  {t('inventory.status')}
                </th>
                <th scope='col' className='px-6 py-6'>
                  {t('inventory.invoicedate')}
                </th>
                <th scope='col' className='px-6 py-6'>
                  {t('user.operation')}
                </th>
              </tr>
            </thead>
            <tbody>
              {inboundNote?.data &&
                inboundNote.data.data &&
                inboundNote.data.data.map((ib) => (
                  <tr key={ib.id} className='border-b bg-white'>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
                      {t('inventory.no')} #{ib.id}
                    </th>
                    <td className='px-6 py-4'>{ib.status}</td>
                    <td className='px-6 py-4'>{convertDate(ib.create_at)}</td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => {
                          handleDeleteInboundNote(ib.id);
                        }}
                      >
                        <AiOutlineDelete size={24} className='text-red-500' />
                      </button>
                      <button
                        onClick={() => {
                          navigate(`inboundNote/${ib.id}`);
                        }}
                      >
                        <AiOutlineFileSearch size={24} className='text-green-500 md:ml-4' />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          pageSize={inboundNote?.data.last_page ? inboundNote.data.last_page : 1}
          queryConfig={{ ...queryParamsInbound, path: '/admin/inventory' }}
        />
      </section>
      <div className='mt-4'>
        <LineChart inventory titleText={t('inventory.vola')} />
      </div>
    </div>
  );
}
