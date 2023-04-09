import { Order, orderQueryConfig, ResCreateOrder, ResGetAllOrder, ResGetOneOrder } from 'src/types/order.type';
import http from 'src/utils/http';

const orderApi = {
  createOrder(order: Order) {
    return http.post<ResCreateOrder>(`order/create_order`, order);
  },
  getOneOrder(id: number) {
    return http.get<ResGetOneOrder>(`/order/get_order/${id}`);
  },
  setPaymentMethod(method: string, id: number) {
    return http.post<{
      message: string;
    }>(`/order/select_payment_method/${id}`, {
      method,
    });
  },
  updateStatusPayment(id: number) {
    return http.patch<{
      message: string;
    }>(`order/update_status_payment/${id}`);
  },
  updateStatus(status: string, id: number) {
    return http.patch<{
      message: string;
    }>(`order/update_status_order/${id}`, {
      status,
    });
  },
  updateAddressOrder(address: string, id: number) {
    return http.patch<{
      message: string;
    }>(`/order/update_address_order/${id}`, {
      address,
    });
  },
  getOrdersOfUser(params: orderQueryConfig) {
    return http.get<ResGetAllOrder>(`order/get_all_by_user`, {
      params,
    });
  },
  getAllOrders(params?: orderQueryConfig) {
    return http.get<ResGetAllOrder>(`order/get_all`, {
      params,
    });
  },
  getAll(params?: {
    limit?: string;
    page?: string;
    order?: string;
    status?: number;
    method?: number;
    paid?: number;
    search?: string;
  }) {
    return http.get<ResGetAllOrder>(`order/get_all`, {
      params,
    });
  },
  deleteOrder(id: number) {
    return http.delete(`order/${id}`);
  },
};

export default orderApi;
