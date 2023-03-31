import { memo, useMemo, useState } from 'react';
import Popover from './Popover';
import useClickOutSide from 'src/hooks/useClickOutSide';
import useGetElementCoords from 'src/hooks/useGetElementCoords';
import { BsCart } from 'react-icons/bs';
import CartItem from '../cartitems';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';

// React Portal
// getBoundingClientRect

function CartPopover() {
<<<<<<< HEAD
  const { t } = useTranslation('cartpopover');
=======
  const cartList = useSelector((state: RootState) => state.cartReducer.cartItem);
>>>>>>> f4258170ab83ebeed78136b17b68aceeb70e4745
  const [isShowSettings, setIsShowSettings] = useState<boolean>(false);
  const { nodeRef } = useClickOutSide(() => setIsShowSettings(false));
  const { coords, elmRef, handleGetElementCoords } = useGetElementCoords();
  const handleToggleSettings = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsShowSettings((s) => !s);
    handleGetElementCoords(e);
  };
  const totalCartItems = useMemo(() => {
    const total = cartList.reduce((prev, current) => prev + current.option.quantity, 0);
    return total;
  }, [cartList]);
  return (
    <div className='flex items-center justify-center'>
      <div className='relative' ref={nodeRef}>
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles*/}
        <button
          className='hover:text-orange-6 00 flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] duration-300'
          onClick={handleToggleSettings}
          ref={elmRef}
          role='button'
        >
          <p className='absolute top-0 -right-1 flex items-center justify-center rounded-md bg-white px-2 text-xs text-orange-600'>
            {totalCartItems}
          </p>
          <BsCart className='text-2xl' />
        </button>
        {isShowSettings && (
          <AnimatePresence>
            <Popover coords={coords} position='right' className='rounded-2xl bg-white shadow'>
              <SettingsContentMemo></SettingsContentMemo>
            </Popover>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

const SettingsContentMemo = memo(SettingsContent);
import cartEmpty from 'src/assets/img/cartempty.png';
import { AnimatePresence } from 'framer-motion';
function SettingsContent() {
  const { t } = useTranslation('cartpopover');
  const cartList = useSelector((state: RootState) => state.cartReducer.cartItem);
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  return (
    <div className='min-h-[10rem] w-[20rem] rounded-sm bg-white pt-2 shadow-lg md:w-[26rem]'>
      {(cartList.length === 0 || !userInfo.role) && (
        <div className='flex flex-col items-center justify-center p-2'>
          <img className='block w-[8rem]' src={cartEmpty} alt='' />
          <span className='text-base text-blue-400'>{t('cartpopover.no product')}</span>
        </div>
      )}
      {cartList.length > 0 && userInfo.role && (
        <>
          <div className='max-h-[30rem] overflow-auto'>
            <h1 className='px-2 text-sm text-gray-400'>{t('cartpopover.recent products')}</h1>
            {cartList &&
              cartList.length > 0 &&
              cartList.map((cartItem) => {
                return (
                  <div key={cartItem.option.product_option_id}>
                    <CartItem cartItem={cartItem} />
                  </div>
                );
              })}
          </div>
          <div className='relative bottom-0 left-0 right-0 flex h-[4rem] justify-end bg-white p-2 md:items-center md:justify-between'>
            <span className='hidden px-2 text-sm text-gray-400 md:block'>{t('cartpopover.buy now')}</span>
            <button className='rounded border border-orange-700 bg-orange-500 py-2 px-4 font-bold text-white opacity-80 duration-200 hover:opacity-100'>
              <Link to={path.cart}>{t('cartpopover.view cart')}</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPopover;
