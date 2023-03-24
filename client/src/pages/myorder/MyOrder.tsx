import { useState } from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import orderApi from 'src/apis/order.api';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { ResGetAllOrder } from 'src/types/order.type';
import { formatPrice } from 'src/utils/formatPrice';
import { baseURL } from 'src/constants/constants';
import { useNavigate } from 'react-router-dom';
import path from 'src/constants/path';
function MyOrder() {
  const navigate = useNavigate();
  const [orders, setOders] = useState<Pick<ResGetAllOrder, 'total' | 'data'>>();
  const { id: userId } = useSelector(
    (state: RootState) => state.userReducer.userInfo,
    (prev, next) => prev.id === next.id
  );
  const [isOpenProcess, setIsOpenProcess] = useState<{
    id: number;
    open: boolean;
  }>({
    id: -1,
    open: false,
  });
  // call api get all order by user
  const { data } = useQuery({
    queryKey: ['ordersOfUser'],
    queryFn: () =>
      orderApi.getOrdersOfUser({
        user_id: userId || -1,
      }),
    enabled: Boolean(userId),
    onSuccess: (data) => {
      setOders({
        total: data.data.total,
        data: data.data.data,
      });
    },
  });
  const handleCheckout = (id: number) => {
    navigate(path.checkout, {
      state: {
        id,
        userId,
      },
    });
  };
  return (
    <div className='mx-auto max-w-7xl p-2'>
      {orders?.data.length &&
        orders.data.map((order) => (
          <div key={order.order_id} className='mt-2 rounded-sm bg-white p-2'>
            {/* section address timeline */}
            <div className='mb-2 flex items-center border-b'>
              <button
                type='button'
                onClick={() => {
                  setIsOpenProcess({ ...isOpenProcess, open: !isOpenProcess.open });
                }}
                className='inline-flex justify-center whitespace-nowrap bg-transparent px-4 py-2 text-sm font-medium text-blue-400 shadow-sm duration-200 hover:text-orange-600'
              >
                {isOpenProcess.open ? 'Tắt tiến trình' : 'Xem tiến trình'}
              </button>
              <AnimatePresence>
                {isOpenProcess.open ? (
                  <motion.ol
                    className='w-full flex-grow items-center sm:flex'
                    initial={{ opacity: 0, transform: 'scale(0)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <li className='relative mb-6 w-1/3 sm:mb-0'>
                      <div className='flex items-center'>
                        <div className='hidden h-0.5 w-full bg-gray-200 opacity-0 dark:bg-gray-700 sm:flex' />
                        <div className='z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-green-400 ring-0 ring-white dark:bg-blue-900 dark:ring-gray-900 sm:ring-8'>
                          <RiMoneyDollarBoxLine className='text-2xl text-green-500' />
                        </div>
                        <div className='hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex' />
                      </div>
                      <div className=' '>
                        <h3 className='text-center text-lg font-semibold text-gray-900 dark:text-white'>Đã đặt hàng</h3>
                      </div>
                    </li>
                    <li className='relative mb-6 w-1/3 sm:mb-0'>
                      <div className='flex items-center'>
                        <div className='hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex' />
                        <div className='z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-green-400 ring-0 ring-white dark:bg-blue-900 dark:ring-gray-900 sm:ring-8'>
                          <RiMoneyDollarBoxLine className='text-2xl text-green-500' />
                        </div>
                        <div className='hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex' />
                      </div>
                      <div className=' '>
                        <h3 className='text-center text-lg font-semibold text-gray-900 dark:text-white'>
                          Đã thanh toán
                        </h3>
                      </div>
                    </li>
                    <li className='relative mb-6 w-1/3 sm:mb-0'>
                      <div className='flex items-center'>
                        <div className='hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex' />
                        <div className='z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-green-400 ring-0 ring-white dark:bg-blue-900 dark:ring-gray-900 sm:ring-8'>
                          <RiMoneyDollarBoxLine className='text-2xl text-green-500' />
                        </div>
                        <div className='hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex' />
                      </div>
                      <div className=' '>
                        <h3 className='text-center text-lg font-semibold text-gray-900 dark:text-white'>Đang xử lý</h3>
                      </div>
                    </li>
                    <li className='relative mb-6 w-1/3 sm:mb-0'>
                      <div className='flex items-center'>
                        <div className='hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex' />
                        <div className='z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-green-400 ring-0 ring-white dark:bg-blue-900 dark:ring-gray-900 sm:ring-8'>
                          <RiMoneyDollarBoxLine className='text-2xl text-green-500' />
                        </div>
                        <div className='hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex' />
                      </div>
                      <div className=' '>
                        <h3 className='text-center text-lg font-semibold text-gray-900 dark:text-white'>
                          Đang vận chuyển
                        </h3>
                      </div>
                    </li>
                    <li className='relative mb-6 w-1/3 sm:mb-0'>
                      <div className='flex items-center'>
                        <div className='hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex' />
                        <div className='z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-green-400 ring-0 ring-white dark:bg-blue-900 dark:ring-gray-900 sm:ring-8'>
                          <RiMoneyDollarBoxLine className='text-2xl text-green-500' />
                        </div>
                        <div className='hidden h-0.5 w-full bg-gray-200 opacity-0 dark:bg-gray-700 sm:flex' />
                      </div>
                      <div className=' '>
                        <h3 className='text-center text-lg font-semibold text-gray-900 dark:text-white'>
                          Đã nhận hàng
                        </h3>
                      </div>
                    </li>
                  </motion.ol>
                ) : (
                  <motion.div
                    className='ml-2 flex-grow text-center'
                    initial={{ opacity: 0, transform: 'scale(0)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='flex flex-wrap items-center'>
                      <span className=''>
                        <b>Đia chỉ: </b>
                        {order.address}
                      </span>
                      <span className='mx-2  px-2'>
                        <b>Số điện thoại:</b> {order.user.phone}
                      </span>
                      <span>
                        <b>Người nhận: </b>
                        {`${order.user.firstName} ${order.user.lastName}`}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className='border-l px-2'>
                <span className='whitespace-nowrap text-base font-semibold text-orange-500'>
                  {order.timeline[order.timeline.length - 1].content}
                </span>
              </div>
            </div>
            {/* section order */}
            {order.order_items.length &&
              order.order_items.map((orderItem) => (
                <div key={orderItem.product_option_id} className='mb-2 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <img src={`${baseURL}/${orderItem.image}`} alt='' className='mr-2 h-[5rem] w-[5rem] object-cover' />
                    <div>
                      <h2 className='text-lg'>{orderItem.product_name}</h2>
                      <div className='flex flex-col items-start text-sm text-slate-400'>
                        <div className='flex items-center'>
                          <span className='pr-2'>Phân loại hàng: </span>
                          <div className='uppercase'>
                            <span className='border border-slate-300 px-1'>ram: {orderItem.ram}</span>
                            <span className='border border-slate-300 px-1'>rom: {orderItem.rom}</span>
                            <span className='border border-slate-300 px-1'>màu: {orderItem.color}</span>
                          </div>
                        </div>
                        <p>Số lượng: {orderItem.quantity}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-lg font-medium text-black'>{formatPrice(orderItem.prices)}</span>
                  </div>
                </div>
              ))}
            <div className='mr-4 flex items-center justify-between'>
              {order.status === 'PENDING' && (
                <span className='text-sm text-slate-400'>Bạn chưa hoàn thành việc thanh toán, thanh toán ngay!</span>
              )}
              <div className='flex flex-grow items-center justify-end'>
                <FaMoneyCheckAlt className='mr-1 text-2xl text-orange-400' />
                <span className='text-base font-semibold text-black'>
                  Thành tiền: <i className='text-xl text-orange-500'>{formatPrice(order.payment.amount)}</i>
                </span>
                {order.status === 'PENDING' && (
                  <button
                    type='button'
                    onClick={() => handleCheckout(order.order_id)}
                    className='ml-2 inline-flex justify-center whitespace-nowrap rounded-md border border-blue-500 px-4 py-2 text-sm font-medium text-blue-400 duration-200 duration-200 hover:scale-105 hover:border-orange-500 hover:text-orange-400'
                  >
                    Thanh toán
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
export default MyOrder;
