import { RegisterResponse, ResponseApiLogin } from 'src/types/auth.type';
import { User } from 'src/types/user.type';
import http from 'src/utils/http';
export const registerAccount = (body: { email: string; password: string; firstName: string; lastName: string }) =>
  http.post<RegisterResponse>('/user', body);
export const loginAccount = (body: { email: string; password: string }) => http.post<ResponseApiLogin>('/auth', body);
