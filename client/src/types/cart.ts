export interface CartItem {
  id?: number;
  name: string;
  image: string;
  option: {
    price: string;
    product_option_id: number;
    quantity: number;
    image?: string;
    stock: number;
  };
}
