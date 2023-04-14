import { forwardRef } from 'react';
import type { TFunction } from 'i18next';
import { UserInfo } from 'src/types/user.type';
import convertDate from 'src/utils/convertDate';

interface Props {
  value: {
    startDate: string;
    endDate: string;
  };
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
  user: UserInfo;
  t: TFunction<'addashboard', undefined, 'addashboard'>;
}
export type Ref = HTMLDivElement;

const ContentPrint = forwardRef<Ref, Props>((props, ref) => (
  <div ref={ref} className='rounded-sm bg-white p-2 shadow-md'>
    <div className='relative overflow-x-auto'>
      <h1 className='text-center text-xl font-semibold uppercase'>CTY TNHH 3 thành viên Fstore</h1>
      <h2 className='text-center text-lg font-semibold uppercase'>Báo cáo doanh thu và sản phẩm trong kho</h2>
      <time className='block text-center font-semibold'>
        {convertDate(props.value.startDate)} - {convertDate(props.value.endDate)}
      </time>
      <span className='font-semibold text-gray-500 underline'>Thông tin lập báo cáo:</span>
      <h3 className='font-semibold italic text-gray-500'>
        Người lập báo cáo: {props.user.firstName + ' ' + props.user.lastName}
      </h3>
      <time className='font-semibold italic text-gray-500'>
        Ngày lập báo cáo: {new Date().toLocaleDateString('vi')}
      </time>
      {props.inventorySale && props.revenue && props.revenue.length !== 0 && props.inventorySale.length !== 0 && (
        <table className='mt-2 w-full border text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                id
              </th>
              <th scope='col' className='px-6 py-3'>
                {props.t('orders.date')}
              </th>
              <th scope='col' className='px-6 py-3'>
                {props.t('report.sales')}
              </th>
              <th scope='col' className='px-6 py-3'>
                {props.t('report.soldproduct')}
              </th>
              <th scope='col' className='px-6 py-3'>
                {props.t('report.import')}
              </th>
              <th scope='col' className='px-6 py-3'>
                {props.t('report.export')}
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
