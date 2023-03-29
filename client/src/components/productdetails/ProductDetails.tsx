import { useQuery } from '@tanstack/react-query';
import { BsCartPlus } from 'react-icons/bs';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import productsApi from 'src/apis/product.api';
import { isAxiosErr } from 'src/utils/error';
import { formatPrice } from 'src/utils/formatPrice';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect, useState } from 'react';
import { OptionProduct } from 'src/types/option.type';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from 'src/types/cart';
import { addItemtoCart } from 'src/slices/cart.slice';
import { RootState } from 'src/store';
import path from 'src/constants/path';
import { baseURL } from 'src/constants/constants';
import BreadCrumb from '../admindashboard/breadcrumb';
import HelmetSale from '../Helmet';
import { nanoid } from '@reduxjs/toolkit';
import Loading from '../loading';
function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: product, isLoading } = useQuery({
    queryKey: [
      'product',
      {
        id,
      },
    ],
    queryFn: () => productsApi.getProductDetail(id as string),
    // onSuccess: (data) => {
    //   // console.log(data);
    // },
    onError: (err) => {
      if (
        isAxiosErr<{
          error: string;
        }>(err)
      ) {
        toast.error(err.response?.data.error);
      }
    },
    onSuccess: (data) => {
      const op = data.data.product_options;
      for (let i = 0; i < op.length; i++) {
        if (op[i].quantity) {
          setOptionSelected({ ...op[i], index: i });
          break;
        }
      }
    },
    retry: 0,
  });
  const [loadMore, setLoadmore] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<OptionProduct>();
  const [quantity, setQuantity] = useState<number | string>('');
  const decreaseQuantity = () => {
    if (quantity && quantity >= 2) {
      setQuantity(Number(quantity) - 1);
    }
  };
  const increaseQuantity = () => {
    if (quantity <= Number(optionSelected?.quantity)) {
      setQuantity((prev) => {
        return Number(prev) + 1;
      });
    }
  };
  useEffect(() => {
    if (Number(quantity) > Number(optionSelected?.quantity)) {
      toast.error('Số lượng vượt quá hàng tồn');
      setQuantity(optionSelected?.quantity || 1);
    }
    if (Number(quantity) === 0) {
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  const handleAddToCart = () => {
    if (!userInfo.role) {
      toast.warning('Vui lòng đăng nhập');
      navigate(path.login, {
        replace: true,
        state: {
          from: location,
        },
      });
      return;
    }
    if (!optionSelected) {
      toast.error('Vui lòng chọn sản phẩm bạn muốn mua!');
      return;
    }
    const opt = product?.data.product_options.find((e) => {
      return e.product_option_id === optionSelected.product_option_id;
    });
    if (product?.data.id && product.data.name && opt?.price && opt.product_option_id) {
      const cartItem: CartItem = {
        id: product?.data.id,
        name: product.data.name,
        image: product.data.images.image_url,
        option: {
          price: opt.price,
          product_option_id: opt.product_option_id,
          quantity: quantity as number,
          image: opt.image?.image_url,
          stock: opt.quantity || 0,
        },
      };
      dispatch(addItemtoCart(cartItem));
      setQuantity(1);
    }
  };
  return (
    <>
      <HelmetSale title={product?.data.name as string}></HelmetSale>
      <div className='mx-auto max-w-7xl md:px-4'>
        <div className='hidden md:block'>
          <BreadCrumb
            key={nanoid()}
            path={['Fstore', 'Danh sách sản phẩm', 'chi tiết sản phẩm', product?.data.name as string]}
          />
        </div>
        <div className=' md:hidden'>
          <BreadCrumb key={nanoid()} path={['Fstore', '...', '...', product?.data.name as string]} />
        </div>
      </div>
      <div className='mx-auto mt-1 grid grid-cols-1 grid-rows-1 bg-white shadow-md md:p-4 lg:w-[80%] lg:grid-cols-[1fr,2fr]'>
        {!isLoading && (
          <div>
            {product?.data.product_options && product.data.product_options.every((e) => e.image !== null) ? (
              <Carousel selectedItem={optionSelected?.index} showThumbs={false} emulateTouch={true}>
                {product?.data.product_options.map((item, i) => (
                  <div key={i}>
                    <img className='object-contain' src={`${baseURL}/${item.image?.image_url}`} alt={`${i} Slide`} />
                  </div>
                ))}
              </Carousel>
            ) : (
              <Carousel showThumbs={false} infiniteLoop={true} emulateTouch={true}>
                {product?.data.product_options.map((item, i) => {
                  return (
                    <div key={item.product_option_id}>
                      <img
                        className=''
                        src={`${baseURL}/${
                          item.image?.image_url ? item.image.image_url : product.data.images.image_url
                        }`}
                        alt={`${i} Slide`}
                      />
                    </div>
                  );
                })}
              </Carousel>
            )}
            <div>
              <h1>Cấu hình chi tiết</h1>
              <ul>
                <li className='flex items-center'>
                  <span className='w-1/3'>a</span>
                  <span className='w-2/3'>bc</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-1/3'>a</span>
                  <span className='w-2/3'>bc</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-1/3'>a</span>
                  <span className='w-2/3'>bc</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-1/3'>a</span>
                  <span className='w-2/3'>bc</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-1/3'>a</span>
                  <span className='w-2/3'>bc</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-1/3'>a</span>
                  <span className='w-2/3'>bc</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        {isLoading && (
          <div className='col-span-2 flex min-h-[300px] items-center justify-center'>
            <Loading />
          </div>
        )}
        {!isLoading && (
          <div className='bg-white p-2 md:p-4'>
            <h1 className='mb-4 text-4xl font-bold'>{product?.data.name}</h1>
            <div className='mb-2 flex items-center'>
              {/* <Star ratings={product.ratings} /> */}
              {/* <span className='ml-2 text-base text-gray-500'>({product.numOfReviews} Reviews)</span> */}
            </div>
            <div>
              <div className='grid min-h-[2rem] w-full grid-cols-1 gap-4 md:grid-cols-2'>
                {product?.data.product_options &&
                  product.data.product_options.map((op, index) => {
                    return (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                      <button
                        key={op.product_option_id}
                        disabled={Boolean(Number(op.quantity) <= 0)}
                        className={classNames('rounded-xl border bg-transparent px-4 py-2 text-center duration-200 ', {
                          'boder-2 border-blue-500 shadow-md': Boolean(
                            optionSelected?.product_option_id === op.product_option_id
                          ),
                          'cursor-not-allowed': Number(op.quantity) <= 0,
                          'cursor-pointer hover:bg-orange-100': !(Number(op.quantity) <= 0),
                        })}
                        onClick={() => setOptionSelected({ ...op, index })}
                      >
                        <div className='flex items-center justify-center'>
                          <span>Ram: {op.ram}</span>
                          <span className='mx-3'>Rom: {op.rom}</span>
                          <span>Color: {op.color}</span>
                        </div>
                        <div className='flex items-center justify-around'>
                          <span className='text-3xl'>{formatPrice(Number(op.price))}</span>
                          <span>
                            <b className={!op.quantity ? 'text-red-600' : 'text-green-600'}>
                              {!op.quantity ? 'Hết hàng' : 'Còn hàng'}
                            </b>
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
              <div className='mt-4 mb-2 flex items-center'>
                <span className='quantity mr-2'>Số lượng</span>
                <div className='flex items-center'>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                  <span
                    className='rounded-[4px] bg-green-400 px-2 py-1 duration-200 hover:bg-green-300'
                    onClick={decreaseQuantity}
                  >
                    <HiMinus size={16} />
                  </span>
                  <input
                    type='number'
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    className='mx-1 max-w-[6rem] rounded-md border-2 border-orange-400 px-2 py-1 focus:outline-none'
                  />
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                  <span
                    className='rounded-[4px] bg-green-400 px-2 py-1 duration-200 hover:bg-green-300'
                    onClick={increaseQuantity}
                  >
                    <HiPlus size={16} />
                  </span>
                </div>
              </div>
              {/* add to cart btn */}
              <button
                type='button'
                onClick={() => handleAddToCart()}
                className={classNames(
                  'my-4 mr-2 flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white duration-300 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800',
                  {
                    'hover:bg-gradient-to-bl': Boolean(optionSelected),
                    'cursor-not-allowed': Boolean(!optionSelected),
                  }
                )}
              >
                <BsCartPlus className='text-xl' />
                <span className='ml-2 text-lg'>Thêm vào giỏ hàng</span>
              </button>
            </div>
            <div className='min-h-[6rem] w-full overflow-hidden rounded-md bg-red-200'>
              <div className='flex min-h-[3rem] w-full items-center bg-red-600 px-2'>
                <span className='border-r pr-2 text-xl font-bold uppercase text-yellow-400 md:text-3xl'>SỐ 1</span>
                <span className='pl-2 text-lg uppercase text-white md:text-2xl'>VỀ BẢO HÀNH VÀ HẬU MÃI</span>
              </div>
              <p className='p-2'>Bảo hành 1 ĐỔI 1 trong 6 tháng</p>
            </div>
            <div className='my-4 min-h-[5rem] w-full overflow-hidden rounded-md border border-orange-200'>
              <div className='w-full bg-orange-200 p-2'>Mô tả sản phẩm</div>
              <div className='relative'>
                <p
                  className={classNames('whitespace-pre-line px-2 text-justify text-base', {
                    'line-clamp-4': !loadMore,
                  })}
                >
                  {product?.data.description}
                </p>
                <button
                  type='button'
                  onClick={() => setLoadmore(!loadMore)}
                  className={classNames(
                    'w-full rounded-lg px-5 py-1 text-center text-sm font-semibold text-blue-400 duration-300 focus:outline-none'
                  )}
                >
                  <span className='ml-2 text-lg'>{loadMore ? 'Thu gọn' : 'Xem thêm'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* desc */}
      {!isLoading && (
        <div className='mx-auto mt-4 p-4 shadow-md lg:w-[80%]'>
          <h3 className='mx-auto w-[96%] bg-[#fafafa] px-4 py-2'>Chi tiết cấu hình của sản phẩm</h3>
          <p className='mx-auto w-[96%] break-words px-4 py-2'>{product?.data.specs}</p>
        </div>
      )}
      {/* Reviews */}
      <div className='mx-auto mt-4 p-4 shadow-md lg:w-[80%]'>
        <h3 className='mx-auto w-[96%] bg-[#fafafa] px-4 py-2'>Đánh giá sản phẩm</h3>
      </div>
    </>
  );
}
export default ProductDetails;
