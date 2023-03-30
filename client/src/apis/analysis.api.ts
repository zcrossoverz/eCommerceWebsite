import http from 'src/utils/http';

const timeout = (ms: number) => {
  return new Promise((s) => setTimeout(s, ms));
};

const baseURL = '/analysis';
const analysisApi = {
  analysBrand() {
    return http.get(`${baseURL}/brand`);
  },
  analysOverview() {
    return http.get(`${baseURL}/overview`);
  },
  topSales() {
    return http.get(`${baseURL}/top_sale`);
  },
};

export default analysisApi;
