import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { GrFilter } from 'react-icons/gr';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Star from 'src/components/star';
import path from 'src/constants/path';
import { Brand } from 'src/types/brand.type';
import { ProductListConfig } from 'src/types/product.type';
import { type FilterPriceSchema, filterPriceSchema } from 'src/utils/rulesValidateForm';
interface Props {
  queryConfig: {
    [key in keyof ProductListConfig]: string;
  };
  brands: Brand[];
}

function AsignFilter({ queryConfig, brands }: Props) {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FilterPriceSchema>({
    resolver: yupResolver(filterPriceSchema),
  });
  const onSubmit = handleSubmit((data) => {
    if (Number(data.minPrice) > Number(data.maxPrice) || Number(data.maxPrice) < Number(data.minPrice)) {
      toast.error('Giá min max không hợp lệ');
      return;
    } else {
      if (data.maxPrice && data.maxPrice) {
        navigate({
          pathname: path.home,
          search: createSearchParams({
            ...queryConfig,
            price_min: data.minPrice as string,
            price_max: data.maxPrice as string,
          }).toString(),
        });
      }
      reset();
    }
  });
  return (
    <div className='p-4'>
      <div className='flex items-center border-b border-b-green-600'>
        <GrFilter />
        <span className='ml-2 font-bold'>Bộ Lọc Tìm kiếm</span>
      </div>
      <div className='mt-2'>
        <p className='text-base text-black'>Theo nhà sản xuất</p>
        <ul>
          {brands.length >= 0 &&
            brands.map((brand) => (
              <li
                key={brand.id}
                className={classNames('cursor-pointer p-2 text-sm text-gray-700 duration-200 hover:text-orange-500', {
                  'text-orange-500': String(brand.id) === queryConfig.brand_id,
                })}
              >
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({ ...queryConfig, brand_id: brand.id.toString() }).toString(),
                  }}
                >
                  {brand.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className='mt-2'>
        <p className='text-base text-black'>Theo giá</p>
        <form className='mt-2 flex flex-col' noValidate onSubmit={onSubmit}>
          <div className='flex items-center justify-around'>
            <input
              type='text'
              placeholder='₫ TỪ'
              {...register('minPrice')}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs'
            />
            <span className='mx-1 h-0.5 w-[20%] bg-slate-600'></span>
            <input
              type='text'
              placeholder='₫ ĐẾN'
              {...register('maxPrice')}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs'
            />
          </div>
          <button
            type='submit'
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
                  {i === 0 && (
                    <Link
                      to={{
                        pathname: path.home,
                        search: createSearchParams({ ...queryConfig, rate: '5' }).toString(),
                      }}
                    >
                      <Star ratings={5} />
                    </Link>
                  )}
                  {i === 1 && (
                    <Link
                      to={{
                        pathname: path.home,
                        search: createSearchParams({ ...queryConfig, rate: '4' }).toString(),
                      }}
                    >
                      <Star ratings={4} />
                    </Link>
                  )}
                  {i === 2 && (
                    <Link
                      to={{
                        pathname: path.home,
                        search: createSearchParams({ ...queryConfig, rate: '3' }).toString(),
                      }}
                    >
                      <Star ratings={3} />
                    </Link>
                  )}
                  {i === 3 && (
                    <Link
                      to={{
                        pathname: path.home,
                        search: createSearchParams({ ...queryConfig, rate: '2' }).toString(),
                      }}
                    >
                      <Star ratings={2} />
                    </Link>
                  )}
                  {i === 4 && (
                    <Link
                      to={{
                        pathname: path.home,
                        search: createSearchParams({ ...queryConfig, rate: '1' }).toString(),
                      }}
                    >
                      <Star ratings={1} />
                    </Link>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <button
        type='button'
        className='mr-2 mb-2 w-full rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 duration-300 hover:bg-blue-800 hover:text-white focus:outline-none dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white'
      >
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              page: queryConfig.page as string,
              limit: queryConfig.limit as string,
            }).toString(),
          }}
        >
          Xóa Bô Lọc
        </Link>
      </button>
    </div>
  );
}
export default AsignFilter;
