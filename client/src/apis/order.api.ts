import { Order, ResCreateOrder } from 'src/types/order.type';
import http from 'src/utils/http';

const orderApi = {
  createOrder(order: Order) {
    return http.post<ResCreateOrder>(`order/create_order`, order);
  },
};

export default orderApi;
