import axios, { type AxiosInstance } from 'axios';
import { ResponseApiLogin } from 'src/types/auth.type';
import { clearAccessToken, getAccessToken, saveAccessToken } from './auth';

class Http {
  instance: AxiosInstance;
  token: string | null;
  constructor() {
    this.token = getAccessToken();
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_BASE_URL}/api` || 'http://localhost:3000/api',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
    });
    this.instance.interceptors.request.use((config) => {
      config.headers['Authorization'] = 'bearer ' + this.token;
      return config;
    });

    this.instance.interceptors.response.use(
      (res) => {
        if (res.config.url === '/auth') {
          this.token = (res.data as ResponseApiLogin)?.token || '';
          if (this.token) {
            saveAccessToken(this.token);
          }
        } else if (res.config.url === '/logout') {
          this.token = '';
          clearAccessToken();
        }
        return res;
      }
      // function (err: AxiosError) {
      //   if (err.response?.status !== 422) {
      //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //     const data: any = err.response?.data;
      //     const message = data.message || err.message;
      //     toast.error(message);
      //   }
      // }
    );
  }
}
const http: AxiosInstance = new Http().instance;
export default http;
