import { AiOutlineDollarCircle } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { FaCartPlus, FaFileSignature } from 'react-icons/fa';

import { PieChart } from './chart/PieChart';
import { LineChart } from './chart/LineChart';




type card_props = {
  title: string;
  value: string;
  percent_compare: string;
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
      icon: AiOutlineDollarCircle,
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
    <div className='mx-4 mb-4 mt-8 rounded-lg bg-red-300 shadow-md'>
      <div
        className={`mx-4 overflow-hidden rounded-xl bg-gradient-to-tr bg-clip-border ${
          icons[props.icon].class
        } absolute -mt-4 grid h-16 w-16 place-items-center text-white shadow-lg shadow-pink-500/40`}
      >
        <Icon className='text-lg' size={25} />
      </div>
      <div className='p-4 text-right text-gray-800'>
        <div className='mb-2 font-semibold'>{props.title}</div>
        <div className='text-lg font-bold'>{props.value}</div>
        <hr className='mt-4 mb-2 bg-gray-400' />
        <div className='text-left'>{props.percent_compare}</div>
      </div>
    </div>
  );
};

function MainDashboard() {
  return (
    <div>
      <div className='grid md:grid-cols-2 lg:grid-cols-4'>
        <Card title='Total Products' value='50000' percent_compare='+3% than last month' icon={0} />
        <Card title='Total Orders' value='600' percent_compare='+3% than last month' icon={2} />
        <Card title='Sales' value='700' percent_compare='+3% than last month' icon={1} />
        <Card title='Total Users' value='56' percent_compare='+3% than last month' icon={3} />
      </div>
      <div className='grid grid-cols-3 grid-flow-col mt-4 gap-8 p-4 bg-red-300'>
        <div className='col-span-2 bg-yellow-200 p-8 rounded-xl'><LineChart /></div>
        <div className='flex bg-blue-200 p-8 rounded-xl'><PieChart /></div>
      </div>

      <div className='grid grid-cols-3 grid-flow-col mt-4 gap-8 p-4 bg-red-300'>
        <div className='col-span-2 bg-yellow-200 p-8 rounded-xl'>

        </div>
        <div className='flex bg-blue-200 p-8 rounded-xl'>
          
        </div>
      </div>
    </div>
  );
}
export default MainDashboard;
