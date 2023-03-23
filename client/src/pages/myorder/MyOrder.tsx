import { useState } from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
function MyOrder() {
  const [isOpenProcess, setIsOpenProcess] = useState<{
    id: number;
    open: boolean;
  }>({
    id: -1,
    open: false,
  });
  return (
    <div className='mx-auto max-w-7xl p-2'>
      <div className='mt-2 rounded-sm bg-white p-2'>
        <div>
          <div className='mb-2 flex items-center border-b'>
            <button
              type='button'
              onClick={() => {
                setIsOpenProcess({ ...isOpenProcess, open: !isOpenProcess.open });
              }}
              className='inline-flex justify-center whitespace-nowrap rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
            >
              {isOpenProcess.open ? 'Tắt tiến trình' : 'Xem tiến trình'}
            </button>
            <AnimatePresence>
              {isOpenProcess.open ? (
                <motion.ol
                  className='w-full items-center sm:flex'
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
                      <h3 className='text-center text-lg font-semibold text-gray-900 dark:text-white'>Đã thanh toán</h3>
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
                      <h3 className='text-center text-lg font-semibold text-gray-900 dark:text-white'>Đã nhận hàng</h3>
                    </div>
                  </li>
                </motion.ol>
              ) : (
                <motion.div
                  className='ml-2'
                  initial={{ opacity: 0, transform: 'scale(0)' }}
                  animate={{ opacity: 1, transform: 'scale(1)' }}
                  exit={{ opacity: 0, transform: 'scale(0)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <span className=''>
                      <b>Đia chỉ: </b>Ấp thới phong A, thới lai, cần thơ
                    </span>
                    <span className='mx-2 border-x-[2px] px-2'>
                      <b>Số điện thoại:</b> 00758863
                    </span>
                    <span>
                      <b>Người nhận: </b>nguyễn minh đăng
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <img
              src='https://images.unsplash.com/photo-1678940467825-85524f3a9ccb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60'
              alt=''
              className='mr-2 h-[5rem] w-[5rem] object-cover'
            />
            <div>
              <h2 className='text-lg'>Dien thoai dau moi =)))</h2>
              <div className='flex flex-col items-start text-sm text-slate-400'>
                <div className='flex items-center'>
                  <span>phan loai hang: </span>
                  <span>ram: 23GB, rom: 23g, mau: do</span>
                </div>
                <p>Số lượng: 1</p>
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='mr-4 flex items-center'>
              <FaMoneyCheckAlt className='mr-1 text-2xl text-orange-400' />
              <span>Thành tiền:</span>
            </div>
            <span className='text-xl font-semibold text-orange-500'>9.000.0000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyOrder;
