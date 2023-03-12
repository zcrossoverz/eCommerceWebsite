export interface Product {
  id: number;
  name: string;
  description: string;
  createAt: string;
  updateAt: string;
  brand: string;
  brand_description: string;
  specs: never[];
  images: {
    id: string;
    type: string;
    image_url: string;
  }[];
  product_options: {
    product_option_id?: number;
    color?: string;
    ram?: string;
    rom?: string;
    price?: string;
    quantity?: number;
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
  limit?: number;
  page?: number;
}
