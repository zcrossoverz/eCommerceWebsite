import { Menu } from '@headlessui/react';
import { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BiMenuAltRight } from 'react-icons/bi';
import { BsFillCartFill } from 'react-icons/bs';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { HiChevronDown, HiDocumentReport } from 'react-icons/hi';
// eslint-disable-next-line import/named
import { IconType } from 'react-icons/lib';
import { MdInventory, MdPeopleAlt } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from 'src/assets/logo.svg';
import useClickOutSide from 'src/hooks/useClickOutSide';
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Menu as='div'>
      <Menu.Button
        className={`mx-4 ${!active && 'hover:bg-white/10'} flex w-[calc(100%-2rem)] items-center rounded-md px-4 ${
          active && 'bg-blue-600'
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Icon className='text-white' />
        <div className='py-4 px-4 text-left text-white'>{name}</div>
        <div className='ml-20 text-white'>
          <HiChevronDown />
        </div>
      </Menu.Button>

      {menuOpen && (
        <Menu.Items className='relative -mt-2'>
          <div className='m-4 rounded-md bg-white shadow-md'>
            {subnav.map((e, i) => {
              return (
                <Menu.Button
                  className='block w-full px-4 py-2 text-left hover:rounded-md hover:bg-gray-100'
                  onClick={() => {
                    navigate(`/admin${e.link}`);
                    setMenuOpen(!menuOpen);
                  }}
                  key={i.toString()}
                >
                  {() => <div>{e.title}</div>}
                </Menu.Button>
              );
            })}
          </div>
        </Menu.Items>
      )}
    </Menu>
  );
};

function SidebarDashboard() {
  const location = useLocation().pathname.replace('/admin', '');
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { nodeRef } = useClickOutSide(() => setShowMenu(false));

  return (
    <div>
      <div className='mx-2 flex items-center justify-between py-2 lg:py-6'>
        <h2>
          <img src={logo} alt='aa' className='max-w-[8rem]' />
        </h2>
        <div className='hidden w-full flex-grow text-left text-base font-semibold text-white lg:block lg:text-center'>
          Admin Dashboard
        </div>
      </div>
      <hr className='mx-4 border-blue-100/20' />
      <div ref={nodeRef}>
        <button className='fixed top-3 right-4' onClick={() => setShowMenu(!showMenu)}>
          <BiMenuAltRight className='text-3xl text-white' />
        </button>
        {showMenu && (
          <div className='my-4'>
            <ButtonNav name={'Home'} Icon={AiFillHome} link='/' active={location === '' || location === '/'} />
            <ButtonNavDropdown
              name={'Products'}
              Icon={BsFillCartFill}
              subnav={[
                { title: 'Manage Product', link: '/product' },
                { title: 'Manage Brand', link: '/brand' },
                { title: 'Manage Coupon', link: '/coupon' },
              ]}
              active={location.includes('/product') || location.includes('/brand') || location.includes('/coupon')}
            />
            <ButtonNav name={'Orders'} Icon={FaMoneyCheckAlt} link='/order' active={location.includes('/order')} />
            <ButtonNav
              name={'Inventory'}
              Icon={MdInventory}
              link='/inventory'
              active={location.includes('/inventory')}
            />
            <ButtonNav name={'Reports'} Icon={HiDocumentReport} link='/report' active={location.includes('/report')} />
            <ButtonNav name={'Users'} Icon={MdPeopleAlt} link='/user' active={location.includes('/user')} />
          </div>
        )}
      </div>
    </div>
  );
}
export default SidebarDashboard;

// Home, Products, Orders,
