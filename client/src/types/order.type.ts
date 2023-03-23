import { User } from './user.type';

export interface Order {
  user_id: number;
  items: {
    product_option_id: number;
    quantity: number;
  }[];
}
export interface ResCreateOrder {
  address: string;
  user: User;
  payment: {
    id: number;
    method: number;
    amount: string;
    is_paid: boolean;
  };
  id: number;
  status: number;
  createAt?: string;
  updateAt?: string;
}
export interface ResGetOrder {
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data_per_page: number;
  total: number;
  data: [
    {
      order_id: number;
      status: string;
      create_at: string;
      update_at: string;
      address: string;
      user: User;
      order_items: {
        product_name: string;
        product_option_id: number;
        ram: string;
        rom: string;
        color: string;
        quantity: number;
      }[];
      payment: {
        method: string;
        amount: number;
        is_paid: boolean;
      };
      timeline: {
        id: number;
        content: string;
        time: string;
      }[];
    }
  ];
}
