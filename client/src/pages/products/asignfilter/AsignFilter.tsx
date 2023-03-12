import { GrFilter } from 'react-icons/gr';
import { MdStar } from 'react-icons/md';
function AsignFilter() {
  return (
    <div className='p-4'>
      <div className='flex items-center border-b border-b-green-600'>
        <GrFilter />
        <span className='ml-2 font-bold'>Bộ Lọc Tìm kiếm</span>
      </div>
      <div className='mt-2'>
        <p className='text-base text-black'>Theo nhà sản xuất</p>
        <ul>
          <li className='cursor-pointer p-2 text-sm text-gray-700 duration-200 hover:text-orange-500'>Xiaomi</li>
          <li className='cursor-pointer p-2 text-sm text-gray-700 duration-200 hover:text-orange-500'>Samsung</li>
          <li className='cursor-pointer p-2 text-sm text-gray-700 duration-200 hover:text-orange-500'>Nokia</li>
          <li className='cursor-pointer p-2 text-sm text-gray-700 duration-200 hover:text-orange-500'>Apple</li>
        </ul>
      </div>
      <div className='mt-2'>
        <p className='text-base text-black'>Theo giá</p>
        <form className='mt-2 flex flex-col'>
          <div className='flex items-center justify-around'>
            <input
              type='text'
              placeholder='₫ TỪ'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs'
            />
            <span className='mx-1 h-0.5 w-[20%] bg-slate-600'></span>
            <input
              type='text'
              placeholder='₫ ĐẾN'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs'
            />
          </div>
          <button
            type='button'
            className='mr-2 mb-2 mt-4 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            ÁP DỤNG
          </button>
        </form>
      </div>
      <div className='mt-2'>
        <p className='text-base text-black'>Theo đánh giá</p>
        <div>
          {Array(5)
            .fill(0)
            .map((_, i) => {
              return (
                <div
                  className='flex cursor-pointer items-center rounded-sm p-0.5 text-yellow-300 hover:bg-gray-300'
                  key={i}
                >
                  <MdStar />
                  <MdStar />
                  <MdStar />
                  <MdStar />
                  <MdStar />
                  {i !== 0 && <span className='text-sm text-black'>Trở lên</span>}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default AsignFilter;
