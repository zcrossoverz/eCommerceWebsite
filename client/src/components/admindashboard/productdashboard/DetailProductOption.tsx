import HelmetSale from 'src/components/Helmet/HelmetSEO';
import BreadCrumb from '../breadcrumb';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import productsApi from 'src/apis/product.api';
import { Line } from 'react-chartjs-2';

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
                    label: 'price (million vnd)',
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
                labels: product_tracking.data?.data.transactions.map((e: any) => {
                  const date = new Date(e.date);
                  date.toLocaleString('vn-VI', { timeZone: 'Asia/Ho_Chi_Minh' });
                  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}`;
                }),
                datasets: [
                  {
                    label: 'in (items)',
                    data: product_tracking.data?.data.transactions.map((e: any) => (e.type === 0 ? e.quantity : 0)),
                    borderColor: 'rgb(250, 235, 102)',
                    backgroundColor: 'rgba(250, 235, 102, 0.5)',
                    tension: 0.1,
                  },
                  {
                    label: 'out (items)',
                    data: product_tracking.data?.data.transactions.map((e: any) => (e.type === 1 ? e.quantity : 0)),
                    borderColor: 'rgb(36, 227, 106)',
                    backgroundColor: 'rgba(36, 227, 106, 0.5)',
                    tension: 0.1,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
