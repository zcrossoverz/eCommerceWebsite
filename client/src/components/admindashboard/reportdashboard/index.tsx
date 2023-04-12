import HelmetSale from 'src/components/Helmet/HelmetSEO';
import BreadCrumb from '../breadcrumb';
import Datepicker from 'react-tailwindcss-datepicker';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import analysisApi from 'src/apis/analysis.api';

export default function ReportDashboard() {
  const [value, setValue] = useState({
    startDate: '2023-04-11',
    endDate: '2023-04-11',
  });

  const revenue_data = useQuery(['get_revenue_report', value], () =>
    analysisApi.reportRevenue(value.startDate, value.endDate)
  );
  const inventory_data = useQuery(['get_inventory_report', value], () =>
    analysisApi.reportInventory(value.startDate, value.endDate)
  );

  return (
    <div className='mt-4'>
      <HelmetSale title='Admin Dashboard | Manage Order'></HelmetSale>
      <BreadCrumb path={['Product', 'Report Dashboard']} />
      <div className='mt-4 grid grid-cols-2'>
        <div className='w-64'>
          <Datepicker
            value={value}
            onChange={(e) => {
              setValue({
                startDate: e?.startDate?.toString() ? e.startDate?.toString() : '',
                endDate: e?.endDate?.toString() ? e.endDate?.toString() : '',
              });
            }}
            primaryColor='fuchsia'
          />
        </div>
        <div className='col-span-1 flex justify-end'>
          <button className='mr-8 rounded-md bg-blue-400 px-4 py-2'>Export</button>
        </div>
      </div>
      <div>
        <div className='mt-2 flex flex-col drop-shadow-xl'>
          <div className='overflow-x-auto'>
            <div className='inline-block w-full align-middle'>
              <div className='overflow-hidden'>
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
                            text: 'Revenue Report',
                          },
                        },
                      }}
                      data={{
                        labels: revenue_data.data?.data.map((e: any) => e.date),
                        datasets: [
                          {
                            label: 'product sale',
                            data: revenue_data.data?.data.map((e: any) => e.product_sale),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            tension: 0.1,
                          },
                          {
                            label: 'revenue (million vnd)',
                            data: revenue_data.data?.data.map((e: any) => e.revenue / 1_000_000),
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
                            text: 'Inventory Report',
                          },
                        },
                      }}
                      data={{
                        labels: inventory_data.data?.data.map((e: any) => e.date),
                        datasets: [
                          {
                            label: 'in (item)',
                            data: inventory_data.data?.data.map((e: any) => e.in),
                            borderColor: 'rgb(66, 245, 78)',
                            backgroundColor: 'rgba(66, 245, 78, 0.5)',
                            tension: 0.1,
                          },
                          {
                            label: 'out (item)',
                            data: inventory_data.data?.data.map((e: any) => e.out),
                            borderColor: 'rgb(252, 169, 3)',
                            backgroundColor: 'rgba(252, 169, 3, 0.5)',
                            tension: 0.1,
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
