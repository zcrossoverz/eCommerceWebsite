import { Link } from 'react-router-dom';
import Slider, { type InnerSlider, type Settings } from 'react-slick';
import Star from '../star';
import { formatPrice } from 'src/utils/formatPrice';
import { useMemo, useRef, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight, BsPieChart } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import analysisApi, { ResTopSale } from 'src/apis/analysis.api';

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return <div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick} />;
// }
interface SliderRef extends React.Component<Settings, never> {
  innerSlider?: InnerSlider | undefined;
  slickNext(): void;
  slickPause(): void;
  slickPlay(): void;
  slickPrev(): void;
  slickGoTo(slideNumber: number, dontAnimate?: boolean): void;
}

function TopProducts() {
  const [topSales, setTopSales] = useState<ResTopSale[]>();
  const dataProductSales = useQuery({
    queryKey: ['topSales'],
    queryFn: () => analysisApi.topSales(),
    onSuccess: (data) => {
      const maxLength = 8;
      if (data.data) {
        const sortData = data.data.sort((a: ResTopSale, b: ResTopSale) => {
          return b.total_sale - a.total_sale;
        });
        if (sortData.length < maxLength) {
          setTopSales(sortData);
        } else {
          setTopSales(sortData.slice(0, maxLength - 1));
        }
      }
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const slider = useRef<SliderRef>(null);
  const settings = useMemo(() => {
    return {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }, []);
  return (
    <div className='mx-auto mb-4 mt-4 max-w-7xl overflow-hidden rounded-sm bg-orange-500 pb-8 shadow-md'>
      <div className='mb-6 flex items-center justify-center bg-white p-2'>
        <BsPieChart className='text-4xl text-orange-500' />
        <h2 className='ml-2 text-center text-2xl font-semibold uppercase text-orange-500 md:text-3xl'>
          top sản phẩm bán chạy
        </h2>
      </div>
      <div className='relative'>
        <button
          className='absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-black/20'
          onClick={() => slider?.current?.slickPrev()}
        >
          <BsChevronCompactLeft className='text-3xl text-white' />
        </button>
        <button
          className='absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-black/20'
          onClick={() => slider?.current?.slickNext()}
        >
          <BsChevronCompactRight className='text-3xl text-white' />
        </button>
        <Slider arrows={false} ref={slider} {...settings}>
          {topSales &&
            topSales.length > 0 &&
            topSales.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-transform duration-300 hover:shadow-md'>
                  <div className='relative w-full flex-shrink-0 pt-[100%]'>
                    <img
                      className='absolute top-0 left-0 h-full w-full object-contain'
                      src={'http://localhost:3000/' + product.image}
                      alt=''
                    />
                  </div>
                  <div className='mt-auto'>
                    <div className='overflow-hidden p-1'>
                      <h3 className='min-h-[1.75rem] text-lg font-semibold duration-150 line-clamp-2 hover:text-orange-600'>
                        {product.name}
                      </h3>
                    </div>
                    <div className='p-1'>
                      <span className='text-xl font-semibold text-orange-700 line-clamp-1'>
                        {formatPrice(Number(product.price))}
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-base text-gray-600'>{product.brand.name}</span>
                      <Star ratings={Number(product.rate)} size='xl' />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
}
export default TopProducts;
