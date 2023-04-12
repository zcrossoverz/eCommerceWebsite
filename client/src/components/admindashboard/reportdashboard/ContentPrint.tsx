import { forwardRef } from 'react';

interface Props {
  revenue: {
    id: number;
    date: string;
    revenue: number;
    product_sale: number;
  }[];
  inventorySale: {
    id: number;
    date: string;
    in: number;
    out: number;
  }[];
}
export type Ref = HTMLDivElement;

const ContentPrint = forwardRef<Ref, Props>((props, ref) => (
  <div ref={ref} className='MyClassName'>
    <div className='relative overflow-x-auto'>
      {props.inventorySale && props.revenue && props.revenue.length !== 0 && props.inventorySale.length !== 0 && (
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                id
              </th>
              <th scope='col' className='px-6 py-3'>
                Ngày
              </th>
              <th scope='col' className='px-6 py-3'>
                Doanh thu
              </th>
              <th scope='col' className='px-6 py-3'>
                Số sản phẩm bán
              </th>
              <th scope='col' className='px-6 py-3'>
                Nhập vào kho
              </th>
              <th scope='col' className='px-6 py-3'>
                Xuất khỏi kho
              </th>
            </tr>
          </thead>
          <tbody>
            {props.revenue &&
              props.revenue.map((it, i) => (
                <tr key={it.id} className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                    {it.id}
                  </th>
                  <td className='px-6 py-4'>{it.date}</td>
                  <td className='px-6 py-4'>{it.revenue}</td>
                  <td className='px-6 py-4'>{it.product_sale}</td>
                  <td className='px-6 py-4'>{props.inventorySale[i] ? props.inventorySale[i].in : 0}</td>
                  <td className='px-6 py-4'>{props.inventorySale[i] ? props.inventorySale[i].out : 0}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
));
ContentPrint.displayName = 'ContentPrint';
export default ContentPrint;
