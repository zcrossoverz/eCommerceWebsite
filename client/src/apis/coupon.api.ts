import { Coupon } from 'src/types/coupon';
import http from 'src/utils/http';

const couponApi = {
  getAllCoupon() {
    return http.get<Coupon[]>('/coupon/get_all');
  },
  applyCoupon(code: string, orderId: number) {
    return http.post<{
      message: string;
    }>('/coupon/apply', {
      code,
      order_id: orderId,
    });
  },
  clearCoupon(orderId: number) {
    return http.post<{
      message: string;
    }>('/coupon/clear', {
      order_id: orderId,
    });
  },
};
export default couponApi;
