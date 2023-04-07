import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Star from '../star';
import { formatPrice } from 'src/utils/formatPrice';
import { FcSalesPerformance } from 'react-icons/fc';

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return <div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick} />;
// }
function TopProducts() {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    nextArrow: <div style={{ display: 'block', background: 'red' }}>ádsd</div>,
  };
  return (
    <div className='mx-auto mb-4 mt-4 max-w-7xl overflow-hidden rounded-sm bg-slate-50 pb-8 shadow-md'>
      {/* <div className='mb-6 flex items-center justify-center bg-white p-2'>
        <FcSalesPerformance className='text-4xl' />
        <h2 className='ml-2 text-center text-3xl font-semibold uppercase text-yellow-400'>top sản phẩm bán chạy</h2>
      </div>
      <Slider {...settings}>
        <Link to='/' className=''>
          <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-transform duration-300 hover:shadow-md'>
            <div className='relative w-full flex-shrink-0 pt-[100%]'>
              <img
                className='absolute top-0 left-0 h-full w-full object-contain'
                src='https://cdn.didongviet.vn/pub/media/catalog/product//o/p/oppo-reno8-t-4g-edit-mau-den-didongviet.jpg'
                alt=''
              />
            </div>
            <div className='mt-auto'>
              <div className='overflow-hidden p-1'>
                <h3 className='min-h-[1.75rem] text-sm duration-150 line-clamp-2 hover:text-orange-600'>
                  asdsd asdasd asd
                </h3>
              </div>
              <div className='p-1'>
                <span className='text-base text-orange-700 line-clamp-1'>{formatPrice(Number(12345678))}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-gray-600'>sdasdas</span>
                <Star ratings={5} />
              </div>
            </div>
          </div>
        </Link>
        <Link to='/' className=''>
          <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md'>
            <div className='relative w-full flex-shrink-0 pt-[100%]'>
              <img
                className='absolute top-0 left-0 h-full w-full object-contain'
                src='https://cdn.didongviet.vn/pub/media/catalog/product//o/p/oppo-reno8-t-4g-edit-mau-den-didongviet.jpg'
                alt=''
              />
            </div>
            <div className='mt-auto'>
              <div className='overflow-hidden p-1'>
                <h3 className='min-h-[1.75rem] text-sm duration-150 line-clamp-2 hover:text-orange-600'>
                  asdsd asdasd asd
                </h3>
              </div>
              <div className='p-1'>
                <span className='text-base text-orange-700 line-clamp-1'>{formatPrice(Number(12345678))}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-gray-600'>sdasdas</span>
                <Star ratings={5} />
              </div>
            </div>
          </div>
        </Link>
        <Link to='/' className=''>
          <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md'>
            <div className='relative w-full flex-shrink-0 pt-[100%]'>
              <img
                className='absolute top-0 left-0 h-full w-full object-contain'
                src='https://cdn.didongviet.vn/pub/media/catalog/product//o/p/oppo-reno8-t-4g-edit-mau-den-didongviet.jpg'
                alt=''
              />
            </div>
            <div className='mt-auto'>
              <div className='overflow-hidden p-1'>
                <h3 className='min-h-[1.75rem] text-sm duration-150 line-clamp-2 hover:text-orange-600'>
                  asdsd asdasd asd
                </h3>
              </div>
              <div className='p-1'>
                <span className='text-base text-orange-700 line-clamp-1'>{formatPrice(Number(12345678))}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-gray-600'>sdasdas</span>
                <Star ratings={5} />
              </div>
            </div>
          </div>
        </Link>
        <Link to='/' className=''>
          <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md'>
            <div className='relative w-full flex-shrink-0 pt-[100%]'>
              <img
                className='absolute top-0 left-0 h-full w-full object-contain'
                src='https://cdn.didongviet.vn/pub/media/catalog/product//o/p/oppo-reno8-t-4g-edit-mau-den-didongviet.jpg'
                alt=''
              />
            </div>
            <div className='mt-auto'>
              <div className='overflow-hidden p-1'>
                <h3 className='min-h-[1.75rem] text-sm duration-150 line-clamp-2 hover:text-orange-600'>
                  asdsd asdasd asd
                </h3>
              </div>
              <div className='p-1'>
                <span className='text-base text-orange-700 line-clamp-1'>{formatPrice(Number(12345678))}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-gray-600'>sdasdas</span>
                <Star ratings={5} />
              </div>
            </div>
          </div>
        </Link>
        <Link to='/' className=''>
          <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md'>
            <div className='relative w-full flex-shrink-0 pt-[100%]'>
              <img
                className='absolute top-0 left-0 h-full w-full object-contain'
                src='https://cdn.didongviet.vn/pub/media/catalog/product//o/p/oppo-reno8-t-4g-edit-mau-den-didongviet.jpg'
                alt=''
              />
            </div>
            <div className='mt-auto'>
              <div className='overflow-hidden p-1'>
                <h3 className='min-h-[1.75rem] text-sm duration-150 line-clamp-2 hover:text-orange-600'>
                  asdsd asdasd asd
                </h3>
              </div>
              <div className='p-1'>
                <span className='text-base text-orange-700 line-clamp-1'>{formatPrice(Number(12345678))}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-gray-600'>sdasdas</span>
                <Star ratings={5} />
              </div>
            </div>
          </div>
        </Link>
      </Slider> */}
    </div>
  );
}
export default TopProducts;
