import { Dialog, Transition } from '@headlessui/react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { FaWallet } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import userApi from 'src/apis/user.api';
import CartItem from 'src/components/cartitems';
import { RootState } from 'src/store';
import { CartItem as CartItemType } from 'src/types/cart';
import { formatPrice } from 'src/utils/formatPrice';


interface LocationState {
  orderItem: CartItemType[];
}
function Checkout() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<number>();
  const [price, setPrice] = useState<{
    total: number;
    discount: number;
    finalPrice: number;
    totalQuantity: number;
  }>({
    total: 0,
    discount: 0,
    finalPrice: 0,
    totalQuantity: 0,
  });
  const [address, setAddress] = useState<{
    id: number;
    content: string;
  }>({
    id: -1,
    content: '',
  });
  const { id: userId } = useSelector((state: RootState) => state.userReducer.userInfo);
  const location = useLocation();
  const stateOrderItems = (location.state as LocationState).orderItem;
  const orderItems = useMemo(() => Object.values(stateOrderItems) || [], [stateOrderItems]);
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUserByid(userId as number),
    enabled: userId !== undefined,
    refetchOnWindowFocus: false,
    staleTime: 15000,
    onSuccess: (user) => {
      if (user.data.default_address && !isActive) {
        setAddress({
          id: user.data.default_address,
          content: user.data.address.find((address) => address.id === user.data.default_address)?.address || '',
        });
      }
    },
  });
  useEffect(() => {
    if (orderItems.length > 0) {
      setPrice((prev) => {
        const totalPrice: {
          quantity: number;
          cost: number;
        } = orderItems.reduce(
          (pre, next) => {
            return {
              quantity: pre.quantity + next.option.quantity,
              cost: pre.cost + next.option.quantity * Number(next.option.price),
            };
          },
          { cost: 0, quantity: 0 }
        );
        return {
          ...prev,
          total: totalPrice.cost,
          finalPrice: totalPrice.cost - prev?.discount,
          totalQuantity: totalPrice.quantity,
        };
      });
    }
  }, [orderItems]);

  function closeModal() {
    setIsActive(address.id);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    if (user?.data.default_address && !isActive) {
      setIsActive(user.data.default_address);
    }
  }
  const handleChangeAddress = () => {
    if (user?.data.address) {
      setAddress({
        id: Number(isActive),
        content: user.data.address.find((address) => address.id === isActive)?.address || '',
      });
      setIsOpen(false);
    }
  };
  return (
    <div className='mx-auto my-2 max-w-7xl bg-white p-2 shadow-md'>
      <div className='grid grid-cols-2 lg:grid-cols-3'>
        <div className='col-span-2 grid grid-cols-1 lg:grid-cols-2'>
          <div className='col-span-1 border-r bg-white pr-2'>
            <div className='w-full'>
              <h2 className='bg-blue-200 px-2 py-3 text-lg font-semibold text-orange-500'>Thông tin người nhận hàng</h2>
              <div>
                {user?.data.firstName && user.data.lastName && (
                  <p className='text-slate-500'>
                    <span>Họ và tên: </span>
                    <span className='text-base font-medium italic text-black'>
                      {user.data.firstName + ' ' + user.data.lastName}
                    </span>
                  </p>
                )}
                {user?.data.phone && (
                  <p className='text-slate-500'>
                    <span>Số điện thoại: </span>
                    <span className='text-base font-medium italic text-black'>{user.data.phone}</span>
                  </p>
                )}
                {!user?.data.phone && (
                  <div className='mt-2 flex flex-wrap'>
                    <span className='mr-2 text-red-500'>Vui lòng thêm số điện thoại</span>
                    <Link to='/profile/file' className='text-blue-500 hover:text-black'>
                      Thêm sdt
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className='w-full'>
              {user?.data.address && user.data.address.length > 0 && user.data.default_address ? (
                <div className=' mt-4 bg-white'>
                  <div className='flex items-center bg-blue-200 px-2 py-3'>
                    <span>
                      <HiLocationMarker className='text-xl text-orange-600' />
                    </span>
                    <span className='ml-2 text-lg font-semibold text-orange-500'>Địa chỉ nhận hàng:</span>
                  </div>
                  <div className='flex flex-wrap items-center'>
                    <span className='mr-2 text-base'>{address.content}</span>
                    <div className='flex items-center'>
                      {user.data.default_address === address.id && (
                        <span className='mr-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'>
                          Mặc định
                        </span>
                      )}
                      <button
                        className='whitespace-nowrap rounded-sm text-blue-400 duration-300 hover:text-orange-500'
                        onClick={openModal}
                      >
                        Thay đổi
                      </button>
                    </div>
                    {/* thay đổi addr */}
                    <Transition appear show={isOpen} as={Fragment}>
                      <Dialog as='div' className='relative z-10' onClose={closeModal}>
                        <Transition.Child
                          as={Fragment}
                          enter='ease-out duration-300'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <div className='fixed inset-0 bg-black bg-opacity-25' />
                        </Transition.Child>

                        <div className='fixed inset-0 overflow-y-auto'>
                          <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                              as={Fragment}
                              enter='ease-out duration-300'
                              enterFrom='opacity-0 scale-95'
                              enterTo='opacity-100 scale-100'
                              leave='ease-in duration-200'
                              leaveFrom='opacity-100 scale-100'
                              leaveTo='opacity-0 scale-95'
                            >
                              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title as='h3' className='text-lg font-semibold leading-6 text-orange-400'>
                                  Địa chỉ của bạn
                                </Dialog.Title>
                                <div className='mt-2'>
                                  {user.data.address.length > 0 &&
                                    user.data.address.map((address) => (
                                      <button
                                        key={address.id}
                                        onClick={() => setIsActive(address.id)}
                                        className={classNames(
                                          'block min-h-[4rem] w-full border-b text-left duration-300 hover:text-blue-500',
                                          {
                                            'text-blue-500': isActive === address.id,
                                          }
                                        )}
                                      >
                                        {address.address}
                                        {user.data.default_address && (
                                          <span
                                            className={classNames(
                                              'ml-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                                              {
                                                hidden: !(user.data.default_address === address.id),
                                              }
                                            )}
                                          >
                                            Mặc định
                                          </span>
                                        )}
                                      </button>
                                    ))}
                                </div>

                                <div className='mt-4 flex items-center justify-end'>
                                  <button
                                    type='button'
                                    className='mr-4 inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-black duration-200 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
                                    onClick={closeModal}
                                  >
                                    Trở về
                                  </button>
                                  <button
                                    type='button'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
                                    onClick={handleChangeAddress}
                                  >
                                    Xác nhận đổi
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                  </div>
                </div>
              ) : (
                <div className='mt-2 flex flex-col justify-start text-red-500'>
                  <span>Vui lòng thêm địa chỉ để chúng tôi có thể thực hiện việc giao hàng cho bạn</span>
                  <Link
                    to='/profile/address'
                    type='button'
                    className='mr-4 inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-black duration-200 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
                  >
                    Thêm địa chỉ
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className='col-span-1 mt-2 pr-2 lg:mt-0 lg:px-2'>
            <h2 className='bg-blue-200 px-2 py-3 text-lg font-semibold text-orange-500'>Thông tin sản phẩm đặt hàng</h2>
            <div className='max-h-[300px] overflow-auto'>
              {orderItems.length > 0 &&
                orderItems.map((item) => (
                  <div key={item.id}>
                    <CartItem cartItem={item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='col-span-2 border-l p-2 lg:col-span-1'>
          <div className='mb-2 flex items-center'>
            <FaWallet className='text-xl text-blue-400' />
            <h2 className='ml-2 text-xl font-semibold'>Thanh toán</h2>
          </div>
          <div className='w-full'>
            <div>
              <h3 className='mb-2 bg-slate-300 p-2'>Chọn phương thức thanh toán</h3>
              <div>
                <div className='flex cursor-pointer items-center rounded-md p-1 duration-200 hover:bg-slate-200'>
                  <span className='flex h-10 w-10 items-center justify-center rounded-md  bg-green-400'>
                    <HiOutlineHomeModern className='text-3xl text-white' />
                  </span>
                  <h4 className='ml-2'>Thanh toán khi nhận hàng</h4>
                </div>
                <div className='mt-2'>
                  <PayPalScriptProvider
                    options={{
                      'client-id': 'AQxm6BTwl0EiN9LhMlyXqgxwOYAWt4Uw3wu7LBDTlxI4MgUdqby0f6-awq5CI-s_xgpISXV1vbpD1kHn',
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        const price_usd = Number(price.finalPrice) * 0.000043;
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${price_usd.toFixed(2)}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order
                          ? actions.order?.capture().then((detail) => {
                              console.log(detail);
                            })
                          : Promise.resolve();
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <h3 className='bg-slate-300 p-2'>Mã giảm giá</h3>
              <div className='mt-2 flex items-center p-1'>
                <input
                  type='text'
                  id='small-input'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs'
                />
                <button
                  type='button'
                  className='ml-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700'
                >
                  Chọn mã
                </button>
              </div>
            </div>
            <div className='mt-2'>
              <h3 className='bg-slate-300 p-2'>Thông tin đơn hàng</h3>
              <div className='mt-2 p-1'>
                <div className='flex w-full items-center justify-between'>
                  <span className='text-left text-gray-400'>Tạm tính ({price.totalQuantity} sản phẩm)</span>
                  <span className='text-end'>{formatPrice(price?.total || 0)}</span>
                </div>
                <div className='flex w-full items-center justify-between'>
                  <span className='text-left text-gray-400'>Giảm giá</span>
                  <span className='text-end'>{formatPrice(price.discount)}</span>
                </div>
                <div className='mt-2 flex w-full items-center justify-between'>
                  <span className='text-left text-gray-400'>Tổng cộng</span>
                  <span className='text-end text-lg font-semibold text-orange-400'>
                    {formatPrice(price?.finalPrice)}
                  </span>
                </div>
              </div>
            </div>
            <div className='mt-2 flex items-center justify-center'>
              <button
                type='button'
                className='mr-2 mb-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800'
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
