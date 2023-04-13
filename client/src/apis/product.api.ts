import { Product, ProductData, ProductListConfig, ProductsList } from 'src/types/product.type';
import http from 'src/utils/http';
const URL = '/product/';
const timeout = (ms: number) => {
  return new Promise((s) => setTimeout(s, ms));
};

const productsApi = {
  async getProductsList(params: ProductListConfig) {
    await timeout(500);
    return http.get<ProductsList>(`${URL}/get_all`, {
      params,
    });
  },
  async getProductDetail(id: string) {
    await timeout(500);
    return http.get<Product>(`${URL}/${id}`);
  },
  async canRate(id: number) {
    await timeout(500);
    return http.get<{
      is_done: boolean;
      can_rate: boolean;
    }>(`${URL}can_rate/${id}`);
  },
  async createProduct(data: any) {
    return await http.post('/product', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  async deleteProduct(product_id: number) {
    return http.delete(`/product/${product_id}`);
  },
  async updateProduct(
    product_id: number,
    data: {
      name: string;
      description: string;
      brand_id: number;
    }
  ) {
    return http.put(`product/${product_id}`, data);
  },
  async createOption(product_id: number, data: any) {
    return await http.post(`product_option/${product_id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  async deleteOption(option_id: number) {
    return await http.delete(`product_option/${option_id}`);
  },
  async updateOption(
    product_option_id: number,
    data: {
      ram?: string;
      rom?: string;
      color?: string;
      price?: string;
    }
  ) {
    return http.put(`product_option/${product_option_id}`, data);
  },
  async createSpec(product_id: number, key: string, value: string) {
    return await http.post(`specification/${product_id}`, [{ key, value }]);
  },
  async deleteSpec(spec_id: number) {
    return await http.delete(`specification/${spec_id}`);
  },
  async updateOneSpec(spec_id: number, value: string) {
    return await http.put(`specification/${spec_id}`, { value });
  },
};

export default productsApi;
