import { Brand } from 'src/types/brand.type';
import http from 'src/utils/http';
const baseURL = '/brand';
const brandApi = {
  getAllBrand() {
    return http.get<Brand[]>(baseURL);
  },
};
export default brandApi;
