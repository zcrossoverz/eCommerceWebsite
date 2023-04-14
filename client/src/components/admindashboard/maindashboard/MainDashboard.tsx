/* eslint-disable react-hooks/rules-of-hooks */
import { AiFillBank } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { FaCartPlus, FaFileSignature } from 'react-icons/fa';
import { PieChart } from './chart/PieChart';
import { LineChart } from './chart/LineChart';
import {  useQuery } from '@tanstack/react-query';
import analysisApi from 'src/apis/analysis.api';
import HelmetSEO from 'src/components/Helmet';
import feedbackApi from 'src/apis/feedback.api';
import { dateToString } from 'src/utils/convertDate';
import { baseURL } from 'src/constants/constants';

import Languege from 'src/components/language/Language';

type card_props = {
  title: string;
  value: string;
  // percent_compare: string;
  icon: number;
};

const Card = (props: card_props) => {
  const icons = [
    {
      class: 'from-blue-600 to-blue-400',
      icon: FaCartPlus,
    },
    {
      class: 'from-green-600 to-green-400',
      icon: AiFillBank,
    },
    {
      class: 'from-pink-600 to-pink-400',
      icon: FaFileSignature,
    },
    {
      class: 'from-orange-600 to-orange-400',
      icon: BsPeopleFill,
    },
  ];

  const { icon: index } = props;
  const Icon = icons[index].icon;

  return (
    <div
      className={`${props.icon === 0 && `lg:-ml-1`} ${
        props.icon === 3 && `lg:-mr-0`
      } mx-4 mb-4 mt-8 rounded-lg bg-white shadow-lg`}
    >
      <div
        className={`mx-4 overflow-hidden rounded-xl bg-gradient-to-tr bg-clip-border ${
          icons[props.icon].class
        } absolute -mt-4 grid h-16 w-16 place-items-center text-white shadow-lg shadow-pink-500/40`}
      >
        <Icon className='text-lg' size={25} />
      </div>
      <div className='p-4 text-right text-gray-800'>
        <div className='mb-2 font-semibold'>{props.title}</div>
        <div className='text-4xl font-semibold leading-relaxed'>{props.value}</div>
        {/* <hr className='mt-4 mb-2 bg-gray-400' /> */}
        {/* <div className='text-left'>{props.percent_compare}</div> */}
      </div>
    </div>
  );
};

function MainDashboard() {
  const overview = useQuery(['analysis_overview'], () => analysisApi.analysOverview());
  const data_product_sale = useQuery(['top_sales'], () => analysisApi.topSales());
  const feedbacks = useQuery(['get_feedbacks'], () => feedbackApi.getAllFeedback());

  return (
    <div>
      <HelmetSEO title='Admin'></HelmetSEO>
      <Languege />
      <div className='grid md:grid-cols-2 lg:grid-cols-4'>
        <Card title='Total Products' value={overview.data?.data.countProducts} icon={0} />
        <Card title='Total Orders' value={overview.data?.data.countOrders} icon={2} />
        <Card title='Total Brands' value={overview.data?.data.countBrands} icon={1} />
        <Card title='Total Users' value={overview.data?.data.countUsers} icon={3} />
      </div>
      <div className='mt-2 grid gap-4 px-4 md:grid-flow-col md:grid-cols-3 md:px-0'>
        <div className='-ml-1 mr-1 rounded-xl bg-white p-2 shadow-lg md:col-span-2'>
          <LineChart />
        </div>
        <div className='flex rounded-xl bg-white p-8 shadow-lg'>
          <PieChart />
        </div>
      </div>

      <div className='mt-4 -ml-1 grid gap-4 overflow-hidden px-4 md:grid-flow-col md:grid-cols-2 md:px-0'>
        <div className='rounded-xl bg-white p-8 shadow-xl'>
          <div className='-mt-6 -ml-4'>
            <div className='text-xl font-semibold leading-loose'>Top Sales</div>
          </div>
          <hr className='-ml-6 bg-gray-300' />
          <div>
            <div className='overflow-x-scroll'>
              <table className='table-fixed'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className='hidden md:block'>Image</th>
                    <th className='text-center'>Name</th>
                    <th>Number sold</th>
                  </tr>
                </thead>
                <tbody>
                  {data_product_sale.data?.data
                    .sort((a: any, b: any) => b.total_sale - a.total_sale)
                    .map((e: any, i: number) => (
                      <tr key={i.toString()}>
                        <td className='px-10 text-center'>{(i + 1).toString()}</td>
                        <td className='hidden px-10 text-center md:block'>
                          <img src={`${baseURL}/${e.image}`} alt='' className='h-30 w-32' />
                        </td>
                        <td className='px-10 text-left'>{e.name}</td>
                        <td className='px-10 text-center'>{e.total_sale}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='overflow-x-scroll rounded-xl bg-white p-8 shadow-xl'>
          <div className=' -mt-6 -ml-4'>
            <div className='text-xl font-semibold leading-loose'>Recently feedbacks</div>
          </div>
          <hr className='-ml-6 bg-gray-300' />
          <div className='mb-4 flex flex-col'>
            {feedbacks.data?.data.map((e: any, i: number) => {
              return (
                <div className='grid grid-cols-3 px-2 py-2' key={i.toString()}>
                  <div className='col-span-2'>
                    {`${e.user.firstName} ${e.user.lastName} rate ${e.rate} star for product ${e.product.name}`}{' '}
                  </div>
                  <div className=''>{dateToString(e.create_at)}</div>
                  <hr className='col-span-3 w-full bg-gray-800' />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainDashboard;
