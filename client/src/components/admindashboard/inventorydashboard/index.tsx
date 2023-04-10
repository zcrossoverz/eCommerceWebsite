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
      <div>
        <div className='relative mt-10 rounded-lg border border-gray-200 shadow-md'>
          <span className='rounded-lg bg-cyan-500 px-2 py-4 text-xl font-semibold uppercase text-white shadow-sm md:absolute md:left-1/2 md:-top-8 md:-translate-x-1/2'>
            Tổng sản phẩm trong kho: {data?.data.total}
          </span>
          <table className='mt-2 w-full text-left text-sm text-gray-500 '>
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
