import { Link } from 'react-router-dom';
import { formatPrice } from 'src/utils/formatPrice';

function Product() {
  return (
    <Link to='/'>
      <div className='overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            className='absolute top-0 left-0 h-full w-full object-cover'
            src='https://cdn.didongviet.vn/pub/media/catalog/product//s/a/samsung-galaxy-s23-mau-tim-1-didongviet_1.jpg'
            alt=''
          />
        </div>
        <div className='overflow-hidden p-2'>
          <h3 className='min-h-[1.75rem] text-sm duration-150 line-clamp-2 hover:text-orange-600'>
            Samsung Galaxy S23 Plus 5G 512GB Chính Hãng
          </h3>
        </div>
        <div className='p-2'>
          <span className='text-base text-orange-700 line-clamp-1'>{formatPrice(1000000)}</span>
        </div>
      </div>
    </Link>
  );
}
export default Product;
