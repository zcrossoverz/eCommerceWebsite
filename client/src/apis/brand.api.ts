import http from 'src/utils/http';
const URL = '/brand';

interface BrandsList {
  id: number;
  name: string;
  description: string;
}

const timeout = (ms: number) => {
  return new Promise((s) => setTimeout(s, ms));
};

const brandsApi = {
  async getAll() {
    await timeout(400);
    return http.get<BrandsList[]>(`${URL}`);
  },
};

export default brandsApi;
