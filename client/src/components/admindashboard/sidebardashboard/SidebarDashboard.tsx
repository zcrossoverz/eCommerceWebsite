import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
// eslint-disable-next-line import/named
import { IconType } from 'react-icons/lib';
import { useLocation, useNavigate } from 'react-router-dom';

type PropsButton = {
  name: string;
  Icon: IconType;
  link: string;
  active: boolean;
};

type Subnav = {
  title: string;
  link: string;
};

type PropsNavButton = {
  name: string;
  Icon: IconType;
  subnav: Subnav[];
  active: boolean;
};

const ButtonNav = ({ name, Icon, link, active }: PropsButton) => {
  const navigate = useNavigate();
  return (
    <button
      className={`mx-4 ${!active && 'hover:bg-white/10'} flex w-[calc(100%-2rem)] items-center rounded-md px-4 ${
        active && 'bg-blue-600'
      }`}
      onClick={() => navigate(`/admin${link}`)}
    >
      <Icon className='text-white' />
      <div className='py-4 px-4 text-left text-white'>{name}</div>
    </button>
  );
};

const ButtonNavDropdown = ({ name, Icon, subnav, active }: PropsNavButton) => {
  const navigate = useNavigate();
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
                  onClick={() => navigate(`/admin${e.link}`)}
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
  const location = useLocation().pathname.replace('/admin', '');
  return (
    <div>
      <div className='mx-2 flex items-center py-6'>
        <div className='w-full text-center text-base font-semibold text-white'>Admin Dashboard</div>
      </div>
      <hr className='mx-4 border-blue-100/20' />
      <div className='my-4'>
        <ButtonNav name={'Home'} Icon={AiFillHome} link='/' active={location === '/'} />
        <ButtonNavDropdown
          name={'Products'}
          Icon={BsFillCartFill}
          subnav={[
            { title: 'Manage Product', link: '/product' },
            { title: 'Manage Brand', link: '/brand' },
            { title: 'Manage Coupon', link: '/coupon' },
          ]}
          active={location === '/product' || location === '/brand' || location === '/coupon'}
        />
        <ButtonNav name={'Orders'} Icon={FaMoneyCheckAlt} link='/order' active={location === '/order'} />
        <ButtonNav name={'Inventory'} Icon={AiFillSetting} link='/inventory' active={location === '/inventory'} />
        <ButtonNav name={'Reports'} Icon={AiFillSetting} link='/report' active={location === '/report'} />
        <ButtonNav name={'Users'} Icon={AiFillSetting} link='/user' active={location === '/user'} />
      </div>
    </div>
  );
}
export default SidebarDashboard;

// Home, Products, Orders,
