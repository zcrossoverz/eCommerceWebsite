import { Brand } from 'src/types/brand.type';
import http from 'src/utils/http';

const timeout = (ms: number) => {
  return new Promise((s) => setTimeout(s, ms));
};

const baseURL = '/brand';
const brandApi = {
  async getAllBrand() {
    await timeout(300);
    return http.get<Brand[]>(baseURL);
  },
};
export default brandApi;
