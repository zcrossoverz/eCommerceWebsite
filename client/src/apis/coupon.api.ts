import http from 'src/utils/http';

const timeout = (ms: number) => {
  return new Promise((s) => setTimeout(s, ms));
};

const baseURL = '/coupon';
const couponApi = {
  async getAllCoupon() {
    await timeout(300);
    return http.get(`${baseURL}/get_all`);
  },
  async createBrand(name: string, description: string) {
    return http.post(baseURL, { name, description });
  },
  async delete(id: number) {
    return http.delete(`${baseURL}/${id}`);
  },
  async update(id: number, name: string, desc: string) {
    return http.put(`${baseURL}/${id}`, { name, description: desc });
  },
};
export default couponApi;
