import HelmetSale from 'src/components/Helmet/HelmetSEO';
import BreadCrumb from '../breadcrumb';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import productsApi from 'src/apis/product.api';
import { Bar, Line } from 'react-chartjs-2';

export default function DetailProductOption() {
  const { product_option_id } = useParams();

  const product_tracking = useQuery(['product_tracking'], () => productsApi.trackingProduct(Number(product_option_id)));

  console.log(product_tracking);

  return (
    <div className='mt-4'>
      <HelmetSale title='Admin Dashboard | Product Option Detail'></HelmetSale>
      <BreadCrumb path={['Product', 'Product Dashboard', 'Detail', 'Product Option']} />
      <div className='mt-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='rounded-xl border border-gray-200 bg-white p-4 drop-shadow-xl'>
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                  title: {
                    display: true,
                    text: 'Tracking Price',
                  },
                },
              }}
              data={{
                labels: product_tracking.data?.data.prices.map((e: any) => {
                  const date = new Date(e.update_at);
                  date.toLocaleString('vn-VI', { timeZone: 'Asia/Ho_Chi_Minh' });
                  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}`;
                }),
                datasets: [
                  {
                    label: 'product sale',
                    data: product_tracking.data?.data.prices.map((e: any) => e.new_price),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    tension: 0.1,
                  },
                ],
              }}
            />
          </div>
          <div className='rounded-xl border border-gray-200 bg-white p-4 drop-shadow-xl'>
            {/* <Bar
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Inventory tracking',
                  },
                },
                responsive: true,
                interaction: {
                  intersect: false,
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
              data={{
                labels: ['abc', 'sdf', 'sdf', 'ffs', 'ers'],
                datasets: [
                  {
                    label: 'data 1',
                    data: [12, 34, 23, 12, 13],
                    backgroundColor: 'blue',
                    stack: 'Stack 0',
                  },{
                    label: 'data 2',
                    data: [32, 11, 16, 13, 20],
                    stack: 'Stack 0',
                    backgroundColor: 'red',
                  },
                ],
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
