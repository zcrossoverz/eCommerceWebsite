export interface Product {
  id: number;
  name: string;
  description: string;
  createAt: string;
  updateAt: string;
  brand: string;
  brand_description: string;
  rate: number;
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
