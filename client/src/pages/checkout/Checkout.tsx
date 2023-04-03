import { Dialog, Transition } from '@headlessui/react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPaypal } from 'react-icons/bs';
import { FaWallet } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from 'src/apis/order.api';
import path from 'src/constants/path';
import OrderItem from 'src/pages/checkout/orderitem/OrderItems';
import { CartItem as CartItemType } from 'src/types/cart';
import { User } from 'src/types/user.type';
import { isAxiosErr } from 'src/utils/error';
import { formatPrice } from 'src/utils/formatPrice';
interface LocationState {
  orderItem: CartItemType[];
  id: number;
  userId: number;
}
function Checkout() {
  const { t } = useTranslation('checkout');
  const navigate = useNavigate();
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
    refetchOnWindowFocus: false,
  });
  const selectMethodMutation = useMutation({
    mutationFn: (body: { id: number; method: string }) => orderApi.setPaymentMethod(body.method, body.id),
    onError: (err) => {
      if (isAxiosErr<{ message: string }>(err)) {
        toast.error(err.response?.data.message, { autoClose: 2000 });
        return;
      }
    },
  });
  const updateOrderMutation = useMutation({
    mutationFn: (body: { id: number; status: string }) => orderApi.updateStatus(body.status, body.id),
    onError: (err) => {
      if (isAxiosErr<{ message: string }>(err)) {
        toast.error(err.response?.data.message, { autoClose: 2000 });
        return;
      }
    },
  });
  const updateAddressOrderMutation = useMutation({
    mutationFn: (body: { id: number; address: string }) => orderApi.updateAddressOrder(body.address, body.id),
    onError: (err) => {
      if (isAxiosErr<{ message: string }>(err)) {
        toast.error(err.response?.data.message, { autoClose: 2000 });
        return;
      }
    },
  });
  const updateStatusPaymentMutation = useMutation({
    mutationFn: (id: number) => orderApi.updateStatusPayment(id),
    onError: (err) => {
      if (isAxiosErr<{ message: string }>(err)) {
        toast.error(err.response?.data.message, { autoClose: 2000 });
        return;
      }
    },
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
          finalPrice: orderItems.data.payment.amount - prev?.discount + 50000,
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
  const handleCancelOrder = () => {
    if (orderItems?.data && orderItems.data.order_id) {
      updateOrderMutation.mutate({ id: orderItems.data.order_id, status: 'CANCELLED' });
      navigate('/');
    } else {
      return;
    }
  };
  const handleCheckoutOrder = (status?: string) => {
    console.log(status);
    if (address.content && address.id !== orderItems?.data.user.default_address && orderItems?.data.order_id) {
      updateAddressOrderMutation.mutate({ id: orderItems.data.order_id, address: address.content });
    }
    if (paymentMethod.method && orderItems?.data.order_id) {
      selectMethodMutation.mutate(
        { id: orderItems.data.order_id, method: paymentMethod.method },
        {
          onSuccess: () => {
            if (!userInfo?.phone) {
              toast.error(t('checkout.you have not entered your phone number'), { autoClose: 1500 });
              return;
            } else {
              if (status && status === 'COMPLETED') {
                updateStatusPaymentMutation.mutate(orderItems.data.order_id, {
                  onSuccess: () => {
                    updateOrderMutation.mutate(
                      { id: orderItems.data.order_id, status: 'PROCESSING' },
                      {
                        onSuccess: () => {
                          toast.success(t('checkout.payment success'));
                          navigate(path.myOrders);
                        },
                      }
                    );
                  },
                });
              }
              if (!status) {
                updateOrderMutation.mutate(
                  { id: orderItems.data.order_id, status: 'PROCESSING' },
                  {
                    onSuccess: () => {
                      toast.success(t('checkout.payment success'));
                      navigate(path.myOrders);
                    },
                  }
                );
              }
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
              <h2 className='bg-blue-200 px-2 py-3 text-lg font-semibold text-orange-500'>
                {t('checkout.consignee information')}
              </h2>
              <div>
                {userInfo?.firstName && userInfo.lastName && (
                  <p className='text-slate-500'>
                    <span>{t('checkout.first and last name')}: </span>
                    <span className='text-base font-medium italic text-black'>
                      {userInfo.firstName + ' ' + userInfo.lastName}
                    </span>
                  </p>
                )}
                {userInfo?.phone && (
                  <p className='text-slate-500'>
                    <span>{t('checkout.phone number')}: </span>
                    <span className='text-base font-medium italic text-black'>{userInfo.phone}</span>
                  </p>
                )}
                {!userInfo?.phone && (
                  <div className='mt-2 flex flex-wrap'>
                    <span className='mr-2 text-red-500'>{t('checkout.please add phone number')}</span>
                    <Link to='/profile/file' className='text-blue-500 hover:text-black'>
                      {t('checkout.add phone number')}
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
                    <span className='ml-2 text-lg font-semibold text-orange-500'>
                      {t('checkout.delivery address')}:
                    </span>
                  </div>
                  <div className='flex flex-wrap items-center'>
                    <span className='mr-2 text-base'>{address.content}</span>
                    <div className='flex items-center'>
                      {userInfo.default_address === address.id && (
                        <span className='mr-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800'>
                          {t('checkout.default')}
                        </span>
                      )}
                      <button
                        className='whitespace-nowrap rounded-sm text-blue-400 duration-300 hover:text-orange-500'
                        onClick={openModal}
                      >
                        {t('checkout.change')}
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
                                  {t('checkout.your address')}
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
                                              'ml-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ',
                                              {
                                                hidden: !(userInfo.default_address === address.id),
                                              }
                                            )}
                                          >
                                            {t('checkout.default')}
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
                                    {t('checkout.back')}
                                  </button>
                                  <button
                                    type='button'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
                                    onClick={handleChangeAddress}
                                  >
                                    {t('checkout.confirm exchange')}
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
                  <span>{t('checkout.please add an address so we can make the delivery for you')}</span>
                  <Link
                    to='/profile/address'
                    type='button'
                    className='mr-4 inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-black duration-200 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
                  >
                    {t('checkout.Add address')}
                  </Link>
                </div>
              )}
              {orderItems?.data.status === 'PENDING' && (
                <button
                  type='button'
                  onClick={handleCancelOrder}
                  className=' mt-4 mb-2 rounded-lg border border-orange-500 px-3 py-2.5 text-center text-sm font-medium text-slate-400 duration-150 hover:bg-gradient-to-bl hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 '
                >
                  {t('checkout.cancel order')}
                </button>
              )}
            </div>
          </div>
          <div className='col-span-1 mt-2 pr-2 lg:mt-0 lg:px-2'>
            <h2 className='bg-blue-200 px-2 py-3 text-lg font-semibold text-orange-500'>
              {t('checkout.ordered product information')}
            </h2>
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
        {orderItems?.data.order_id && orderItems.data.status === 'PENDING' ? (
          <div className='col-span-2 border-l p-2 lg:col-span-1'>
            <div className='mb-2 flex items-center'>
              <FaWallet className='text-xl text-blue-400' />
              <h2 className='ml-2 text-xl font-semibold'>{t('checkout.payment')}</h2>
            </div>
            <div className='w-full'>
              <div>
                <h3 className='mb-2 bg-slate-300 p-2'>{t('checkout.payment on delivery')}</h3>
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
                    <h4 className='ml-2'>{t('checkout.payment on delivery')}</h4>
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
                    <h4 className='ml-2'>{t('checkout.pay by Paypal')}</h4>
                  </button>
                </div>
              </div>
              <div className='mt-4'>
                <h3 className='bg-slate-300 p-2'>{t('checkout.discount code')}</h3>
                <div className='mt-2 flex items-center p-1'>
                  <input
                    type='text'
                    id='small-input'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-xs'
                  />
                  <button
                    type='button'
                    // onClick={() => throttled.current()()}
                    className='ml-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none'
                  >
                    {t('checkout.select code')}
                  </button>{' '}
                </div>
              </div>
              <div className='mt-2'>
                <h3 className='bg-slate-300 p-2'>{t('checkout.information order')}</h3>
                <div className='mt-2 p-1'>
                  <div className='flex w-full items-center justify-between'>
                    <span className='text-left text-gray-400'>
                      {t('checkout.provisional')} ({price.totalQuantity} {t('checkout.product')})
                    </span>
                    <span className='text-end'>{formatPrice(price?.total || 0)}</span>
                  </div>
                  <div className='flex w-full items-center justify-between'>
                    <span className='text-left text-gray-400'>{t('checkout.discount')}</span>
                    <span className='text-end'>{formatPrice(price.discount)}</span>
                  </div>
                  <div className='flex w-full items-center justify-between'>
                    <span className='text-left text-gray-400'>Phí vận chuyển toàn quốc</span>
                    <span className='text-end'>{formatPrice(50000)}</span>
                  </div>
                  <div className='mt-2 flex w-full items-center justify-between'>
                    <span className='text-left text-gray-400'>{t('checkout.total')}</span>
                    <span className='text-end text-lg font-semibold text-orange-400'>
                      {formatPrice(price?.finalPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-2 flex items-center justify-center'>
                {paymentMethod?.method === 'CASH_ON_DELIVERY' ? (
                  <button
                    onClick={() => handleCheckoutOrder()}
                    type='button'
                    className='mr-2 mb-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 '
                  >
                    {t('checkout.payment confirmation')}
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
                              handleCheckoutOrder(detail.status);
                            })
                          : Promise.resolve();
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='text-lg font-semibold text-orange-400'>{t('checkout.you have successfully paid')}</div>
        )}
      </div>
    </div>
  );
}
export default Checkout;
