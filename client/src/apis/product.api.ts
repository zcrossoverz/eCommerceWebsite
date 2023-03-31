import { Product, ProductListConfig, ProductsList } from 'src/types/product.type';
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
};

export default productsApi;
