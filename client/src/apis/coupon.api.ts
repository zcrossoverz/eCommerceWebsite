import { Coupon } from 'src/types/coupon';
import http from 'src/utils/http';

const couponApi = {
  getAllCoupon() {
    return http.get<Coupon[]>('/coupon/get_all');
  },
};
export default couponApi;
