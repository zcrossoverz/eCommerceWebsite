import { formatPrice } from 'src/utils/formatPrice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FcFlashOn } from 'react-icons/fc';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import couponApi from 'src/apis/coupon.api';
import { Coupon } from 'src/types/coupon';
import { toast } from 'react-toastify';
function Discount() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useQuery({
    queryKey: ['getCoupon'],
    queryFn: () => couponApi.getAllCoupon(),
    onSuccess: (data) => {
      if (data.data.length) {
        setCoupons(data.data);
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const settings = useMemo(() => {
    return {
      className: 'center',
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 5,
      swipeToSlide: true,
      autoplay: true,
      cssEase: 'linear',
      autoplaySpeed: 3000,
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
    <div className='mx-auto mb-2 max-w-7xl overflow-hidden border-t bg-white pb-4 shadow-sm'>
      <div className='mb-2 flex items-center justify-center'>
        <FcFlashOn className='text-6xl' />
        <h2 className='text-3xl font-semibold uppercase text-yellow-400'>Săn mã giảm giá</h2>
      </div>
      <Slider {...settings}>
        {coupons.length &&
          coupons.map((coupon) => (
            <div key={coupon.id} className='relative h-[8rem] w-[14rem] bg-[#27aa9a] text-white'>
              {/* circle */}
              <span className='absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white '></span>
              <span className='absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white '></span>
              <div className='mx-4 flex flex-col items-center justify-center'>
                <span className='border-b text-sm'>
                  Giảm:{' '}
                  <b className='text-xl'>{coupon.type === 'AMOUNT' ? formatPrice(coupon.value) : coupon.value + '%'}</b>
                </span>
                <span className='text-sm'>Ngày bắt đầu: {coupon.start_date}</span>
                <span className='text-sm'>Hiệu lực đến: {coupon.end_date}</span>
              </div>
              <div className='absolute inset-x-1 bottom-1 flex items-center justify-between border p-1'>
                <span className='font-semibold'>{coupon.code}</span>
                <button
                  className='rounded-sm bg-orange-500 px-2 py-0.5 uppercase text-white duration-200 hover:bg-orange-400'
                  onClick={() => {
                    navigator.clipboard.writeText(coupon.code);
                    toast.success('Đã copy!', { autoClose: 1000 });
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
export default Discount;
