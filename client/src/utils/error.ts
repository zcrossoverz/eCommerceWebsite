import axios, { AxiosError } from 'axios';

export function isAxiosErr<T>(err: unknown): err is AxiosError<T> {
  return axios.isAxiosError(err);
}
