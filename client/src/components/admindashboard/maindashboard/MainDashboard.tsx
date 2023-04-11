/* eslint-disable react-hooks/rules-of-hooks */
import { AiFillBank } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { FaCartPlus, FaFileSignature } from 'react-icons/fa';

import { PieChart } from './chart/PieChart';
import { LineChart } from './chart/LineChart';
import { useQueries, useQuery } from '@tanstack/react-query';
import analysisApi from 'src/apis/analysis.api';
import productsApi from 'src/apis/product.api';
import { useState } from 'react';
import HelmetSEO from 'src/components/Helmet';

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

  return (
    <div>
      <HelmetSEO title='Admin'></HelmetSEO>
      <div className='grid md:grid-cols-2 lg:grid-cols-4'>
        <Card title='Total Products' value={overview.data?.data.countProducts} icon={0} />
        <Card title='Total Orders' value={overview.data?.data.countOrders} icon={2} />
        <Card title='Total Brands' value={overview.data?.data.countBrands} icon={1} />
        <Card title='Total Users' value={overview.data?.data.countUsers} icon={3} />
      </div>
      <div className='mt-2 grid grid-flow-col grid-cols-3 gap-4'>
        <div className='col-span-2 -ml-1 mr-1 rounded-xl bg-white p-2 shadow-lg'>
          <LineChart />
        </div>
        <div className='flex rounded-xl bg-white p-8 shadow-lg'>
          <PieChart />
        </div>
      </div>

      <div className='mt-4 -ml-1 grid grid-flow-col grid-cols-4 gap-4'>
        <div className='col-span-2 rounded-xl bg-white p-8 shadow-lg'>
          <div className=' -mt-6 -ml-4'>
            <div className='text-xl font-semibold leading-loose'>Top Sales</div>
          </div>
          <hr className='-ml-6 bg-gray-300' />
          <div>
            <div>
              <table className='table-fixed'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Number sold</th>
                  </tr>
                </thead>
                <tbody>
                  {data_product_sale.data?.data
                    .sort((a: any, b: any) => b.total_sale - a.total_sale)
                    .map((e: any, i: number) => (
                      <tr key={i.toString()}>
                        <td className='px-10 text-center'>{(i + 1).toString()}</td>
                        <td className='px-10 text-left'>{e.name}</td>
                        <td className='px-10 text-center'>{e.total_sale}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='col-span-2 rounded-xl bg-white p-8 shadow-lg'>
          <div className=' -mt-6 -ml-4'>
            <div className='text-xl font-semibold leading-loose'>Recent activity</div>
          </div>
          <hr className='-ml-6 bg-gray-300' />
          <div className='flex flex-col'>
            <div className='flex justify-between px-2'>
              <div className=''>abc vua xyz..... </div>
              <div className=''> 10:11:20 30/3/2023</div>
            </div>
            <div className='flex justify-between px-2'>
              <div className=''>abc vua xyz..... </div>
              <div className=''> 10:11:20 30/3/2023</div>
            </div>
            <div className='flex justify-between px-2'>
              <div className=''>abc vua xyz..... </div>
              <div className=''> 10:11:20 30/3/2023</div>
            </div>
            <div className='flex justify-between px-2'>
              <div className=''>abc vua xyz..... </div>
              <div className=''> 10:11:20 30/3/2023</div>
            </div>
            <div className='flex justify-between px-2'>
              <div className=''>abc vua xyz..... </div>
              <div className=''> 10:11:20 30/3/2023</div>
            </div>
            <div className='flex justify-between px-2'>
              <div className=''>abc vua xyz..... </div>
              <div className=''> 10:11:20 30/3/2023</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainDashboard;
