import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { CartItem } from 'src/types/cart';
import { formatPrice } from 'src/utils/formatPrice';
import { useEffect, useMemo, useState } from 'react';
import { produce } from 'immer';
import { omit } from 'lodash';
import { updateCart as updateCartList, clearCart } from 'src/slices/cart.slice';
import { baseURL } from 'src/constants/constants';
import HelmetSEO from 'src/components/Helmet';
import BreadCrumb from 'src/components/admindashboard/breadcrumb';
import { useNavigate } from 'react-router-dom';
// import path from 'src/constants/path';
import { Order } from 'src/types/order.type';
import { useMutation } from '@tanstack/react-query';
import orderApi from 'src/apis/order.api';
import { isAxiosErr } from 'src/utils/error';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
interface ExtendCartItem extends CartItem {
  checked: boolean;
}
function CartUser() {
  const { t } = useTranslation();
  const [extendCartItems, setExtendCartItem] = useState<ExtendCartItem[]>([]);
  const navigate = useNavigate();
  // lấy id và cart của user
  const cartItemUser = useSelector(
    (state: RootState) => state.cartReducer.cartItem,
    () => true
  );
  const { id: userId } = useSelector(
    (state: RootState) => state.userReducer.userInfo,
    () => true
  );
  const dispatch = useDispatch();
  // handle checked
  const isCheckedAll = useMemo(() => extendCartItems.every((purchase) => purchase.checked), [extendCartItems]);
  const checkedItems = useMemo(() => {
    const checkedArr: ExtendCartItem[] = [];
    extendCartItems.forEach((item) => {
      if (item.checked === true) {
        checkedArr.push(item);
      }
    });
    return checkedArr;
  }, [extendCartItems]);
  // tính tổng tiền
  const totalCost = useMemo(() => {
    return checkedItems.reduce((prev, current) => prev + Number(current.option.price) * current.option.quantity, 0);
  }, [checkedItems]);
  const takeOrderMutation = useMutation({
    mutationFn: (order: Order) => orderApi.createOrder(order),
  });
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
        dispatch(updateCartList(updateCart as CartItem[]));
      }
    }
  }, [extendCartItems, dispatch]);
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
  // handle tăng giảm số lượng
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
  const handleCheckout = () => {
    if (checkedItems.length <= 0) toast.error('Vui lòng chọn sản phẩm cần mua', { autoClose: 2000 });
    if (userId && checkedItems.length > 0) {
      const order: Order = {
        user_id: userId,
        items: checkedItems.map((it) => {
          return {
            product_option_id: it.option.product_option_id,
            quantity: it.option.quantity,
          };
        }),
      };
      if (order) {
        takeOrderMutation.mutate(order, {
          onSuccess: (data) => {
            const arrCart = checkedItems.map((item) => {
              return item.option.product_option_id;
            });
            dispatch(clearCart(arrCart));
            navigate('/checkout', {
              state: {
                id: data.data.id,
                userId,
              },
            });
          },
          onError: (err) => {
            if (isAxiosErr<{ error: string }>(err)) {
              toast.error(err.response?.data.error, { autoClose: 2000 });
            }
          },
        });
      }
    }
  };
  return (
    <div className='mx-auto max-w-7xl bg-transparent p-4'>
      <HelmetSEO title='Giỏ hàng'></HelmetSEO>
      <div className='mb-2'>
        <BreadCrumb path={['Fstore', t('cartUser:cartUser.cart')]} />
      </div>
      {/* top section cart*/}
      <div className='grid grid-cols-12 gap-2 bg-white px-6 py-4 text-lg font-semibold shadow-sm'>
        <div className='col-span-1'>
          <input checked={isCheckedAll} onChange={handleCheckedAll} type='checkbox' />
        </div>
        <h2 className='col-span-6'>{t('cartUser:cartUser.Product')}</h2>
        <button onClick={handleDeleteChecked} className='col-span-5 text-center md:hidden'>
          Xóa
        </button>
        <div className='col-span-5 hidden grid-cols-12 lg:grid'>
          <span className='col-span-3 text-center'>{t('cartUser:cartUser.unit price')}</span>
          <span className='col-span-3 text-center'>{t('cartUser:cartUser.quantity')}</span>
          <span className='col-span-3 text-center'>{t('cartUser:cartUser.into money')}</span>
          <span className='col-span-3 text-center'>{t('cartUser:cartUser.operation')}</span>
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
                  {t('cartUser:cartUser.delete')}
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
            {t('cartUser:cartUser.select all')}
          </button>
          <button onClick={handleDeleteChecked} className='hidden cursor-pointer md:inline-block'>
            {t('cartUser:cartUser.delete')}
          </button>
        </div>
        <div className='flex items-center'>
          <div className='flex-grow md:px-2'>
            <span className='hidden md:inline-block'>
              {t('cartUser:cartUser.total payment')} ({checkedItems.length} {t('cartUser:cartUser.Product')}):
            </span>
            <span className='mr-2 text-lg text-orange-500 md:text-2xl'>{formatPrice(totalCost) || formatPrice(0)}</span>
          </div>
          <button
            onClick={() => handleCheckout()}
            className='min-w-[3rem] flex-shrink-0 rounded border-b-4 border-blue-700 bg-blue-500 py-2 px-1 font-bold text-white hover:border-blue-500 hover:bg-blue-400 md:px-4'
          >
            {t('cartUser:cartUser.createOrder')}
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartUser;
