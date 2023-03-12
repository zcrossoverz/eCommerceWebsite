import { useQuery } from '@tanstack/react-query';
import { BsCartPlus, BsHeart } from 'react-icons/bs';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import productsApi from 'src/apis/product.api';
import { isAxiosErr } from 'src/utils/error';
import { formatPrice } from 'src/utils/formatPrice';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: product } = useQuery({
    queryKey: [
      'product',
      {
        id,
      },
    ],
    queryFn: () => productsApi.getProductDetail(id as string),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      if (
        isAxiosErr<{
          error: string;
        }>(err)
      ) {
        toast.error(err.response?.data.error);
      }
    },
  });
  return (
    <>
      {/* <Helmet>
        <title> {`${product.name}`}</title>
      </Helmet> */}
      <div className='mx-auto grid grid-cols-1 grid-rows-1 p-4 shadow-md lg:mt-[100px] lg:w-[80%] lg:grid-cols-[1fr,2fr]'>
        <Carousel autoPlay className='flex flex-row-reverse' emulateTouch={true}>
          {product?.data.images &&
            product?.data.images.map((item, i) => (
              <div key={i}>
                <img className='' src={'http://localhost:3000/' + item.image_url} alt={`${i} Slide`} />
              </div>
            ))}
        </Carousel>
        <div className='p-4'>
          <h1 className='text-4xl font-bold'>{product?.data.name}</h1>
          <div className='mb-2 flex items-center'>
            {/* <Star ratings={product.ratings} /> */}
            {/* <span className='ml-2 text-base text-gray-500'>({product.numOfReviews} Reviews)</span> */}
          </div>
          <div className='detailsBlock'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              {product?.data.product_options &&
                product.data.product_options.map((op) => {
                  return (
                    <div
                      key={op.product_option_id}
                      className='rounded-xl bg-orange-300 px-4 py-2 text-center duration-200 hover:border hover:border-red-800'
                    >
                      <div className='flex items-center justify-center'>
                        <span>Ram: {op.ram}</span>
                        <span className='mx-3'>Rom: {op.rom}</span>
                        <span>Color: {op.color}</span>
                      </div>
                      <span className='text-3xl'>{formatPrice(Number(op.price))}</span>
                    </div>
                  );
                })}
            </div>

            <div className='mt-4 mb-2 flex items-center'>
              <span className='quantity mr-2'>Quantity</span>
              <div className='flex items-center'>
                <span
                  className='rounded-[4px] bg-green-400 px-2 py-1 duration-200 hover:bg-green-300'
                  // onClick={decreaseQuantity}
                >
                  <HiMinus size={16} />
                </span>
                <input
                  type='number'
                  readOnly
                  // value={quantity}
                  className='mx-1 w-12 rounded-[5px] border-2 border-green-400 text-center outline-none'
                />
                <span
                  className='rounded-[4px] bg-green-400 px-2 py-1 duration-200 hover:bg-green-300'
                  // onClick={increaseQuantity}
                >
                  <HiPlus size={16} />
                </span>
              </div>{' '}
            </div>
            <p style={{ paddingBottom: '.5vmax' }}>
              <b
                className={
                  product?.data.product_options[0].quantity && product?.data.product_options[0].quantity < 1
                    ? 'text-red-600'
                    : 'text-green-600'
                }
              >
                {product?.data.product_options[0].quantity && product?.data.product_options[0].quantity < 1
                  ? 'Hết hàng'
                  : 'Còn hàng'}
              </b>
            </p>

            <div className='flex items-center'>
              <div
                className='wishlist'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '15px 5px',
                }}
                // onClick={addToFavoriteHandler}
              >
                <BsHeart className='text-xl' />
                <span className='cartBtn' style={{ opacity: 0.7, padding: '0px 5px' }}>
                  Yêu thích
                </span>
              </div>

              <div className='flex items-center rounded-md bg-slate-200 px-2 py-1'>
                <BsCartPlus className='text-xl' />
                <button className='ml-1'>Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mô tả sản phẩm */}
      <div className='mx-auto mt-4 p-4 shadow-md lg:w-[80%]'>
        <h3 className='mx-auto w-[96%] bg-[#fafafa] px-4 py-2'>Mô tả sản phẩm</h3>
        <p className='mx-auto w-[96%] break-words px-4 py-2'>{product?.data.description}</p>
      </div>
      {/* Reviews */}
      <div className='mx-auto mt-4 p-4 shadow-md lg:w-[80%]'>
        <h3 className='mx-auto w-[96%] bg-[#fafafa] px-4 py-2'>Đánh giá sản phẩm</h3>
      </div>
    </>
  );
}
export default ProductDetails;
