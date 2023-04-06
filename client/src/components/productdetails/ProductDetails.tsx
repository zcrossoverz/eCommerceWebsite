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
import { useTranslation } from 'react-i18next';
import Comments from './comments';
import feedbackApi from 'src/apis/feedback.api';
import { ResGetFeedback } from 'src/types/product.type';
function ProductDetails() {
  const rating = useSelector((state: RootState) => state.productReducer.rating);
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const { t } = useTranslation('productdetail');
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [canRate, setCanRate] = useState<{
    success: boolean;
    isRated: boolean;
  }>({
    success: false,
    isRated: false,
  });
  const [feedback, setFeedback] = useState<ResGetFeedback>();
  const [loadMore, setLoadmore] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<OptionProduct>();
  const [quantity, setQuantity] = useState<number | string>('');
  const {
    data: product,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: [
      'product',
      {
        id,
      },
    ],
    queryFn: () => productsApi.getProductDetail(id as string),

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
  const { refetch: refetchCanRate } = useQuery({
    queryKey: ['canRate', product?.data.id],
    queryFn: () => productsApi.canRate(Number(product?.data.id)),
    enabled: Boolean(product?.data.id && userInfo.id),
    onSuccess: (data) => {
      setCanRate({ success: data.data.can_rate, isRated: data.data.is_done });
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const { refetch: refetchGetFeed } = useQuery({
    queryKey: ['getFeedback', product?.data.id],
    queryFn: () => feedbackApi.getFeedback(Number(product?.data.id)),
    enabled: Boolean(product?.data.id),
    onSuccess: (data) => {
      setFeedback(data.data);
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const decreaseQuantity = () => {
    if (Number(quantity) && Number(quantity) >= 2) {
      setQuantity(Number(quantity) - 1);
    }
  };
  const increaseQuantity = () => {
    if (Number(quantity) <= Number(optionSelected?.quantity)) {
      setQuantity((prev) => {
        return Number(prev) + 1;
      });
    }
  };
  useEffect(() => {
    if (Number(quantity) > Number(optionSelected?.quantity)) {
      toast.error(t('productdetail.quantity exceeds stock'));
      setQuantity(optionSelected?.quantity || 1);
    }
    if (Number(quantity) === 0) {
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const handleAddToCart = () => {
    if (!userInfo.role) {
      toast.warning(t('productdetail.please login'));
      navigate(path.login, {
        replace: true,
        state: {
          from: location,
        },
      });
      return;
    }
    if (!optionSelected) {
      toast.error(t('productdetail.select product'));
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
            path={[
              'Fstore',
              t('productdetail.list of products'),
              t('productdetail.product details'),
              product?.data.name as string,
            ]}
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
            {product?.data.specs.length !== 0 && (
              <div>
                <h1 className='my-2 px-2 text-base font-semibold text-black'>Cấu hình chi tiết</h1>
                <ul>
                  {product?.data &&
                    product.data.specs.map((spec) => (
                      <li key={nanoid(6)} className='flex items-center px-2 py-1 text-xs odd:bg-slate-100'>
                        <span className='w-1/3 font-semibold'>{spec.key}:</span>
                        <span className='w-2/3 text-slate-400'>{spec.value}:</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
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
                          <span>
                            {t('productdetail.color')}: {op.color}
                          </span>
                        </div>
                        <div className='flex items-center justify-around'>
                          <span className='text-3xl'>{formatPrice(Number(op.price))}</span>
                          <span>
                            <b className={!op.quantity ? 'text-red-600' : 'text-green-600'}>
                              {!op.quantity ? t('productdetail.out of stock') : t('productdetail.stocking')}
                            </b>
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
              <div className='mt-4 mb-2 flex items-center'>
                <span className='quantity mr-2'>{t('productdetail.quantity')}</span>
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
                  'my-4 mr-2 flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white duration-300 focus:outline-none focus:ring-cyan-300',
                  {
                    'hover:bg-gradient-to-bl': Boolean(optionSelected),
                    'cursor-not-allowed': Boolean(!optionSelected),
                  }
                )}
              >
                <BsCartPlus className='text-xl' />
                <span className='ml-2 text-lg'>{t('productdetail.add to card')}</span>
              </button>
            </div>
            <div className='min-h-[6rem] w-full overflow-hidden rounded-md bg-red-200'>
              <div className='flex min-h-[3rem] w-full items-center bg-red-600 px-2'>
                <span className='border-r pr-2 text-xl font-bold uppercase text-yellow-400 md:text-3xl'>
                  {t('productdetail.no1')}
                </span>
                <span className='pl-2 text-lg uppercase text-white md:text-2xl'>
                  {t('productdetail.about warranty and sale')}
                </span>
              </div>
              <p className='p-2'>{t('productdetail.warranty')}</p>
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

      {/* Reviews */}
      <div className='mx-auto mt-4 shadow-md lg:w-[80%]'>
        {/* <h3 className='mx-auto w-[96%] bg-[#fafafa] px-4 py-2'>{t('productdetail.product reviews')}</h3> */}
        <Comments
          feedbackOfProduct={feedback}
          productId={product?.data.id}
          numFeedback={product?.data.feedback.length}
          userId={userInfo.id || 0}
          rating={rating}
          canRate={canRate}
          refetchGetFeed={refetchGetFeed}
          refetchUser={refetchUser}
          refetchCanRate={refetchCanRate}
        />
      </div>
    </>
  );
}
export default ProductDetails;
