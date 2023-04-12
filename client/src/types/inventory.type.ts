export interface ResCreateInboundNote {
  status: number;
  id: number;
  create_at: string;
}
export interface ResGetAllInboundNote {
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data_per_page: number;
  total: number;
  data: {
    id: number;
    status: string;
    create_at: string;
    items: {
      name: string;
      product_option_id: number;
      quantity: number;
      ram: string;
      rom: string;
      color: string;
    }[];
  }[];
}

export interface ResGetOneInboundNote {
  id: number;
  status: string;
  create_at: string;
  items: {
    name: string;
    product_option_id: number;
    quantity: number;
    ram: string;
    rom: string;
    color: string;
    image: string;
  }[];
}
export interface InboundNote {
  data: {
    product_option_id: number;
    quantity: number;
  }[];
}
