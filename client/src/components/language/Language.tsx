import { Menu, Transition } from '@headlessui/react';
import i18n, { changeLanguage } from 'i18next';
import { Fragment } from 'react';
import { locales } from 'src/i18n/i18n';
interface P {
  textColor?: string;
}

export default function Languege(props: P) {
  const currentLanguage = locales[i18n.language as keyof typeof locales];
  return (
    <div className='nav-item relative p-0'>
      <Menu as='div' className=''>
        <div>
          <Menu.Button className={`mr-1 pl-0 text-lg text-gray-700 lg:text-sm lg:text-white ${props.textColor}`}>
            {currentLanguage === 'Tiếng Việt' ? 'Ngôn ngữ' : 'Language'}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-orange-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => changeLanguage('vi')}
                  >
                    Tiếng Việt
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-orange-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => changeLanguage('en')}
                  >
                    English
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
