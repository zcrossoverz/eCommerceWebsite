import { ResponseApi } from './utils.type';
import { User } from './user.type';
export type AuthResponse = ResponseApi<{
  message: string;
  token: string;
  error?: string;
}>;
export type RegisterResponse = ResponseApi<User>;

export interface ResponseApiLogin {
  message?: string;
  token?: string;
  statusCode?: number;
  error?: string;
}
