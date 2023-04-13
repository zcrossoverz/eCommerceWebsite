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
  status: {
    status: string;
    payment: string;
    is_paid: boolean;
  };
  createAt?: string;
  updateAt?: string;
}
export interface ResGetAllOrder {
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data_per_page: number;
  total: number;
  data: {
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
      prices: number;
      image: string;
    }[];
    payment: {
      method: string;
      previous_amount: number;
      discount: string;
      amount: string;
      is_paid: false;
    };
    timeline: {
      id: number;
      content: string;
      time: string;
    }[];
  }[];
}
export interface ResGetOneOrder {
  order_id: number;
  status: string;
  create_at: string;
  update_at: string;
  address: string;
  user: User;
  coupon?: string;
  order_items: {
    product_name: string;
    product_option_id: number;
    ram: string;
    rom: string;
    color: string;
    quantity: number;
    image: string;
    prices: number;
  }[];

  payment: {
    method: string;
    previous_amount: number;
    discount: string;
    amount: string;
    is_paid: boolean;
  };
  timeline: {
    id: number;
    content: string;
    time: string;
  }[];
}
export interface orderQueryConfig {
  user_id: number;
}
