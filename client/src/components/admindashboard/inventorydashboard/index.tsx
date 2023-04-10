import { useQuery } from '@tanstack/react-query';
import { LineChart } from '../maindashboard/chart/LineChart';
import analysisApi from 'src/apis/analysis.api';
import { ProductListConfig } from 'src/types/product.type';
import useQueryParams from 'src/hooks/useQueryParams';
import Pagination from 'src/components/paginate';

export default function InventoryDashboard() {
  const query = useQueryParams();
  const queryParams: ProductListConfig = {
    page: query.page ? query.page : '1',
    limit: query.limit ? query.limit : '10',
  };
  const { data } = useQuery({
    queryKey: ['AnalysProductOpt', queryParams],
    queryFn: () => analysisApi.getProducts(queryParams),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      <div>
        <LineChart inventory />
      </div>
      <div className='mt-8'>
        <form className='max-w-[14rem]'>
          <label htmlFor='default-search' className='sr-only mb-2 text-sm font-medium text-gray-900 '>
            Search
          </label>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                aria-hidden='true'
                className='h-5 w-5 text-gray-500 '
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
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 '
              placeholder='Search'
              required
            />
            <button
              type='submit'
              className='absolute bottom-1.5 right-2 rounded-md bg-blue-700 px-2 py-1 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none'
            >
              Search
            </button>
          </div>
        </form>
        <div className='relative mt-1 rounded-lg border border-gray-200 shadow-md'>
          <span className='rounded-lg bg-cyan-500 px-2 py-4 text-xl font-semibold uppercase text-white shadow-sm md:absolute md:left-1/2 md:-top-10 md:-translate-x-1/2'>
            Tổng sản phẩm trong kho: {data?.data.total}
          </span>
          <table className='w-full text-left text-sm text-gray-500 '>
            <thead className='bg-cyan-400 text-xs uppercase text-gray-700'>
              <tr>
                <th scope='col' className='px-6 py-6'>
                  Product name
                </th>
                <th scope='col' className='px-6 py-6'>
                  Color
                </th>
                <th scope='col' className='px-6 py-6'>
                  RAM
                </th>
                <th scope='col' className='px-6 py-6'>
                  ROM
                </th>
                <th scope='col' className='px-6 py-6'>
                  Quantity
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
        <Pagination
          pageSize={data?.data.last_page ? data.data.last_page : 1}
          queryConfig={{ ...queryParams, path: '/admin/inventory' }}
        />
      </div>
    </div>
  );
}
