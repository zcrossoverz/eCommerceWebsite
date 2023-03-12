import { Product, ProductListConfig, ProductsList } from 'src/types/product.type';
import http from 'src/utils/http';
const URL = '/product/';
const productsApi = {
  getProductsList(params: ProductListConfig) {
    return http.get<ProductsList>(`${URL}/get_all`, {
      params,
    });
  },
  getProductDetail(id: number | string) {
    return http.get<Product>(`${URL}/${id}`);
  },
};

export default productsApi;
