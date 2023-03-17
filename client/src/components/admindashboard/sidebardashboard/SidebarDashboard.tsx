import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
// eslint-disable-next-line import/named
import { IconType } from 'react-icons/lib';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardTabInterface, dashboard_tab } from 'src/constants/adminTab';
import { navigate, selectCurrentTab } from 'src/slices/navigation.slice';

type PropsButton = {
  name: string;
  Icon: IconType;
  active: boolean;
  navigateTo: keyof dashboardTabInterface;
};

type Subnav = {
  title: string;
  navigateTo: keyof dashboardTabInterface;
};

type PropsNavButton = {
  name: string;
  Icon: IconType;
  active: boolean;
  subnav: Subnav[];
};

const ButtonNav = ({ name, Icon, active = false, navigateTo }: PropsButton) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`mx-4 ${!active && 'hover:bg-white/10'} flex w-[calc(100%-2rem)] items-center rounded-md px-4 ${
        active && 'bg-blue-600'
      }`}
      onClick={() => dispatch(navigate(navigateTo))}
    >
      <Icon className='text-white' />
      <div className='py-4 px-4 text-left text-white'>{name}</div>
    </button>
  );
};

const ButtonNavDropdown = ({ name, Icon, active = false, subnav }: PropsNavButton) => {
  const dispatch = useDispatch();
  return (
    <Menu as='div'>
      <Menu.Button
        className={`mx-4 ${!active && 'hover:bg-white/10'} flex w-[calc(100%-2rem)] items-center rounded-md px-4 ${
          active && 'bg-blue-600'
        }`}
      >
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
          <div className='m-4 rounded-md bg-white shadow-md'>
            {subnav.map((e, i) => {
              return (
                <Menu.Item key={i.toString()}>
                  {() => (
                    <button
                      onClick={() => dispatch(navigate(e.navigateTo))}
                      className='block rounded-md px-4 py-2 hover:bg-gray-50'
                    >
                      {e.title}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

type sidebar_props = {
  active: string;
};
function SidebarDashboard({ active }: sidebar_props) {
  const currentTab = useSelector(selectCurrentTab);
  const product_link = [
    { title: 'Manage Product', navigateTo: 'product' },
    { title: 'Manage Brand', navigateTo: 'product' },
    { title: 'Manage Opt', navigateTo: 'product' },
  ];

  return (
    <div>
      <div className='mx-2 flex items-center py-6'>
        <div className='w-full text-center text-base font-semibold text-white'>Admin Dashboard</div>
      </div>
      <hr className='mx-4 border-blue-100/20' />
      <div className='my-4'>
        <ButtonNav name={'Home'} Icon={AiFillHome} active={true} navigateTo='home' />
        <ButtonNavDropdown name={'Products'} Icon={BsFillCartFill} active={false} subnav={product_link} />
        <ButtonNav name={'Orders'} Icon={FaMoneyCheckAlt} active={false} navigateTo='order' />
        <ButtonNav name={'Inventory'} Icon={AiFillSetting} active={false} navigateTo='inventory' />
        <ButtonNav name={'Reports'} Icon={AiFillSetting} active={false} navigateTo='report' />
        <ButtonNav name={'Users'} Icon={AiFillSetting} active={false} navigateTo='user' />
      </div>
    </div>
  );
}
export default SidebarDashboard;

// Home, Products, Orders,
