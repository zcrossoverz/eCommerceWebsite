import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { CartItem } from 'src/types/cart';
import { formatPrice } from 'src/utils/formatPrice';

import { useEffect, useMemo, useState } from 'react';
import { produce } from 'immer';
import { omit } from 'lodash';
import { updateCart as updateCartList } from 'src/slices/cart.slice';
import { baseURL } from 'src/constants/constants';
import HelmetSale from 'src/components/Helmet';
import BreadCrumb from 'src/components/admindashboard/breadcrumb';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';
interface ExtendCartItem extends CartItem {
  checked: boolean;
}
function CartUser() {
  const [extendCartItems, setExtendCartItem] = useState<ExtendCartItem[]>([]);
  const cartItemUser = useSelector(
    (state: RootState) => state.cartReducer.cartItem,
    () => true
  );
  const isCheckedAll = useMemo(() => extendCartItems.every((purchase) => purchase.checked), [extendCartItems]);
  const dispath = useDispatch();
  const checkedItems = useMemo(() => {
    const checkedArr: ExtendCartItem[] = [];
    extendCartItems.forEach((item) => {
      if (item.checked === true) {
        checkedArr.push(item);
      }
    });
    return checkedArr;
  }, [extendCartItems]);
  const totalCost = useMemo(() => {
    return checkedItems.reduce((prev, current) => prev + Number(current.option.price) * current.option.quantity, 0);
  }, [checkedItems]);
  useEffect(() => {
    setExtendCartItem(
      cartItemUser.map((item) => {
        return {
          ...item,
          checked: false,
        };
      }) || []
    );
    // const updateCart = omit(cartItemUser)
  }, [cartItemUser]);

  useEffect(() => {
    if (extendCartItems && extendCartItems.length >= 0) {
      let updateCart = omit<CartItem[]>(extendCartItems, 'checked');
      updateCart = Object.values(updateCart);
      if (updateCart && updateCart.length >= 0) {
        dispath(updateCartList(updateCart as CartItem[]));
      }
    }
  }, [extendCartItems, dispath]);
  const handleChecked = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendCartItem(
      produce((draft) => {
        draft[id].checked = e.target.checked;
      })
    );
  };
  const handleCheckedAll = () => {
    setExtendCartItem((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          checked: !isCheckedAll,
        };
      });
    });
  };
  const increaseQuantity = (item: ExtendCartItem, index: number) => {
    setExtendCartItem(
      produce((draft) => {
        if (draft[index].option.quantity === draft[index].option.stock) {
          return;
        } else draft[index].option.quantity += 1;
      })
    );
  };
  const decreaseQuantity = (item: ExtendCartItem, index: number) => {
    setExtendCartItem(
      produce((draft) => {
        if (draft[index].option.quantity === 1) {
          draft.splice(index, 1);
        } else {
          draft[index].option.quantity -= 1;
        }
      })
    );
  };
  const handleDeleteChecked = () => {
    if (checkedItems.length > 0) {
      const idChecked = checkedItems.map((item) => item.id);
      setExtendCartItem(
        produce((draft) => {
          return draft.filter((item) => {
            if (item.id) {
              return !idChecked.includes(item.id);
            }
          });
        })
      );
    }
  };
  const handleDelete = (index: number) => () => {
    setExtendCartItem(
      produce((draft) => {
        draft.splice(index, 1);
      })
    );
  };
  return (
    <div className='mx-auto max-w-7xl bg-transparent p-4'>
      <HelmetSale title='Giỏ hàng'></HelmetSale>
      <div className='mb-2'>
        <BreadCrumb path={['Fstore', 'Giỏ hàng']} />
      </div>
      {/* top section cart*/}
      <div className='grid grid-cols-12 gap-2 bg-white px-6 py-4 text-lg font-semibold shadow-sm'>
        <div className='col-span-1'>
          <input checked={isCheckedAll} onChange={handleCheckedAll} type='checkbox' />
        </div>
        <h2 className='col-span-6'>Sản phẩm</h2>
        <button onClick={handleDeleteChecked} className='col-span-5 text-center md:hidden'>
          Xóa
        </button>
        <div className='col-span-5 hidden grid-cols-12 lg:grid'>
          <span className='col-span-3 text-center'>Đơn giá</span>
          <span className='col-span-3 text-center'>Số lượng</span>
          <span className='col-span-3 text-center'>Thành tiền</span>
          <span className='col-span-3 text-center'>Thao tác</span>
        </div>
      </div>
      {/* bottom section cart */}
      <div className='mt-2 grid max-h-[500px] grid-cols-1 gap-2 overflow-auto bg-white p-4 shadow-md'>
        {extendCartItems &&
          extendCartItems.map((item, index) => (
            <div
              key={item.option.product_option_id}
              className='grid cursor-pointer grid-cols-12 gap-2 rounded-md border border-orange-500 px-2 py-4 shadow-sm'
            >
              <div className='col-span-1 flex items-center justify-center'>
                <input checked={item.checked} onChange={handleChecked(index)} type='checkbox' />
              </div>
              <div className='col-span-11 flex items-center md:col-span-6'>
                <img src={`${baseURL}/${item.option.image}`} className='max-w-[3rem]' alt='img product' />
                <div className='flex flex-col items-start px-2'>
                  <h2 className='line-clamp-1 '>{item.name}</h2>
                  <span className='text-base text-orange-500 md:hidden'>{formatPrice(Number(item.option.price))}</span>
                  <div className=' flex items-center justify-center md:hidden'>
                    <button
                      onClick={() => decreaseQuantity(item, index)}
                      className='rounded-sm border px-1 shadow-sm duration-150 hover:bg-orange-300'
                    >
                      -
                    </button>
                    <input
                      className='mx-1 max-w-[3rem] border px-2 text-center'
                      type='text'
                      readOnly
                      value={item.option.quantity}
                    />
                    <button
                      onClick={() => increaseQuantity(item, index)}
                      className='rounded-sm border px-1 shadow-sm duration-150 hover:bg-orange-300'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-span-5 hidden grid-cols-12 lg:grid'>
                <span className='col-span-3 flex items-center justify-center'>
                  {formatPrice(Number(item.option.price))}
                </span>
                <div className='col-span-3 flex items-center justify-center'>
                  <button
                    onClick={() => decreaseQuantity(item, index)}
                    className='rounded-sm border px-1 shadow-sm duration-150 hover:bg-orange-300'
                  >
                    -
                  </button>
                  <input
                    className='mx-1 max-w-[3rem] border px-2 text-center'
                    type='text'
                    readOnly
                    value={item.option.quantity}
                  />
                  <button
                    onClick={() => increaseQuantity(item, index)}
                    className='rounded-sm border px-1 shadow-sm duration-150 hover:bg-orange-300'
                  >
                    +
                  </button>
                </div>
                <span className='col-span-3 flex items-center justify-center text-center'>
                  {formatPrice(Number(item.option.price) * Number(item.option.quantity))}
                </span>
                <button onClick={handleDelete(index)} className='col-span-3 text-center'>
                  Xóa
                </button>
              </div>
            </div>
          ))}
      </div>
      {/* checkout */}
      <div className='flex items-center justify-between border-t bg-white px-4 py-2 shadow-md'>
        <div className='flex flex-shrink-0 items-center'>
          <input type='checkbox' onChange={handleCheckedAll} checked={isCheckedAll} />
          <button onClick={handleCheckedAll} className='mx-3 cursor-pointer text-sm md:text-lg'>
            Chọn tất cả
          </button>
          <button onClick={handleDeleteChecked} className='hidden cursor-pointer md:inline-block'>
            Xóa
          </button>
        </div>
        <div className='flex items-center'>
          <div className='flex-grow md:px-2'>
            <span className='hidden md:inline-block'>Tổng thanh toán ({checkedItems.length} sản phẩm):</span>
            <span className='mr-2 text-lg text-orange-500 md:text-2xl'>{formatPrice(totalCost) || formatPrice(0)}</span>
          </div>
          <button className='min-w-[3rem] flex-shrink-0 rounded border-b-4 border-blue-700 bg-blue-500 py-2 px-1 font-bold text-white hover:border-blue-500 hover:bg-blue-400 md:px-4'>
            <Link
              to={checkedItems.length > 0 ? path.checkout : path.cart}
              state={{
                orderItem: omit<CartItem[]>(checkedItems, 'checked'),
              }}
            >
              Thanh Toán
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartUser;
