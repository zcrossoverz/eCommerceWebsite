import HelmetSale from 'src/components/Helmet/HelmetSEO';
import BreadCrumb from '../breadcrumb';
import Datepicker from 'react-tailwindcss-datepicker';
import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import analysisApi from 'src/apis/analysis.api';
import ReactToPrint from 'react-to-print';
import ContentPrint from './ContentPrint';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';

export default function ReportDashboard() {
  const { t } = useTranslation('addashboard');
  const user = useSelector((state: RootState) => state.userReducer.userInfo);
  const date_now = new Date();
  const [value, setValue] = useState({
    startDate: `${date_now.getFullYear()}-${date_now.getMonth() + 1}-${date_now.getDate()}`,
    endDate: `${date_now.getFullYear()}-${date_now.getMonth() + 1}-${date_now.getDate()}`,
  });

  const revenue_data = useQuery(['get_revenue_report', value], () =>
    analysisApi.reportRevenue(value.startDate, value.endDate)
  );
  const inventory_data = useQuery(['get_inventory_report', value], () =>
    analysisApi.reportInventory(value.startDate, value.endDate)
  );

  const componentRef = useRef(null);

  return (
    <div className='mt-4 px-2'>
      <HelmetSale title={t('report.reports')}></HelmetSale>
      <BreadCrumb path={[t('maindashboard.products'), t('report.reportdashboard')]} />
      <div className='mt-4 grid grid-cols-2'>
        <div className='w-64'>
          <Datepicker
            i18n='vi'
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
          <ReactToPrint
            trigger={() => (
              <button className=' rounded-md bg-blue-400 px-2 py-1 text-xs hover:bg-blue-500 lg:mr-8 lg:px-4 lg:py-2 lg:text-sm'>
                {t('report.printreport')}
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
      <div>
        <div className='mt-2 flex flex-col drop-shadow-xl'>
          <div className='overflow-x-auto'>
            <div className='inline-block w-full align-middle'>
              <div className='overflow-hidden'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='col-span-2 rounded-xl border border-gray-200 bg-white p-4 drop-shadow-xl lg:col-span-1'>
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
                        labels: revenue_data.data?.data.map((e) => e.date),
                        datasets: [
                          {
                            label: 'product sale',
                            data: revenue_data.data?.data.map((e) => e.product_sale),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            tension: 0.1,
                          },
                          {
                            label: 'revenue (million vnd)',
                            data: revenue_data.data?.data.map((e) => e.revenue / 1_000_000),
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            tension: 0.1,
                          },
                        ],
                      }}
                    />
                  </div>
                  <div className='col-span-2 rounded-xl border border-gray-200 bg-white p-4 drop-shadow-xl lg:col-span-1'>
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
                        labels: inventory_data.data?.data.map((e) => e.date),
                        datasets: [
                          {
                            label: 'in (item)',
                            data: inventory_data.data?.data.map((e) => e.in),
                            borderColor: 'rgb(66, 245, 78)',
                            backgroundColor: 'rgba(66, 245, 78, 0.5)',
                            tension: 0.1,
                          },
                          {
                            label: 'out (item)',
                            data: inventory_data.data?.data.map((e) => e.out),
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
      <footer className='mt-4'>
        <ContentPrint
          inventorySale={inventory_data.data?.data ? inventory_data.data.data : []}
          revenue={revenue_data.data?.data ? revenue_data.data.data : []}
          ref={componentRef}
          value={value}
          user={user}
          t={t}
        />
      </footer>
    </div>
  );
}
