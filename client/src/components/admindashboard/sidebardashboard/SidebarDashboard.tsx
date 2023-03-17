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
  navigateTo: keyof dashboardTabInterface;
};

type Subnav = {
  title: string;
  navigateTo: keyof dashboardTabInterface;
};

type PropsNavButton = {
  name: string;
  Icon: IconType;
  subnav: Subnav[];
};

const ButtonNav = ({ name, Icon, navigateTo }: PropsButton) => {
  const dispatch = useDispatch();
  const currentTab = useSelector(selectCurrentTab);
  const active = dashboard_tab[navigateTo].name === dashboard_tab[currentTab].name;
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

const ButtonNavDropdown = ({ name, Icon, subnav }: PropsNavButton) => {
  const dispatch = useDispatch();
  const currentTab = useSelector(selectCurrentTab);
  const active = dashboard_tab[subnav[0].navigateTo].name === dashboard_tab[currentTab].name;
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
                <Menu.Button
                  className='block w-full px-4 py-2 text-left hover:rounded-md hover:bg-gray-100'
                  onClick={() => dispatch(navigate(e.navigateTo))}
                  key={i.toString()}
                >
                  {() => <div>{e.title}</div>}
                </Menu.Button>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

function SidebarDashboard() {
  return (
    <div>
      <div className='mx-2 flex items-center py-6'>
        <div className='w-full text-center text-base font-semibold text-white'>Admin Dashboard</div>
      </div>
      <hr className='mx-4 border-blue-100/20' />
      <div className='my-4'>
        <ButtonNav name={'Home'} Icon={AiFillHome} navigateTo='home' />
        <ButtonNavDropdown
          name={'Products'}
          Icon={BsFillCartFill}
          subnav={[
            { title: 'Manage Product', navigateTo: 'manage_product' },
            { title: 'Manage Brand', navigateTo: 'manage_brand' },
            { title: 'Manage Coupon', navigateTo: 'manage_coupon' },
          ]}
        />
        <ButtonNav name={'Orders'} Icon={FaMoneyCheckAlt} navigateTo='order' />
        <ButtonNav name={'Inventory'} Icon={AiFillSetting} navigateTo='inventory' />
        <ButtonNav name={'Reports'} Icon={AiFillSetting} navigateTo='report' />
        <ButtonNav name={'Users'} Icon={AiFillSetting} navigateTo='user' />
      </div>
    </div>
  );
}
export default SidebarDashboard;

// Home, Products, Orders,
