import { User } from './user.type';

export interface Product {
  id: number;
  name: string;
  description: string;
  createAt: string;
  updateAt: string;
  brand: string;
  brand_description: string;
  brand_id?: number;
  rate: number;
  feedback: {
    id: number;
    rate: number;
    comment: string;
    create_at: string;
  }[];
  specs: {
    key: string;
    value: string;
  }[];
  images: {
    id: string;
    type: string;
    image_url: string;
  };
  product_options: {
    product_option_id?: number;
    color?: string;
    ram?: string;
    rom?: string;
    price?: string;
    quantity?: number;
    image?: {
      id: string;
      image_url: string;
      type: string;
    };
  }[];
}
export interface ProductsList {
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data_per_page: number;
  total: number;
  data: Omit<Product, 'brand_description' | 'createAt' | 'updateAt' | 'specs'>[];
}

export interface ProductListConfig {
  limit?: string;
  page?: string;
  brand_id?: string;
  price_min?: string;
  price_max?: string;
  rate?: string;
  search?: string;
}
export type Feedback = {
  product_id: number;
  user_id: number;
  rate: number;
  comment: string;
};
export type ResFeedback = {
  rate: number;
  comment: string;
  product: {
    id: 1;
    name: string;
    createAt: string;
    updateAt: string;
    rate: string;
  };
  user: User;
  id: number;
  create_at: string;
};
export type ResGetFeedback = {
  rate: number;
  data: {
    id: number;
    rate: number;
    comment: string;
    create_at: string;
    user: User;
  }[];
};

export type ProductData = {
  name: string;
  image?: File;
  description: string;
  ram: string;
  rom: string;
  price: string;
  brand_id: number;
  color: string;
};
export type ResAnalysGetProducts = {
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data_per_page: number;
  total: number;
  data: {
    product_option_id: number;
    quantity: number;
    images: string;
    name: string;
    ram: string;
    rom: string;
    color: string;
  }[];
};
