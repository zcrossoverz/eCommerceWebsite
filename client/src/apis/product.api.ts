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
    }>(`${URL}/can_rate/${id}`);
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
};

export default productsApi;
