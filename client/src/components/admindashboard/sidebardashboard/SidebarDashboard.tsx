import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
// eslint-disable-next-line import/named
import { IconType } from 'react-icons/lib';

type PropsButton = {
  name: string;
  Icon: IconType;
  active: boolean;
};

const ButtonNav = ({ name, Icon, active = false }: PropsButton) => {
  return (
    <button className={`mx-4 ${ !active && 'hover:bg-white/10' } flex w-[calc(100%-2rem)] items-center rounded-md px-4 ${active && 'bg-blue-600'}`}>
      <Icon className='text-white' />
      <div className='py-4 px-4 text-left text-white'>{name}</div>
    </button>
  );
};

const ButtonNavDropdown = ({ name, Icon, active = false }: PropsButton) => {
  return (
    <Menu as='div'>
      <Menu.Button className={`mx-4 ${ !active && 'hover:bg-white/10' } flex w-[calc(100%-2rem)] items-center rounded-md px-4 ${active && 'bg-blue-600'}`}>
        <Icon className='text-white' />
        <div className='py-4 px-4 text-left text-white'>{name}</div>
        <div className='ml-20 text-white'>
          <HiChevronDown />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='relative -mt-2'>
          <div className='bg-white shadow-md m-4 rounded-md'>
            <Menu.Item>{({ active }) => <div className='px-4 py-2 hover:bg-gray-50 rounded-md'>Manage product</div>}</Menu.Item>
            <Menu.Item>{({ active }) => <div className='px-4 py-2 hover:bg-gray-50 rounded-md'>Manage brand</div>}</Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

type sidebar_props = {
  active: number;
};
function SidebarDashboard({ active }: sidebar_props) {
  return (
    <div>
      <div className='mx-2 flex items-center py-6'>
        <div className='w-full text-center text-base font-semibold text-white'>Admin Dashboard</div>
      </div>
      <hr className='mx-4 border-blue-100/20' />
      <div className='my-4'>
        <ButtonNav name={'Home'} Icon={AiFillHome} active={active === 0} />
        <ButtonNavDropdown name={'Products'} Icon={BsFillCartFill} active={active === 1} />
        <ButtonNav name={'Orders'} Icon={FaMoneyCheckAlt} active={active === 2} />
        <ButtonNav name={'Inventory'} Icon={AiFillSetting} active={active === 3} />
        <ButtonNav name={'Feedback'} Icon={AiFillSetting} active={active === 3} />
        <ButtonNav name={'Reports'} Icon={AiFillSetting} active={active === 3} />
        <ButtonNav name={'Users'} Icon={AiFillSetting} active={active === 3} />
      </div>
    </div>
  );
}
export default SidebarDashboard;

// Home, Products, Orders,
