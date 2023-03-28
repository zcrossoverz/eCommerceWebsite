import http from 'src/utils/http';

const timeout = (ms: number) => {
  return new Promise((s) => setTimeout(s, ms));
};

const baseURL = '/analysis';
const analysisApi = {
  async analysBrand() {
    await timeout(300);
    return http.get(`${baseURL}/brand`);
  },
};
export default analysisApi;
