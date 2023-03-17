export interface OptionProduct {
  rom?: string;
  ram?: string;
  color?: string;
  price?: string;
  product_option_id?: number;
  quantity?: number;
  image?: {
    id: string;
    image_url: string;
    type: string;
  };
}
