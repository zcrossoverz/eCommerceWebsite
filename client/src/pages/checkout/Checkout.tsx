import { Dialog, Transition } from '@headlessui/react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { BsPaypal } from 'react-icons/bs';
import { FaWallet } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from 'src/apis/order.api';
import OrderItem from 'src/pages/checkout/orderitem/OrderItems';
// import CartItem from 'src/components/cartitems';
// import { clearCart } from 'src/slices/cart.slice';
import { CartItem as CartItemType } from 'src/types/cart';
import { User } from 'src/types/user.type';
// import { Order } from 'src/types/order.type';
import { formatPrice } from 'src/utils/formatPrice';
// import { throttle } from 'lodash';
interface LocationState {
  orderItem: CartItemType[];
  id: number;
  userId: number;
}
function Checkout() {
  // lấy id user từ state url
  const location = useLocation();
  const stateOrderItems = useRef(location.state as LocationState);
  // set user info
  const [userInfo, setUserInfo] = useState<User>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<number>();
  const [paymentMethod, setPaymentMethod] = useState<{
    id: number;
    method: string;
  }>({
    id: 1,
    method: 'CASH_ON_DELIVERY',
  });
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
    user_id?: number;
    id: number;
    content: string;
  }>({
    id: -1,
    content: '',
  });
  // const dispatch = useDispatch();
  // const throttled = useRef(
  //   throttle((order: Order) => {
  //     takeOrderMutation.mutate(order);
  //   }, Infinity)
  // );
  const { data: orderItems } = useQuery({
    queryKey: ['id', stateOrderItems.current.id],
    queryFn: () => orderApi.getOneOrder(stateOrderItems.current.id),
    enabled: Boolean(stateOrderItems.current.id),
    onSuccess: (data) => {
      setUserInfo(data.data.user);
      if (data.data.user.address.length) {
        setAddress({
          ...address,
          id: data.data.user.address.find((it) => it.id === data.data.user.default_address)?.id || 0,
          content:
            data.data.user.address.find((it) => it.id === data.data.user.default_address)?.address ||
            data.data.user.address[0].address,
        });
      }
    },
  });
  const selectMethodMutation = useMutation({
    mutationFn: (body: { id: number; method: string }) => orderApi.setPaymentMethod(body.method, body.id),
  });
  const updateOrderMutation = useMutation({
    mutationFn: (body: { id: number; status: string }) => orderApi.updateStatus(body.status, body.id),
    onSuccess: () => {
      toast.success('Thanh toán thành công');
    },
  });
  const updateAddressOrderMutation = useMutation({
    mutationFn: (body: { id: number; address: string }) => orderApi.updateAddressOrder(body.address, body.id),
  });

  useEffect(() => {
    if (orderItems?.data.order_items.length) {
      setPrice((prev) => {
        const totalPrice: {
          quantity: number;
        } = orderItems.data.order_items.reduce(
          (pre, next) => {
            return {
              quantity: pre.quantity + next.quantity,
            };
          },
          { quantity: 0 }
        );
        return {
          ...prev,
          total: orderItems.data.payment.amount,
          finalPrice: orderItems.data.payment.amount - prev?.discount,
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
    if (userInfo?.default_address && !isActive) {
      setIsActive(userInfo.default_address);
    }
  }
  const handleChangeAddress = () => {
    if (userInfo?.address) {
      setAddress({
        id: Number(isActive),
        content: userInfo.address.find((address) => address.id === isActive)?.address || '',
      });
      setIsOpen(false);
    }
  };
  const handleCheckoutOrder = () => {
    if (address.content && address.id !== orderItems?.data.user.default_address && orderItems?.data.order_id) {
      console.log('call address');
      updateAddressOrderMutation.mutate({ id: orderItems.data.order_id, address: address.content });
    }
    if (paymentMethod.method && orderItems?.data.order_id) {
      console.log('call payment method', paymentMethod.method);
      selectMethodMutation.mutate(
        { id: orderItems.data.order_id, method: paymentMethod.method },
        {
          onSuccess: () => {
            if (!userInfo?.phone) {
              toast.error('Bạn điền số điện thoại', { autoClose: 1500 });
              return;
            }
            if (orderItems?.data.order_id && userInfo?.phone) {
              updateOrderMutation.mutate({ id: orderItems.data.order_id, status: 'PROCESSING' });
            }
          },
        }
      );
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
                {userInfo?.firstName && userInfo.lastName && (
                  <p className='text-slate-500'>
                    <span>Họ và tên: </span>
                    <span className='text-base font-medium italic text-black'>
                      {userInfo.firstName + ' ' + userInfo.lastName}
                    </span>
                  </p>
                )}
                {userInfo?.phone && (
                  <p className='text-slate-500'>
                    <span>Số điện thoại: </span>
                    <span className='text-base font-medium italic text-black'>{userInfo.phone}</span>
                  </p>
                )}
                {!userInfo?.phone && (
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
              {userInfo?.address && userInfo.address.length > 0 && userInfo.default_address ? (
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
                      {userInfo.default_address === address.id && (
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
                                  {userInfo.address.length > 0 &&
                                    userInfo.address.map((address) => (
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
                                        {userInfo.default_address && (
                                          <span
                                            className={classNames(
                                              'ml-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                                              {
                                                hidden: !(userInfo.default_address === address.id),
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
            <div className='max-h-[300px] overflow-y-auto'>
              {orderItems?.data.order_items.length &&
                orderItems.data.order_items.map((item) => (
                  <div key={item.product_option_id} className='w-full'>
                    <OrderItem orderItem={item} />
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
                <button
                  onClick={() => setPaymentMethod({ method: 'CASH_ON_DELIVERY', id: 1 })}
                  className={classNames(
                    'flex w-full cursor-pointer items-center rounded-md p-1 duration-200 hover:bg-slate-200',
                    {
                      'font-semibold italic text-orange-500': paymentMethod.id === 1,
                    }
                  )}
                >
                  <span className='flex h-10 w-10 items-center justify-center rounded-md  bg-green-400'>
                    <HiOutlineHomeModern className='text-3xl text-white' />
                  </span>
                  <h4 className='ml-2'>Thanh toán khi nhận hàng</h4>
                </button>
                <button
                  onClick={() => setPaymentMethod({ method: 'PAYPAL', id: 2 })}
                  className={classNames(
                    'flex w-full cursor-pointer items-center rounded-md p-1 duration-200 hover:bg-slate-200',
                    {
                      'font-semibold italic text-orange-500': paymentMethod.id === 2,
                    }
                  )}
                >
                  <span className='flex h-10 w-10 items-center justify-center rounded-md  bg-blue-400'>
                    <BsPaypal className='text-3xl text-white' />
                  </span>
                  <h4 className='ml-2'>Thanh toán bằng Paypal</h4>
                </button>
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
                  // onClick={() => throttled.current()()}
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
              {paymentMethod?.method === 'CASH_ON_DELIVERY' ? (
                <button
                  onClick={handleCheckoutOrder}
                  type='button'
                  className='mr-2 mb-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800'
                >
                  Xác nhận thanh toán
                </button>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
